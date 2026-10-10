"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, Download, ArrowUpRight } from "lucide-react";
import { SiGithub, SiLinkedin, SiLeetcode } from "react-icons/si";
import { socialLinks } from "@/data/links";
import { siteConfig } from "@/data/site";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(socialLinks.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="contact" className="py-[72px] lg:py-[112px] border-t border-border">
      <div className="p-8 sm:p-12 md:p-16 rounded-[14px] border border-border bg-surface card-hover space-y-8">
        {/* Large closing headline */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark block">
            Contact
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-tight">
            Let&apos;s build something.
          </h2>
          <p className="text-base text-muted max-w-prose leading-relaxed pt-1">
            I&apos;m currently open to SDE-1 roles and engineering conversations. Whether you want to discuss backend architecture, system design, or explore collaboration opportunities, my inbox is open.
          </p>
        </div>

        {/* Email as a big link with Copy button */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={socialLinks.emailMailto}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[10px] bg-accent text-white dark:text-[#0A0A0B] text-base font-semibold hover:brightness-105 btn-press shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>{socialLinks.email}</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy email address"
            className="inline-flex items-center gap-2 px-4 py-3.5 rounded-[10px] border border-border bg-surface-subtle text-sm font-mono text-foreground hover:border-foreground/30 btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-accent" aria-hidden="true" />
                <span className="text-accent font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-muted" aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Secondary Links & Download Resume row */}
        <div className="pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
          {/* GitHub, LinkedIn, LeetCode buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-border bg-surface-subtle text-xs font-mono text-muted hover:text-foreground hover:border-foreground/30 btn-press"
            >
              <SiGithub className="w-3.5 h-3.5" aria-hidden="true" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-muted-dark" aria-hidden="true" />
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-border bg-surface-subtle text-xs font-mono text-muted hover:text-foreground hover:border-foreground/30 btn-press"
            >
              <SiLinkedin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-muted-dark" aria-hidden="true" />
            </a>

            <a
              href={socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-border bg-surface-subtle text-xs font-mono text-muted hover:text-foreground hover:border-foreground/30 btn-press"
            >
              <SiLeetcode className="w-3.5 h-3.5" aria-hidden="true" />
              <span>LeetCode</span>
              <ArrowUpRight className="w-3 h-3 text-muted-dark" aria-hidden="true" />
            </a>
          </div>

          {/* Download resume button */}
          <a
            href={siteConfig.resume.path}
            download="Naman-Gupta-Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-surface text-xs font-mono text-foreground hover:border-foreground/30 btn-press"
          >
            <Download className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
            <span>Download resume</span>
          </a>
        </div>
      </div>
    </section>
  );
}
