import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/portfolio";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import FadeIn from "@/app/components/FadeIn";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: ProjectDetailPageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: `${project.title} — Naman Gupta`,
    description: project.summary,
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    notFound();
  }

  const { detail } = project;

  return (
    <div className="space-y-12">
      <FadeIn>
        <div className="space-y-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>All projects</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {project.title}
              </h1>
              <p className="mt-1 text-sm text-muted">
                {project.summary}
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 shrink-0 text-xs">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface/50 text-foreground hover:border-foreground/30 transition-colors"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface/50 text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}

              {project.isPrivateSource && (
                <span className="font-mono text-xs text-muted-dark">
                  (Private repository)
                </span>
              )}

              {project.linkPlaceholder && (
                <span className="font-mono text-xs text-muted-dark">
                  ({project.linkPlaceholder})
                </span>
              )}
            </div>
          </div>

          {/* Stack Chips */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-surface border border-border text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Sections: Problem, What I built, How it works, Results, What I would improve */}
      <div className="space-y-10 border-t border-border pt-8">
        <section className="space-y-2">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-dark">
            Problem
          </h2>
          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            {detail.problem}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-dark">
            What I built
          </h2>
          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            {detail.whatIBuilt}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-dark">
            How it works
          </h2>
          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            {detail.howItWorks}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-dark">
            Results
          </h2>
          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            {detail.results}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-dark">
            What I would improve
          </h2>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            {detail.whatIWouldImprove}
          </p>
        </section>
      </div>
    </div>
  );
}
