import React from "react";
import Hero from "./components/Hero";
import Activity from "./components/Activity";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Writing from "./components/Writing";
import Contact from "./components/Contact";
import { getActivityData } from "@/lib/activity";
import { getAllPosts } from "@/lib/blog";

import fs from "fs";
import path from "path";

export const revalidate = 43200; // 12 hours cache for static pages

export default async function HomePage() {
  const activityData = getActivityData();
  const posts = await getAllPosts(true); // Include posts for review

  const publicDir = path.join(process.cwd(), "public");
  const existingLogos = {
    epigee: fs.existsSync(path.join(publicDir, "logos/epigee.png")),
    zevise: fs.existsSync(path.join(publicDir, "logos/zevise.png")),
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <Hero />

      {/* 2. ACTIVITY (Coding activity grid) */}
      <Activity data={activityData} />

      {/* 3. ABOUT */}
      <About />

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
