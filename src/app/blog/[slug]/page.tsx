import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeBlockCopyManager } from "@/app/components/BlogPostEnhancements";

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
    <article className="py-12 sm:py-16 max-w-[65ch] mx-auto space-y-10">
      <CodeBlockCopyManager />

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

      {/* Header: Title, Date, Reading time */}
      <header className="space-y-3 border-b border-border pb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-foreground leading-[1.2]">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-xs font-mono text-muted-dark">
          <time dateTime={post.date}>{post.date}</time>
          <span className="text-border" aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
          {post.draft && (
            <>
              <span className="text-border" aria-hidden="true">·</span>
              <span className="px-2 py-0.5 rounded border border-border bg-surface text-[10px] uppercase font-mono text-accent">
                Draft
              </span>
            </>
          )}
        </div>
      </header>

      {/* Post Prose Content with syntax highlighted code blocks */}
      <div
        className="prose-content leading-[1.75]"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />

      {/* Previous and Next Post Navigation */}
      <nav
        aria-label="Previous and Next Posts"
        className="pt-10 border-t border-border flex flex-col sm:flex-row items-stretch justify-between gap-4 text-xs font-mono"
      >
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
      </nav>
    </article>
  );
}
