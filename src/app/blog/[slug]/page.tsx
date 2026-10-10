import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { CodeBlockCopyManager, ShareRow } from "@/app/components/BlogPostEnhancements";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts(true);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, true);
  if (!post) return {};

  return {
    title: `${post.title} — Naman Gupta`,
    description: post.description,
    openGraph: {
      title: `${post.title} — Naman Gupta`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Naman Gupta`,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug, true);
  if (!post) {
    notFound();
  }

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
    <div className="py-12 sm:py-16">
      <CodeBlockCopyManager />

      <div className="space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>All posts</span>
          </Link>
        </div>

        {/* Post Header */}
        <div className="space-y-4 max-w-prose">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-dark">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.date)}</span>
            </span>
            <span className="text-border" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readingTime}</span>
            </span>
            {post.draft && (
              <>
                <span className="text-border" aria-hidden="true">·</span>
                <span className="px-2 py-0.5 rounded border border-border bg-surface text-[10px] uppercase font-mono text-accent">
                  Draft
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base text-muted leading-relaxed">
            {post.description}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] px-2 py-0.5 rounded-[4px] bg-surface border border-border text-muted-dark"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Two-column layout with Sticky Table of Contents on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-border pt-10">
          {/* Main Prose Content */}
          <div className="lg:col-span-8 max-w-prose space-y-10">
            {/* Mobile TOC */}
            {post.toc.length >= 2 && (
              <div className="block lg:hidden rounded-[10px] border border-border bg-surface p-4 space-y-2 text-xs">
                <div className="font-mono uppercase tracking-[0.08em] text-muted-dark text-[11px] font-semibold">
                  Table of Contents
                </div>
                <nav className="space-y-1.5">
                  {post.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-muted hover:text-accent transition-colors ${
                        item.level === 3 ? "pl-3 text-muted-dark" : ""
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />

            {/* Social Share Row */}
            <ShareRow title={post.title} slug={post.slug} />

            {/* Previous and Next Post Navigation */}
            <div className="pt-6 flex flex-col sm:flex-row items-stretch justify-between gap-4 text-xs font-mono">
              {post.prevPost ? (
                <Link
                  href={`/blog/${post.prevPost.slug}`}
                  className="p-4 rounded-[10px] border border-border bg-surface card-hover flex-1 space-y-1 group"
                >
                  <div className="flex items-center gap-1 text-muted-dark">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Previous</span>
                  </div>
                  <div className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
                    {post.prevPost.title}
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {post.nextPost ? (
                <Link
                  href={`/blog/${post.nextPost.slug}`}
                  className="p-4 rounded-[10px] border border-border bg-surface card-hover flex-1 space-y-1 text-right group"
                >
                  <div className="flex items-center justify-end gap-1 text-muted-dark">
                    <span>Next</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
                    {post.nextPost.title}
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </div>

          {/* Desktop Sticky Table of Contents */}
          {post.toc.length >= 2 && (
            <aside className="hidden lg:block lg:col-span-4 sticky top-24 self-start p-5 rounded-[12px] border border-border bg-surface space-y-3">
              <span className="font-mono uppercase tracking-[0.08em] text-muted-dark text-xs font-medium block">
                On this page
              </span>
              <nav className="space-y-2 text-xs font-mono">
                {post.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-muted hover:text-accent transition-colors leading-relaxed ${
                      item.level === 3 ? "pl-3 text-muted-dark text-[11px]" : ""
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
