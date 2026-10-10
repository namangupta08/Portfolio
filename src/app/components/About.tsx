"use client";

import React, { useState } from "react";
import {
  Trophy,
  Gauge,
  Film,
  Music,
  Brain,
  Code2,
} from "lucide-react";

export default function About({ hasPhoto = true }: { hasPhoto?: boolean }) {
  const [photoError, setPhotoError] = useState(!hasPhoto);
  const [f1LightsActive, setF1LightsActive] = useState(false);

  return (
    <section id="about" className="py-[72px] lg:py-[112px] border-t border-border">
      <div className="space-y-12">
        {/* Two-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark block">
              About
            </span>

            <h2 className="text-[2.25rem] font-semibold tracking-[-0.02em] text-foreground leading-[1.15]">
              Software Developer
            </h2>

            <div className="space-y-4 text-base leading-[1.7] text-muted max-w-prose">
              <p>
                I&apos;m from Delhi and completed my B.Tech in Information Technology at GGSIPU with a 9.2 CGPA.
              </p>
              <p>
                I work across React, Node.js, Django, and PostgreSQL, adding LLM features where they solve real workflow bottlenecks. I enjoy building responsive frontends, optimising databases, and engineering robust distributed pipelines.
              </p>
              <p>
                Outside of engineering systems, I love sports, movies, music, and exploring neuroscience and Formula 1.
              </p>
            </div>
          </div>

          {/* Right Column: Photo with slight rotation */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="w-64 h-80 sm:w-72 sm:h-88 rounded-[14px] border border-border bg-surface overflow-hidden shadow-sm -rotate-2 group-hover:rotate-0 transition-transform duration-300 ease-out flex items-center justify-center p-2">
                {!photoError ? (
                  <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-surface-subtle">
                    {/* Native img with graceful onError fallback to monogram */}
                    <img
                      src="/about/me.jpg"
                      alt="Naman Gupta"
                      className="w-full h-full object-cover"
                      onError={() => setPhotoError(true)}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-[10px] bg-surface-subtle border border-border flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-16 h-16 rounded-full border border-border bg-surface flex items-center justify-center font-mono text-xl font-semibold text-foreground">
                      NG
                    </div>
                    <div className="space-y-1">
                      <span className="font-medium text-sm text-foreground block">
                        Naman Gupta
                      </span>
                      <span className="font-mono text-xs text-muted-dark block">
                        Delhi, India
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 6 Interest Cards Grid */}
        <div className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1: Sports */}
            <div className="p-5 rounded-[14px] border border-border bg-surface card-hover group flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-surface-subtle text-foreground border border-border/50 group-hover:-translate-y-1 transition-transform">
                  <Trophy className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">Sports</h3>
              </div>
              <p className="mt-3 text-xs font-mono text-muted">
                Cricket, football & badminton.
              </p>
            </div>

            {/* Card 2: Movies */}
            <div className="p-5 rounded-[14px] border border-border bg-surface card-hover group flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-surface-subtle text-foreground border border-border/50 group-hover:-translate-y-1 transition-transform">
                  <Film className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">Movies</h3>
              </div>
              <p className="mt-3 text-xs font-mono text-muted">
                Cinema, psychological thrillers & sci-fi classics.
              </p>
            </div>

            {/* Card 3: Music */}
            <div className="p-5 rounded-[14px] border border-border bg-surface card-hover group flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-surface-subtle text-foreground border border-border/50 group-hover:-translate-y-1 transition-transform">
                  <Music className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">Music</h3>
              </div>
              <p className="mt-3 text-xs font-mono text-muted">
                Deep focus tracks, ambient electronic & lo-fi beats.
              </p>
            </div>

            {/* Card 4: Neuroscience */}
            <div className="p-5 rounded-[14px] border border-border bg-surface card-hover group flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-surface-subtle text-foreground border border-border/50 group-hover:-translate-y-1 transition-transform">
                  <Brain className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">Neuroscience</h3>
              </div>
              <p className="mt-3 text-xs font-mono text-muted">
                Cognitive architecture, brain plasticity & human perception.
              </p>
            </div>

            {/* Card 5: Formula 1 */}
            <div
              onMouseEnter={() => setF1LightsActive(true)}
              onMouseLeave={() => setF1LightsActive(false)}
              className="p-5 rounded-[14px] border border-border bg-surface card-hover group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-surface-subtle text-foreground border border-border/50">
                    <Gauge className="w-4 h-4 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">Formula 1</h3>
                </div>

                {/* 5 Race Start Lights */}
                <div className="flex items-center gap-1" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        f1LightsActive
                          ? "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]"
                          : "bg-border"
                      }`}
                      style={{
                        transitionDelay: f1LightsActive ? `${i * 120}ms` : "0ms",
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-xs font-mono text-muted">
                Telemetry, aerodynamics & race strategy.
              </p>
            </div>

            {/* Card 6: Building & Coding */}
            <div className="p-5 rounded-[14px] border border-border bg-surface card-hover group flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-surface-subtle text-foreground border border-border/50">
                  <Code2 className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">Building software</h3>
              </div>
              <p className="mt-3 text-xs font-mono text-muted">
                Turning ideas into functional, reliable, and fast products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
