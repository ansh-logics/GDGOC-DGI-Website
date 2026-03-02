"use client"
import Hero from "./components/Hero";
import About from "./components/About";
import EventsPreview from "./components/EventsPreview";
import Team from "./components/Team";
import TimelineSection from "./components/TimelineSection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AllEvents } from "@/types/event";
import checkCache from "@/database";
import { useEffect, useState } from "react";
import getAllEvents from "./api/controllers/getAllEvents";
import getSpecificEvent from "./api/controllers/getSpecificEvent";

export default function Home() {
  const [event, setEvents] = useState<AllEvents[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkCache();
        const all = await getAllEvents();
        setEvents(all);
        await getSpecificEvent("ai-ml-workshop");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-y-auto scroll-smooth">
        <Hero />
        <About />
        <EventsPreview upcomingEvents={event} loading={loading} />
        <Team />
        {/* <TimelineSection /> */}
        <Footer />
      </main>
    </>
  );
}
