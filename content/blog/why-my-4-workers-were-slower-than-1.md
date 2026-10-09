---
title: "Why my 4 workers were slower than 1"
date: "2025-08-15"
description: "A DocFlow load-test story: discovering queue contention and database bottlenecks when scaling background workers."
tags: ["Node.js", "BullMQ", "Redis", "Performance"]
draft: true
---

# Why my 4 workers were slower than 1

## Overview
A post-mortem and analysis from stress-testing DocFlow under high concurrency.

## Outline & Topics to Cover
- **The Initial Setup**:
  - Running a single BullMQ worker processing async PDF jobs.
  - Baseline throughput, p95 completion times, and resource utilization.
- **The Naive Scaling Attempt**:
  - Spawning 4 concurrent worker processes expecting 4x throughput.
  - The unexpected slowdown: processing times doubled and job queues backed up.
- **Investigating Bottlenecks**:
  - Measuring Redis connection contention and lock acquisition overhead.
  - PostgreSQL transaction serialization locks during concurrent status updates.
  - CPU cache thrashing and memory overhead with duplicate PDF parse buffers.
- **The Fixes**:
  - Tuning BullMQ concurrency vs. process clustering.
  - Batching database status writes instead of per-job commits.
  - Adding connection pool bounds to prevent DB exhaustion.
- **Final Results & Takeaways**:
  - Comparing p95 latency before and after tuning.
  - Zero job loss across 324 fault-injected runs.
