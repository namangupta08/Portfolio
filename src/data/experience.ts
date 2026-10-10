export interface ExperienceHighlight {
  title: string;
  description: string;
  icon: string;
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
    summary: "Building finance and insurance workflow tools.",
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
        icon: "Layers",
        description:
          "Finance teams were matching invoices, bank statements and payment advice by hand across many client accounts. I built the platform with admin and analyst roles, LLM-based document ingestion, per-client dashboards and split/part-payment handling.",
        badge: "~70% less manual effort",
      },
      {
        title: "Matching engine",
        icon: "GitMerge",
        description:
          "Matching runs in layers: invoice number, then transaction reference, then client name and date, and anything left goes to a person. Approved manual matches become per-client learning rules that return explainable suggestions.",
        badge: "~75% auto-reconciled",
      },
      {
        title: "Bank statement parser",
        icon: "FileText",
        description:
          "Per-bank parsers broke when layouts changed, so I built one LangGraph pipeline that maps statements to a single schema and checks every extraction against the statement's transaction count and debit and credit totals.",
        badge: "10+ layouts",
      },
      {
        title: "Email triage",
        icon: "Mail",
        description:
          "Insurance requests are classified into 7 categories by an LLM, tracked on an admin dashboard with an audit trail, and followed up automatically.",
      },
      {
        title: "Internal RAG chatbot",
        icon: "MessageSquare",
        description:
          "Answers from company policy and customer data using chunking, Qdrant embeddings and source citations.",
      },
      {
        title: "Workflow & analyst UI",
        icon: "Layout",
        description:
          "Built responsive analyst dashboards and interactive reconciliation queues in React with split-payment handling and real-time audit logs.",
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
    summary: "Short-form EdTech platform.",
    tech: ["React.js", "JWT"],
    highlights: [
      {
        title: "UI redesign",
        icon: "Smartphone",
        description:
          "Redesigned lesson discovery and learning screens, improving mobile responsiveness across 10+ screens.",
      },
      {
        title: "Authentication",
        icon: "KeyRound",
        description:
          "Built JWT auth with protected routes and token handling.",
      },
      {
        title: "Content model",
        icon: "Database",
        description:
          "Designed the class, subject, chapter, topic schema for adaptive lesson delivery.",
      },
    ],
  },
];
