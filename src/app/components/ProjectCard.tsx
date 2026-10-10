"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";
import { Project } from "@/data/projects";

export function BrowserFrame({
  project,
  hasScreenshot = false,
  className = "h-72 sm:h-96 md:h-[440px]",
}: {
  project: Project;
  hasScreenshot?: boolean;
  className?: string;
}) {
  return (
    <div className="w-full rounded-[14px] border border-border bg-surface-subtle overflow-hidden flex flex-col shadow-sm group-hover:shadow-md transition-shadow">
      {/* Clean macOS Browser Top Bar: Only traffic light dots, no links, no arrows */}
      <div className="px-3.5 py-2.5 bg-surface border-b border-border flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
        </div>
        <div className="text-[11px] font-mono text-muted-dark truncate max-w-[200px]">
          {project.name.toLowerCase()}.app
        </div>
        <div className="w-8" aria-hidden="true" />
      </div>

      {/* Frame Content: Big Image with Hover-only Live Action Button */}
      <div className={`relative w-full ${className} overflow-hidden bg-surface-subtle`}>
        {hasScreenshot && project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 90vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-surface-subtle">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark font-medium">
              {project.category}
            </span>
            <span className="font-semibold text-xl text-foreground tracking-tight">
              {project.name}
            </span>
          </div>
        )}

        {/* Hover-Only Action Overlay: Appears only on hover over the image */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white dark:text-[#0A0A0B] text-xs font-mono font-semibold tracking-wide shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Open live project</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}

// 1-Tile-Per-Row Showcase: Big Image, Reduced Text Size, Clickable on Hover
export function ShowcaseProjectCard({
  project,
  hasScreenshot = true,
}: {
  project: Project;
  hasScreenshot?: boolean;
}) {
  const destinationUrl = project.liveUrl || project.githubUrl || "#";

  return (
    <a
      href={destinationUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.name} live application`}
      className="group block rounded-[18px] border border-border bg-surface hover:border-foreground/25 transition-all p-5 sm:p-6 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent space-y-4"
    >
      {/* Big Image on Top */}
      <BrowserFrame
        project={project}
        hasScreenshot={hasScreenshot && Boolean(project.screenshot)}
        className="h-72 sm:h-96 md:h-[420px] lg:h-[460px]"
      />

      {/* Reduced Size Text Details Below */}
      <div className="space-y-2 pt-1 px-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-dark">
            {project.category}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2 sm:line-clamp-none">
          {project.summary}
        </p>

        {/* Tech Stack Chips (Small, compact) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {project.stack.map((item) => (
            <span
              key={item}
              className="px-2 py-0.5 rounded-[4px] border border-border bg-surface-subtle font-mono text-[11px] text-muted-dark"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export const CompactProjectCard = ShowcaseProjectCard;
