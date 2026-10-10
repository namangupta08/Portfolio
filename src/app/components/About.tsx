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

export default function About() {
  const [f1LightsActive, setF1LightsActive] = useState(false);

  return (
    <section id="about" className="py-[72px] lg:py-[112px] border-t border-border">
      <div className="space-y-12">
        {/* About Bio Content */}
        <div className="space-y-6 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark block">
            About
          </span>

          <h2 className="text-[2.25rem] font-semibold tracking-[-0.02em] text-foreground leading-[1.15]">
            Software Developer
          </h2>

          <div className="space-y-3 text-sm sm:text-base leading-relaxed text-muted">
            <p>
              Software developer from Delhi with a B.Tech in Information Technology from GGSIPU (9.2 CGPA).
            </p>
            <p>
              I build fast, resilient web applications using React, Node.js, Django, and PostgreSQL, integrating LLM features to eliminate real workflow bottlenecks.
            </p>
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
