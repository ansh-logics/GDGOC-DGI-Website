"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventDetailContent from "@/app/components/EventDetailContent";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Event } from "@/types/event";
import eventsData from "@/data/events.json";

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Combine all events and find the one matching the slug
    const allEvents = [...eventsData.upcoming, ...eventsData.past] as Event[];
    const foundEvent = allEvents.find(e => e.slug === slug);
    
    setEvent(foundEvent || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-6 pt-24">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
              <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Event Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <a
              href="/events"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#4285f4] to-[#3367d6] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200"
            >
              Back to Events
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <EventDetailContent event={event} />
      <Footer />
    </>
  );
}

