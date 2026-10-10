"use client";

import React, { useEffect, useState } from "react";
import { Share2, Check, Copy, Twitter, Linkedin } from "lucide-react";

export function CodeBlockCopyManager() {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll(".shiki");

    codeBlocks.forEach((block) => {
      if (block.querySelector(".copy-code-btn")) return;

      const container = block as HTMLElement;
      container.style.position = "relative";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "copy-code-btn absolute top-2.5 right-2.5 px-2 py-1 rounded text-[11px] font-mono bg-surface border border-border text-muted hover:text-foreground transition-all opacity-0 group-hover:opacity-100 focus:opacity-100";
      btn.innerHTML = "Copy";
      btn.setAttribute("aria-label", "Copy code snippet");

      container.classList.add("group");

      btn.addEventListener("click", async () => {
        const code = container.querySelector("code")?.innerText || container.innerText;
        try {
          await navigator.clipboard.writeText(code);
          btn.innerHTML = "Copied!";
          btn.classList.add("text-accent");
          setTimeout(() => {
            btn.innerHTML = "Copy";
            btn.classList.remove("text-accent");
          }, 2000);
        } catch {}
      });

      container.appendChild(btn);
    });
  }, []);

  return null;
}

export function ShareRow({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url || `https://namangupta.dev/blog/${slug}`)}`;

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url || `https://namangupta.dev/blog/${slug}`
  )}`;

  return (
    <div className="py-4 border-y border-border flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
      <div className="flex items-center gap-2 text-muted-dark">
        <Share2 className="w-3.5 h-3.5" />
        <span className="uppercase tracking-[0.06em]">Share this post</span>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/30 transition-colors btn-press"
        >
          <Twitter className="w-3 h-3" />
          <span>Twitter</span>
        </a>

        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/30 transition-colors btn-press"
        >
          <Linkedin className="w-3 h-3" />
          <span>LinkedIn</span>
        </a>

        <button
          type="button"
          onClick={copyUrl}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/30 transition-colors btn-press"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-accent" />
              <span className="text-accent font-medium">Copied link</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
