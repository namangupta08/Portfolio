import React from "react";
import Hero from "./components/Hero";
import Activity from "./components/Activity";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Writing from "./components/Writing";
import Contact from "./components/Contact";
import { getGitHubContributions } from "@/lib/github";
import { getAllPosts } from "@/lib/blog";

import fs from "fs";
import path from "path";

export const revalidate = 43200; // 12 hours cache for GitHub contributions & static pages

export default async function HomePage() {
  const [gitHubData, posts] = await Promise.all([
    getGitHubContributions("namangupta08"),
    getAllPosts(true), // Include posts for review
  ]);

  const publicDir = path.join(process.cwd(), "public");
  const hasAboutPhoto = fs.existsSync(path.join(publicDir, "about/me.jpg"));
  const existingLogos = {
    epigee: fs.existsSync(path.join(publicDir, "logos/epigee.png")),
    zevise: fs.existsSync(path.join(publicDir, "logos/zevise.png")),
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <Hero />

      {/* 2. ACTIVITY (GitHub grid) */}
      <Activity data={gitHubData} />

      {/* 3. ABOUT */}
      <About hasPhoto={hasAboutPhoto} />

      {/* 4. EXPERIENCE */}
      <Experience existingLogos={existingLogos} />

      {/* 5. PROJECTS (Selected work) */}
      <Projects />

      {/* 6. TECH STACK (Stack) */}
      <TechStack />

      {/* 7. WRITING */}
      <Writing posts={posts} />

      {/* 8. CONTACT */}
      <Contact />
    </div>
  );
}
