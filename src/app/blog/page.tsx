import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import FadeIn from "@/app/components/FadeIn";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Naman Gupta",
  description: "Writings on backend systems, distributed queues, and LLM integrations.",
};

export default async function BlogIndexPage() {
  const publishedPosts = await getAllPosts(false);
  const allDrafts = await getAllPosts(true);

  return (
    <div className="space-y-12">
      <FadeIn>
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to home</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Blog
          </h1>
          <p className="text-sm text-muted max-w-[65ch]">
            Articles on system architecture, database performance, and practical LLM engineering.
          </p>
        </div>
      </FadeIn>

      {/* Published Posts */}
      {publishedPosts.length > 0 ? (
        <div className="divide-y divide-border border-y border-border">
          {publishedPosts.map((post) => (
            <article key={post.slug} className="py-6 space-y-2 group">
              <div className="flex items-center justify-between text-xs text-muted-dark font-mono">
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface border border-border text-muted-dark"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border p-6 text-center space-y-2 bg-surface/30">
          <p className="text-sm text-foreground font-medium">
            No published posts yet.
          </p>
          <p className="text-xs text-muted">
            Three draft outlines are currently staged in <code className="font-mono text-xs">/content/blog</code>.
          </p>
        </div>
      )}

      {/* Staged Draft Outlines (clearly marked) */}
      {allDrafts.some((p) => p.draft) && (
        <div className="space-y-4 pt-6 border-t border-border">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-dark font-mono">
              Upcoming Articles (Draft Outlines)
            </h2>
            <p className="text-xs text-muted">
              Outlines currently being drafted:
            </p>
          </div>

          <div className="space-y-3">
            {allDrafts
              .filter((p) => p.draft)
              .map((draft) => (
                <div
                  key={draft.slug}
                  className="rounded-lg border border-dashed border-border p-4 space-y-1.5 bg-surface/20"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/blog/${draft.slug}`}
                      className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                    >
                      {draft.title}
                    </Link>
                    <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded border border-border text-muted-dark">
                      Draft
                    </span>
                  </div>
                  <p className="text-xs text-muted">{draft.description}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
