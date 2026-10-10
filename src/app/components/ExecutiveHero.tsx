"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  GraduationCap,
  Briefcase,
  ChevronDown,
  FileText,
} from "lucide-react";
import {
  SiGithub,
  SiLinkedin,
  SiLeetcode,
} from "react-icons/si";
import { socialLinks } from "@/data/links";
import { experiencesData } from "@/data/experience";

export default function ExecutiveHero({ hasPhoto = true }: { hasPhoto?: boolean }) {
  const [photoError, setPhotoError] = useState(!hasPhoto);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [istTime, setIstTime] = useState("");

  // Live IST Clock
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
        setIstTime("");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="space-y-6 pt-4 pb-2">
      {/* Top Status Bar: Availability & Live Clock */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-foreground font-medium">Available for full-time roles</span>
        </div>

        {istTime && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-surface text-muted shadow-xs">
            <Clock className="w-3.5 h-3.5 text-muted-dark" />
            <span>{istTime}</span>
          </div>
        )}
      </div>

      {/* Main Profile Grid: Photo + Name, Bio, Links */}
      <div className="rounded-[20px] border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
          <div className="flex items-center gap-5">
            {/* Developer Portrait / Caricature */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[16px] border border-border bg-surface-subtle overflow-hidden shrink-0 shadow-sm">
              {!photoError ? (
                <Image
                  src="/about/me.jpg"
                  alt="Naman Gupta"
                  fill
                  sizes="96px"
                  priority
                  className="object-cover"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono text-xl font-semibold text-foreground">
                  NG
                </div>
              )}
            </div>

            {/* Name, Title, Degree */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                Naman Gupta
              </h1>
              <p className="text-sm sm:text-base font-semibold text-accent">
                Software Developer
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted font-mono pt-0.5">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-muted-dark" />
                  Delhi, India
                </span>
                <span className="inline-flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-muted-dark" />
                  GGSIPU · B.Tech IT (9.2 CGPA)
                </span>
              </div>
            </div>
          </div>

          {/* Social Icons & Resume Link */}
          <div className="flex items-center gap-2 sm:self-center">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl border border-border bg-surface-subtle text-muted hover:text-foreground hover:border-foreground/30 btn-press transition-colors"
            >
              <SiGithub color="#E2E8F0" style={{ color: "#E2E8F0" }} className="w-4 h-4" />
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl border border-border bg-surface-subtle text-muted hover:text-foreground hover:border-foreground/30 btn-press transition-colors"
            >
              <SiLinkedin color="#0A66C2" style={{ color: "#0A66C2" }} className="w-4 h-4" />
            </a>

            <a
              href={socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile"
              className="p-2.5 rounded-xl border border-border bg-surface-subtle text-muted hover:text-foreground hover:border-foreground/30 btn-press transition-colors"
            >
              <SiLeetcode color="#FFA116" style={{ color: "#FFA116" }} className="w-4 h-4" />
            </a>

            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent text-white dark:text-[#0A0A0B] text-xs font-mono font-semibold shadow-xs hover:brightness-105 btn-press transition-all ml-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </Link>
          </div>
        </div>

        {/* Concise About Bio */}
        <div className="pt-2 border-t border-border/60 text-sm leading-relaxed text-muted max-w-prose space-y-2">
          <p>
            Software developer from Delhi with a B.Tech in Information Technology from GGSIPU (9.2 CGPA).
          </p>
          <p>
            I build fast, resilient web applications using React, Node.js, Django, and PostgreSQL, integrating LLM features to eliminate real workflow bottlenecks. Outside engineering: sports, movies, music, and neuroscience.
          </p>
        </div>

        {/* Collapsed Work Experience Accordion: User can expand/collapse in-place */}
        <div className="pt-2 border-t border-border/60">
          <button
            type="button"
            onClick={() => setExperienceOpen((prev) => !prev)}
            aria-expanded={experienceOpen}
            className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-surface-subtle border border-border hover:border-foreground/30 transition-all text-xs font-mono group"
          >
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Briefcase className="w-4 h-4 text-accent" />
              <span>Work Experience (Epigee, Zevise)</span>
            </div>

            <div className="flex items-center gap-1.5 text-muted group-hover:text-foreground">
              <span>{experienceOpen ? "Collapse" : "Expand to read"}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  experienceOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          <AnimatePresence>
            {experienceOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-6">
                  {experiencesData.map((role) => (
                    <div
                      key={role.id}
                      className="p-4 rounded-xl border border-border/80 bg-surface-subtle space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <h3 className="font-semibold text-sm text-foreground">
                            {role.role} · <span className="text-accent">{role.company}</span>
                          </h3>
                          <p className="text-xs font-mono text-muted-dark">
                            {role.period}
                          </p>
                        </div>
                        {role.isCurrent && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 w-fit">
                            Current
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-muted leading-relaxed">
                        {role.summary}
                      </p>

                      <ul className="space-y-1.5 text-xs text-muted">
                        {role.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-accent mt-0.5 font-bold">›</span>
                            <span>
                              <strong className="text-foreground font-medium">{h.title}:</strong>{" "}
                              {h.description}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {role.tech.map((item) => (
                          <span
                            key={item}
                            className="px-2 py-0.5 rounded-[4px] border border-border bg-surface font-mono text-[10px] text-muted-dark"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
