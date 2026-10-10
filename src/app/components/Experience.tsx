"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import { experiencesData, ExperienceRole } from "@/data/experience";

function RoleCard({
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
  const [logoError, setLogoError] = useState(!hasLogo);
  const companyInitials = role.company
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="relative pl-7 sm:pl-9 pb-12 last:pb-0 group">
      {/* Timeline dot on left */}
      <div
        className="absolute left-0 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-background bg-surface flex items-center justify-center z-10"
        aria-hidden="true"
      >
        {role.isCurrent ? (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
          </span>
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-muted-dark" />
        )}
      </div>

      {/* Role Card Container */}
      <div className="p-6 rounded-[14px] border border-border bg-surface card-hover">
        {/* Top Header: Logo, Company & Role info, Period */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Logo with monogram fallback */}
            <div className="w-10 h-10 rounded-lg border border-border bg-surface-subtle flex items-center justify-center overflow-hidden flex-shrink-0">
              {!logoError ? (
                <div className="relative w-full h-full">
                  <Image
                    src={role.logo}
                    alt={`${role.company} logo`}
                    fill
                    sizes="40px"
                    className="object-cover"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <span className="font-mono text-xs font-semibold text-foreground">
                  {companyInitials}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base text-foreground">
                  {role.role}
                </h3>
                <span className="text-border" aria-hidden="true">·</span>
                <span className="font-medium text-sm text-foreground/80">
                  {role.company}
                </span>
              </div>
              <span className="font-mono text-xs text-muted-dark">
                {role.period}
              </span>
            </div>
          </div>

          {/* Toggle highlights button */}
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface-subtle text-xs font-mono font-medium text-foreground hover:border-foreground/30 btn-press w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>{role.highlights.length} highlights</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 text-muted ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* One-line Summary */}
        <p className="mt-3 text-sm text-muted leading-relaxed">
          {role.summary}
        </p>

        {/* Tech Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4">
          {role.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-[6px] border border-border bg-surface-subtle font-mono text-[11px] text-muted-dark"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Collapsible Highlights */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-border space-y-4">
                {role.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-3.5 rounded-lg bg-surface-subtle border border-border/60 space-y-1.5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-medium text-xs font-mono uppercase tracking-[0.06em] text-foreground">
                        {hIdx + 1}. {highlight.title}
                      </h4>
                      {highlight.badge && (
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface border border-border text-accent font-medium">
                          {highlight.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Optional Footnote */}
        {role.footnote && (
          <div className="mt-4 pt-3 border-t border-border/60 text-[10px] font-mono text-muted-dark">
            {role.footnote}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Experience({
  existingLogos = {},
}: {
  existingLogos?: Record<string, boolean>;
}) {
  // Collapsed by default except the newest (Epigee expanded by default)
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    epigee: true,
    zevise: false,
  });

  const allExpanded = Object.values(expandedIds).every(Boolean);

  const toggleAll = () => {
    const nextState = !allExpanded;
    const updated: Record<string, boolean> = {};
    experiencesData.forEach((role) => {
      updated[role.id] = nextState;
    });
    setExpandedIds(updated);
  };

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
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark block">
              Experience
            </span>
            <h2 className="text-[2.25rem] font-semibold tracking-[-0.02em] text-foreground leading-tight mt-1">
              Where I&apos;ve shipped software
            </h2>
          </div>

          {/* Expand all / Collapse all Control */}
          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface text-xs font-mono font-medium text-muted hover:text-foreground hover:border-foreground/30 btn-press w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ChevronsUpDown className="w-3.5 h-3.5 text-muted-dark" />
            <span>{allExpanded ? "Collapse all" : "Expand all"}</span>
          </button>
        </div>

        {/* Vertical Timeline Line */}
        <div className="relative border-l border-border ml-1 sm:ml-2">
          {experiencesData.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              hasLogo={Boolean(existingLogos[role.id])}
              isExpanded={Boolean(expandedIds[role.id])}
              onToggle={() => toggleRole(role.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
