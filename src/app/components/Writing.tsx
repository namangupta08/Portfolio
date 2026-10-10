import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { PostMeta } from "@/lib/blog";

export default function Writing({ posts }: { posts: PostMeta[] }) {
  const displayPosts = posts.slice(0, 3);

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
    <section id="writing" className="py-[72px] lg:py-[112px] border-t border-border">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-dark block">
              Writing
            </span>
            <h2 className="text-[2.25rem] font-semibold tracking-[-0.02em] text-foreground leading-tight mt-1">
              Articles & analysis
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-foreground hover:text-accent transition-colors group py-1"
          >
            <span>All posts</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3 Latest Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="p-6 rounded-[14px] border border-border bg-surface card-hover flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="space-y-3">
                {/* Meta: Date & Reading Time */}
                <div className="flex items-center gap-3 text-xs font-mono text-muted-dark">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.date)}</span>
                  </span>
                  <span className="text-border" aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readingTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-base text-foreground group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-muted leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              {/* Tags row */}
              <div className="pt-4 mt-4 border-t border-border/50 flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-1.5 py-0.5 rounded-[4px] bg-surface-subtle border border-border/60 text-muted-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
