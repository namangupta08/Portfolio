"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProjectItem } from "@/data/portfolio";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
  priorityImage?: boolean;
}

export default function ProjectCard({
  project,
  priorityImage = false,
}: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = `/projects/${project.slug}.png`;

  return (
    <article className="card-lift group rounded-lg border border-border bg-surface/50 p-5 sm:p-6 transition-all duration-200">
      {/* Screenshot slot */}
      <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-md border border-border bg-background">
        {project.hasScreenshot && !imgError ? (
          <Image
            src={imageSrc}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 720px) 100vw, 720px"
            priority={priorityImage}
            onError={() => setImgError(true)}
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.01]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-muted-dark">
            <div className="font-mono text-xs uppercase tracking-wider text-muted">
              {project.title}
            </div>
            <div className="mt-1 text-[11px] text-muted-dark">
              Preview screenshot placeholder
            </div>
          </div>
        )}
      </div>

      {/* Header: Title and Links */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground tracking-tight">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:text-accent transition-colors"
            >
              {project.title}
            </Link>
          </h3>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3 shrink-0 text-xs">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo of ${project.title}`}
              className="inline-flex items-center gap-1 text-muted hover:text-accent transition-colors"
            >
              <span>Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open GitHub repository of ${project.title}`}
              className="inline-flex items-center gap-1 text-muted hover:text-accent transition-colors"
            >
              <span>GitHub</span>
              <Github className="w-3.5 h-3.5" />
            </a>
          )}

          {project.isPrivateSource && (
            <span className="font-mono text-[11px] text-muted-dark">
              (Private source)
            </span>
          )}

          {project.linkPlaceholder && (
            <span className="font-mono text-[11px] text-muted-dark" title={project.linkPlaceholder}>
              (Link: TODO)
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      <p className="mt-2.5 text-sm leading-relaxed text-muted">
        {project.summary}
      </p>

      {/* Stack chips and Details link */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2 py-0.5 rounded bg-background border border-border text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
        >
          <span>Overview</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}
