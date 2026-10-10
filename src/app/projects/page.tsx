"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { allProjects, ProjectCategory } from "@/data/projects";
import { ShowcaseProjectCard } from "@/app/components/ProjectCard";

const filterCategories: ProjectCategory[] = ["All", "Full-stack", "AI", "Backend"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filtered = allProjects.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  const featured = filtered.filter((p) => p.isFeatured);
  const other = filtered.filter((p) => !p.isFeatured && p.summary && p.summary.trim().length > 0);

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

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-foreground">
              Projects
            </h1>
            <p className="mt-1 text-base text-muted max-w-prose">
              Production web applications, AI systems, and scalable backend platforms.
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
      </div>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map((p) => (
              <ShowcaseProjectCard
                key={p.slug}
                project={p}
                hasScreenshot={Boolean(p.screenshot)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Additional Projects */}
      {other.length > 0 && (
        <div className="pt-6 space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark">
            Additional platforms & tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {other.map((p) => (
              <ShowcaseProjectCard
                key={p.slug}
                project={p}
                hasScreenshot={Boolean(p.screenshot)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}