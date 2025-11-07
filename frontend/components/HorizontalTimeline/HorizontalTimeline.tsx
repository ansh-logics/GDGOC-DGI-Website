"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TimelineItem {
  id: string | number;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  link?: string;
}

export interface HorizontalTimelineProps {
  items: TimelineItem[];
  className?: string;
  initialActive?: number;
  onActiveChange?: (index: number, item: TimelineItem) => void;
}

export default function HorizontalTimeline({
  items,
  className = "",
  initialActive = 0,
  onActiveChange,
}: HorizontalTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(initialActive);
  const [isInView, setIsInView] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver to detect when timeline enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Detect active item based on scroll position
  const updateActiveItem = useCallback(() => {
    if (!scrollContainerRef.current || isDragging) return;

    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const itemRect = item.getBoundingClientRect();
      const itemCenterX = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(centerX - itemCenterX);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
      onActiveChange?.(closestIndex, items[closestIndex]);
    }
  }, [activeIndex, items, onActiveChange, isDragging]);

  // Scroll event listener - instant response
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isInView) return;

    let rafId: number;
    const handleScroll = () => {
      // Use requestAnimationFrame for smooth, instant updates
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveItem);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isInView, updateActiveItem]);

  // Horizontal scroll support - natural scrolling without hijacking vertical scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scroll (Shift + wheel or trackpad horizontal swipe)
      if (e.shiftKey && e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      } else if (Math.abs(e.deltaX) > 0) {
        // Natural horizontal scroll from trackpad
        // Let it happen naturally, don't prevent
        return;
      }
      // For vertical scroll (deltaY), let it pass through to scroll the page
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        newIndex = Math.max(0, index - 1);
        break;
      case "ArrowRight":
        e.preventDefault();
        newIndex = Math.min(items.length - 1, index + 1);
        break;
      case "Enter":
        e.preventDefault();
        if (items[index].link) {
          window.location.href = items[index].link!;
        }
        return;
      default:
        return;
    }

    if (newIndex !== index) {
      scrollToItem(newIndex);
      itemRefs.current[newIndex]?.focus();
    }
  };

  // Scroll to specific item
  const scrollToItem = (index: number) => {
    const item = itemRefs.current[index];
    if (!item || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const scrollLeft =
      item.offsetLeft - containerRect.width / 2 + itemRect.width / 2;

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });

    setActiveIndex(index);
    onActiveChange?.(index, items[index]);
  };

  // Calculate progress percentage
  const progressPercentage = items.length > 1 
    ? (activeIndex / (items.length - 1)) * 100 
    : 0;

  return (
    <div
      ref={containerRef}
      className={`horizontal-timeline-wrapper relative w-full py-16 md:py-24 ${className}`}
      role="region"
      aria-label="Timeline"
    >
      {/* Progress Line - positioned below cards with subtle fade edges */}
      <div className="absolute top-1/2 left-0 right-0 h-1 translate-y-32 pointer-events-none z-0 overflow-hidden">
        {/* Base line with subtle fade effect */}
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-800"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}
        />
        {/* Progress gradient with subtle fade effect */}
        <motion.div
          className="h-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04]"
          initial={{ width: "0%" }}
          animate={{ width: isInView ? `${progressPercentage}%` : "0%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}
        />
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory relative z-10"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="inline-flex items-center gap-8 md:gap-16 px-[50vw] min-h-[400px]">
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={`timeline-item snap-center flex-shrink-0 relative ${
                  isActive ? "z-10" : "z-0"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  y: isInView ? 0 : 20,
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-active={isActive}
                tabIndex={0}
                role="button"
                aria-label={`Timeline item ${index + 1}: ${item.title}`}
                aria-current={isActive ? "step" : undefined}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onClick={() => scrollToItem(index)}
              >
                {/* Tick Marker - aligned with progress line */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-32 z-10">
                  <motion.div
                    className={`w-5 h-5 rounded-full border-4 ${
                      isActive
                        ? "bg-[#4285F4] border-white dark:border-gray-900 shadow-lg"
                        : "bg-gray-300 dark:bg-gray-700 border-white dark:border-gray-900"
                    }`}
                    animate={{
                      scale: isActive ? 1.3 : 1,
                    }}
                    transition={{ 
                      duration: 0.15,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  />
                </div>

                {/* Card */}
                <motion.div
                  className={`timeline-card w-72 md:w-80 p-6 rounded-2xl cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-gray-900 shadow-2xl border-2 border-[#4285F4]"
                      : "bg-white/60 dark:bg-gray-900/60 shadow-md border border-gray-200 dark:border-gray-800 hover:shadow-lg"
                  }`}
                  animate={{
                    y: isActive ? -20 : 0,
                    scale: isActive ? 1.05 : 0.95,
                  }}
                  transition={{ 
                    duration: 0.15,
                    ease: [0.25, 0.1, 0.25, 1], // Faster, snappier easing
                  }}
                  whileHover={{ scale: isActive ? 1.05 : 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Date Badge */}
                  {item.date && (
                    <div
                      className={`inline-block px-3 py-1 mb-3 rounded-full text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? "bg-[#4285F4] text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {item.date}
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className={`text-xl md:text-2xl font-bold mb-2 transition-colors duration-150 ${
                      isActive
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  {item.subtitle && (
                    <p
                      className={`text-sm md:text-base font-medium mb-3 transition-colors duration-150 ${
                        isActive
                          ? "text-[#4285F4]"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  {item.description && (
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ 
                            opacity: 1, 
                            height: "auto",
                            marginTop: "0.75rem"
                          }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ 
                            duration: 0.15,
                            ease: [0.25, 0.1, 0.25, 1],
                            opacity: { duration: 0.12 }
                          }}
                          className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed overflow-hidden"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Link Indicator */}
                  {item.link && isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.15,
                        delay: 0.08,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      className="mt-4 flex items-center gap-2 text-[#4285F4] text-sm font-semibold"
                    >
                      Learn more
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400"
      >
        <div className="flex items-center justify-center gap-4">
          <span className="hidden md:inline">Scroll or use arrow keys to navigate</span>
          <span className="md:hidden">Swipe to explore</span>
          <div className="flex gap-2">
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">←</kbd>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">→</kbd>
          </div>
        </div>
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .timeline-card {
          backdrop-filter: blur(10px);
        }
        .timeline-item:focus {
          outline: 2px solid #4285F4;
          outline-offset: 4px;
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
}

