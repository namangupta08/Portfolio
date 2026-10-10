"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Globe, Lock, Code2 } from "lucide-react";
import { Project } from "@/data/projects";

function getBrowserUrl(project: Project) {
  if (project.liveUrl) {
    try {
      const url = new URL(project.liveUrl);
      return url.hostname;
    } catch {
      return project.liveUrl;
    }
  }
  if (project.githubUrl) {
    return project.githubUrl.replace("https://", "");
  }
  return `github.com/namangupta08/${project.slug}`;
}

function getStatusBadge(project: Project) {
  if (project.liveUrl) {
    return { label: "Live", isAccent: true };
  }
  if (project.isPrivateSource) {
    return { label: "Private repo", isAccent: false };
  }
  return { label: "Open source", isAccent: false };
}

export function BrowserFrame({
  project,
  hasScreenshot = false,
  className = "h-64 sm:h-72 md:h-80",
}: {
  project: Project;
  hasScreenshot?: boolean;
  className?: string;
}) {
  const urlPill = getBrowserUrl(project);

  return (
    <div className="w-full rounded-[10px] border border-border bg-surface-subtle overflow-hidden flex flex-col shadow-sm">
      {/* Minimal Browser Top Bar */}
      <div className="px-3 py-2 bg-surface border-b border-border flex items-center justify-between gap-3 select-none">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-border-strong/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-strong/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-strong/70" />
        </div>

        <div className="px-3 py-0.5 rounded-full bg-surface-subtle border border-border/80 text-[11px] font-mono text-muted truncate max-w-[220px] sm:max-w-[280px]">
          {urlPill}
        </div>

        <div className="w-6" aria-hidden="true" />
      </div>

      {/* Frame Content: Screenshot or Tasteful Minimal Placeholder */}
      <div className={`relative w-full ${className} overflow-hidden bg-surface-subtle`}>
        {hasScreenshot && project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2.5 transition-transform duration-300 ease-out group-hover:scale-[1.02] bg-surface-subtle">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark font-medium">
              {project.category}
            </span>
            <span className="font-semibold text-xl text-foreground tracking-tight">
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

// Big Showcase Tile (Used for all primary projects)
export function ShowcaseProjectCard({
  project,
  hasScreenshot = true,
}: {
  project: Project;
  hasScreenshot?: boolean;
}) {
  const status = getStatusBadge(project);

  return (
    <div className="group relative rounded-[16px] border border-border bg-surface overflow-hidden card-hover before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-accent before:opacity-0 hover:before:opacity-100 before:transition-opacity p-6 sm:p-7 flex flex-col justify-between space-y-5">
      {/* Top: Large Browser Preview Frame */}
      <div>
        <BrowserFrame
          project={project}
          hasScreenshot={hasScreenshot && Boolean(project.screenshot)}
          className="h-60 sm:h-72 md:h-80"
        />
      </div>

      {/* Bottom: Info & Action Buttons */}
      <div className="space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full border border-border bg-surface-subtle font-mono text-[11px] uppercase tracking-[0.06em] text-muted-dark font-medium">
            {project.category}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-medium border ${
              status.isAccent
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-border bg-surface-subtle text-muted"
            }`}
          >
            {status.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          {project.summary}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {project.stack.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 rounded-[6px] border border-border bg-surface-subtle font-mono text-xs text-muted-dark"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Action Buttons: Live demo and GitHub (Case study removed as requested) */}
        <div className="pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent text-white dark:text-[#0A0A0B] hover:brightness-105 transition-all font-semibold btn-press shadow-sm"
              >
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Live demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-surface text-foreground hover:border-foreground/30 transition-colors btn-press"
              >
                <Code2 className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}

            {!project.liveUrl && !project.githubUrl && (
              <span className="text-muted text-xs font-mono inline-flex items-center gap-1">
                <Lock className="w-3 h-3 text-muted-dark" aria-hidden="true" />
                <span>Private source</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact Project Card for secondary section
export function CompactProjectCard({ project }: { project: Project }) {
  const status = getStatusBadge(project);

  return (
    <div className="group p-6 rounded-[16px] border border-border bg-surface card-hover flex flex-col justify-between space-y-4">
      {/* Top Preview Frame */}
      {project.screenshot && (
        <BrowserFrame
          project={project}
          hasScreenshot={Boolean(project.screenshot)}
          className="h-48 sm:h-56"
        />
      )}

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark">
            {project.category}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-medium border ${
              status.isAccent
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-border bg-surface-subtle text-muted"
            }`}
          >
            {status.label}
          </span>
        </div>

        <h3 className="font-semibold text-lg text-foreground">
          {project.name}
        </h3>

        <p className="text-sm text-muted leading-relaxed">
          {project.summary}
        </p>

        {project.stack.length > 0 && (
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
        )}
      </div>

      <div className="pt-3 border-t border-border/50 text-xs font-mono">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-foreground hover:text-accent font-medium"
          >
            <span>Live demo</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        ) : project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-foreground hover:text-accent font-medium"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        ) : (
          <span className="text-muted text-xs font-mono inline-flex items-center gap-1">
            <Lock className="w-3 h-3 text-muted-dark" aria-hidden="true" />
            <span>Private repository</span>
          </span>
        )}
      </div>
    </div>
  );
}
