"use client";

import { motion } from "framer-motion";
import EventCardClassy from "./EventCardClassy";
import { AllEvents } from "@/types/event";

interface EventsPreviewProps {
  upcomingEvents: AllEvents[];
}

export default function EventsPreview({ upcomingEvents }: EventsPreviewProps) {
  console.log("Raw events:", upcomingEvents);

  const today = new Date();

  // 1️⃣ Filter upcoming events based on date (dd-mm-yyyy)
  const upcoming = upcomingEvents.filter(event => {
    const [d, m, y] = event.date.split("-");
    const eventDate = new Date(Number(y), Number(m) - 1, Number(d));
    return eventDate >= today;
  });

  // 2️⃣ Convert AllEvents → Event format
  const formattedEvents = upcoming.map((e) => {
    const [d, m, y] = e.date.split("-");
    const startISO = `${y}-${m}-${d}T${e.start}`;
    const endISO = `${y}-${m}-${d}T${e.end}`;
    
    return {
      id: e.id,
      title: e.name,
      slug: e.slug,
      summary: e.desc,
      description: e.desc, // Use desc for both
      startTime: e.start,
      endTime: e.end,
      Date: e.date,
      location: e.location,
      venu: e.location, // Use location for venue
      bannerUrl: e.thumbnailurl,
      thumbnailUrl: e.thumbnailurl,
      commudleUrl: e.commudleUrl || "#",
      tag: e.slug,
      tags: [e.slug],
      status: "upcoming",
      start: startISO, // For date-fns parsing
      end: endISO,
    };
  });

  console.log("Formatted for UI:", formattedEvents);

  return (
    <section
      id="events"
      className="min-h-screen flex items-center py-24 px-6 bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950 relative"
    >
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px", amount: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-sm font-medium rounded-full border border-red-200 dark:border-red-800 shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upcoming Events
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-tight tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
            Join our{' '}
            <span className="bg-gradient-to-r from-[#FBBC04] via-[#EA4335] to-[#4285F4] bg-clip-text text-transparent">
              next events
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover workshops, talks, and hands-on sessions with Google technologies and industry experts
          </p>
        </motion.div>

        {formattedEvents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {formattedEvents.map((event, index) => (
              <EventCardClassy key={event.id} event={event} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No upcoming events found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Stay tuned! New events will appear here.
            </p>
          </motion.div>
        )}

        {/* View All Link */}
        {formattedEvents.length > 0 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <a 
              href="/events"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4285F4] to-[#3367d6] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span>View All Events</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
