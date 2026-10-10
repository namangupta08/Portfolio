import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allProjects } from "@/data/projects";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return allProjects
    .filter((p) => p.detail)
    .map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: ProjectDetailPageProps): Metadata {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: `${project.name} — Naman Gupta`,
    description: project.summary,
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project || !project.detail) {
    notFound();
  }

  const { detail } = project;

  return (
    <div className="py-12 sm:py-16 space-y-12 max-w-prose">
      {/* Back link */}
      <div>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to projects</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark">
            {project.category}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-foreground">
          {project.name}
        </h1>

        <p className="text-base text-muted leading-relaxed">
          {project.summary}
        </p>

        {/* Links row */}
        <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface text-foreground hover:border-foreground/30 transition-colors btn-press"
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface text-foreground hover:border-foreground/30 transition-colors btn-press"
            >
              <SiGithub className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}

          {project.isPrivateSource && (
            <span className="text-muted-dark text-xs font-mono py-1">
              (Private repository)
            </span>
          )}
        </div>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2 py-0.5 rounded-[6px] bg-surface border border-border text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Case Study Details: Problem, What I built, How it works, Results, What I'd improve */}
      <div className="space-y-10 border-t border-border pt-10">
        {detail.problem && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-mono uppercase tracking-[0.08em] text-muted-dark">
              Problem
            </h2>
            <p className="text-base text-foreground leading-[1.7]">
              {detail.problem}
            </p>
          </section>
        )}

        {detail.whatIBuilt && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-mono uppercase tracking-[0.08em] text-muted-dark">
              What I built
            </h2>
            <p className="text-base text-foreground leading-[1.7]">
              {detail.whatIBuilt}
            </p>
          </section>
        )}

        {detail.howItWorks && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-mono uppercase tracking-[0.08em] text-muted-dark">
              How it works
            </h2>
            <p className="text-base text-foreground leading-[1.7]">
              {detail.howItWorks}
            </p>
          </section>
        )}

        {detail.results && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-mono uppercase tracking-[0.08em] text-muted-dark">
              Results
            </h2>
            <p className="text-base text-foreground leading-[1.7]">
              {detail.results}
            </p>
          </section>
        )}

        {detail.whatIWouldImprove && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-mono uppercase tracking-[0.08em] text-muted-dark">
              What I&apos;d improve
            </h2>
            <p className="text-base text-muted leading-[1.7]">
              {detail.whatIWouldImprove}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
