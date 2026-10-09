import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { codeToHtml } from "shiki";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft: boolean;
  readingTime: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface Post extends PostMeta {
  content: string;
  htmlContent: string;
  toc: TocItem[];
  prevPost?: PostMeta | null;
  nextPost?: PostMeta | null;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export async function getAllPosts(includeDrafts: boolean = false): Promise<PostMeta[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts: PostMeta[] = [];

  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;

    const slug = file.replace(/\.mdx?$/, "");
    const fullPath = path.join(BLOG_DIR, file);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContents);

    const isDraft = Boolean(data.draft);
    if (isDraft && !includeDrafts) {
      continue;
    }

    posts.push({
      slug,
      title: data.title || slug,
      date: data.date ? String(data.date) : "Recent",
      description: data.description || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      draft: isDraft,
      readingTime: calculateReadingTime(content),
    });
  }

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(
  slug: string,
  includeDrafts: boolean = false
): Promise<Post | null> {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const extensions = [".md", ".mdx"];
  let fullPath = "";
  for (const ext of extensions) {
    const candidate = path.join(BLOG_DIR, `${slug}${ext}`);
    if (fs.existsSync(candidate)) {
      fullPath = candidate;
      break;
    }
  }

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);

  const isDraft = Boolean(data.draft);
  if (isDraft && !includeDrafts) {
    return null;
  }

  // Parse Table of Contents & Headings
  const toc: TocItem[] = [];
  const renderer = new marked.Renderer();

  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map((t) => ("text" in t ? t.text : "")).join("");
    const id = slugify(text);
    if (depth === 2 || depth === 3) {
      toc.push({ id, text, level: depth });
    }
    return `<h${depth} id="${id}" class="group scroll-mt-20 font-semibold tracking-tight text-foreground ${
      depth === 1
        ? "text-2xl mt-8 mb-4"
        : depth === 2
        ? "text-xl mt-8 mb-3"
        : "text-lg mt-6 mb-2"
    }">
      <a href="#${id}" class="inline-flex items-center gap-1.5 no-underline hover:text-accent">
        ${text}
        <span class="opacity-0 group-hover:opacity-100 text-muted-dark text-sm transition-opacity">#</span>
      </a>
    </h${depth}>`;
  };

  // Convert markdown to tokens and render code blocks with Shiki
  const tokens = marked.lexer(content);
  for (const token of tokens) {
    if (token.type === "code") {
      try {
        const highlighted = await codeToHtml(token.text, {
          lang: token.lang || "text",
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
        });
        token.text = highlighted;
        token.type = "html";
      } catch {
        // Leave raw if language unsupported
      }
    }
  }

  const htmlContent = marked.parser(tokens, { renderer });

  // Get prev and next posts
  const allPosts = await getAllPosts(includeDrafts);
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

  return {
    slug,
    title: data.title || slug,
    date: data.date ? String(data.date) : "Recent",
    description: data.description || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: isDraft,
    readingTime: calculateReadingTime(content),
    content,
    htmlContent,
    toc,
    prevPost,
    nextPost,
  };
}

export async function generateRssFeed(): Promise<string> {
  const siteUrl = "https://namangupta.dev";
  const posts = await getAllPosts(false); // Only published posts in public RSS

  const itemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Naman Gupta — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Engineering writings, systems insights, and LLM automation pipelines.</description>
    <language>en</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;
}
