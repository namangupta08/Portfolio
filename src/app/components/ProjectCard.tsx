"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Lock } from "lucide-react";
import { Project } from "@/data/projects";

export function FeaturedProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group rounded-[14px] border border-border bg-surface overflow-hidden card-hover flex flex-col justify-between">
      <div>
        {/* Top: Screenshot with 1.03 hover zoom & neutral placeholder fallback */}
        <Link
          href={`/projects/${project.slug}`}
          className="block relative w-full h-48 sm:h-56 overflow-hidden bg-surface-subtle border-b border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {project.screenshot && !imgError ? (
            <Image
              src={project.screenshot}
              alt={`${project.name} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-surface-subtle transition-transform duration-300 ease-out group-hover:scale-[1.03]">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark">
                {project.category}
              </span>
              <span className="font-semibold text-lg text-foreground mt-1">
                {project.name}
              </span>
            </div>
          )}

          {/* Metric badge overlaid */}
          {project.metricBadge && (
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-background/90 backdrop-blur-sm border border-border text-[11px] font-mono text-foreground shadow-sm">
              <span className="text-accent mr-1.5 font-medium">●</span>
              {project.metricBadge}
            </div>
          )}
        </Link>

        {/* Body content */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark">
              {project.category}
            </span>
            {project.isPrivateSource && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-dark px-2 py-0.5 rounded border border-border bg-surface-subtle">
                <Lock className="w-3 h-3" />
                <span>Private repo</span>
              </span>
            )}
          </div>

          <h3 className="text-xl font-semibold text-foreground tracking-tight group-hover:text-foreground/90">
            <Link
              href={`/projects/${project.slug}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {project.name}
            </Link>
          </h3>

          <p className="text-sm text-muted leading-relaxed line-clamp-2">
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
      </div>

      {/* Footer links with arrow icons */}
      <div className="p-5 sm:p-6 pt-0 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs font-mono mt-4">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-foreground hover:text-accent transition-colors font-medium"
        >
          <span>Read case study</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted hover:text-foreground transition-colors"
            >
              <span>Live demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted hover:text-foreground transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function CompactProjectCard({ project }: { project: Project }) {
  return (
    <div className="p-5 rounded-[14px] border border-border bg-surface card-hover flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark">
            {project.category}
          </span>
        </div>

        <h3 className="font-semibold text-base text-foreground">
          {project.name}
        </h3>

        {project.summary && (
          <p className="text-xs text-muted leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        )}

        {project.stack.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 pt-1">
            {project.stack.map((item) => (
              <span
                key={item}
                className="px-1.5 py-0.5 rounded-[4px] border border-border bg-surface-subtle font-mono text-[10px] text-muted-dark"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 mt-3 border-t border-border/50 text-xs font-mono text-muted">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-foreground hover:text-accent"
          >
            <span>View</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-muted-dark text-[11px]">—</span>
        )}
      </div>
    </div>
  );
}
