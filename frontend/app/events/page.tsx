"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import EventCardClassy from "@/app/components/EventCardClassy";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import getAllEvents from "../api/controllers/getAllEvents";
import { AllEvents } from "@/types/event";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);

  // FILTER STATES
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");
  const [selectedSlug, setSelectedSlug] = useState<string | "all">("all");

  // Extracted filter lists
  const years = useMemo(
    () => [...new Set(pastEvents.map((e) => e.year))].sort((a, b) => b - a),
    [pastEvents]
  );

  const months = useMemo(
    () => [...new Set([...upcomingEvents, ...pastEvents].map((e) => e.month))].sort(),
    [upcomingEvents, pastEvents]
  );

  const slugs = useMemo(
    () => [...new Set([...upcomingEvents, ...pastEvents].map((e) => e.slug))],
    [upcomingEvents, pastEvents]
  );

  // Convert AllEvents → EventCardClassy format
  function convertEvent(e: AllEvents, status: string) {
    let [d, m, y] = e.date.split("-");

    if (d.length === 1) d = "0" + d;
    if (m.length === 1) m = "0" + m;

    return {
      id: e.id,
      title: e.name,
      summary: e.desc,
      start: `${y}-${m}-${d}T${e.start}`,
      end: `${y}-${m}-${d}T${e.end}`,
      location: e.location,
      thumbnailUrl: e.thumbnailurl,
      commudleUrl: e.commudleUrl || "#",
      status,
      tags: [e.slug],
      slug: e.slug,
      year: Number(y),
      month: Number(m),
    };
  }

  // Fetch & divide events
  useEffect(() => {
    async function load() {
      const all = await getAllEvents();
      const today = new Date();

      const upcoming: any[] = [];
      const past: any[] = [];

      all.forEach((e) => {
        const [d, m, y] = e.date.split("-");
        const eventDate = new Date(Number(y), Number(m) - 1, Number(d));

        if (eventDate >= today) upcoming.push(convertEvent(e, "upcoming"));
        else past.push(convertEvent(e, "past"));
      });

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    }

    load();
  }, []);

  // FILTER LOGIC
  const eventsToFilter = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  const displayedEvents = eventsToFilter.filter((e) => {
    const yearMatch = selectedYear === "all" || e.year === selectedYear;
    const monthMatch = selectedMonth === "all" || e.month === selectedMonth;
    const slugMatch = selectedSlug === "all" || e.slug === selectedSlug;
    return yearMatch && monthMatch && slugMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950 relative">
      <Navbar />

      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise"></div>
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-red-400/10 dark:bg-red-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-yellow-400/10 dark:bg-yellow-600/10 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">

        {/* HEADER */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm rounded-full border border-red-200 dark:border-red-800">
            All Events
          </div>

          <h1 className="text-5xl font-black mb-6 text-gray-900 dark:text-white tracking-tight">
            GDG{" "}
            <span className="bg-gradient-to-r from-[#FBBC04] via-[#EA4335] to-[#4285F4] bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join our workshops, study jams, and community events to level up your tech skills.
          </p>
        </motion.div>

        {/* TABS */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white dark:bg-gray-900 rounded-full p-1 border border-gray-200 dark:border-gray-800 shadow-sm">
            {/* UPCOMING TAB */}
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                activeTab === "upcoming"
                  ? "bg-gradient-to-r from-[#4285f4] to-[#3367d6] text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Upcoming ({upcomingEvents.length})
            </button>

            {/* PAST TAB */}
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                activeTab === "past"
                  ? "bg-gradient-to-r from-[#4285f4] to-[#3367d6] text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {/* YEAR FILTER (only for past) */}
          {activeTab === "past" && (
            <select
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(e.target.value === "all" ? "all" : Number(e.target.value))
              }
              className="px-4 py-2 bg-white dark:bg-gray-900 border rounded-xl"
            >
              <option value="all">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          )}

          {/* MONTH FILTER */}
          <select
            value={selectedMonth}
            onChange={(e) =>
              setSelectedMonth(e.target.value === "all" ? "all" : Number(e.target.value))
            }
            className="px-4 py-2 bg-white dark:bg-gray-900 border rounded-xl"
          >
            <option value="all">All Months</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* SLUG FILTER */}
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-900 border rounded-xl"
          >
            <option value="all">All Categories</option>
            {slugs.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </motion.div>

        {/* EVENTS GRID */}
        {displayedEvents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedEvents.map((event, i) => (
              <EventCardClassy key={event.id} event={event} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No events found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters.</p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
