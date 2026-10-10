import React from "react";
import fs from "fs";
import path from "path";
import ExecutiveHero from "./components/ExecutiveHero";
import ProjectSlideshow from "./components/ProjectSlideshow";
import QuickDeck from "./components/QuickDeck";
import TechStack from "./components/TechStack";

export const revalidate = 43200; // 12 hours cache for static pages

export default async function HomePage() {
  const publicDir = path.join(process.cwd(), "public");
  const hasAboutPhoto = fs.existsSync(path.join(publicDir, "about/me.jpg"));

  return (
    <div className="space-y-10 sm:space-y-12 pb-24 sm:pb-28">
      {/* 1. EXECUTIVE HERO: Name, Details, About Me, Socials & Collapsed Experience */}
      <ExecutiveHero hasPhoto={hasAboutPhoto} />

      {/* 2. PROJECT SLIDESHOW: Interactive 1-by-1 Project Slideshow */}
      <section id="projects">
        <ProjectSlideshow />
      </section>

      {/* 3. QUICK DECK: Cards for Projects, Blogs, Resume, LinkedIn, LeetCode, GitHub */}
      <section id="navigation-deck">
        <QuickDeck />
      </section>

      {/* 4. TECH STACK: Colored Technology Icons Below */}
      <TechStack />
    </div>
  );
}
