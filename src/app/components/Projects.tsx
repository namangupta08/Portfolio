"use client";

import React, { useState } from "react";
import { featuredProjects, moreProjects, ProjectCategory } from "@/data/projects";
import { FeaturedProjectCard, CompactProjectCard } from "./ProjectCard";

const filterCategories: ProjectCategory[] = ["All", "Backend", "Full-stack", "AI"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredFeatured = featuredProjects.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  const filteredMore = moreProjects.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-[72px] lg:py-[112px] border-t border-border">
      <div className="space-y-8">
        {/* Section Header with Filter Chips */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark block">
              Projects
            </span>
            <h2 className="text-[2.25rem] font-semibold tracking-[-0.02em] text-foreground leading-tight mt-1">
              Selected work
            </h2>
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

        {/* Featured Projects Bento Layout: 1 wide + 2 half-width */}
        {filteredFeatured.length > 0 && (
          <div className="space-y-4">
            {/* If "All", show first card as wide full-width, next 2 as half-width */}
            {selectedCategory === "All" ? (
              <>
                {/* Wide Card (DocFlow) */}
                <div className="w-full">
                  <FeaturedProjectCard project={filteredFeatured[0]} />
                </div>

                {/* 2 Half-width Cards (SpendWise & VistaVoyage) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredFeatured.slice(1).map((project) => (
                    <FeaturedProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFeatured.map((project) => (
                  <FeaturedProjectCard key={project.slug} project={project} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* More Work Section (2x2 grid) */}
        {filteredMore.length > 0 && (
          <div className="pt-8 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark">
              More work
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
