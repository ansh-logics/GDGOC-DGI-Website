"use client";

import { Event } from "@/types/event";
import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";

interface EventCardProps {
  event: Event;
  index?: number;
}

export default function EventCard({ event, index = 0 }: EventCardProps) {
  const eventDate = new Date(event.start);
  const formattedDate = format(eventDate, "MMM dd, yyyy");
  const formattedTime = format(eventDate, "h:mm a");

  const handleRSVP = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(event.commudleUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-30px", amount: 0.3 }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
    >
      {/* Thumbnail Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={event.thumbnailUrl}
          alt={event.title}
          loading="lazy"
          srcSet={`${event.thumbnailUrl}&w=400 400w, ${event.thumbnailUrl}&w=600 600w`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
              event.status === 'upcoming'
                ? 'bg-green-500/90 text-white'
                : event.status === 'ongoing'
                ? 'bg-blue-500/90 text-white'
                : 'bg-gray-500/90 text-white'
            }`}
          >
            {event.status === 'upcoming' ? 'Upcoming' : event.status === 'ongoing' ? 'Live' : 'Past Event'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date & Location */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2 min-h-[3.5rem]">
          {event.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
          {event.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
            >
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              +{event.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Host Info */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
          <img
            src={event.host.avatar}
            alt={event.host.name}
            className="w-8 h-8 rounded-full"
            loading="lazy"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{event.host.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{event.host.role}</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <Link
            href={`/events/${event.slug}`}
            className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full font-semibold text-sm text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:scale-105 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Details
          </Link>
          <button
            onClick={handleRSVP}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#4285f4] to-[#3367d6] text-white font-semibold text-sm rounded-full hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            RSVP
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>

      </div>
    </motion.article>
  );
}

