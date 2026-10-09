# Naman Gupta — Portfolio

A minimal, calm, single-column portfolio designed for clarity and fast review. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lucide React. Deployed on Vercel.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Icons**: Lucide React
- **Animations**: Framer Motion (respects `prefers-reduced-motion`)
- **Syntax Highlighting**: Shiki (dual light/dark theme support)
- **Deployment**: Vercel

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

Fill in `GITHUB_TOKEN` with your GitHub personal access token (used server-side to fetch GraphQL contribution calendar data cached for 12 hours).

> **Important Note on GitHub Contributions**: Private repository activity is only included if you have enabled **"Include private contributions"** under your GitHub profile settings (*Profile settings > Contribution settings > Include private contributions*). If no token is provided or the API is unreachable, the site automatically falls back to a verified static snapshot.

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
3. In project settings, add the environment variable:
   - `GITHUB_TOKEN`: Your GitHub token
4. Click **Deploy**.

---

## 📁 How to Add a Project

All project data is centralized and typed in `src/data/portfolio.ts`. To add a project:

1. Open `src/data/portfolio.ts`.
2. Add a new object to the `projects` array:
```ts
{
  slug: "my-project",
  title: "My Project",
  stack: ["Next.js", "TypeScript", "PostgreSQL"],
  summary: "A one-line summary of what the project does and key engineering metrics.",
  live: "https://myproject.com", // optional
  github: "https://github.com/username/my-project", // optional
  detail: {
    problem: "Description of the core challenge.",
    whatIBuilt: "Summary of the solution.",
    howItWorks: "Technical breakdown of architecture and data flow.",
    results: "Measurable outcomes and performance stats.",
    whatIWouldImprove: "Future enhancements and technical debt.",
  },
}
```
3. Place an image preview at `/public/projects/<slug>.png` (e.g. `/public/projects/my-project.png`). If missing, a neutral placeholder will be displayed automatically.

---

## ✍️ How to Add a Blog Post

Articles are standard Markdown or MDX files stored in `content/blog/`.

1. Create a new file: `content/blog/my-new-post.md`.
2. Include the following frontmatter at the top:
```markdown
---
title: "Article Title"
date: "2026-10-10"
description: "A short 1-2 sentence description of the post."
tags: ["SystemDesign", "Next.js", "Performance"]
draft: false
---

# Article Title

Your content goes here in Markdown. Code blocks are automatically highlighted with Shiki:

```typescript
export function example(): string {
  return "hello world";
}
```
```
3. Set `draft: true` while writing. Drafts will not be shown publicly on the home page or in the RSS feed.

---

## 🎨 Changing the Accent Color

The entire site uses a single terracotta accent color defined as a CSS variable in `src/app/globals.css`:
```css
:root {
  --accent: #c4552e; /* Light theme accent */
  --accent-rgb: 196, 85, 46;
}

.dark {
  --accent: #d97753; /* Dark theme accent */
  --accent-rgb: 217, 119, 83;
}
```
Updating `--accent` in `src/app/globals.css` immediately changes link hovers, focus rings, the active nav item, and the highest GitHub activity tier across both themes.
