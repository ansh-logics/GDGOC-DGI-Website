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

  // 2️⃣ Convert AllEvents → EventCard format
  const formattedEvents = upcoming.map((e) => {
    const [d, m, y] = e.date.split("-");
    return {
      id: e.id,
      title: e.name,
      summary: e.desc,
      start: `${y}-${m}-${d}T${e.start}`, // convert to ISO
      end: `${y}-${m}-${d}T${Number(e.start.split(":")[0]) +(Number( e.end.split(':')[0])-Number(e.start.split(":")[0]))}:${e.start.split(":")[1]}`, // +2 hr dummy end time
      location: e.location,
      status: "upcoming",
      thumbnailUrl: e.thumbnailurl,
      commudleUrl: "#",
      tags: [e.slug], // or your own tags
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
      </div>
    </section>
  );
}
