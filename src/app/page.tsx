import React from "react";
import Link from "next/link";
import { personalData, experiences, projects, experienceFootnote } from "@/data/portfolio";
import { getGitHubContributions } from "@/lib/github";
import { getAllPosts } from "@/lib/blog";
import GitHubGrid from "./components/GitHubGrid";
import ProjectCard from "./components/ProjectCard";
import FadeIn from "./components/FadeIn";
import { ArrowUpRight, Github, Linkedin, Code2, Mail, MapPin } from "lucide-react";

export default async function HomePage() {
  const [gitHubData, posts] = await Promise.all([
    getGitHubContributions("namangupta08"),
    getAllPosts(false),
  ]);

  const latestPosts = posts.slice(0, 2);

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* 1. Hero Section */}
      <section className="space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {personalData.name}
            </h1>
            <span className="inline-flex items-center gap-1 text-xs text-muted font-mono">
              <MapPin className="w-3.5 h-3.5 text-muted-dark" />
              {personalData.location}
            </span>
          </div>

          <p className="text-base sm:text-lg text-muted font-medium">
            {personalData.headline}
          </p>

          {/* Personality 1: Tiny status line with small pulsing dot in accent color */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-muted bg-surface/50 border border-border px-2.5 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span>{personalData.status}</span>
          </div>
        </div>

        {/* One-line intro */}
        <p className="text-base sm:text-lg text-foreground leading-relaxed max-w-[65ch]">
          {personalData.oneLineIntro}
        </p>

        {/* Social / contact quick links */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface/40 text-xs text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-muted-dark" />
          </a>

          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface/40 text-xs text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-muted-dark" />
          </a>

          <a
            href={personalData.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface/40 text-xs text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>LeetCode</span>
            <ArrowUpRight className="w-3 h-3 text-muted-dark" />
          </a>

          <a
            href={personalData.socials.email}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface/40 text-xs text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
        </div>
      </section>

      {/* 2. About (3 lines) */}
      <FadeIn className="border-t border-border pt-12 sm:pt-16 space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-muted-dark">
          About
        </h2>
        <div className="space-y-3 text-sm sm:text-base text-foreground leading-relaxed max-w-[65ch]">
          <p>
            I am a Full Stack Software Engineer based in Delhi, India.
          </p>
          <p>
            I engineer backend architectures and frontend web applications, integrating LLM features where they deliver concrete automation and measurable efficiency.
          </p>
          <p>
            Currently developing financial reconciliation pipelines and intelligent workflow systems at Epigee Inc.
          </p>
        </div>
      </FadeIn>

      {/* 3. Experience Section */}
      <FadeIn className="border-t border-border pt-12 sm:pt-16 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-dark">
            Experience
          </h2>
        </div>

        <div className="space-y-10">
          {experiences.map((exp) => (
            <div key={exp.id} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="text-sm text-muted font-medium">
                    {exp.company}
                  </div>
                </div>
                <div className="text-xs font-mono text-muted-dark">
                  {exp.period}
                </div>
              </div>

              <ul className="space-y-2 text-sm text-muted leading-relaxed">
                {exp.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="relative pl-5 before:content-['–'] before:absolute before:left-0 before:text-muted-dark"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Required footnote under Experience section */}
        <p className="text-xs text-muted-dark italic border-t border-border/50 pt-3">
          &ldquo;{experienceFootnote}&rdquo;
        </p>
      </FadeIn>

      {/* 4. Projects Section (shows top 3) */}
      <FadeIn className="border-t border-border pt-12 sm:pt-16 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-dark">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
          >
            <span>View all</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-6">
          {projects.slice(0, 3).map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priorityImage={idx === 0}
            />
          ))}
        </div>
      </FadeIn>

      {/* 5. GitHub Activity Grid */}
      <FadeIn className="border-t border-border pt-12 sm:pt-16 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-dark">
            GitHub Activity
          </h2>
          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
          >
            <span>@namangupta08</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <GitHubGrid data={gitHubData} />
      </FadeIn>

      {/* 6. Latest Posts (2) */}
      <FadeIn className="border-t border-border pt-12 sm:pt-16 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-dark">
            Latest Posts
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
          >
            <span>All posts</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="divide-y divide-border">
            {latestPosts.map((post) => (
              <article key={post.slug} className="py-4 space-y-1.5 group">
                <div className="flex items-center justify-between text-xs text-muted-dark font-mono">
                  <time dateTime={post.date}>{post.date}</time>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border p-5 text-center text-xs text-muted bg-surface/30 space-y-1">
            <p className="font-medium text-foreground">
              New articles in progress
            </p>
            <p className="text-muted-dark">
              See upcoming outlines on the{" "}
              <Link href="/blog" className="text-accent underline">
                blog page
              </Link>
              .
            </p>
          </div>
        )}
      </FadeIn>
    </div>
  );
}
