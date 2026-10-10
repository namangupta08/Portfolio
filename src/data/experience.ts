export interface ExperienceHighlight {
  title: string;
  description: string;
  badge?: string;
}

export interface ExperienceRole {
  id: string;
  company: string;
  role: string;
  period: string;
  isCurrent?: boolean;
  logo: string;
  summary: string;
  tech: string[];
  highlights: ExperienceHighlight[];
  footnote?: string;
}

export const experiencesData: ExperienceRole[] = [
  {
    id: "epigee",
    company: "Epigee Inc.",
    role: "Software Developer",
    period: "Jul 2025 - Present",
    isCurrent: true,
    logo: "/logos/epigee.png",
    summary:
      "Building finance and insurance workflow tools: reconciliation, document parsing, email triage and internal search.",
    tech: [
      "Django",
      "React",
      "PostgreSQL",
      "LangGraph",
      "LangChain",
      "Qdrant",
    ],
    footnote: "Metrics are from internal testing on sample data.",
    highlights: [
      {
        title: "Reconciliation platform",
        description:
          "Finance teams were matching invoices, bank statements and payment advice by hand across many client accounts. I built the platform end to end: admin and analyst roles, LLM-based document ingestion, per-client dashboards and split/part-payment handling.",
        badge: "~70% less manual effort",
      },
      {
        title: "Matching engine",
        description:
          "Matching runs in layers: invoice number, then transaction reference, then client name and date, and anything left goes to a person. Approved manual matches can be saved as per-client learning rules, so similar payments come back as explainable suggestions.",
        badge: "~75% auto-reconciled, ~40% fewer repeat reviews",
      },
      {
        title: "Bank statement parser",
        description:
          "Per-bank parsers broke whenever a layout changed, so I replaced them with one LangGraph pipeline that maps statements to a single schema. LLMs can drop a row or misread an amount, so every extraction is checked against the statement's transaction count and debit and credit totals.",
        badge: "10+ layouts, 90-95% field accuracy",
      },
      {
        title: "Email triage",
        description:
          "Insurance requests arrived by email and were sorted by hand. The service classifies each one into 7 categories, tracks status on an admin dashboard, keeps an audit trail of every action and sends automated client follow-ups.",
      },
      {
        title: "Internal RAG chatbot",
        description:
          "Staff searched policy and customer data by hand. The chatbot answers from that data with chunking, embeddings in Qdrant and source citations.",
      },
    ],
  },
  {
    id: "zevise",
    company: "Zevise",
    role: "Full Stack Developer Intern",
    period: "May 2025 - Jun 2025",
    isCurrent: false,
    logo: "/logos/zevise.png",
    summary:
      "Short-form EdTech platform: lesson discovery, auth and content structure.",
    tech: ["React.js", "JWT", "PostgreSQL"],
    highlights: [
      {
        title: "UI redesign",
        description:
          "Redesigned lesson discovery and learning screens, improving mobile responsiveness across 10+ screens.",
        badge: "10+ screens",
      },
      {
        title: "Authentication",
        description:
          "Built JWT auth with protected routes and token handling.",
      },
      {
        title: "Content model",
        description:
          "Designed the class, subject, chapter, topic schema for adaptive lesson delivery.",
      },
    ],
  },
];
