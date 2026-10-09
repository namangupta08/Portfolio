import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-20 text-center space-y-4">
      <div className="font-mono text-sm uppercase tracking-wider text-muted-dark">
        404 — Page Not Found
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        This page could not be found.
      </h1>
      <p className="text-sm text-muted max-w-[45ch] mx-auto">
        The link you followed may be broken or the page may have been moved.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface text-xs font-medium text-foreground hover:border-foreground/30 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return home</span>
        </Link>
      </div>
    </div>
  );
}
