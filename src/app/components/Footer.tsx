"use client";

import React, { useState } from "react";
import { Github, Linkedin, Terminal, Mail, Check, Copy, ArrowUp } from "lucide-react";
import { socialLinks } from "@/data/links";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socialLinks.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-border mt-20 py-12 text-sm text-muted bg-surface/30">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Icon + Label Links */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5 font-mono text-xs">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
          >
            <Github className="w-3.5 h-3.5" aria-hidden="true" />
            <span>GitHub</span>
          </a>

          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
          >
            <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>

          <a
            href={socialLinks.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
          >
            <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
            <span>LeetCode</span>
          </a>

          <a
            href={socialLinks.emailMailto}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Email</span>
          </a>

          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-border bg-surface hover:border-foreground/30 text-foreground transition-colors btn-press text-[11px]"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-accent" aria-hidden="true" />
                <span className="text-accent font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-muted" aria-hidden="true" />
                <span>Copy email</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Back to top + Year */}
        <div className="flex items-center gap-6 font-mono text-xs text-muted-dark">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded p-0.5"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </button>

          <span className="text-border" aria-hidden="true">|</span>

          <span>© {currentYear} Naman Gupta</span>
        </div>
      </div>
    </footer>
  );
}
