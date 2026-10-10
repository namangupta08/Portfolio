export interface TechItem {
  name: string;
  iconName: string; // Used to look up icon component
}

export interface TechGroup {
  category: string;
  items: TechItem[];
}

export const techStackData: TechGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "C++", iconName: "SiCplusplus" },
      { name: "Python", iconName: "SiPython" },
      { name: "JavaScript", iconName: "SiJavascript" },
      { name: "TypeScript", iconName: "SiTypescript" },
      { name: "SQL", iconName: "SiPostgresql" },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "React.js", iconName: "SiReact" },
      { name: "Node.js", iconName: "SiNodedotjs" },
      { name: "Express.js", iconName: "SiExpress" },
      { name: "Django REST Framework", iconName: "SiDjango" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", iconName: "SiPostgresql" },
      { name: "MongoDB", iconName: "SiMongodb" },
      { name: "Firebase", iconName: "SiFirebase" },
      { name: "Qdrant", iconName: "Qdrant" },
      { name: "Redis", iconName: "SiRedis" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", iconName: "SiGit" },
      { name: "GitHub", iconName: "SiGithub" },
      { name: "Postman", iconName: "SiPostman" },
      { name: "Docker", iconName: "SiDocker" },
    ],
  },
  {
    category: "AI",
    items: [
      { name: "Claude", iconName: "SiAnthropic" },
      { name: "Gemini", iconName: "SiGooglegemini" },
      { name: "OpenAI", iconName: "SiOpenai" },
      { name: "LangChain", iconName: "SiLangchain" },
      { name: "LangGraph", iconName: "LangGraph" },
      { name: "RAG", iconName: "RAG" },
    ],
  },
];
