import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

  return (
    <article className="space-y-10">
      {/* Header & Meta */}
      <div className="space-y-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>All posts</span>
        </Link>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-dark font-mono">
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <span>{post.readingTime}</span>
            {post.draft && (
              <>
                <span>•</span>
                <span className="px-1.5 py-0.5 rounded border border-border text-muted-dark uppercase text-[10px]">
                  Draft Outline
                </span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-muted leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
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
        )}
      </div>

      {/* Table of contents for longer posts */}
      {post.toc.length >= 2 && (
        <aside className="rounded-lg border border-border bg-surface/30 p-4 space-y-2 text-xs">
          <div className="font-mono uppercase tracking-wider text-muted-dark text-[11px] font-semibold">
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
        </aside>
      )}

      {/* Prose Content */}
      <div
        className="prose-content max-w-none border-t border-border pt-6"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />

      {/* Post navigation */}
      <div className="border-t border-border pt-8 flex items-center justify-between gap-4 text-xs">
        {post.prevPost ? (
          <Link
            href={`/blog/${post.prevPost.slug}`}
            className="flex items-center gap-1.5 text-muted hover:text-accent transition-colors text-left"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1">{post.prevPost.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {post.nextPost ? (
          <Link
            href={`/blog/${post.nextPost.slug}`}
            className="flex items-center gap-1.5 text-muted hover:text-accent transition-colors text-right ml-auto"
          >
            <span className="line-clamp-1">{post.nextPost.title}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}
