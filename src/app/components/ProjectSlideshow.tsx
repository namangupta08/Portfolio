"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Globe } from "lucide-react";
import { allProjects } from "@/data/projects";

export default function ProjectSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = allProjects.length;
  const project = allProjects[currentIndex];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  const destinationUrl = project.liveUrl || project.githubUrl || "#";

  return (
    <div className="space-y-4">
      {/* Slideshow Header with Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark block">
            Portfolio Showcase
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-foreground">
            Featured Projects
          </h2>
        </div>

        {/* Counter and Navigation Buttons */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted">
            <span className="text-foreground font-semibold">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>{" "}
            / {String(total).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="p-2 rounded-lg border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/30 btn-press transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="p-2 rounded-lg border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/30 btn-press transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="group rounded-[18px] border border-border bg-surface overflow-hidden p-5 sm:p-6 transition-all hover:border-foreground/25 shadow-sm space-y-4">
        {/* Large Browser Mockup with Screenshot */}
        <a
          href={destinationUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name} live application`}
          className="block w-full rounded-[14px] border border-border bg-surface-subtle overflow-hidden flex flex-col shadow-sm cursor-pointer relative"
        >
          {/* macOS Browser Header */}
          <div className="px-3.5 py-2.5 bg-surface border-b border-border flex items-center justify-between select-none">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
            </div>
            <div className="text-[11px] font-mono text-muted-dark truncate max-w-[200px]">
              {project.name.toLowerCase()}.app
            </div>
            <div className="w-8" aria-hidden="true" />
          </div>

          {/* Screenshot Container */}
          <div className="relative w-full h-64 sm:h-80 md:h-[380px] lg:h-[420px] overflow-hidden bg-surface-subtle">
            {project.screenshot ? (
              <Image
                src={project.screenshot}
                alt={`${project.name} screenshot`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2">
                <span className="font-mono text-xs uppercase text-muted-dark">
                  {project.category}
                </span>
                <span className="font-semibold text-xl text-foreground">
                  {project.name}
                </span>
              </div>
            )}

            {/* Hover-only Live Action Overlay */}
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white dark:text-[#0A0A0B] text-xs font-mono font-semibold tracking-wide shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Open live project</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </div>
          </div>
        </a>

        {/* Compact Details Strip Below */}
        <div className="space-y-2 pt-1 px-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
              {project.name}
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-dark">
              {project.category}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            {project.summary}
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {project.stack.map((item) => (
              <span
                key={item}
                className="px-2 py-0.5 rounded-[4px] border border-border bg-surface-subtle font-mono text-[11px] text-muted-dark"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Dot Pagination */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {allProjects.map((p, idx) => (
            <button
              key={p.slug}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-border hover:bg-muted-dark"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
