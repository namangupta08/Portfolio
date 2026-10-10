"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Lock, Globe, Code2 } from "lucide-react";
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
  className = "h-56 sm:h-64",
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
            className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2.5 transition-transform duration-300 ease-out group-hover:scale-[1.03] bg-surface-subtle">
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

// Wide Featured Card (DocFlow - Full Width with screenshot on right, text on left)
export function WideFeaturedProjectCard({
  project,
  hasScreenshot = false,
}: {
  project: Project;
  hasScreenshot?: boolean;
}) {
  const status = getStatusBadge(project);

  return (
    <div className="group relative rounded-[14px] border border-border bg-surface overflow-hidden card-hover before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-accent before:opacity-0 hover:before:opacity-100 before:transition-opacity p-6 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Content */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Badges row */}
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
              {project.metricBadge && (
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] text-accent border border-accent/20 bg-accent/5 font-medium">
                  {project.metricBadge}
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              <Link
                href={`/projects/${project.slug}`}
                className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                {project.name}
              </Link>
            </h3>

            {/* One-line description */}
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {project.summary}
            </p>

            {/* Stack chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded-[6px] border border-border bg-surface-subtle font-mono text-xs text-muted-dark"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons: Live demo, GitHub, Case study */}
          <div className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-subtle border border-border text-foreground hover:border-foreground/30 transition-colors font-medium btn-press"
            >
              <span>Case study</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent text-white dark:text-[#0A0A0B] hover:brightness-105 transition-all font-semibold btn-press shadow-sm"
              >
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Live demo</span>
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
              </a>
            )}
          </div>
        </div>

        {/* Right Side: Screenshot in Browser Frame */}
        <div className="lg:col-span-6">
          <Link
            href={`/projects/${project.slug}`}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          >
            <BrowserFrame
              project={project}
              hasScreenshot={hasScreenshot}
              className="h-60 sm:h-72"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

// Half-Width Featured Card (SpendWise, VistaVoyage)
export function HalfFeaturedProjectCard({
  project,
  hasScreenshot = false,
}: {
  project: Project;
  hasScreenshot?: boolean;
}) {
  const status = getStatusBadge(project);

  return (
    <div className="group relative rounded-[14px] border border-border bg-surface overflow-hidden card-hover before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-accent before:opacity-0 hover:before:opacity-100 before:transition-opacity p-6 flex flex-col justify-between space-y-5">
      <div className="space-y-4">
        {/* Browser Frame */}
        <Link
          href={`/projects/${project.slug}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
        >
          <BrowserFrame
            project={project}
            hasScreenshot={hasScreenshot}
            className="h-48 sm:h-56"
          />
        </Link>

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
          {project.isPrivateSource && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-dark px-2 py-0.5 rounded border border-border bg-surface-subtle">
              <Lock className="w-3 h-3" aria-hidden="true" />
              <span>Private repo</span>
            </span>
          )}
          {project.metricBadge && (
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] text-accent border border-accent/20 bg-accent/5 font-medium">
              {project.metricBadge}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            {project.name}
          </Link>
        </h3>

        {/* One-line description */}
        <p className="text-sm text-muted leading-relaxed">
          {project.summary}
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {project.stack.map((item) => (
            <span
              key={item}
              className="px-2 py-0.5 rounded-[6px] border border-border bg-surface-subtle font-mono text-[11px] text-muted-dark"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons: Live demo, GitHub, Case study */}
      <div className="pt-2 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-foreground hover:text-accent transition-colors font-medium"
        >
          <span>Case study</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>

        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-accent text-white dark:text-[#0A0A0B] hover:brightness-105 font-semibold btn-press shadow-sm"
            >
              <span>Live demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-border bg-surface text-foreground hover:border-foreground/30 btn-press"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Compact Project Card for More Work (Zevise, etc.)
export function CompactProjectCard({ project }: { project: Project }) {
  return (
    <div className="p-6 rounded-[14px] border border-border bg-surface card-hover flex flex-col justify-between space-y-4">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark">
            {project.category}
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
          <span className="text-muted-dark text-xs font-mono">Internal project</span>
        )}
      </div>
    </div>
  );
}
