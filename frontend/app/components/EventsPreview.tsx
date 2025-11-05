"use client";

import { motion } from "framer-motion";
import EventCardClassy from "./EventCardClassy";
import { Event } from "@/types/event";
import Link from "next/link";

interface EventsPreviewProps {
  upcomingEvents: Event[];
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
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-full border border-red-200 dark:border-red-800 shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upcoming Events
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-tight tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
            Learn, connect, and{' '}
            <span className="bg-gradient-to-r from-[#FBBC04] via-[#EA4335] to-[#4285F4] bg-clip-text text-transparent">
              build together
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join our workshops, study jams, and community events to level up your tech skills
          </p>
        </motion.div>

        {/* Events Grid */}
        {previewEvents.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {previewEvents.map((event, index) => (
                <EventCardClassy key={event.id} event={event} index={index} />
              ))}
            </div>

            {/* See All Events Button */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4285f4] to-[#3367d6] text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                See All Events
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No upcoming events yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Check back soon for new events!</p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-full font-semibold text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:scale-105"
            >
              View Past Events
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

