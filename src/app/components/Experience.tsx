"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ChevronDown,
  Layers,
  GitMerge,
  FileText,
  Mail,
  MessageSquare,
  Smartphone,
  KeyRound,
  Database,
} from "lucide-react";
import { experiencesData, ExperienceRole, ExperienceHighlight } from "@/data/experience";

function getHighlightIcon(iconName: string) {
  switch (iconName) {
    case "Layers":
      return <Layers className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />;
    case "GitMerge":
      return <GitMerge className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />;
    case "FileText":
      return <FileText className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />;
    case "Mail":
      return <Mail className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />;
    case "MessageSquare":
      return <MessageSquare className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />;
    case "Smartphone":
      return <Smartphone className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />;
    case "KeyRound":
      return <KeyRound className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />;
    case "Database":
      return <Database className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />;
    default:
      return <Layers className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />;
  }
}

function RoleItem({
  role,
  isExpanded,
  onToggle,
  hasLogo = false,
}: {
  role: ExperienceRole;
  isExpanded: boolean;
  onToggle: () => void;
  hasLogo?: boolean;
}) {
  return (
    <div className="relative group">
      {/* Timeline dot on faint vertical rail */}
      <div
        className="absolute -left-[30px] sm:-left-[38px] top-6 -translate-x-1/2 flex items-center justify-center z-10"
        aria-hidden="true"
      >
        {role.isCurrent ? (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
          </span>
        ) : (
          <span className="w-2 h-2 rounded-full bg-muted-dark/50" />
        )}
      </div>

      {/* Whole header row is the toggle button (no border, no box) */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`role-content-${role.id}`}
        className="w-full text-left py-3 flex items-start gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
      >
        {/* Company Icon (no outline, soft tinted rounded square) */}
        <div className="w-10 h-10 rounded-lg bg-surface-subtle flex items-center justify-center flex-shrink-0 overflow-hidden">
          {hasLogo ? (
            <div className="relative w-full h-full">
              <Image
                src={role.logo}
                alt={`${role.company} logo`}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          ) : (
            <Building2 className="w-5 h-5 text-muted-dark" aria-hidden="true" />
          )}
        </div>

        {/* Role & Company, Date, Summary, Tech chips */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <div className="font-semibold text-base text-foreground group-hover:text-accent transition-colors">
              {role.role}
              <span className="text-muted font-normal"> · {role.company}</span>
            </div>
            <span className="font-mono text-xs text-muted-dark whitespace-nowrap">
              {role.period}
            </span>
          </div>

          {/* One-line summary */}
          <p className="mt-1 text-sm text-muted leading-relaxed">
            {role.summary}
          </p>

          {/* Tech as small plain chips without borders */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            {role.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] text-muted-dark bg-surface-subtle px-2 py-0.5 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Chevron on far right */}
        <ChevronDown
          className={`w-4 h-4 text-muted transition-transform duration-250 mt-1 flex-shrink-0 ${
            isExpanded ? "rotate-180 text-foreground" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Expanded Highlights list with smooth height animation & 40ms stagger */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`role-content-${role.id}`}
            role="region"
            aria-label={`${role.company} highlights`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pl-14 pt-3 pb-4 space-y-4">
              {role.highlights.map((highlight: ExperienceHighlight, idx: number) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: idx * 0.04,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5" aria-hidden="true">
                    {getHighlightIcon(highlight.icon)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-sm font-bold text-foreground">
                        {highlight.title}
                      </span>
                      {highlight.badge && (
                        <span className="font-mono text-xs text-accent font-medium">
                          {highlight.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Experience({
  existingLogos = {},
}: {
  existingLogos?: Record<string, boolean>;
}) {
  // Newest role open by default, others closed
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    epigee: true,
    zevise: false,
  });

  const toggleRole = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="experience" className="py-[72px] lg:py-[112px] border-t border-border">
      <div className="space-y-8">
        {/* Section Header */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark block">
            Career
          </span>
          <h2 className="text-[2.25rem] font-semibold tracking-[-0.02em] text-foreground leading-tight mt-1">
            Experience
          </h2>
        </div>

        {/* Single faint vertical rail on the left (no card borders, no boxes) */}
        <div className="relative pl-6 sm:pl-8 border-l border-border ml-3 space-y-8">
          {experiencesData.map((role) => (
            <RoleItem
              key={role.id}
              role={role}
              hasLogo={Boolean(existingLogos[role.id])}
              isExpanded={Boolean(expandedIds[role.id])}
              onToggle={() => toggleRole(role.id)}
            />
          ))}
        </div>

        {/* Epigee Footnote in small muted text */}
        <p className="text-xs font-mono text-muted-dark pt-2">
          Metrics are from internal testing on sample data.
        </p>
      </div>
    </section>
  );
}
