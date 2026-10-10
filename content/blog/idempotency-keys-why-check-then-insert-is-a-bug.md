---
title: "Idempotency keys: why check-then-insert is a bug"
date: "2025-08-28"
description: "Why application-level check-then-insert fails during concurrent requests, and how unique database constraints solve race conditions."
tags: ["PostgreSQL", "Backend", "Architecture", "DocFlow"]
draft: true
---

In distributed systems and backend APIs, network unreliability is an everyday reality. A client initiates a long-running job, the connection drops before receiving an acknowledgment, and the client retries the request. Without proper idempotency, duplicate jobs get created, wasted compute cycles follow, and state corruption occurs.

When engineers first implement idempotency keys, the most common pattern looks deceptively simple: check if the key already exists in the database, and if not, insert the new job. In production or under concurrency, this application-level "check-then-insert" pattern is not just inefficient—it is an outright bug.

Here is why that pattern fails and how DocFlow implements database-enforced idempotency to eliminate race conditions.

## The Flaw in Check-Then-Insert

Consider an application endpoint receiving an HTTP request with an `Idempotency-Key` header:

```typescript
// The flawed check-then-insert pattern
async function handleJobCreation(userId: string, idempotencyKey: string, payload: JobPayload) {
  // 1. Check if the key exists
  const existingJob = await db.query(
    "SELECT * FROM jobs WHERE user_id = $1 AND idempotency_key = $2",
    [userId, idempotencyKey]
  );

  if (existingJob.rows.length > 0) {
    return existingJob.rows[0];
  }

  // 2. Insert new record
  const newJob = await db.query(
    "INSERT INTO jobs (user_id, idempotency_key, payload, status) VALUES ($1, $2, $3, 'pending') RETURNING *",
    [userId, idempotencyKey, payload]
  );

  return newJob.rows[0];
}
```

This sequence assumes sequential execution. But HTTP clients frequently submit parallel requests—either due to automated retry policies, connection timeouts, or double-clicks from user interfaces.

When two identical requests arrive simultaneously at the API gateway, a classic race condition emerges:

1. **Request A** executes `SELECT` and finds no matching record.
2. **Request B** executes `SELECT` at the exact same millisecond and also finds no matching record.
3. **Request A** proceeds to execute `INSERT`.
4. **Request B** proceeds to execute `INSERT`.

Both requests pass the application-level check because the check occurred before either transaction committed. The database now contains two duplicate records for the exact same idempotent action.

## Database-Enforced Uniqueness in DocFlow

Application runtime memory cannot synchronize distributed network requests across different server nodes or concurrent worker threads without heavy distributed locks. The single source of truth for concurrency must be the relational database engine.

To solve this deterministically, DocFlow uses a composite unique constraint directly on the table schema:

```sql
ALTER TABLE jobs
ADD CONSTRAINT uq_user_id_idempotency_key
UNIQUE (user_id, idempotency_key);
```

By scoping the uniqueness to `(user_id, idempotency_key)`, multiple users can safely generate identical keys without colliding, while any individual user's namespace is strictly isolated.

## How Concurrent Requests Race

With the unique constraint in place, we replace check-then-insert with an atomic insert statement that handles conflict resolution:

```sql
INSERT INTO jobs (user_id, idempotency_key, payload, status)
VALUES ($1, $2, $3, 'pending')
ON CONFLICT (user_id, idempotency_key)
DO NOTHING
RETURNING *;
```

When two simultaneous requests race to create a job with the same key:

1. Both requests arrive at PostgreSQL concurrently.
2. PostgreSQL acquires an exclusive row-level lock during page index insertion.
3. The database picks exactly one winner to write the index entry and commit.
4. The losing request encounters the unique constraint conflict.

Instead of crashing or duplicating data, the application checks if the row was created. If `RETURNING *` yields no row due to `DO NOTHING`, the application issues a read query:

```typescript
// Fetch and return the winning job
const existingJob = await db.query(
  "SELECT * FROM jobs WHERE user_id = $1 AND idempotency_key = $2",
  [userId, idempotencyKey]
);
return existingJob.rows[0];
```

## The Result

Through this design:
- A repeated or delayed request simply queries and returns the already-existing job record.
- Two simultaneous requests race at the database layer, and PostgreSQL's index guarantees that exactly one transaction succeeds while the other safely retrieves the winner's result.
- No duplicate background jobs are enqueued in Redis or BullMQ.

Relying on the database engine to enforce uniqueness guarantees idempotency correctness at the physical storage level, completely immune to application-level concurrency races.
