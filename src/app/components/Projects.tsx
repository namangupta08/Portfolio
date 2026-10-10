"use client";

import React, { useState } from "react";
import { featuredProjects, moreProjects, ProjectCategory } from "@/data/projects";
import {
  WideFeaturedProjectCard,
  HalfFeaturedProjectCard,
  CompactProjectCard,
} from "./ProjectCard";

const filterCategories: ProjectCategory[] = ["All", "Backend", "Full-stack", "AI"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredFeatured = featuredProjects.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  // Hide any project without data (only show projects with a valid summary)
  const validMoreProjects = moreProjects.filter(
    (p) => p.summary && p.summary.trim().length > 0
  );

  const filteredMore = validMoreProjects.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  const firstWideProject = filteredFeatured[0];
  const remainingFeatured = filteredFeatured.slice(1);

  return (
    <section id="projects" className="py-[72px] lg:py-[112px] border-t border-border">
      <div className="space-y-10">
        {/* Section Header with One-line Subtitle and Filter Chips */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark block">
              Portfolio
            </span>
            <h2 className="text-[2.25rem] font-semibold tracking-[-0.02em] text-foreground leading-tight">
              Selected work
            </h2>
            <p className="text-sm text-muted">
              Systems, developer tools, and full-stack applications with measured performance.
            </p>
          </div>

          {/* Filter Chips */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg border border-border bg-surface w-fit"
          >
            {filterCategories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-[6px] font-mono text-xs uppercase tracking-[0.06em] transition-all btn-press ${
                    active
                      ? "bg-accent text-white dark:text-[#0A0A0B] font-semibold shadow-sm"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Bento Layout: First full-width, next two half-width */}
        <div className="space-y-6">
          {firstWideProject && (
            <WideFeaturedProjectCard
              project={firstWideProject}
              hasScreenshot={Boolean(firstWideProject.screenshot)}
            />
          )}

          {remainingFeatured.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingFeatured.map((project) => (
                <HalfFeaturedProjectCard
                  key={project.slug}
                  project={project}
                  hasScreenshot={Boolean(project.screenshot)}
                />
              ))}
            </div>
          )}
        </div>

        {/* More Work (2-column compact grid, hiding any with missing data) */}
        {filteredMore.length > 0 && (
          <div className="pt-6 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark">
              More work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMore.map((project) => (
                <CompactProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
