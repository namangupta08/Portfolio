---
title: "What EXPLAIN ANALYZE told me about my index"
date: "2025-09-24"
description: "Empirical benchmarking of a composite PostgreSQL index on (userId, date) across 10,000 transactions: where indexes shine and where gains remain modest."
tags: ["PostgreSQL", "SQL", "Databases", "Performance", "SpendWise"]
draft: true
---

Adding database indexes is often treated as an automatic cure-all for database latency. In tutorials, queries magically jump from seconds to sub-millisecond execution times simply by indexing filtered columns. But real database query engines like PostgreSQL do not operate on magic—they make cost-based decisions based on table size, page buffer cache residency, and selectivity.

While building SpendWise, I wanted to measure the concrete performance impact of adding a composite index on `(userId, date)`. I seeded a test database with 10,000 realistic transaction records and ran `EXPLAIN ANALYZE` alongside synthetic load tests to evaluate the true numbers.

Here are the exact metrics recorded, the execution plan shifts, and an honest look at what the index actually helped.

## The Test Dataset and Query Types

The test environment was seeded with 10,000 transactions distributed across multiple users and dates. 

The primary queries evaluated were:
1. **Narrow Window Query**: 3-month date range filtered by `userId` and `date`.
2. **Wide Window Query**: 24-month historical trend query filtering extensive time spans under concurrent read load.
3. **Month-End Aggregation Query**: Grouped aggregation calculating summary totals, category breakdowns, and average daily expenditures for a billing period.

Before indexing, PostgreSQL executed sequential scans or single-column index scans with heap filter passes. I then introduced a composite B-Tree index:

```sql
CREATE INDEX idx_transactions_user_date ON transactions (user_id, date);
```

Because `user_id` is an equality filter and `date` is a range filter, placing `user_id` as the leading column allows PostgreSQL to jump directly to the user's partition of the B-Tree before scanning the sequential leaf nodes for the date interval.

## Narrow 3-Month Range: A Modest Gain

Running `EXPLAIN ANALYZE` on the 3-month query before and after indexing revealed an interesting nuance:

- **Execution Plan Before Index**: 3.485 ms
- **Execution Plan With Composite Index**: 2.782 ms
- **Net Improvement**: 0.703 ms

While a reduction from 3.485 ms to 2.782 ms is measurable, it is a relatively modest gain of approximately 20%. 

Why was the gain so small? Because at 10,000 rows, a 3-month range for a single user accounts for only a few dozen data pages. In PostgreSQL, when an active working dataset fits comfortably within the operating system's buffer cache, sequential scanning through a small page block is already fast. The overhead of traversing B-Tree nodes and performing random page lookups on the heap offsets some of the theoretical index advantage for narrow row sets.

## Wide 24-Month Range: Where the Index Proved Its Worth

The real transformation appeared when evaluating wider date windows under concurrent read load. Querying 24 months of history requires scanning thousands of candidate rows per user.

Under sustained concurrent query load:
- **p95 Latency Before Index**: 119 ms
- **p95 Latency With Composite Index**: 84 ms
- **Query Timeouts Under Load**: Dropped from **40 timeouts** down to **0 timeouts**

Without the composite index, scanning 24 months forced PostgreSQL to pull large page volumes into memory, causing buffer contention under load. As concurrent requests piled up, worker connection pools saturated, resulting in 40 request timeouts.

With the composite index on `(userId, date)`, the query engine eliminated table scans entirely, executing an index range scan directly on the sorted date bounds. Latency dropped to 84 ms, and timeouts were completely eliminated.

## Month-End Report Query

For the complex month-end reporting queries that compute aggregated summaries:

- **p95 Latency Before Index**: 138 ms
- **p95 Latency With Composite Index**: 79 ms
- **Net Improvement**: 59 ms reduction (a 42.7% latency drop)

The composite index allowed the query engine to filter the relevant billing cycle transactions in the index itself before grouping and summing amounts in memory.

## The Honest Takeaway

The empirical data from `EXPLAIN ANALYZE` yielded an honest conclusion:

> **At 10,000 rows, a composite index helps wide date ranges and aggregations far more than narrow queries.**

For short 3-month queries on small datasets, page caching already provides single-digit millisecond responses, and the composite index produces only minor optimization. But as range spans widen to 24 months and concurrent queries scale, the composite index eliminates page bloat, slashes p95 latency from 119 ms to 84 ms, cuts reporting times from 138 ms to 79 ms, and prevents query timeouts under load.
