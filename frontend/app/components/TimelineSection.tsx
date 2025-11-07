"use client";

import { motion } from "framer-motion";
import HorizontalTimeline from "@/components/HorizontalTimeline/HorizontalTimeline";
import timelineData from "@/data/timeline.json";

export default function TimelineSection() {
  const handleActiveChange = (index: number, item: any) => {
    // Optional: Track analytics or perform other actions
    console.log("Active timeline item:", index, item);
  };

  return (
    <section
      id="timeline"
      className="min-h-screen flex items-center py-24 px-6 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/10 dark:to-gray-950 relative overflow-hidden"
    >
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-green-400/10 dark:bg-green-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-800 shadow-sm">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Our Journey
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Milestones &{" "}
            <span className="bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC04] bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our journey from a small group of tech enthusiasts to a
            thriving community of developers
          </p>
        </motion.div>

        {/* Timeline Component */}
        <HorizontalTimeline
          items={timelineData.milestones}
          initialActive={0}
          onActiveChange={handleActiveChange}
        />
      </div>
    </section>
  );
}

