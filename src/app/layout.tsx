import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://namangupta.dev"),
  title: {
    default: "Naman Gupta — Full Stack Software Engineer",
    template: "%s | Naman Gupta",
  },
  description:
    "Full Stack Software Engineer in Delhi, India. Building backend and frontend systems, and adding LLM features where they help.",
  authors: [{ name: "Naman Gupta" }],
  creator: "Naman Gupta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://namangupta.dev",
    title: "Naman Gupta — Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer in Delhi, India. Building backend and frontend systems, and adding LLM features where they help.",
    siteName: "Naman Gupta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naman Gupta — Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer in Delhi, India. Building backend and frontend systems, and adding LLM features where they help.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-foreground min-h-screen flex flex-col antialiased selection:bg-accent/20 selection:text-foreground`}
      >
        <Navbar />
        <main className="flex-1 max-w-[720px] w-full mx-auto px-6 py-12 sm:py-16">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
