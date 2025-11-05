"use client";

import { motion } from "framer-motion";

export default function Events() {
  const events = [
    {
      title: "Android Study Jam 2024",
      date: "December 15, 2024",
      time: "2:00 PM - 5:00 PM",
      speaker: "Sarah Chen",
      role: "Android GDE",
      type: "Workshop",
      color: "blue",
      gradient: "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
      accent: "#4285f4"
    },
    {
      title: "Cloud Next Extended",
      date: "January 20, 2025",
      time: "10:00 AM - 4:00 PM",
      speaker: "Michael Rodriguez",
      role: "Cloud Architect",
      type: "Conference",
      color: "red",
      gradient: "from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20",
      accent: "#ea4335"
    },
    {
      title: "ML Bootcamp: TensorFlow",
      date: "February 5, 2025",
      time: "1:00 PM - 6:00 PM",
      speaker: "Dr. Priya Patel",
      role: "ML Engineer",
      type: "Bootcamp",
      color: "yellow",
      gradient: "from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20",
      accent: "#fbbc04"
    },
    {
      title: "Flutter Forward Meetup",
      date: "February 18, 2025",
      time: "3:00 PM - 6:00 PM",
      speaker: "Alex Thompson",
      role: "Flutter Developer",
      type: "Meetup",
      color: "green",
      gradient: "from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20",
      accent: "#34a853"
    },
    {
      title: "Web Performance Workshop",
      date: "March 8, 2025",
      time: "2:00 PM - 5:00 PM",
      speaker: "Emma Wilson",
      role: "Web Platform Lead",
      type: "Workshop",
      color: "blue",
      gradient: "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
      accent: "#4285f4"
    },
    {
      title: "DevFest 2025",
      date: "March 25, 2025",
      time: "9:00 AM - 6:00 PM",
      speaker: "Multiple Speakers",
      role: "Community Event",
      type: "Festival",
      color: "red",
      gradient: "from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20",
      accent: "#ea4335"
    }
  ];

  return (
    <section id="events" className="min-h-screen flex items-center py-24 px-6 relative bg-white dark:bg-gray-950">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise"></div>
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-yellow-400/10 dark:bg-yellow-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-400/10 dark:bg-red-600/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px", amount: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400 text-sm font-medium rounded-full border border-yellow-200 dark:border-yellow-800 shadow-sm">
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
            Join us for workshops, talks, and hands-on sessions with Google technologies and industry experts
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
              viewport={{ once: true, margin: "-30px", amount: 0.3 }}
              key={index}
              className="group relative bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Event Type Badge */}
              <div className="flex items-center justify-between mb-4">
                <span 
                  className="px-3 py-1.5 text-xs font-semibold rounded-full text-white shadow-md"
                  style={{ backgroundColor: event.accent }}
                >
                  {event.type}
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Open</span>
                </div>
              </div>

              {/* Event Title */}
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {event.title}
              </h3>

              {/* Date & Time */}
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-600 dark:text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{event.date}</span>
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{event.time}</span>
              </div>

              {/* Speaker Info */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 flex items-center justify-center font-semibold text-gray-700 dark:text-gray-300 border-soft">
                  {event.speaker.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">{event.speaker}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{event.role}</div>
                </div>
              </div>

              {/* RSVP Button */}
              <button
                className="w-full py-3 text-white font-semibold rounded-full transition-all duration-200 group-hover:scale-[1.02] shadow-md hover:shadow-lg"
                style={{ backgroundColor: event.accent }}
              >
                RSVP Now →
              </button>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-[#4285F4] to-[#3367d6] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="flex items-center gap-2">
              View All Events
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

