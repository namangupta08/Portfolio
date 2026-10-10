"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { allProjects } from "@/data/projects";
import { ShowcaseProjectCard } from "@/app/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to home</span>
        </Link>

        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-foreground">
            Projects
          </h1>
          <p className="mt-1 text-base text-muted max-w-prose">
            Production web applications and platforms. Click any project to open its live deployment.
          </p>
        </div>
      </div>

      {/* 1-Tile-In-A-Row Uniform Showcase Stream */}
      <div className="grid grid-cols-1 gap-10 sm:gap-12">
        {allProjects.map((project) => (
          <ShowcaseProjectCard
            key={project.slug}
            project={project}
            hasScreenshot={Boolean(project.screenshot)}
          />
        ))}
      </div>
    </div>
  );
}