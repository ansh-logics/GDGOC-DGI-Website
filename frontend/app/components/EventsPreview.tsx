"use client";

import { motion } from "framer-motion";
import EventCardClassy from "./EventCardClassy";
import { AllEvents } from "@/types/event";
import Link from "next/link";

interface EventsPreviewProps {
  upcomingEvents: AllEvents[];
}

export default function EventsPreview({ upcomingEvents }: EventsPreviewProps) {
  // Show only first 3 upcoming events
  const previewEvents = upcomingEvents.slice(0, 3);

  return (
    <section
      id="events"
      className="min-h-screen flex items-center py-24 px-6 bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950 relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-red-400/10 dark:bg-red-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-yellow-400/10 dark:bg-yellow-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Soft launch message */}
        <motion.div
          className="flex flex-col items-center justify-center min-h-[300px] text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="text-6xl md:text-7xl lg:text-8xl">🚀</span>
          </motion.div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Something awesome is brewing!
          </h3>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            We're cooking up some epic GDG events and workshops. Stay tuned—our lineup drops soon! ✨
          </p>
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-500 italic">
            In the meantime, grab some coffee ☕ and keep this tab open.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

