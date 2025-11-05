"use client";

import { Event } from "@/types/event";
import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";

interface EventCardClassyProps {
  event: Event;
  index?: number;
}

export default function EventCardClassy({ event, index = 0 }: EventCardClassyProps) {
  const eventDate = new Date(event.start);
  const eventEndDate = new Date(event.end);
  const formattedDate = format(eventDate, "dd MMM, yyyy");
  const formattedTime = `${format(eventDate, "HH:mm")} - ${format(eventEndDate, "HH:mm")}`;

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
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300"
    >
      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.thumbnailUrl}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-white/95 text-gray-900 backdrop-blur-sm">
            {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
          </span>
        </div>

        {/* Tags overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {event.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-xs font-semibold bg-white/20 text-white backdrop-blur-md rounded-md border border-white/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-[3.5rem] leading-tight">
          {event.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {event.summary}
        </p>

        {/* Meta Info */}
        <div className="space-y-2 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{formattedDate}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{formattedTime}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium truncate">{event.location}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/events/${event.slug}`}
          className="block w-full px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-center font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  );
}

