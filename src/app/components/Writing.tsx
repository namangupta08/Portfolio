import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostMeta } from "@/lib/blog";

export default function Writing({ posts }: { posts: PostMeta[] }) {
  if (!posts || posts.length === 0) {
    return null; // Completely hide the home section if there are no published posts
  }

  const displayPosts = posts.slice(0, 3);

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
              Writing
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

        {/* 3 Latest Post Cards in plain style: date, title, one-line description, reading time */}
        <div className="divide-y divide-border border-t border-b border-border">
          {displayPosts.map((post) => (
            <article key={post.slug} className="py-5 group">
              <Link
                href={`/blog/${post.slug}`}
                className="block space-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-xs font-mono text-muted-dark">
                  <time dateTime={post.date}>{post.date}</time>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
