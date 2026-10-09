import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/data/portfolio";
import ProjectCard from "@/app/components/ProjectCard";
import FadeIn from "@/app/components/FadeIn";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects — Naman Gupta",
  description: "Systems, tools, and applications built by Naman Gupta.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-10">
      <FadeIn>
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to home</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="text-sm text-muted max-w-[65ch]">
            Personal finance tracking, fault-tolerant job queues, and AI-assisted workflow engines.
          </p>
        </div>
      </FadeIn>

      <div className="space-y-6">
        {projects.map((project, idx) => (
          <FadeIn key={project.slug} delay={idx * 0.05}>
            <ProjectCard project={project} priorityImage={idx === 0} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}