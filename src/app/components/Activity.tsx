"use client";

import React, { useEffect, useRef, useState } from "react";
import { GitHubContributionsResult } from "@/lib/github";

interface ActivityProps {
  data: GitHubContributionsResult;
}

export default function Activity({ data }: ActivityProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  // Auto-scroll to latest weeks on mobile on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, []);

  const getLevelClass = (level: number) => {
    switch (level) {
      case 0:
        return "bg-surface-subtle border border-border/70 dark:border-white/[0.06]";
      case 1:
        return "bg-zinc-300 dark:bg-zinc-700/80";
      case 2:
        return "bg-zinc-400 dark:bg-zinc-600";
      case 3:
        return "bg-accent/60";
      case 4:
        return "bg-accent";
      default:
        return "bg-surface-subtle border border-border/70 dark:border-white/[0.06]";
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Compute month labels at first occurrence of new month
  const monthLabels: { index: number; label: string }[] = [];
  let lastMonth = "";
  data.weeks.forEach((week, wIdx) => {
    if (week.days.length > 0) {
      const d = new Date(week.days[0].date);
      const m = d.toLocaleDateString("en-US", { month: "short" });
      if (m !== lastMonth && wIdx < data.weeks.length - 2) {
        monthLabels.push({ index: wIdx, label: m });
        lastMonth = m;
      }
    }
  });

  return (
    <section id="activity" className="py-[72px] lg:py-[112px] border-t border-border">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-[2.25rem] font-semibold tracking-[-0.02em] text-foreground leading-tight">
              Activity
            </h2>
            <p className="text-xs font-mono text-muted uppercase tracking-[0.08em] mt-1">
              {data.totalContributions.toLocaleString()} contributions in the last year
            </p>
          </div>

          {data.isStaticSnapshot && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-surface text-[11px] font-mono text-muted-dark w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-dark" aria-hidden="true" />
              <span>Static snapshot</span>
            </div>
          )}
        </div>

        {/* Contribution Grid Card */}
        <div className="p-6 rounded-[14px] border border-border bg-surface">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            tabIndex={0}
            role="region"
            aria-label="GitHub contribution calendar"
            className="w-full overflow-x-auto pb-3 pt-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <div className="inline-flex flex-col min-w-max">
              {/* Month Labels */}
              <div className="flex text-[10px] font-mono text-muted-dark mb-2 ml-8 h-4 relative" aria-hidden="true">
                {monthLabels.map((m, idx) => (
                  <span
                    key={idx}
                    style={{ left: `${m.index * 14}px` }}
                    className="absolute"
                  >
                    {m.label}
                  </span>
                ))}
              </div>

              {/* Day labels + Grid */}
              <div className="flex items-start gap-2">
                {/* Day Labels (Mon, Wed, Fri) */}
                <div className="flex flex-col gap-[3px] text-[9px] font-mono text-muted-dark pt-[2px] w-6 select-none" aria-hidden="true">
                  <span className="h-[11px] leading-[11px]"></span>
                  <span className="h-[11px] leading-[11px]">Mon</span>
                  <span className="h-[11px] leading-[11px]"></span>
                  <span className="h-[11px] leading-[11px]">Wed</span>
                  <span className="h-[11px] leading-[11px]"></span>
                  <span className="h-[11px] leading-[11px]">Fri</span>
                  <span className="h-[11px] leading-[11px]"></span>
                </div>

                {/* Weeks Grid */}
                <div role="presentation" className="inline-flex gap-[3px]">
                  {data.weeks.map((week, wIdx) => (
                    <div
                      key={wIdx}
                      className="flex flex-col gap-[3px]"
                      style={{
                        animation: "fadeUp 400ms ease-out both",
                        animationDelay: `${Math.min(wIdx * 12, 600)}ms`,
                      }}
                    >
                      {week.days.map((day, dIdx) => (
                        <div
                          key={`${wIdx}-${dIdx}`}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setTooltip({
                              text: `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 8,
                            });
                          }}
                          onMouseLeave={() => setTooltip(null)}
                          className={`w-[11px] h-[11px] rounded-[2.5px] transition-colors cursor-pointer hover:ring-1 hover:ring-accent ${getLevelClass(
                            day.level
                          )}`}
                          title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Tooltip */}
          {tooltip && (
            <div
              style={{
                position: "fixed",
                left: `${tooltip.x}px`,
                top: `${tooltip.y}px`,
                transform: "translate(-50%, -100%)",
              }}
              className="pointer-events-none z-50 px-2.5 py-1 text-[11px] font-mono rounded-md bg-foreground text-background shadow-lg whitespace-nowrap"
            >
              {tooltip.text}
            </div>
          )}

          {/* Legend row */}
          <div className="flex flex-wrap items-center justify-between pt-4 mt-2 border-t border-border text-xs text-muted">
            <div className="font-mono text-[11px] text-muted">
              namangupta08 on GitHub
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-muted-dark">
              <span>Less</span>
              <div className="flex items-center gap-[3px]" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-surface-subtle border border-border/70 dark:border-white/[0.06]" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-300 dark:bg-zinc-700/80" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-400 dark:bg-zinc-600" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-accent/60" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-accent" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
