"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center py-24 px-6 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 relative">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/5 dark:bg-blue-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-400/5 dark:bg-green-600/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px", amount: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-800 shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About Us
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-tight tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
              Building tomorrow's<br />
              <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
                innovators
              </span>, today
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              GDG on Campus is a university-based community group for students interested in Google developer technologies. Students from all undergraduate and graduate programs with an interest in growing as developers are welcome.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              By joining GDG on Campus, students get access to Google technology, events, and resources to build their skills, network with peers, and prepare for their careers in tech.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                🤖 Android Development
              </span>
              <span className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                ☁️ Cloud Computing
              </span>
              <span className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                🧠 Machine Learning
              </span>
              <span className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                🌐 Web Development
              </span>
              <span className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                🎯 Flutter
              </span>
            </div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, margin: "-50px", amount: 0.3 }}
          >
            <div className="group p-6 bg-white dark:bg-gray-900 rounded-3xl border border-blue-100 dark:border-blue-900/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-[#4285f4] to-[#3367d6] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Learn & Grow</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Workshops, study jams, and hands-on sessions with cutting-edge Google technologies.</p>
            </div>

            <div className="group p-6 bg-white dark:bg-gray-900 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-[#ea4335] to-[#c5221f] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Connect & Network</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Meet like-minded peers, industry experts, and Google Developer Experts.</p>
            </div>

            <div className="group p-6 bg-white dark:bg-gray-900 rounded-3xl border border-green-100 dark:border-green-900/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-[#34a853] to-[#188038] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Build & Innovate</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Participate in hackathons, build real projects, and solve real-world problems.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

