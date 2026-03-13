"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import EventCardClassy from "@/app/components/EventCardClassy";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import getAllEvents from "../api/controllers/getAllEvents";
import { AllEvents } from "@/types/event";
import { useAuth } from "@/app/context/AuthContext";
import { isAdminEmail } from "@/lib/utils";

export default function EventsPage() {
  const { user } = useAuth();
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATES
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");
  const [selectedSlug, setSelectedSlug] = useState<string | "all">("all");

  // Extracted filter lists
  const years = useMemo(
    () => [...new Set(allEvents.map((e) => e.year))].sort((a, b) => b - a),
    [allEvents]
  );

  const months = useMemo(
    () => [...new Set(allEvents.map((e) => e.month))].sort(),
    [allEvents]
  );

  const slugs = useMemo(
    () => [...new Set(allEvents.map((e) => e.slug))],
    [allEvents]
  );

  // Convert AllEvents → EventCardClassy format
  function convertEvent(e: AllEvents, status: string) {
    let [d, m, y] = e.date.split("-");

    const pad = (n: string) => n.padStart(2, "0");
    d = pad(d);
    m = pad(m);

    const startISO = e.start.includes("T")
      ? e.start
      : `${y}-${m}-${d}T${e.start}`;
    const endISO = e.end.includes("T")
      ? e.end
      : `${y}-${m}-${d}T${e.end}`;

    return {
      id: e.id,
      title: e.name,
      summary: e.desc,
      start: startISO,
      end: endISO,
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

  // Fetch & prepare events
  useEffect(() => {
    async function load() {
      const all = await getAllEvents();
      const today = new Date();

      const merged: any[] = [];

      all.forEach((e) => {
        const [d, m, y] = e.date.split("-");
        const eventDate = new Date(Number(y), Number(m) - 1, Number(d));

        const status = eventDate >= today ? "upcoming" : "past";
        merged.push(convertEvent(e, status));
      });

      setAllEvents(merged);
      setLoading(false);
    }

    load();
  }, []);

  // FILTER LOGIC
  const displayedEvents = allEvents.filter((e) => {
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

          <h1 className="text-5xl font-black mb-4 text-gray-900 dark:text-white tracking-tight">
            GDG{" "}
            <span className="bg-gradient-to-r from-[#FBBC04] via-[#EA4335] to-[#4285F4] bg-clip-text text-transparent">
              Events
            </span>
          </h1>

          {user && isAdminEmail(user.email) && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/admin/events"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#4285f4] to-[#3367d6] shadow-md hover:opacity-90 transition-opacity"
              >
                Manage events
              </Link>
              <Link
                href="/admin/events/new"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Create event
              </Link>
            </div>
          )}
        </motion.div>

        {/* FILTERS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {/* YEAR FILTER */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(e.target.value === "all" ? "all" : Number(e.target.value))
              }
              className="appearance-none pl-5 pr-10 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/20 focus:border-[#4285F4] hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer shadow-sm"
            >
              <option value="all">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* MONTH FILTER */}
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(e.target.value === "all" ? "all" : Number(e.target.value))
              }
              className="appearance-none pl-5 pr-10 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/20 focus:border-[#4285F4] hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer shadow-sm"
            >
              <option value="all">All Months</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* SLUG FILTER */}
          <div className="relative">
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="appearance-none pl-5 pr-10 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/20 focus:border-[#4285F4] hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer shadow-sm"
            >
              <option value="all">All Categories</option>
              {slugs.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* EVENTS GRID */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/70 dark:border-gray-800/70 shadow-medium p-5 animate-pulse space-y-4"
              >
                <div className="h-40 rounded-2xl bg-gray-200/80 dark:bg-gray-800/80" />
                <div className="h-4 w-3/4 rounded-full bg-gray-200/80 dark:bg-gray-800/80" />
                <div className="h-3 w-1/2 rounded-full bg-gray-200/70 dark:bg-gray-800/70" />
                <div className="h-3 w-2/3 rounded-full bg-gray-200/70 dark:bg-gray-800/70" />
              </div>
            ))}
          </motion.div>
        ) : displayedEvents.length > 0 ? (
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
