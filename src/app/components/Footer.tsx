"use client";

import React, { useState } from "react";
import { personalData } from "@/data/portfolio";
import { Github, Linkedin, Code2, Mail, Copy, Check } from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is unavailable
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border mt-24 py-12 text-sm text-muted">
      <div className="max-w-[720px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Social / Contact Links */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 link-hover text-muted hover:text-accent transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 link-hover text-muted hover:text-accent transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <a
            href={personalData.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 link-hover text-muted hover:text-accent transition-colors"
          >
            <Code2 className="w-4 h-4" />
            <span>LeetCode</span>
          </a>

          <a
            href={personalData.socials.email}
            className="inline-flex items-center gap-1.5 link-hover text-muted hover:text-accent transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs border border-border hover:border-foreground/30 text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-accent" />
                <span className="text-accent font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy email</span>
              </>
            )}
          </button>
        </div>

        {/* Copyright */}
        <div className="text-xs text-muted-dark font-mono">
          © {currentYear} {personalData.name}
        </div>
      </div>
    </footer>
  );
}
