"use client";

import { useState, useEffect } from "react";
import EventCardClassy from "@/app/components/EventCardClassy";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AllEvents } from "@/types/event";
import getAllEvents from "../api/controllers/getAllEvents";

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

function convertToEventCard(e: AllEvents) {
  let [d, m, y] = e.date.split("-");

  if (m.length === 1) m = "0" + m;
  if (d.length === 1) d = "0" + d;

  // Start & End time
  const [H, Min] = e.start.split(":");
  const [endH, endMin] = e.end.split(":");

  return {
    id: e.id,
    title: e.name,
    summary: e.desc,
    start: `${y}-${m}-${d}T${H}:${Min}`,
    end: `${y}-${m}-${d}T${endH}:${endMin}`,
    location: e.location,
    thumbnailUrl: e.thumbnailurl,
    commudleUrl: "#",
    status: "upcoming",
    tags: [e.slug],
    slug: e.slug
  };
}


  useEffect(() => {
    async function load() {
      const all = await getAllEvents();
      const today = new Date();
      console.log(all)
      const upcoming: any[] = [];
      const past: any[] = [];

      all.forEach((e) => {
        const [d, m, y] = e.date.split("-");
        const eventDate = new Date(Number(y), Number(m) - 1, Number(d));

        if (eventDate >= today) upcoming.push(convertToEventCard(e));
        else past.push(convertToEventCard(e));
      });

      setUpcomingEvents(upcoming);
      setPastEvents(past);
      
    }

    load();
  }, []);
console.log(pastEvents)
  const displayedEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-4xl font-bold text-center mb-10">
          GDG Events
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2 rounded-full ${
              activeTab === "upcoming" ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            Upcoming ({upcomingEvents.length})
          </button>

          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-2 rounded-full ${
              activeTab === "past" ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            Past ({pastEvents.length})
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedEvents.map((event, i) => (
            <EventCardClassy key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
