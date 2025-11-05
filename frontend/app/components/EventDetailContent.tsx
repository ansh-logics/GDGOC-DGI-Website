"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Event } from "@/types/event";
import { format } from "date-fns";
import Link from "next/link";

interface EventDetailContentProps {
  event: Event;
}

export default function EventDetailContent({ event }: EventDetailContentProps) {
  const [expandedAgendaItems, setExpandedAgendaItems] = useState<Set<number>>(new Set());
  
  const eventDate = new Date(event.start);
  const eventEndDate = new Date(event.end);
  const formattedDate = format(eventDate, "EEEE, MMMM dd, yyyy");
  const formattedTime = `${format(eventDate, "h:mm a")} - ${format(eventEndDate, "h:mm a")}`;

  const toggleAgendaItem = (index: number) => {
    const newSet = new Set(expandedAgendaItems);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedAgendaItems(newSet);
  };

  const handleRSVP = () => {
    window.open(event.commudleUrl, '_blank', 'noopener,noreferrer');
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'slides':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'recording':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'blog':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      case 'repo':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case 'docs':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Back Button */}
      <div className="pt-24 px-4 sm:px-6 md:px-12 pb-4">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Back to Events</span>
        </Link>
      </div>

      {/* Hero Banner with Padding */}
      <div className="px-4 sm:px-6 md:px-12 pb-8">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-gray-900 rounded-2xl md:rounded-3xl max-h-[60vh]">
          <img
            src={event.bannerUrl}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
          
          {/* Event Status Badge */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <span
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-full backdrop-blur-sm ${
                event.status === 'upcoming'
                  ? 'bg-green-500/90 text-white'
                  : event.status === 'ongoing'
                  ? 'bg-blue-500/90 text-white'
                  : 'bg-gray-500/90 text-white'
              }`}
            >
              {event.status === 'upcoming' ? 'Upcoming Event' : event.status === 'ongoing' ? 'Live Now' : 'Past Event'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 relative z-10 pb-24">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
        >
          {/* Title Section */}
          <div className="p-8 md:p-12 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
              {event.title}
            </h1>

            {/* Meta Info */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Date</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Time</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">{formattedTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Location</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">{event.location}</p>
                  {event.venue && <p className="text-sm text-gray-600 dark:text-gray-400">{event.venue}</p>}
                </div>
              </div>

              {event.capacity && event.registered !== undefined && (
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Attendance</p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{event.registered} / {event.capacity} registered</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* RSVP Button - Only for upcoming events */}
            {event.status === 'upcoming' && (
              <button
                onClick={handleRSVP}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#4285f4] to-[#3367d6] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                RSVP on Commudle
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            )}
          </div>

          {/* Host Info */}
          <div className="p-8 md:p-12 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Hosted By</h3>
            <div className="flex items-center gap-4">
              <img
                src={event.host.avatar}
                alt={event.host.name}
                className="w-16 h-16 rounded-full shadow-lg"
              />
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{event.host.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{event.host.role}</p>
              </div>
              <div className="flex gap-2">
                {event.host.email && (
                  <a
                    href={`mailto:${event.host.email}`}
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                    aria-label="Email"
                  >
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                )}
                {event.host.linkedin && (
                  <a
                    href={event.host.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
                {event.host.github && (
                  <a
                    href={event.host.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-8 md:p-12 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>About This Event</h3>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {event.description.split('\n').map((paragraph, idx) => (
                paragraph.trim() && <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="p-8 md:p-12 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>Speakers</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {event.speakers.map((speaker, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={speaker.avatar}
                        alt={speaker.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{speaker.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{speaker.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{speaker.bio}</p>
                    {speaker.social && (
                      <div className="flex gap-2">
                        {speaker.social.linkedin && (
                          <a
                            href={speaker.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        )}
                        {speaker.social.twitter && (
                          <a
                            href={speaker.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                          </a>
                        )}
                        {speaker.social.github && (
                          <a
                            href={speaker.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Agenda */}
          {event.agenda && event.agenda.length > 0 && (
            <div className="p-8 md:p-12 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>Event Agenda</h3>
              <div className="space-y-3">
                {event.agenda.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAgendaItem(idx)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1 text-left">
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg">
                          {item.time}
                        </span>
                        <span className="text-base font-semibold text-gray-900 dark:text-white">{item.title}</span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                          expandedAgendaItems.has(idx) ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedAgendaItems.has(idx) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-4"
                      >
                        <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                        {item.speaker && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            <span className="font-medium">Speaker:</span> {item.speaker}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources (for past events) */}
          {event.status === 'past' && event.resources && event.resources.length > 0 && (
            <div className="p-8 md:p-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>Event Resources</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Access slides, recordings, code, and more</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {event.resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        {getResourceIcon(resource.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base font-semibold text-gray-900 dark:text-white">{resource.title}</h4>
                          <svg className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                        {resource.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{resource.description}</p>
                        )}
                        {resource.license && (
                          <span className="inline-block mt-2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {resource.license}
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Blog Post Link (for past events) */}
          {event.status === 'past' && event.blogPostUrl && (
            <div className="p-8 md:p-12 bg-yellow-50 dark:bg-yellow-900/10 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Event Recap Blog Post</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Read our detailed writeup about this event</p>
                  <a
                    href={event.blogPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border-2 border-yellow-200 dark:border-yellow-800 rounded-full font-semibold text-sm text-gray-900 dark:text-white hover:border-yellow-400 dark:hover:border-yellow-600 transition-all hover:scale-105"
                  >
                    Read Blog Post
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Lessons Learned (for past events) */}
          {event.status === 'past' && event.lessonsLearned && (
            <div className="p-8 md:p-12 bg-green-50 dark:bg-green-900/10">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Lessons Learned</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{event.lessonsLearned}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Floating RSVP Button (Mobile) - Only for upcoming events */}
        {event.status === 'upcoming' && (
          <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
            <button
              onClick={handleRSVP}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#4285f4] to-[#3367d6] text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              RSVP on Commudle
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

