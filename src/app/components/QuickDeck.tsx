"use client";

import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  BookOpen,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import {
  SiLinkedin,
  SiLeetcode,
  SiGithub,
} from "react-icons/si";
import { socialLinks } from "@/data/links";

interface DeckItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  isExternal: boolean;
  icon: React.ReactNode;
}

const deckItems: DeckItem[] = [
  {
    id: "projects",
    title: "Projects",
    subtitle: "7 production apps",
    href: "/projects",
    isExternal: false,
    icon: <FolderGit2 className="w-5 h-5 text-accent" />,
  },
  {
    id: "blogs",
    title: "Blogs",
    subtitle: "6 technical posts",
    href: "/blog",
    isExternal: false,
    icon: <BookOpen className="w-5 h-5 text-accent" />,
  },
  {
    id: "resume",
    title: "Resume",
    subtitle: "100% full view",
    href: "/resume",
    isExternal: false,
    icon: <FileText className="w-5 h-5 text-accent" />,
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    subtitle: "Connect profile",
    href: socialLinks.linkedin,
    isExternal: true,
    icon: <SiLinkedin color="#0A66C2" style={{ color: "#0A66C2" }} className="w-5 h-5" />,
  },
  {
    id: "leetcode",
    title: "LeetCode",
    subtitle: "Profile & problems",
    href: socialLinks.leetcode,
    isExternal: true,
    icon: <SiLeetcode color="#FFA116" style={{ color: "#FFA116" }} className="w-5 h-5" />,
  },
  {
    id: "github",
    title: "GitHub",
    subtitle: "Open source",
    href: socialLinks.github,
    isExternal: true,
    icon: <SiGithub color="#E2E8F0" style={{ color: "#E2E8F0" }} className="w-5 h-5" />,
  },
];

export default function QuickDeck() {
  return (
    <div className="space-y-3">
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark block">
        Quick Access
      </span>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {deckItems.map((item) => {
          const content = (
            <div className="p-4 rounded-[14px] border border-border bg-surface card-hover group flex flex-col justify-between h-full space-y-3 transition-all hover:border-foreground/30 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-surface-subtle border border-border/50 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-dark group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="font-mono text-[11px] text-muted-dark mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );

          if (item.isExternal) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[14px]"
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[14px]"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
