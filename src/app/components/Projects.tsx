"use client";

import React from "react";
import { allProjects } from "@/data/projects";
import { ShowcaseProjectCard } from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-[72px] lg:py-[112px] border-t border-border">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark block">
            Portfolio
          </span>
          <h2 className="text-[2.25rem] font-semibold tracking-[-0.02em] text-foreground leading-tight">
            Selected work
          </h2>
          <p className="text-sm text-muted max-w-prose">
            Production web applications and platforms. Click any project to open its live deployment.
          </p>
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
    </section>
  );
}
