# Naman Gupta — Portfolio

Senior-grade, high-performance personal portfolio built for taste, clarity, and measurable engineering accomplishments.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Lucide React**, **React Icons (Si)**, and **Shiki**.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Curated Vanilla CSS Variables (Dark theme hero look: near-black `#0A0A0B`, surfaces `#111113`, borders white @ 8%, text `#EDEDED` / `#A1A1AA`)
- **Accent Color**: Single muted warm terracotta (`--accent: #D06A4C` dark / `#C85A32` light)
- **Typography**: Geist Sans (display & body) + Geist Mono (labels, metrics, chips)
- **Icons**: Lucide React (UI) + React Icons / Si (Tech logos)
- **Animations**: Framer Motion (respects `prefers-reduced-motion`)
- **Syntax Highlighting**: Shiki (dual light/dark theme support)
- **Data Layer**: Centralized strictly in `/data` (`experience.ts`, `projects.ts`, `stack.ts`, `links.ts`, `site.ts`)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure the following variables:
- `GITHUB_TOKEN`: Your GitHub personal access token (used server-side to fetch GraphQL contribution calendar data cached for 12 hours). If left empty, the site displays a verified, clearly labeled static snapshot.
- `SHOW_DRAFTS`: Set to `true` to view draft blog posts staged in `/content/blog`. Set to `false` in production.

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## ☁️ Deploying on Vercel

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. In Project Settings > Environment Variables, add:
   - `GITHUB_TOKEN`: Your GitHub token
   - `SHOW_DRAFTS`: `false` (or `true` if you wish to review staged drafts)
4. Click **Deploy**.

---

## 📁 How to Add a Project

All project data lives in `src/data/projects.ts` (re-exported to `data/projects.ts`). To add a project:

1. Open `src/data/projects.ts`.
2. Add a new object to either `featuredProjects` (bento layout) or `moreProjects` (compact grid):
```ts
{
  slug: "new-system",
  name: "New System",
  category: "Backend", // "Backend" | "Full-stack" | "AI"
  summary: "A two-line summary of what the system does and its measurable impact.",
  stack: ["Node.js", "PostgreSQL", "Docker"],
  metricBadge: "p95 24 ms", // optional
  isFeatured: true,
  bentoSpan: "half", // "full" or "half"
  screenshot: "/projects/new-system.png",
  liveUrl: "https://demo.example.com", // optional
  githubUrl: "https://github.com/namangupta08/new-system", // optional
  detail: {
    problem: "Description of the problem.",
    whatIBuilt: "Overview of what was built.",
    howItWorks: "Detailed architectural breakdown.",
    results: "Empirical performance or test results.",
    whatIWouldImprove: "Technical trade-offs and next steps.",
  },
}
```
3. Place an image preview at `/public/projects/<slug>.png`. If missing, a neutral placeholder with the project name is automatically displayed.

---

## ✍️ How to Add a Blog Post

Articles are standard Markdown or MDX files stored in `content/blog/`.

1. Create a new file: `content/blog/my-new-post.md`.
2. Include the frontmatter at the top:
```markdown
---
title: "Article Title"
date: "2026-10-10"
description: "A short 1-2 sentence description of the post."
tags: ["SystemDesign", "PostgreSQL", "Performance"]
draft: true
---

# Article Title

Your content goes here. Headings automatically generate anchor links and table-of-contents entries. Code blocks are automatically highlighted with dual light/dark Shiki themes:

```typescript
export function runWorker(): void {
  console.log("Worker executing");
}
```
```
3. Set `draft: false` when ready to publish publicly. When `draft: true`, posts are visible only when `SHOW_DRAFTS=true`.

---

## 🎨 Changing the Accent Color

The design uses a single muted warm terracotta accent. To modify it, update `--accent` and `--accent-rgb` in `src/app/globals.css`:
```css
:root {
  --accent: #C85A32;
  --accent-rgb: 200, 90, 50;
}

.dark {
  --accent: #D06A4C;
  --accent-rgb: 208, 106, 76;
}
```
Everything else in the UI remains completely neutral.
