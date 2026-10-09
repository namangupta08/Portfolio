"use client";

import React, { useEffect, useRef, useState } from "react";
import { GitHubContributionsResult } from "@/lib/github";

interface GitHubGridProps {
  data: GitHubContributionsResult;
}

export default function GitHubGrid({ data }: GitHubGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  // Auto-scroll to latest weeks on mobile/mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, []);

  const getLevelClass = (level: number) => {
    switch (level) {
      case 0:
        return "bg-border/60";
      case 1:
        return "bg-zinc-300 dark:bg-zinc-700";
      case 2:
        return "bg-zinc-400 dark:bg-zinc-600";
      case 3:
        return "bg-accent/60";
      case 4:
        return "bg-accent";
      default:
        return "bg-border/60";
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

  return (
    <div className="space-y-3">
      {/* Scrollable grid container */}
      <div
        ref={scrollContainerRef}
        role="region"
        aria-label="GitHub contribution calendar"
        className="w-full overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
      >
        <div
          role="grid"
          aria-label="Contributions calendar"
          className="inline-flex gap-[3px] min-w-max p-1"
        >
          {data.weeks.map((week, wIdx) => (
            <div key={wIdx} role="row" className="flex flex-col gap-[3px]">
              {week.days.map((day, dIdx) => (
                <div
                  key={`${wIdx}-${dIdx}`}
                  role="gridcell"
                  tabIndex={0}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({
                      text: `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`,
                      x: rect.left + rect.width / 2,
                      y: rect.top - 8,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  onFocus={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({
                      text: `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`,
                      x: rect.left + rect.width / 2,
                      y: rect.top - 8,
                    });
                  }}
                  onBlur={() => setTooltip(null)}
                  className={`w-[11px] h-[11px] rounded-[2px] transition-colors cursor-pointer hover:ring-1 hover:ring-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${getLevelClass(
                    day.level
                  )}`}
                  aria-label={`${day.count} contributions on ${formatDate(day.date)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Floating tooltip */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translate(-50%, -100%)",
          }}
          className="pointer-events-none z-50 px-2.5 py-1 text-[11px] font-mono rounded bg-foreground text-background shadow-md whitespace-nowrap"
        >
          {tooltip.text}
        </div>
      )}

      {/* Footer caption & legend */}
      <div className="flex flex-wrap items-center justify-between text-xs text-muted">
        <div>
          <span>Contributions in the last year</span>
          {data.isStaticSnapshot && (
            <span className="ml-1.5 text-muted-dark font-mono text-[11px]">
              (static snapshot)
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-muted-dark font-mono text-[11px]">
          <span>Less</span>
          <div className="flex items-center gap-[3px]">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-border/60" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-300 dark:bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-400 dark:bg-zinc-600" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-accent/60" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-accent" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
