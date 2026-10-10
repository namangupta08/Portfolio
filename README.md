# Naman Gupta — Developer Portfolio

A refined, high-performance developer portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Motion (framer-motion), and Shiki.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Vanilla CSS design system with single terracotta accent)
- **Animation**: Motion (`framer-motion`) & CSS animations
- **Icons**: `lucide-react` & `react-icons/si`
- **Content**: MDX / Markdown via `gray-matter` & `marked`
- **Syntax Highlighting**: `shiki` dual light & dark themes

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy the example environment configuration:

```bash
cp .env.example .env.local
```

Available variables:
- `GITHUB_TOKEN`: Personal access token with `read:user` permissions to fetch contribution counts for `npm run activity`.
- `SHOW_DRAFTS`: Set to `true` during local development to review draft blog posts, or `false` on production deployments.

### 3. Generate Coding Activity Data

The coding activity grid reads statically from `data/activity.json` without making runtime API requests:

```bash
npm run activity
```

This merges your LeetCode submission history and GitHub contribution calendar day-by-day.

### 4. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm run start
```

---

## How to Add Content

### Adding a Project

All project data is stored in [`src/data/projects.ts`](src/data/projects.ts). Add a new object to `featuredProjects` or `moreProjects`:

```typescript
{
  slug: "my-project",
  name: "My Project",
  category: "Backend", // "Backend" | "Full-stack" | "AI"
  summary: "One-line description of the system and architecture.",
  stack: ["Node.js", "PostgreSQL", "Docker"],
  metricBadge: "Optional metric highlight",
  isFeatured: false,
  liveUrl: "https://example.com",
  githubUrl: "https://github.com/namangupta08/my-project",
}
```

### Adding a Blog Post

Create a new markdown file inside [`content/blog/`](content/blog/) (e.g. `content/blog/my-post.md`):

```markdown
---
title: "My Post Title"
date: "October 10, 2026"
description: "A concise summary of the article."
tags: ["system-design", "database"]
draft: true
---

Your content here...
```

Set `draft: false` when you are ready to publish the post.

---

## Deployment

Deploy directly to **Vercel**:

```bash
npx vercel
```

Ensure environment variables (`SHOW_DRAFTS=false`) are configured in the Vercel project settings.
