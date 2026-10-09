import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { personalData } from "@/data/portfolio";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import FadeIn from "@/app/components/FadeIn";

export const metadata: Metadata = {
  title: "Resume — Naman Gupta",
  description: "Curriculum Vitae and background of Naman Gupta, Full Stack Software Engineer.",
};

export default function ResumePage() {
  const resumeFilePath = path.join(process.cwd(), "public", "Naman-Gupta-Resume.pdf");
  const fileExists = fs.existsSync(resumeFilePath);

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to home</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Resume
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-muted">
                Last updated: <span className="font-mono text-foreground">{personalData.resume.lastUpdated}</span>
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2.5">
              <a
                href="/Naman-Gupta-Resume.pdf"
                download="Naman-Gupta-Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <a
                href="/Naman-Gupta-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface/50 text-foreground text-xs hover:border-foreground/30 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in new tab</span>
              </a>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Embedded Viewer */}
      {fileExists ? (
        <FadeIn delay={0.1}>
          <div className="w-full rounded-lg border border-border bg-surface/40 p-2 overflow-hidden shadow-sm">
            <object
              data="/Naman-Gupta-Resume.pdf"
              type="application/pdf"
              className="w-full h-[700px] sm:h-[850px] rounded border border-border/60 bg-background"
            >
              <iframe
                src="/Naman-Gupta-Resume.pdf#toolbar=0"
                className="w-full h-[700px] sm:h-[850px] rounded border border-border/60 bg-background"
                title="Naman Gupta Resume"
              >
                <div className="p-8 text-center text-sm text-muted space-y-3">
                  <p>Your browser does not support inline PDF viewing.</p>
                  <a
                    href="/Naman-Gupta-Resume.pdf"
                    download="Naman-Gupta-Resume.pdf"
                    className="inline-flex items-center gap-1.5 text-accent underline"
                  >
                    Click here to download Naman-Gupta-Resume.pdf directly
                  </a>
                </div>
              </iframe>
            </object>
          </div>
        </FadeIn>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-8 text-center space-y-3 bg-surface/20">
          <FileText className="w-8 h-8 text-muted mx-auto" />
          <h2 className="text-base font-semibold text-foreground">
            Resume file not found
          </h2>
          <p className="text-sm text-muted max-w-[50ch] mx-auto">
            Please place <code className="font-mono text-xs">Naman-Gupta-Resume.pdf</code> in the <code className="font-mono text-xs">/public</code> directory.
          </p>
        </div>
      )}
    </div>
  );
}