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

  // 1️⃣ Filter past events based on date (dd-mm-yyyy) and sort by newest first
  const past = upcomingEvents.filter(event => {
    const [d, m, y] = event.date.split("-");
    const eventDate = new Date(Number(y), Number(m) - 1, Number(d));
    return eventDate < today;
  }).sort((a, b) => {
    const [d1, m1, y1] = a.date.split("-");
    const [d2, m2, y2] = b.date.split("-");
    return new Date(Number(y2), Number(m2) - 1, Number(d2)).getTime() -
      new Date(Number(y1), Number(m1) - 1, Number(d1)).getTime();
  });

  // 2️⃣ Convert AllEvents → Event format
  const formattedEvents = past.slice(0, 6).map((e) => {
    const [d, m, y] = e.date.split("-");
    const pad = (n: string) => n.padStart(2, "0");
    const startISO = e.start.includes("T") ? e.start : `${y}-${pad(m)}-${pad(d)}T${e.start}`;
    const endISO = e.end.includes("T") ? e.end : `${y}-${pad(m)}-${pad(d)}T${e.end}`;

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
      className="min-h-screen flex items-center py-24 px-6 bg-white dark:bg-gray-950 relative overflow-hidden"
    >
      {/* Decorative Gradients - Clean & Minimal */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/5 dark:bg-red-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px", amount: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 text-sm font-medium rounded-full border border-blue-100 dark:border-blue-900 shadow-sm border-blue-200 dark:border-red-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Past Events
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-tight tracking-tight font-heading">
            Relive our{' '}
            <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
              memorable moments
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-body">
            Explore workshops, hackathons, and sessions that have shaped our community
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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-heading">
              No past events found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-body">
              Check back later for updates.
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
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#4285F4] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:bg-[#3367d6] transition-all duration-300"
            >
              <span className="font-heading">View All Events</span>
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
