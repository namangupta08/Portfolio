"use client";
import React, { useState, useEffect } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { data } from "./AppleCardsCarouselDemo";

export function ProjectsSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const projects = data;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    }
  };

  const goToSlide = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Disable body scroll
    document.body.style.overflow = "hidden";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
      } else if (e.key === "ArrowRight") {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Re-enable body scroll when component unmounts
      document.body.style.overflow = "auto";
    };
  }, [projects.length]);

  const currentProject = projects[currentIndex];

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex items-center justify-center py-20 px-4 z-40">
      <div className="w-[80%] h-[70vh] relative overflow-hidden bg-black rounded-3xl shadow-2xl">
        {/* Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={projects.length === 0}
        >
          <IconArrowNarrowLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={projects.length === 0}
        >
          <IconArrowNarrowRight className="h-6 w-6 text-white" />
        </button>

        {/* Slide Counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="text-white text-sm font-medium">
            {currentIndex + 1} / {projects.length}
          </span>
        </div>

        {/* Slideshow Content */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            {/* Image Section - Full Width */}
            <div className="w-full h-full relative">
              <Image
                src={currentProject.src}
                alt={currentProject.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 z-10">
                <p className="text-white/80 text-sm md:text-base font-medium mb-2">
                  {currentProject.category}
                </p>
                <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
                  {currentProject.title}
                </h2>
                {currentProject.link && (
                  <Link
                    href={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg text-white font-semibold transition-all text-base md:text-lg"
                  >
                    View Project →
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

