import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import BlogList from "@/app/components/BlogList";

export const metadata: Metadata = {
  title: "Blog — Naman Gupta",
  description: "Technical writings on systems architecture, database latency, and LLM automation pipelines.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts(true);

  return (
    <div className="py-12 sm:py-16 space-y-10">
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
          <p className="mt-1 text-base text-muted max-w-prose">
            Technical writing, performance benchmarks, and lessons learned from shipping production systems.
          </p>
        </div>
      </div>

      {/* Interactive Blog List with search and tags */}
      <BlogList posts={posts} />
    </div>
  );
}
