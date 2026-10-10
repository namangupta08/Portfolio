"use client";

import React, { useEffect, useState } from "react";

export default function SpotlightBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Fixed faint dotted grid */}
      <div
        className="fixed inset-0 pointer-events-none bg-dotted-grid z-0 opacity-40 dark:opacity-60"
        aria-hidden="true"
      />
      {/* Soft cursor-following spotlight in accent at ~6% opacity */}
      <div className="cursor-spotlight" aria-hidden="true" />
    </>
  );
}
