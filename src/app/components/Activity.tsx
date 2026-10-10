"use client";

import React, { useEffect, useRef, useState } from "react";
import { ActivityData } from "@/lib/activity";

interface ActivityProps {
  data: ActivityData;
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

  // Compute month labels with guaranteed spacing to prevent Dec/Jan overlaps
  const monthLabels: { index: number; label: string }[] = [];
  let lastMonth = "";
  let lastMonthIndex = -10;

  data.weeks.forEach((week, wIdx) => {
    if (week.days.length > 0) {
      const d = new Date(week.days[0].date);
      const m = d.toLocaleDateString("en-US", { month: "short" });
      // Require at least 4 weeks gap between month labels to prevent collision
      if (
        m !== lastMonth &&
        wIdx - lastMonthIndex >= 4 &&
        wIdx < data.weeks.length - 2
      ) {
        monthLabels.push({ index: wIdx, label: m });
        lastMonth = m;
        lastMonthIndex = wIdx;
      }
    }
  });

  return (
    <section id="activity" className="py-[72px] lg:py-[112px] border-t border-border">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div>
            <h2 className="text-[2.25rem] font-semibold tracking-[-0.02em] text-foreground leading-tight">
              Coding activity
            </h2>
            {data.isReal ? (
              <p className="text-xs font-mono text-muted uppercase tracking-[0.08em] mt-1">
                {data.totalContributions.toLocaleString()} contributions and submissions in the last year
              </p>
            ) : (
              <p className="text-xs font-mono text-muted uppercase tracking-[0.08em] mt-1">
                Illustrative pattern, not real activity
              </p>
            )}
          </div>

          {/* Sources and Update status */}
          <div className="flex flex-wrap items-center gap-2">
            {data.isReal ? (
              <>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-dark">
                  {data.sources.github && (
                    <span className="px-2 py-0.5 rounded-full border border-border bg-surface">
                      GitHub: {data.gitHubTotal}
                    </span>
                  )}
                  {data.sources.leetcode && (
                    <span className="px-2 py-0.5 rounded-full border border-border bg-surface">
                      LeetCode: {data.leetCodeTotal}
                    </span>
                  )}
                </div>
                {data.generatedAt && (
                  <span className="text-[11px] font-mono text-muted-dark">
                    Updated {data.generatedAt}
                  </span>
                )}
              </>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-surface text-[11px] font-mono text-muted-dark w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-dark" aria-hidden="true" />
                <span>Pattern fallback</span>
              </div>
            )}
          </div>
        </div>

        {/* Contribution Grid Card */}
        <div className="p-6 rounded-[14px] border border-border bg-surface">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            tabIndex={0}
            role="region"
            aria-label="Coding activity contribution calendar"
            className="w-full overflow-x-auto pb-3 pt-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <div className="inline-flex flex-col min-w-max">
              {/* Month Labels */}
              <div
                className="flex text-[10px] font-mono text-muted-dark mb-2 ml-8 h-4 relative"
                aria-hidden="true"
              >
                {monthLabels.map((m, idx) => (
                  <span
                    key={idx}
                    style={{ left: `${m.index * 14}px` }}
                    className="absolute whitespace-nowrap"
                  >
                    {m.label}
                  </span>
                ))}
              </div>

              {/* Day labels + Grid */}
              <div className="flex items-start gap-2">
                {/* Day Labels (Mon, Wed, Fri) */}
                <div
                  className="flex flex-col gap-[3px] text-[9px] font-mono text-muted-dark pt-[2px] w-6 select-none"
                  aria-hidden="true"
                >
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
                            if (!data.isReal) return;
                            const rect = e.currentTarget.getBoundingClientRect();
                            setTooltip({
                              text: `${day.count} activity item${
                                day.count === 1 ? "" : "s"
                              } on ${formatDate(day.date)}`,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 8,
                            });
                          }}
                          onMouseLeave={() => setTooltip(null)}
                          className={`w-[11px] h-[11px] rounded-[2.5px] transition-colors cursor-pointer hover:ring-1 hover:ring-accent ${getLevelClass(
                            day.level
                          )}`}
                          title={
                            data.isReal
                              ? `${day.count} item${
                                  day.count === 1 ? "" : "s"
                                } on ${formatDate(day.date)}`
                              : ""
                          }
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Legend */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-dark pt-4 mt-2 border-t border-border/60">
            <span className="text-[11px]">
              {data.isReal ? "GitHub + LeetCode activity" : "Pattern preview"}
            </span>

            {/* 5 Levels Legend */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="text-[10px]">Less</span>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <div
                    key={lvl}
                    className={`w-[11px] h-[11px] rounded-[2.5px] ${getLevelClass(
                      lvl
                    )}`}
                  />
                ))}
              </div>
              <span className="text-[10px]">More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full px-2.5 py-1 rounded bg-zinc-900 text-zinc-100 text-[11px] font-mono shadow-md border border-zinc-700/80 whitespace-nowrap"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </section>
  );
}
