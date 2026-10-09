export interface SocialLinks {
  email: string;
  github: string;
  linkedin: string;
  leetcode: string;
}

export interface PersonalInfo {
  name: string;
  location: string;
  headline: string;
  oneLineIntro: string;
  status: string;
  email: string;
  socials: SocialLinks;
  resume: {
    path: string;
    lastUpdated: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ProjectDetail {
  problem: string;
  whatIBuilt: string;
  howItWorks: string;
  results: string;
  whatIWouldImprove: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  stack: string[];
  summary: string;
  live?: string;
  github?: string;
  isPrivateSource?: boolean;
  linkPlaceholder?: string;
  hasScreenshot?: boolean;
  image?: string;
  detail: ProjectDetail;
}

export const personalData: PersonalInfo = {
  name: "Naman Gupta",
  location: "Delhi, India",
  headline: "Full Stack Software Engineer",
  oneLineIntro: "I build backend and frontend systems, and add LLM features where they help.",
  status: "Open to SDE-1 roles, Delhi",
  email: "namangupta053@gmail.com",
  socials: {
    email: "mailto:namangupta053@gmail.com",
    github: "https://github.com/namangupta08",
    linkedin: "https://www.linkedin.com/in/naman-guptaaa/",
    leetcode: "https://leetcode.com/u/namangupta032/",
  },
  resume: {
    path: "/Naman-Gupta-Resume.pdf",
    lastUpdated: "July 2025",
  },
};

export const experiences: ExperienceItem[] = [
  {
    id: "epigee",
    role: "Software Developer",
    company: "Epigee Inc.",
    period: "Jul 2025 to Present",
    bullets: [
      "Built a reconciliation platform (Django, React, PostgreSQL) for finance teams managing many client accounts, with role-based access, LLM-based ingestion of statements and invoices, per-client dashboards, and split/part-payment reconciliation, cutting manual effort by 70%.",
      "Designed a layered matching engine with multi-criteria rules, fallback logic, and approval-based learning rules that give explainable suggestions, auto-reconciling 75% of records and cutting repeat reviews by 40%.",
      "Replaced per-bank parsers with a LangGraph pipeline that extracts fields from 10+ bank layouts into a normalized schema, using transaction-count and debit/credit total checks to reach 90-95% field accuracy.",
      "Developed a Django email-triage service that classifies insurance requests into 7 categories with an LLM, with an admin dashboard, an audit trail, and automated client follow-ups, tracking each request from arrival to resolution.",
      "Implemented a RAG chatbot (Qdrant, LangChain) over company policy and customer data, with chunking, embeddings, ingestion APIs, and source-cited answers, turning minutes of document search into seconds for internal teams.",
    ],
  },
  {
    id: "zevise",
    role: "Full Stack Developer Intern",
    company: "Zevise",
    period: "May 2025 to Jun 2025",
    bullets: [
      "Redesigned React.js lesson discovery and learning screens, improving mobile responsiveness across 10+ screens.",
      "Built JWT auth with protected routes and token handling, and designed the class-subject-chapter-topic DB schema.",
    ],
  },
];

export const experienceFootnote = "Metrics come from internal testing on sample data.";

export const projects: ProjectItem[] = [
  {
    slug: "spendwise",
    title: "SpendWise",
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
    live: "https://spendwise-fintech.vercel.app/",
    isPrivateSource: true,
    hasScreenshot: false,
    summary:
      "Personal finance tracker with budgets, spending alerts at 80% and 100%, and a month-end report computed with SQL aggregation. Paginated date-range queries respond in under 50 ms (p95) on 10,000 seeded transactions.",
    detail: {
      problem:
        "Tracking personal expenses across large transaction histories often leads to slow dashboard aggregation and delayed alerts that only notify users after budget limits have been breached.",
      whatIBuilt:
        "A personal finance tracking system with automated budget limit checks at 80% and 100%, paginated date-range filtering, and a month-end report powered by SQL aggregation.",
      howItWorks:
        "Engineered REST APIs in Node.js and Express with PostgreSQL. Used optimized SQL aggregation queries for monthly summaries and index-backed pagination for date-range queries. Trigger checks evaluate cumulative expenses against budget thresholds on every transaction mutation.",
      results:
        "Paginated date-range queries respond in under 50 ms (p95) on 10,000 seeded transactions. Alerts trigger reliably at 80% and 100% spending marks.",
      whatIWouldImprove:
        "TODO: Add offline-first optimistic mutations, multi-currency support, and automated recurring bill categorization.",
    },
  },
  {
    slug: "vistavoyage",
    title: "VistaVoyage",
    stack: ["React.js", "Tailwind CSS", "Firebase", "Gemini API"],
    live: "https://vistavoyage-ai-trip-planner.vercel.app/",
    github: "https://github.com/namangupta08/Ai-Trip-Planner",
    hasScreenshot: true,
    summary:
      "AI trip planner with a 6-step wizard, Zod-validated output, Gemini model failover, and single-day and per-section regeneration.",
    detail: {
      problem:
        "AI-generated travel itineraries frequently suffer from malformed structured data, model rate limit failures mid-trip generation, and an all-or-nothing regeneration UX where users cannot tweak individual days without losing the entire trip.",
      whatIBuilt:
        "An AI trip planner with a 6-step preference wizard, schema-enforced trip generations, automatic model failover logic, and modular in-place regeneration for single days and sections.",
      howItWorks:
        "Collects traveler destination, pacing, and budget preferences across 6 wizard steps. Enforces schema conformity using Zod validation. Employs automated Gemini model failover when primary models encounter quota limits. Granular React state handlers allow updating a specific day or section in place without re-requesting the rest of the plan.",
      results:
        "Delivers structured day-by-day itineraries with zero schema validation errors, automated fallback during model quota outages, and instant single-section updates.",
      whatIWouldImprove:
        "TODO: Connect real-time flight and hotel booking APIs, support collaborative group itinerary editing, and enable export to calendar formats.",
    },
  },
  {
    slug: "docflow",
    title: "DocFlow",
    stack: ["Node.js", "TypeScript", "BullMQ", "Redis", "PostgreSQL", "Docker"],
    linkPlaceholder: "TODO: Repository / deployment link to be provided",
    hasScreenshot: false,
    summary:
      "Async PDF processing pipeline with retries, a dead-letter queue and idempotency keys. A worker killed mid-run lost 0 of 324 jobs in a load test.",
    detail: {
      problem:
        "Heavy PDF document processing and text indexing can easily crash synchronous HTTP handlers, while unreliable distributed workers risk duplicate task execution or dropped documents during abrupt shutdowns.",
      whatIBuilt:
        "An asynchronous, fault-tolerant PDF processing pipeline designed with worker resilience, message retries, idempotency controls, and dead-letter queue routing.",
      howItWorks:
        "Upload endpoints acknowledge document submissions with job IDs and delegate PDF processing to background BullMQ workers backed by Redis. Each job carries an idempotency key to prevent double execution. Failed jobs trigger exponential backoff before landing in a dead-letter queue for inspection.",
      results:
        "In a load test scenario where a worker was terminated mid-run, 0 of 324 jobs were lost, resuming processing cleanly upon container restart.",
      whatIWouldImprove:
        "TODO: Implement distributed OCR support for scanned images, per-tenant throughput limits, and a real-time WebSocket progress dashboard.",
    },
  },
];
