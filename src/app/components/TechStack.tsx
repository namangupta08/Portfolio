"use client";

import React from "react";
import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiMongodb,
  SiFirebase,
  SiRedis,
  SiGit,
  SiGithub,
  SiPostman,
  SiDocker,
  SiAnthropic,
  SiGooglegemini,
  SiOpenai,
  SiLangchain,
} from "react-icons/si";
import { Database, Network, SearchCode } from "lucide-react";
import { techStackData } from "@/data/stack";

function getTechIcon(iconName: string) {
  switch (iconName) {
    case "SiCplusplus":
      return <SiCplusplus className="w-3.5 h-3.5" />;
    case "SiPython":
      return <SiPython className="w-3.5 h-3.5" />;
    case "SiJavascript":
      return <SiJavascript className="w-3.5 h-3.5" />;
    case "SiTypescript":
      return <SiTypescript className="w-3.5 h-3.5" />;
    case "SiPostgresql":
      return <SiPostgresql className="w-3.5 h-3.5" />;
    case "SiReact":
      return <SiReact className="w-3.5 h-3.5" />;
    case "SiNodedotjs":
      return <SiNodedotjs className="w-3.5 h-3.5" />;
    case "SiExpress":
      return <SiExpress className="w-3.5 h-3.5" />;
    case "SiDjango":
      return <SiDjango className="w-3.5 h-3.5" />;
    case "SiMongodb":
      return <SiMongodb className="w-3.5 h-3.5" />;
    case "SiFirebase":
      return <SiFirebase className="w-3.5 h-3.5" />;
    case "SiRedis":
      return <SiRedis className="w-3.5 h-3.5" />;
    case "SiGit":
      return <SiGit className="w-3.5 h-3.5" />;
    case "SiGithub":
      return <SiGithub className="w-3.5 h-3.5" />;
    case "SiPostman":
      return <SiPostman className="w-3.5 h-3.5" />;
    case "SiDocker":
      return <SiDocker className="w-3.5 h-3.5" />;
    case "SiAnthropic":
      return <SiAnthropic className="w-3.5 h-3.5" />;
    case "SiGooglegemini":
      return <SiGooglegemini className="w-3.5 h-3.5" />;
    case "SiOpenai":
      return <SiOpenai className="w-3.5 h-3.5" />;
    case "SiLangchain":
      return <SiLangchain className="w-3.5 h-3.5" />;
    case "LangGraph":
      return <Network className="w-3.5 h-3.5" />;
    case "Qdrant":
      return <Database className="w-3.5 h-3.5" />;
    case "RAG":
      return <SearchCode className="w-3.5 h-3.5" />;
    default:
      return <Database className="w-3.5 h-3.5" />;
  }
}

export default function TechStack() {
  return (
    <section id="stack" className="py-[72px] lg:py-[112px] border-t border-border">
      <div className="space-y-10">
        {/* Section Header */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark block">
            Technologies
          </span>
          <h2 className="text-[2.25rem] font-semibold tracking-[-0.02em] text-foreground leading-tight mt-1">
            Stack
          </h2>
        </div>

        {/* Grouped rows with mono label on left and chips on right */}
        <div className="space-y-6 divide-y divide-border/60">
          {techStackData.map((group) => (
            <div
              key={group.category}
              className="pt-6 first:pt-0 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline"
            >
              {/* Mono label on the left */}
              <div className="sm:col-span-3">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark font-medium">
                  {group.category}
                </span>
              </div>

              {/* Logo chips on the right */}
              <div className="sm:col-span-9 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/30 transition-all card-hover cursor-default"
                  >
                    <span className="text-muted-dark group-hover:text-accent transition-colors" aria-hidden="true">
                      {getTechIcon(item.iconName)}
                    </span>
                    <span className="font-mono text-xs font-medium text-foreground">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
