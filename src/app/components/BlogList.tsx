"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Calendar, Clock, Tag } from "lucide-react";
import { PostMeta } from "@/lib/blog";

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag =
        selectedTag === "All" || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Box and Tag Filters */}
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-muted-dark absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-border bg-surface text-sm text-foreground placeholder:text-muted-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        </div>

        {/* Tag filter chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark mr-1 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            <span>Tags:</span>
          </span>
          {allTags.map((tag) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-[6px] font-mono text-[11px] transition-all btn-press ${
                  active
                    ? "bg-accent text-white font-medium shadow-sm"
                    : "border border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Posts list */}
      {filteredPosts.length > 0 ? (
        <div className="space-y-4 divide-y divide-border/60">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="pt-6 first:pt-0 group">
              <div className="p-6 rounded-[14px] border border-border bg-surface card-hover flex flex-col justify-between space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-muted-dark">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(post.date)}</span>
                    </span>
                    <span className="text-border" aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingTime}</span>
                    </span>
                  </div>

                  {post.draft && (
                    <span className="px-2 py-0.5 rounded border border-border bg-surface-subtle text-[10px] uppercase tracking-wider font-mono text-muted-dark">
                      Draft preview
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-sm text-muted leading-relaxed">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-2 py-0.5 rounded-[4px] bg-surface-subtle border border-border text-muted-dark"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-[14px] border border-dashed border-border bg-surface/30 text-center space-y-2">
          <p className="text-sm font-medium text-foreground">No posts found</p>
          <p className="text-xs text-muted">
            Try adjusting your search query or selected tag filter.
          </p>
        </div>
      )}
    </div>
  );
}
