"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";
import { Project } from "@/data/projects";

function getBrowserUrl(project: Project) {
  if (project.liveUrl && !project.liveUrl.includes("github.com")) {
    try {
      const url = new URL(project.liveUrl);
      return url.hostname;
    } catch {
      return project.liveUrl;
    }
  }
  return `${project.slug}.app`;
}

export function BrowserFrame({
  project,
  hasScreenshot = false,
  className = "h-64 sm:h-80 md:h-[340px] lg:h-[380px]",
}: {
  project: Project;
  hasScreenshot?: boolean;
  className?: string;
}) {
  const urlPill = getBrowserUrl(project);

  return (
    <div className="w-full rounded-[14px] border border-border bg-surface-subtle overflow-hidden flex flex-col shadow-md group-hover:shadow-lg transition-shadow">
      {/* Clean macOS-style Browser Top Bar (No github link) */}
      <div className="px-3.5 py-2.5 bg-surface border-b border-border flex items-center justify-between gap-3 select-none">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
        </div>

        <div className="px-3 py-0.5 rounded-full bg-surface-subtle border border-border/80 text-[11px] font-mono text-muted truncate max-w-[240px] sm:max-w-[320px]">
          {urlPill}
        </div>

        <div className="flex items-center text-muted-dark group-hover:text-accent transition-colors" aria-hidden="true">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Frame Content: Screenshot */}
      <div className={`relative w-full ${className} overflow-hidden bg-surface-subtle`}>
        {hasScreenshot && project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2.5 bg-surface-subtle">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark font-medium">
              {project.category}
            </span>
            <span className="font-semibold text-2xl text-foreground tracking-tight">
              {project.name}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-xs pt-1">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded border border-border bg-surface font-mono text-[10px] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 1-Tile-Per-Row Large Showcase Tile (Re-routes directly to live link on click)
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
      className="group block rounded-[20px] border border-border bg-surface hover:border-foreground/30 hover:shadow-xl transition-all p-6 sm:p-8 lg:p-10 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Visual Preview Frame (7 cols on desktop) */}
        <div className="lg:col-span-7">
          <BrowserFrame
            project={project}
            hasScreenshot={hasScreenshot && Boolean(project.screenshot)}
            className="h-64 sm:h-80 md:h-[340px] lg:h-[380px]"
          />
        </div>

        {/* Editorial Content (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-accent font-semibold">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-medium border border-accent/40 bg-accent/10 text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Live
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors flex items-center justify-between">
            <span>{project.name}</span>
            <ArrowUpRight className="w-5 h-5 text-muted-dark group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </h3>

          <p className="text-sm sm:text-base text-muted leading-relaxed">
            {project.summary}
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 rounded-[6px] border border-border bg-surface-subtle font-mono text-xs text-muted-dark group-hover:border-border-strong transition-colors"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Direct Live Link Action Button */}
          <div className="pt-4">
            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white dark:text-[#0A0A0B] text-xs font-mono font-semibold tracking-wide shadow-sm group-hover:shadow-md group-hover:brightness-110 transition-all">
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Open live project</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

// Compact alias kept for backward compatibility if imported elsewhere
export const CompactProjectCard = ShowcaseProjectCard;
