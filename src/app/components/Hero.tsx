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
} from "lucide-react";
import { SiGithub, SiLinkedin, SiLeetcode } from "react-icons/si";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/links";

function CountUpNumber({
  target,
  duration = 1.0,
  suffix = "",
  prefix = "",
}: {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [current, setCurrent] = useState(target);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setCurrent(0);
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(1, elapsed / duration);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.floor(easeProgress * target));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCurrent(target);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, target, duration]);

  return (
    <span ref={elementRef}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}

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

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Primary CTA (accent) */}
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-accent text-white dark:text-[#0A0A0B] text-sm font-semibold hover:brightness-105 btn-press shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>View my work</span>
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </a>

          {/* Secondary CTA */}
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-border bg-surface text-sm font-medium text-foreground hover:border-foreground/30 btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <FileText className="w-4 h-4 text-muted" aria-hidden="true" />
            <span>Resume</span>
          </Link>

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

        {/* 3 Metric Tiles Row */}
        <div className="pt-6 sm:pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Metric 1 */}
            <div className="p-5 rounded-[14px] border border-border bg-surface card-hover">
              <div className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-foreground flex items-baseline gap-1">
                <CountUpNumber target={31} />
                <span className="text-accent text-lg sm:text-xl font-medium">ms</span>
              </div>
              <p className="mt-2 text-xs font-mono text-muted uppercase tracking-[0.08em] leading-relaxed">
                p95 on 3-month queries over 10,000 transactions (SpendWise)
              </p>
              <span className="block mt-3 text-[10px] font-mono text-muted-dark">
                {siteConfig.metricsFootnote}
              </span>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-[14px] border border-border bg-surface card-hover">
              <div className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-foreground flex items-baseline gap-1">
                <span>0</span>
                <span className="text-muted font-normal text-lg sm:text-xl">of</span>
                <CountUpNumber target={324} />
              </div>
              <p className="mt-2 text-xs font-mono text-muted uppercase tracking-[0.08em] leading-relaxed">
                jobs lost when a worker was killed mid-run (DocFlow)
              </p>
              <span className="block mt-3 text-[10px] font-mono text-muted-dark">
                {siteConfig.metricsFootnote}
              </span>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-[14px] border border-border bg-surface card-hover">
              <div className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-foreground flex items-baseline gap-1">
                <CountUpNumber target={10} />
                <span className="text-accent font-medium">+</span>
              </div>
              <p className="mt-2 text-xs font-mono text-muted uppercase tracking-[0.08em] leading-relaxed">
                bank statement layouts parsed into one schema (Epigee)
              </p>
              <span className="block mt-3 text-[10px] font-mono text-muted-dark">
                {siteConfig.metricsFootnote}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
