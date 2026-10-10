import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/links";
import { ArrowLeft, Download, ExternalLink, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume — Naman Gupta",
  description: "Curriculum Vitae and background of Naman Gupta, Full Stack Software Engineer.",
};

export default function ResumePage() {
  const resumeFilePath = path.join(process.cwd(), "public", "Naman-Gupta-Resume.pdf");
  const fileExists = fs.existsSync(resumeFilePath);

  return (
    <div className="py-12 sm:py-16 space-y-8">
      {/* Top Header */}
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to home</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-foreground">
              Resume
            </h1>
            <p className="mt-1 text-xs font-mono text-muted">
              Last updated <span className="text-foreground">{siteConfig.resume.lastUpdated}</span>
            </p>
          </div>

          {/* Action buttons (only show download/open if file exists) */}
          {fileExists && (
            <div className="flex items-center gap-3">
              <a
                href="/Naman-Gupta-Resume.pdf"
                download="Naman-Gupta-Resume.pdf"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-accent text-white dark:text-[#0A0A0B] text-xs font-mono font-medium hover:brightness-105 btn-press shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <a
                href="/Naman-Gupta-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-border bg-surface text-foreground text-xs font-mono hover:border-foreground/30 btn-press transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-muted" />
                <span>Open in new tab</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Embedded Viewer (80vh height) or Resume coming soon fallback */}
      {fileExists ? (
        <>
          {/* Mobile Notice */}
          <div className="block sm:hidden p-4 rounded-[10px] bg-surface-subtle border border-border text-center space-y-2">
            <p className="text-xs text-muted">
              Mobile browsers do not always support inline PDF preview. Use the buttons above to download or open the resume in a new tab.
            </p>
          </div>

          <div className="w-full rounded-[14px] border border-border bg-surface p-2 overflow-hidden shadow-sm">
            <object
              data="/Naman-Gupta-Resume.pdf#toolbar=0"
              type="application/pdf"
              className="w-full h-[80vh] rounded-[10px] border border-border/60 bg-background"
            >
              <iframe
                src="/Naman-Gupta-Resume.pdf#toolbar=0"
                className="w-full h-[80vh] rounded-[10px] border border-border/60 bg-background"
                title="Naman Gupta Resume"
              >
                <div className="p-8 text-center text-sm text-muted space-y-3">
                  <p>Your browser does not support inline PDF viewing.</p>
                  <a
                    href="/Naman-Gupta-Resume.pdf"
                    download="Naman-Gupta-Resume.pdf"
                    className="inline-flex items-center gap-1.5 text-accent underline"
                  >
                    Download Naman-Gupta-Resume.pdf directly
                  </a>
                </div>
              </iframe>
            </object>
          </div>
        </>
      ) : (
        <div className="rounded-[14px] border border-border bg-surface p-12 sm:p-16 text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-surface-subtle border border-border flex items-center justify-center mx-auto text-muted">
            <FileText className="w-6 h-6 text-muted-dark" aria-hidden="true" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-semibold text-foreground">
              Resume coming soon
            </h2>
            <p className="text-sm text-muted max-w-[45ch] mx-auto leading-relaxed">
              My updated resume is currently being finalized. In the meantime, feel free to reach out directly via email.
            </p>
          </div>

          <div className="pt-2">
            <a
              href={socialLinks.emailMailto}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white dark:text-[#0A0A0B] text-xs font-mono font-semibold hover:brightness-105 btn-press shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{socialLinks.email}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}