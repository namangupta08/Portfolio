import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Naman Gupta",
  description: "Technical writing, performance benchmarks, and lessons learned from shipping production systems.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="py-12 sm:py-16 space-y-10 max-w-3xl">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to home</span>
        </Link>

        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-foreground">
            Blog
          </h1>
          <p className="mt-1 text-base text-muted">
            Writing on systems architecture, database indexing, and LLM automation.
          </p>
        </div>
      </div>

      {/* Plain list (newest first): date (mono), title, one-line description, reading time. No tags, no filters, no search, no images */}
      {posts.length === 0 ? (
        <div className="py-12 border-t border-border">
          <p className="font-mono text-sm text-muted">First posts coming soon</p>
        </div>
      ) : (
        <div className="divide-y divide-border border-t border-b border-border">
          {posts.map((post) => (
            <article key={post.slug} className="py-6 group">
              <Link
                href={`/blog/${post.slug}`}
                className="block space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-xs font-mono text-muted-dark">
                  <time dateTime={post.date}>{post.date}</time>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
