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
  isFeatured: boolean;
  bentoSpan?: "full" | "half";
  screenshot?: string;
  liveUrl?: string;
  githubUrl?: string;
  isPrivateSource?: boolean;
  detail?: ProjectDetail;
}

export const featuredProjects: Project[] = [
  {
    slug: "spendwise",
    name: "SpendWise",
    category: "Full-stack",
    summary:
      "Personal finance tracker with budget alerts, categorized spend tracking, and an analytical month-end report computed in SQL.",
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
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
        "Budget alerts evaluate at 80% and 100% thresholds, recomputing deterministically whenever an expense is created, edited, or deleted. A composite index on (userId, date) speeds up wide date-range queries and month-end aggregations.",
      results:
        "Fast transaction aggregations with optimized index scans and deterministic alert states.",
      whatIWouldImprove:
        "Add automated partition pruning for historical transaction archives beyond 24 months to further minimize index tree traversal.",
    },
  },
  {
    slug: "vistavoyage",
    name: "VistaVoyage",
    category: "AI",
    summary:
      "AI travel planner producing structured 9-section editorial dossiers with landmarks, timing logistics, interactive maps, transit directions, and exportable PDF schedules.",
    stack: ["React", "Vite", "Tailwind CSS", "Gemini API", "Firebase"],
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
        "In benchmark tests, requests pass schema validation cleanly with tiered failover resilience.",
      whatIWouldImprove:
        "Integrate response caching for recurring destination templates and graceful local draft persistence.",
    },
  },
  {
    slug: "zevise",
    name: "Zevise",
    category: "Full-stack",
    summary:
      "Short-form EdTech platform featuring bite-sized micro-lessons, interactive topic progression, and adaptive student content delivery.",
    stack: ["React.js", "JWT", "Node.js", "Express.js"],
    isFeatured: true,
    bentoSpan: "half",
    screenshot: "/projects/zevise.png",
    detail: {
      problem:
        "Traditional online course portals suffer from student fatigue and poor mobile completion rates.",
      whatIBuilt:
        "A modular micro-learning platform with lesson discovery, progress tracking, and protected JWT authentication.",
      howItWorks:
        "Structured class/subject/chapter hierarchy delivered through responsive React interfaces with token-based access control.",
      results:
        "Redesigned lesson discovery and learning screens with full mobile responsiveness.",
      whatIWouldImprove:
        "Add offline video caching and spaced-repetition quizzes for bite-sized retention.",
    },
  },
  {
    slug: "docflow",
    name: "DocFlow",
    category: "Backend",
    summary:
      "Asynchronous PDF processing pipeline with BullMQ task queues, redis storage, idempotency keys, and dead-letter retry policies.",
    stack: [
      "Node.js",
      "TypeScript",
      "BullMQ",
      "Redis",
      "PostgreSQL",
      "Docker",
    ],
    isFeatured: true,
    bentoSpan: "half",
    screenshot: "/projects/docflow.png",
    detail: {
      problem:
        "Processing CPU-bound PDF workloads synchronously caused job loss during worker restarts and queue congestion.",
      whatIBuilt:
        "An asynchronous PDF processing pipeline with retries, a dead-letter queue, and idempotency keys to ensure zero data loss.",
      howItWorks:
        "BullMQ orchestrates queues in Redis while workers execute PDF parsing jobs asynchronously. A database unique constraint on (user_id, idempotency_key) guarantees that concurrent or repeated requests never duplicate jobs.",
      results:
        "Zero job loss during worker restarts and resilient dead-letter task isolation.",
      whatIWouldImprove:
        "Isolate worker processes on dedicated compute instances to avoid CPU contention during PDF parsing.",
    },
  },
];

export const moreProjects: Project[] = [
  {
    slug: "swiftcabs",
    name: "Swift Cab",
    category: "Full-stack",
    summary:
      "Full-stack MERN ride-hailing application with Leaflet interactive tracking, OpenStreetMap routing, and Socket.IO real-time ride matching.",
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "Leaflet.js",
      "JWT",
    ],
    screenshot: "/projects/swiftcab.png",
    isFeatured: false,
  },
  {
    slug: "studynotion",
    name: "Study Notion",
    category: "Full-stack",
    summary:
      "Interactive EdTech platform bridging students and instructors with course management, rich media lessons, and Razorpay transactions.",
    stack: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
    ],
    screenshot: "/projects/studynotion.png",
    isFeatured: false,
  },
  {
    slug: "chatx",
    name: "ChatX",
    category: "Full-stack",
    summary:
      "Real-time MERN chat application featuring bi-directional WebSocket messaging via Socket.IO, group channels, multimedia sharing, and JWT auth.",
    stack: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Socket.IO",
      "MongoDB",
      "JWT",
    ],
    screenshot: "/projects/chatx.png",
    isFeatured: false,
  },
];

export const allProjects: Project[] = [...featuredProjects, ...moreProjects];
