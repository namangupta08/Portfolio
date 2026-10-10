"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  FolderGit2,
  BookOpen,
  FileText,
  Mail,
} from "lucide-react";

interface NavDockItem {
  name: string;
  href: string;
  icon: React.ElementType;
  isExternal?: boolean;
  sectionId?: string;
}

const dockItems: NavDockItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Experience", href: "/#experience", sectionId: "experience", icon: Briefcase },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Resume", href: "/resume", icon: FileText },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["experience", "projects", "writing", "about"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
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
        { rootMargin: "-30% 0px -50% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [pathname]);

  const isActive = (item: NavDockItem) => {
    if (item.href === "/" && pathname === "/" && (!activeSection || activeSection === "about")) {
      return true;
    }
    if (item.sectionId && pathname === "/" && activeSection === item.sectionId) {
      return true;
    }
    if (item.href !== "/" && !item.sectionId && pathname.startsWith(item.href)) {
      return true;
    }
    return false;
  };

  return (
    <nav
      aria-label="Bottom Navigation Dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-fit px-2 py-1.5 rounded-full border border-border bg-surface/90 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 flex items-center gap-1 transition-all duration-300"
    >
      {dockItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all btn-press ${
              active
                ? "bg-accent text-white dark:text-[#0A0A0B] font-semibold shadow-sm"
                : "text-muted hover:text-foreground hover:bg-surface-subtle"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">{item.name}</span>
          </Link>
        );
      })}

      <div className="h-4 w-px bg-border mx-0.5" aria-hidden="true" />

      {/* Quick email CTA button */}
      <a
        href="mailto:namangupta053@gmail.com"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono text-muted hover:text-foreground hover:bg-surface-subtle transition-colors btn-press"
        aria-label="Send email to Naman Gupta"
        title="Email Naman"
      >
        <Mail className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
      </a>
    </nav>
  );
}
