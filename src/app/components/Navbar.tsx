"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { socialLinks } from "@/data/links";

interface NavItem {
  name: string;
  href: string;
  id?: string;
  isExternalPath?: boolean;
}

const navItems: NavItem[] = [
  { name: "About", href: "/#about", id: "about" },
  { name: "Experience", href: "/#experience", id: "experience" },
  { name: "Projects", href: "/#projects", id: "projects" },
  { name: "Blog", href: "/blog", isExternalPath: true },
  { name: "Resume", href: "/resume", isExternalPath: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Handle scroll detection and 2px accent progress line
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 10);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for section highlighting on homepage
  useEffect(() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/blog")) {
        setActiveSection("blog");
      } else if (pathname.startsWith("/resume")) {
        setActiveSection("resume");
      } else if (pathname.startsWith("/projects")) {
        setActiveSection("projects");
      } else {
        setActiveSection("");
      }
      return;
    }

    const sectionIds = ["hero", "activity", "about", "experience", "projects", "stack", "writing", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isItemActive = (item: NavItem) => {
    if (item.isExternalPath) {
      if (item.href === "/blog" && pathname.startsWith("/blog")) return true;
      if (item.href === "/resume" && pathname.startsWith("/resume")) return true;
      return false;
    }
    if (pathname === "/" && item.id && activeSection === item.id) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 backdrop-blur-md ${
        scrolled
          ? "bg-background/90 border-b border-border"
          : "bg-background/60 border-b border-transparent"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Round NG monogram + Naman Gupta */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md py-1"
        >
          <span className="w-8 h-8 rounded-full border border-border bg-surface flex items-center justify-center font-mono text-xs font-semibold text-foreground group-hover:border-foreground/40 transition-colors">
            NG
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
            Naman Gupta
          </span>
        </Link>

        {/* Center/Right Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-5">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs uppercase tracking-[0.08em] font-mono transition-colors py-1 sliding-underline ${
                    active
                      ? "text-accent font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="h-4 w-px bg-border" aria-hidden="true" />

          {/* Right actions: ThemeToggle + Contact Button */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={socialLinks.emailMailto}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface text-xs font-mono font-medium text-foreground hover:border-foreground/30 btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Mail className="w-3.5 h-3.5 text-muted" />
              <span>Contact</span>
            </a>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-md text-muted hover:text-foreground hover:bg-surface border border-border/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 2px accent scroll-progress line under the navbar */}
      <div
        className="h-[2px] bg-accent transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Mobile full-height slide-in menu with large links */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-x-0 top-[66px] bottom-0 z-50 bg-background/98 backdrop-blur-xl border-t border-border flex flex-col justify-between p-6 sm:p-8 md:hidden overflow-y-auto"
        >
          <nav className="flex flex-col space-y-6 pt-4">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-semibold tracking-tight transition-colors py-2 ${
                    active ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-border space-y-4 pb-6">
            <a
              href={socialLinks.emailMailto}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-accent text-white font-medium text-sm btn-press shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Contact via Email</span>
            </a>
            <div className="flex items-center justify-center gap-6 pt-2 font-mono text-xs text-muted">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                GitHub
              </a>
              <span className="text-border">·</span>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                LinkedIn
              </a>
              <span className="text-border">·</span>
              <a
                href={socialLinks.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                LeetCode
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
