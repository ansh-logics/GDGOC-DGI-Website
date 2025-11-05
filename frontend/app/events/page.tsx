"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import EventCardClassy from "@/app/components/EventCardClassy";
import { Event } from "@/types/event";
import eventsData from "@/data/events.json";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function EventsPage() {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingEvents = eventsData.upcoming as Event[];
  const pastEvents = eventsData.past as Event[];

  // Get unique years and tags from past events
  const years = useMemo(() => {
    const uniqueYears = [...new Set(pastEvents.map(event => event.year))];
    return uniqueYears.sort((a, b) => b - a);
  }, [pastEvents]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    [...upcomingEvents, ...pastEvents].forEach(event => {
      event.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [upcomingEvents, pastEvents]);

  // Filter past events
  const filteredPastEvents = useMemo(() => {
    return pastEvents.filter(event => {
      const yearMatch = selectedYear === 'all' || event.year === selectedYear;
      const tagMatch = selectedTag === 'all' || event.tags.includes(selectedTag);
      return yearMatch && tagMatch;
    });
  }, [pastEvents, selectedYear, selectedTag]);

  // Filter upcoming events by tag
  const filteredUpcomingEvents = useMemo(() => {
    return upcomingEvents.filter(event => {
      const tagMatch = selectedTag === 'all' || event.tags.includes(selectedTag);
      return tagMatch;
    });
  }, [upcomingEvents, selectedTag]);

  const displayedEvents = activeTab === 'upcoming' ? filteredUpcomingEvents : filteredPastEvents;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950 relative">
      {/* Navbar */}
      <Navbar />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-red-400/10 dark:bg-red-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-yellow-400/10 dark:bg-yellow-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-full border border-red-200 dark:border-red-800 shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            All Events
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-tight tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
            GDG{' '}
            <span className="bg-gradient-to-r from-[#FBBC04] via-[#EA4335] to-[#4285F4] bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join our workshops, study jams, and community events to level up your tech skills
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white dark:bg-gray-900 rounded-full p-1 border border-gray-200 dark:border-gray-800 shadow-sm">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-[#4285f4] to-[#3367d6] text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Upcoming ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeTab === 'past'
                  ? 'bg-gradient-to-r from-[#4285f4] to-[#3367d6] text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
          </div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          {/* Year Filter (only for past events) */}
          {activeTab === 'past' && (
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="appearance-none px-4 py-2.5 pr-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}

          {/* Tag Filter */}
          <div className="relative">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="all">All Topics</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Clear Filters */}
          {((activeTab === 'past' && selectedYear !== 'all') || selectedTag !== 'all') && (
            <button
              onClick={() => {
                setSelectedYear('all');
                setSelectedTag('all');
              }}
              className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-medium text-sm"
            >
              Clear Filters
            </button>
          )}
        </motion.div>

        {/* Events Grid */}
        {displayedEvents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedEvents.map((event, index) => (
              <EventCardClassy key={event.id} event={event} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No events found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {activeTab === 'upcoming' 
                ? 'Check back soon for new events!' 
                : 'Try adjusting your filters'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

