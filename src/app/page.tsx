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

export const revalidate = 43200; // 12 hours cache for GitHub contributions & static pages

export default async function HomePage() {
  const [gitHubData, posts] = await Promise.all([
    getGitHubContributions("namangupta08"),
    getAllPosts(true), // Include posts for review
  ]);

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <Hero />

      {/* 2. ACTIVITY (GitHub grid) */}
      <Activity data={gitHubData} />

      {/* 3. ABOUT */}
      <About />

      {/* 4. EXPERIENCE */}
      <Experience />

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
