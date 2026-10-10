export type ProjectCategory = "All" | "Backend" | "Full-stack" | "AI";

export interface ProjectDetail {
  problem?: string;
  whatIBuilt?: string;
  howItWorks?: string;
  results?: string;
  whatIWouldImprove?: string;
}

export interface Project {
  slug: string;
  name: string;
  category: "Backend" | "Full-stack" | "AI";
  summary: string;
  stack: string[];
  metricBadge?: string;
  isFeatured: boolean;
  bentoSpan?: "full" | "half"; // wide or half-width
  screenshot?: string;
  liveUrl?: string;
  githubUrl?: string;
  isPrivateSource?: boolean;
  linksPlaceholder?: boolean;
  detail?: ProjectDetail;
}

export const featuredProjects: Project[] = [
  {
    slug: "docflow",
    name: "DocFlow",
    category: "Backend",
    summary:
      "Async PDF pipeline with retries, a dead-letter queue and idempotency keys.",
    stack: [
      "Node.js",
      "TypeScript",
      "BullMQ",
      "Redis",
      "PostgreSQL",
      "Docker",
    ],
    isFeatured: true,
    bentoSpan: "full",
    screenshot: "/projects/docflow.png",
    linksPlaceholder: true, // GitHub: [FILL IN]
    detail: {
      problem:
        "Processing CPU-bound PDF workloads synchronously or naively caused job loss during unexpected worker crashes and queue congestion.",
      whatIBuilt:
        "An asynchronous PDF processing pipeline with retries, a dead-letter queue, and idempotency keys to ensure zero data loss.",
      howItWorks:
        "BullMQ orchestrates queues in Redis while workers execute PDF parsing jobs asynchronously. A database unique constraint on (user_id, idempotency_key) guarantees that concurrent or repeated requests never duplicate jobs, letting PostgreSQL pick one winner cleanly.",
      results:
        "0 of 324 jobs lost when a background worker was killed mid-run during fault-injection stress testing. In k6 benchmarks with 100 virtual users on 2 vCPUs, 1 worker delivered 25.11 jobs/s with a p95 upload latency of 21 ms.",
      whatIWouldImprove:
        "Isolate worker processes on dedicated compute instances, as sharing CPU cores across multi-threaded workers under Docker caused CPU contention during CPU-bound PDF parsing.",
    },
  },
  {
    slug: "spendwise",
    name: "SpendWise",
    category: "Full-stack",
    summary:
      "Personal finance tracker with budget alerts and a month-end report in SQL.",
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
    metricBadge: "p95 31 ms on 10,000 transactions",
    isFeatured: true,
    bentoSpan: "half",
    screenshot: "/projects/spendwise.png",
    liveUrl: "https://spendwise-fintech.vercel.app/",
    isPrivateSource: true,
    detail: {
      problem:
        "Aggregating large volumes of transaction records for reporting causes query slowdowns, while personal finance users require immediate threshold notifications.",
      whatIBuilt:
        "A personal finance tracking application featuring automated budget alerts and high-performance SQL month-end reporting.",
      howItWorks:
        "Budget alerts evaluate at 80% and 100% thresholds, recomputing deterministically whenever an expense is created, edited, or deleted, and resetting state if usage drops below. A composite index on (userId, date) speeds up wide date-range queries and month-end aggregations.",
      results:
        "p95 latency of 31 ms on 3-month queries over 10,000 seeded transactions. Under heavy load, 24-month range queries dropped from 119 ms to 84 ms p95 with 0 timeouts (down from 40), and month-end report p95 dropped from 138 ms to 79 ms.",
      whatIWouldImprove:
        "Add automated partition pruning for historical transaction archives beyond 24 months to further minimize index tree traversal.",
    },
  },
  {
    slug: "vistavoyage",
    name: "VistaVoyage",
    category: "AI",
    summary:
      "AI trip planner with a 6-step wizard, validated output, model failover and per-day regeneration.",
    stack: ["React.js", "Tailwind CSS", "Firebase", "Gemini API"],
    isFeatured: true,
    bentoSpan: "half",
    screenshot: "/projects/vistavoyage.png",
    liveUrl: "https://vistavoyage-ai-trip-planner.vercel.app/",
    githubUrl: "https://github.com/namangupta08/Ai-Trip-Planner",
    detail: {
      problem:
        "AI itinerary generators frequently suffer from malformed LLM responses and unexpected API rate limits (HTTP 429/503 errors).",
      whatIBuilt:
        "An AI travel planner featuring an interactive 6-step wizard, tiered model failover, and granular per-day schedule regeneration.",
      howItWorks:
        "The system uses a tiered pool of Gemini models that switches automatically upon HTTP 429 or 503 errors. Output is validated against a strict Zod schema, with a single retry carrying the exact validation error back to the model for correction.",
      results:
        "In a 30-run benchmark test, the first 16 runs passed schema validation cleanly on the very first attempt before the free-tier quota of 20 requests per day triggered HTTP 429.",
      whatIWouldImprove:
        "Integrate response caching for recurring destination templates and graceful local draft persistence when external provider quotas are exceeded.",
    },
  },
];

export const moreProjects: Project[] = [
  {
    slug: "zevise",
    name: "Zevise",
    category: "Full-stack",
    summary:
      "Short-form EdTech platform: bite-sized lessons, topic-wise content and progress tracking.",
    stack: ["React.js", "JWT", "PostgreSQL"],
    isFeatured: false,
    linksPlaceholder: true, // Link: [FILL IN]
  },
  {
    slug: "swiftcabs",
    name: "SwiftCabs",
    category: "Full-stack",
    summary: "",
    stack: [],
    isFeatured: false,
    linksPlaceholder: true, // [FILL IN summary, stack, links]
  },
  {
    slug: "studynothing",
    name: "StudyNothing",
    category: "Full-stack",
    summary: "",
    stack: [],
    isFeatured: false,
    linksPlaceholder: true, // [FILL IN summary, stack, links]
  },
  {
    slug: "chatapp",
    name: "ChatApp",
    category: "Backend",
    summary: "",
    stack: [],
    isFeatured: false,
    linksPlaceholder: true, // [FILL IN summary, stack, links]
  },
];

export const allProjects: Project[] = [...featuredProjects, ...moreProjects];
