"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  GraduationCap,
  ArrowDown,
  FileText,
  Network,
  Database,
  SearchCode,
} from "lucide-react";
import {
  SiGithub,
  SiLinkedin,
  SiLeetcode,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiPostgresql,
  SiDocker,
  SiRedis,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiLangchain,
  SiGooglegemini,
} from "react-icons/si";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/links";

// Magnetic Button Wrapper (max 6px shift, desktop only, disabled under reduced motion)
function MagneticWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) / (width / 2);
    const deltaY = (e.clientY - centerY) / (height / 2);
    const shiftX = Math.max(-6, Math.min(6, deltaX * 6));
    const shiftY = Math.max(-6, Math.min(6, deltaY * 6));
    setPosition({ x: shiftX, y: shiftY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition:
          position.x === 0 && position.y === 0
            ? "transform 250ms ease-out"
            : "transform 80ms ease-out",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

interface TechBadge {
  name: string;
  icon: React.ReactNode;
}

const marqueeRow1: TechBadge[] = [
  { name: "TypeScript", icon: <SiTypescript className="w-3.5 h-3.5" /> },
  { name: "Node.js", icon: <SiNodedotjs className="w-3.5 h-3.5" /> },
  { name: "React", icon: <SiReact className="w-3.5 h-3.5" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="w-3.5 h-3.5" /> },
  { name: "Python", icon: <SiPython className="w-3.5 h-3.5" /> },
  { name: "Django", icon: <SiDjango className="w-3.5 h-3.5" /> },
  { name: "Docker", icon: <SiDocker className="w-3.5 h-3.5" /> },
  { name: "C++", icon: <SiCplusplus className="w-3.5 h-3.5" /> },
  { name: "JavaScript", icon: <SiJavascript className="w-3.5 h-3.5" /> },
  { name: "Redis", icon: <SiRedis className="w-3.5 h-3.5" /> },
];

const marqueeRow2: TechBadge[] = [
  { name: "LangGraph", icon: <Network className="w-3.5 h-3.5" /> },
  { name: "LangChain", icon: <SiLangchain className="w-3.5 h-3.5" /> },
  { name: "Qdrant", icon: <Database className="w-3.5 h-3.5" /> },
  { name: "Gemini", icon: <SiGooglegemini className="w-3.5 h-3.5" /> },
  { name: "Express.js", icon: <SiExpress className="w-3.5 h-3.5" /> },
  { name: "MongoDB", icon: <SiMongodb className="w-3.5 h-3.5" /> },
  { name: "Firebase", icon: <SiFirebase className="w-3.5 h-3.5" /> },
  { name: "Git", icon: <SiGit className="w-3.5 h-3.5" /> },
  { name: "GitHub", icon: <SiGithub className="w-3.5 h-3.5" /> },
  { name: "RAG", icon: <SearchCode className="w-3.5 h-3.5" /> },
];

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [istTime, setIstTime] = useState("");

  // Live IST clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
        setIstTime(formatted + " IST");
      } catch {
        setIstTime("IST");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Rotating phrase pause on tab hidden
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const startInterval = () => {
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        setPhraseIndex((prev) => (prev + 1) % siteConfig.rotatingPhrases.length);
      }, 2500);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      } else {
        startInterval();
      }
    };

    if (!document.hidden) {
      startInterval();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      if (interval) clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const nameWords = siteConfig.name.split(" ");

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-64px)] flex flex-col justify-center py-12 lg:py-16"
    >
      <div className="space-y-8 max-w-4xl">
        {/* Top: Status chip with pulsing accent dot */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-xs font-mono text-muted w-fit">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-foreground font-medium">{siteConfig.status}</span>
        </div>

        {/* Hero Name: Word by word reveal using CSS animation for instant SSR LCP */}
        <h1
          className="font-semibold text-foreground tracking-[-0.04em] leading-[0.95]"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          {nameWords.map((word, idx) => (
            <span
              key={idx}
              className="inline-block mr-[0.25em] last:mr-0 word-reveal"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Rotating phrase: vertical text swap every 2.5s */}
        <div className="flex items-center text-xl sm:text-2xl text-muted font-normal h-10 overflow-hidden">
          <span className="mr-2 text-foreground">I build</span>
          <div className="relative inline-flex h-10 items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="font-medium text-foreground underline decoration-accent/60 underline-offset-4"
              >
                {siteConfig.rotatingPhrases[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-muted">.</span>
        </div>

        {/* Meta row with icons */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-mono text-muted pt-1">
          <div className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-muted-dark" aria-hidden="true" />
            <span>{siteConfig.location}</span>
          </div>

          <span className="text-border" aria-hidden="true">·</span>

          <div className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-muted-dark" aria-hidden="true" />
            <span>{istTime || "IST"}</span>
          </div>

          <span className="text-border" aria-hidden="true">·</span>

          <div className="inline-flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-muted-dark" aria-hidden="true" />
            <span>{siteConfig.degree}</span>
          </div>
        </div>

        {/* Action Buttons Row with magnetic effect */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Primary CTA (accent) */}
          <MagneticWrapper>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-accent text-white dark:text-[#0A0A0B] text-sm font-semibold hover:brightness-105 btn-press shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>View my work</span>
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>
          </MagneticWrapper>

          {/* Secondary CTA */}
          <MagneticWrapper>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-border bg-surface text-sm font-medium text-foreground hover:border-foreground/30 btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <FileText className="w-4 h-4 text-muted" aria-hidden="true" />
              <span>Resume</span>
            </Link>
          </MagneticWrapper>

          {/* Social Icon Buttons */}
          <div className="flex items-center gap-2 sm:ml-2">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-[10px] border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/30 btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <SiGithub className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-[10px] border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/30 btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <SiLinkedin className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href={socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile"
              className="p-2.5 rounded-[10px] border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/30 btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <SiLeetcode className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Quiet Infinite Edge-Faded Tech Marquee replacing the 3 metric tiles */}
        <div className="pt-8 sm:pt-12 marquee-container space-y-3">
          <div className="relative overflow-hidden w-full py-1 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {/* Row 1: Left moving */}
            <div className="flex gap-2.5 w-max marquee-track-left">
              {[...marqueeRow1, ...marqueeRow1].map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-border bg-surface text-muted hover:text-accent hover:border-accent/40 transition-colors cursor-default select-none"
                >
                  <span
                    className="text-muted-dark group-hover:text-accent transition-colors"
                    aria-hidden="true"
                  >
                    {tech.icon}
                  </span>
                  <span className="font-mono text-xs font-medium text-foreground group-hover:text-accent transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden w-full py-1 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {/* Row 2: Right moving */}
            <div className="flex gap-2.5 w-max marquee-track-right">
              {[...marqueeRow2, ...marqueeRow2].map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-border bg-surface text-muted hover:text-accent hover:border-accent/40 transition-colors cursor-default select-none"
                >
                  <span
                    className="text-muted-dark group-hover:text-accent transition-colors"
                    aria-hidden="true"
                  >
                    {tech.icon}
                  </span>
                  <span className="font-mono text-xs font-medium text-foreground group-hover:text-accent transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
