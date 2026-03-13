"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";

interface FormattedEvent {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description?: string;
  start: string; // ISO date string
  end: string; // ISO date string
  location: string;
  thumbnailUrl: string;
  bannerUrl?: string;
  commudleUrl: string;
  status: string;
  tags: string[];
  tag?: string;
  startTime?: string;
  endTime?: string;
  Date?: string;
  venu?: string;
  year?: number;
  month?: number;
}

interface EventCardClassyProps {
  event: FormattedEvent;
  index?: number;
}

export default function EventCardClassy({ event, index = 0 }: EventCardClassyProps) {
  const eventDate = new Date(event.start);
  const eventEndDate = new Date(event.end);
  let formattedDate = "TBA";
  let formattedTime = "TBA";

  if (!isNaN(eventDate.getTime())) {
    try {
      formattedDate = format(eventDate, "dd MMM, yyyy");
      formattedTime = `${format(eventDate, "HH:mm")}`;
      if (!isNaN(eventEndDate.getTime())) {
        formattedTime += ` - ${format(eventEndDate, "HH:mm")}`;
      }
    } catch (e) {
      console.error("Date formatting error", e);
    }
  }

  // Determine if event is currently active (Live)
  let isLive = false;
  const now = new Date();
  if (!isNaN(eventDate.getTime()) && !isNaN(eventEndDate.getTime())) {
    isLive = now >= eventDate && now <= eventEndDate;
  } else if (!isNaN(eventDate.getTime()) && isNaN(eventEndDate.getTime())) {
    // If only start time is valid, assume live if within reasonable window (e.g. 2 hours)
    // or just strictly strictly >= start for upcoming vs live separation could be tricky without end
    // For now trust end date exists or strictly use start date day logic if preferred
    // But user asked "if date is same day... and ongoing".
    // Let's stick to start <= now <= end.
    const twoHoursLater = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);
    isLive = now >= eventDate && now <= twoHoursLater;
  }

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
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-blue-900/20"
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
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-[3.5rem] leading-tight font-heading">
          {event.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 font-body">
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
          className="block w-full px-4 py-3 bg-[#4285F4] text-white text-center font-semibold rounded-xl hover:bg-[#3367d6] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  );
}

