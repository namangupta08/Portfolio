---
title: "Why my 4 workers were slower than 1"
date: "2025-08-15"
description: "How CPU-bound PDF parsing under Docker resource constraints degraded throughput when scaling worker concurrency."
tags: ["Node.js", "Docker", "Performance", "DocFlow"]
draft: true
---

When scaling background worker pipelines, the intuitive assumption is that increasing the number of concurrent worker processes will increase overall throughput. If one worker processes a given number of jobs per second, adding three more workers should logically speed up job completion. During my load testing on DocFlow, however, benchmarking proved the exact opposite: running four background workers resulted in worse throughput and drastically higher upload latencies than running just a single worker.

Here is the exact technical breakdown of why this occurred, the benchmark numbers recorded, and the architectural lesson learned.

## The Test Setup

To stress-test DocFlow, I set up a synthetic load test with k6 generating traffic from 100 virtual users. The test environment was running locally on my hardware:

- **Host Machine**: Apple M1 MacBook with 8 GB of RAM
- **Docker Environment**: Resource-constrained to a ceiling of 2 vCPUs
- **Total Workload**: Seven Docker containers sharing those 2 vCPUs
- **Job Type**: PDF ingestion, parsing, and structured data extraction
- **Load Tool**: k6 configured with 100 concurrent virtual users

PDF parsing is an inherently CPU-bound workload. Extracting text streams, decoding compressed objects, parsing font tables, and constructing structured document models require sustained computational cycles from the CPU rather than idle waiting on external network sockets.

## The Baseline: 1 Worker

In the first test pass, I configured DocFlow to process the incoming queue with a single dedicated worker process.

Under load from the 100 virtual users, the system recorded the following metrics:

- **Throughput**: 25.11 jobs per second
- **p95 Upload Latency**: 21 ms

Because only one worker process was executing PDF extraction tasks, it was able to consume available CPU slices steadily without competing with sibling worker processes. The host system's 2 allocated vCPUs accommodated the web server container, Redis queue, PostgreSQL database, and the single worker without catastrophic scheduling thrash.

## Scaling Up: 4 Workers (5 Threads Each)

Assuming that adding parallelism would increase processing rate, I updated the Docker deployment to run four worker instances, configured with five threads each (20 total execution threads across the worker pool).

I re-ran the exact same k6 benchmark script with 100 virtual users. The results immediately exposed severe contention:

- **Throughput**: 22.52 jobs per second (a net drop from 25.11 jobs/s)
- **p95 Upload Latency**: 748 ms (up from 21 ms—more than a 35x latency spike)

Instead of accelerating processing, the four workers degraded throughput by approximately 10% while causing user-facing request latency to balloon from 21 ms to 748 ms.

## Analyzing the Bottleneck

Why did quadrupling the worker footprint degrade performance?

The answer came down to CPU limits and container density. A total of seven containers were sharing a hard ceiling of 2 vCPUs:

1. API ingestion server container
2. PostgreSQL database container
3. Redis queue broker container
4. Worker 1 container
5. Worker 2 container
6. Worker 3 container
7. Worker 4 container

When the four workers began executing simultaneously, each attempting to run five threads, they created 20 active compute threads competing for processing slices on just 2 virtual CPUs.

Because PDF parsing is CPU-bound, every single worker thread needed active compute time. The operating system kernel was forced into continuous context switching between worker processes, the API gateway, Redis, and PostgreSQL. 

The API ingestion service, which handles incoming HTTP requests and job creation, was repeatedly preempted by the CPU scheduler so the compute-hungry workers could parse PDFs. As a direct consequence:
- Incoming HTTP requests piled up in TCP socket buffers.
- The p95 upload latency spiked from 21 ms to 748 ms because the API server could not get scheduled in time to accept uploads and respond.
- CPU time was wasted in thread synchronization and context switching overhead instead of actual parsing.

## The Architectural Lesson

The takeaway from this test was clear and practical:

> **More workers only help when backed by dedicated, proportional compute.**

Multiplying worker processes and thread counts inside a resource-constrained environment sharing 2 vCPUs does not create compute out of thin air. For CPU-bound tasks like PDF parsing, running more parallel execution units than physical or allocated cores causes thread thrashing and starves the ingress web tier.

When compute is bounded, keeping concurrency aligned with available vCPUs yields higher aggregate throughput, predictable CPU cache residency, and orders of magnitude lower upload latency.
