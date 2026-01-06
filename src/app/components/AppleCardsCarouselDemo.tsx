"use client";
import React from "react";
import Link from "next/link";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { Carousel, Card } from "@/app/components/ui/apple-cards-carousel";

const ResponsiveContent = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    {children}
  </div>
);

const ResponsiveLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-blue-500 hover:underline block text-center sm:text-left mb-4">
    {children}
  </Link>
);

const ResponsiveTweet = ({ tweetId }: { tweetId: string }) => (
  <div className="w-full max-w-md mx-auto">
    <TwitterTweetEmbed tweetId={tweetId} />
  </div>
);

const ResponsiveIframe = ({ src, height, width, title }: { src: string; height: string; width: string; title: string }) => (
  <div className="aspect-w-16 aspect-h-9 w-full max-w-2xl mx-auto">
    <iframe
      src={src}
      height={height}
      width={width}
      frameBorder="0"
      allowFullScreen
      title={title}
      className="w-full h-full"
    />
  </div>
);



export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-8 max-sm:pt-8 max-sm:pb-0">
      
      <Carousel items={cards} />
    </div>
  );
}
export const data = [
  {
    title: "VistaVoyage",
    category: "VistaVoyage is an AI-powered trip planner designed to help users create personalized, budget-friendly travel itineraries.",
    link: "https://vistavoyage-ai-trip-planner.vercel.app/",
    src: "/assests/VoyageVista.png",
    content: (
      <ResponsiveContent>
        <ResponsiveLink href="https://music-nest.vercel.app/">
          <h2 className="text-xl font-bold mb-4">LeetRank</h2>
        </ResponsiveLink>
        <ResponsiveTweet tweetId="1861796092905423137" />
      </ResponsiveContent>
    ),
  },
  {
    title: "Swift-Cab",
    category: "Swift Cab, a full-stack ride-hailing application built using the MERN stack. 🚀 This app allows users to book rides and captains to accept them.",
    link: "https://swift-cab.vercel.app/",
    src: "/assests/SwiftCab.png",
    content: (
      <ResponsiveContent>
        <ResponsiveLink href="https://music-nest.vercel.app/">
          <h2 className="text-xl font-bold mb-4">PlayPals</h2>
        </ResponsiveLink>
        <ResponsiveTweet tweetId="1847921574952735143" />
      </ResponsiveContent>
    ),
  },
    {
      category: "Study Notion is an edtech platform that provides courses students can purchase and learn, offering a seamless experience for both students and teachers to manage and track educational content.",
      title: "Study Notion",
      link: "https://study-notion-edtech-tau.vercel.app/",
      src: "/assests/StudyNotion.png",
      content: (
        <ResponsiveContent>
          <ResponsiveLink href="https://videoverse-two.vercel.app/signin">
            <h2 className="text-xl font-bold mb-4">VideoVerse</h2>
          </ResponsiveLink>
          <ResponsiveTweet tweetId="1818734036598092229" />
        </ResponsiveContent>
      ),
    },
    {
      title: "Semeless",
      category: "Semeless is your short-form EdTech platform designed for fast-paced learners. Learn skills in minutes, not hours. Perfect for students, professionals, and lifelong learners.",
      link: "https://www.semeless.com/",
      src: "/assests/Semeless.png",
      content: (
        <ResponsiveContent>
          <ResponsiveLink href="https://music-nest.vercel.app/">
            <h2 className="text-xl font-bold mb-4">Music Nest</h2>
          </ResponsiveLink>
          <ResponsiveTweet tweetId="1833074210379338095" />
        </ResponsiveContent>
      ),
    },
      {
      title: "Mini Labs",
      link: "https://minilabs.instruindia.com/",
      category: "Empowering students to explore, build and understand.",
      src: "/assests/MiniLabs.png",
      content: (
        <ResponsiveContent>
          <ResponsiveIframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7230140304245317633"
            height="961"
            width="504"
            title="Temflo Pvt Ltd Website LinkedIn Post"
          />
        </ResponsiveContent>
      ),
    },
   
    {
      title: "Temflo Pvt Ltd. Website",
      link: "https://www.temflo.co.in/",
      category: "Freelance project for Temflo Pvt. Ltd.",
      src: "/assests/Temflow.png",
      content: (
        <ResponsiveContent>
          <ResponsiveIframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7230140304245317633"
            height="961"
            width="504"
            title="Temflo Pvt Ltd Website LinkedIn Post"
          />
        </ResponsiveContent>
      ),
    },
    
  ];