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
      return <SiCplusplus color="#00599C" style={{ color: "#00599C" }} className="w-4 h-4" />;
    case "SiPython":
      return <SiPython color="#3776AB" style={{ color: "#3776AB" }} className="w-4 h-4" />;
    case "SiJavascript":
      return <SiJavascript color="#F7DF1E" style={{ color: "#F7DF1E" }} className="w-4 h-4" />;
    case "SiTypescript":
      return <SiTypescript color="#3178C6" style={{ color: "#3178C6" }} className="w-4 h-4" />;
    case "SiPostgresql":
      return <SiPostgresql color="#4169E1" style={{ color: "#4169E1" }} className="w-4 h-4" />;
    case "SiReact":
      return <SiReact color="#61DAFB" style={{ color: "#61DAFB" }} className="w-4 h-4" />;
    case "SiNodedotjs":
      return <SiNodedotjs color="#5FA04E" style={{ color: "#5FA04E" }} className="w-4 h-4" />;
    case "SiExpress":
      return <SiExpress color="#CBD5E1" style={{ color: "#CBD5E1" }} className="w-4 h-4" />;
    case "SiDjango":
      return <SiDjango color="#2BA977" style={{ color: "#2BA977" }} className="w-4 h-4" />;
    case "SiMongodb":
      return <SiMongodb color="#47A248" style={{ color: "#47A248" }} className="w-4 h-4" />;
    case "SiFirebase":
      return <SiFirebase color="#FFCA28" style={{ color: "#FFCA28" }} className="w-4 h-4" />;
    case "SiRedis":
      return <SiRedis color="#DC382D" style={{ color: "#DC382D" }} className="w-4 h-4" />;
    case "SiGit":
      return <SiGit color="#F05032" style={{ color: "#F05032" }} className="w-4 h-4" />;
    case "SiGithub":
      return <SiGithub color="#E2E8F0" style={{ color: "#E2E8F0" }} className="w-4 h-4" />;
    case "SiPostman":
      return <SiPostman color="#FF6C37" style={{ color: "#FF6C37" }} className="w-4 h-4" />;
    case "SiDocker":
      return <SiDocker color="#2496ED" style={{ color: "#2496ED" }} className="w-4 h-4" />;
    case "SiAnthropic":
      return <SiAnthropic color="#D97706" style={{ color: "#D97706" }} className="w-4 h-4" />;
    case "SiGooglegemini":
      return <SiGooglegemini color="#4285F4" style={{ color: "#4285F4" }} className="w-4 h-4" />;
    case "SiOpenai":
      return <SiOpenai color="#10A37F" style={{ color: "#10A37F" }} className="w-4 h-4" />;
    case "SiLangchain":
      return <SiLangchain color="#10B981" style={{ color: "#10B981" }} className="w-4 h-4" />;
    case "LangGraph":
      return <Network color="#F97316" style={{ color: "#F97316" }} className="w-4 h-4" />;
    case "Qdrant":
      return <Database color="#DC2626" style={{ color: "#DC2626" }} className="w-4 h-4" />;
    case "RAG":
      return <SearchCode color="#A855F7" style={{ color: "#A855F7" }} className="w-4 h-4" />;
    default:
      return <Database color="#3178C6" style={{ color: "#3178C6" }} className="w-4 h-4" />;
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
                    className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/30 transition-all card-hover cursor-default shadow-xs"
                  >
                    <span className="transition-transform group-hover:scale-110 shrink-0" aria-hidden="true">
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
