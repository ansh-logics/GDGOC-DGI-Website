"use client"
import Hero from "./components/Hero";
import About from "./components/About";
import EventsPreview from "./components/EventsPreview";
import Team from "./components/Team";
import TimelineSection from "./components/TimelineSection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Event } from "@/types/event";
import checkCache from "@/database";
import { useEffect } from "react";
import eventsData from "@/data/events.json";
import getAllEvents from "./api/controllers/getAllEvents";
import axios from "axios";
export default function Home() {
  const upcomingEvents = eventsData.upcoming as Event[];
  useEffect(()=>{
    let fetchData = async () =>{
      let data =  await checkCache();
      console.log(data); 
      await getAllEvents();
    }
    fetchData();
  },[]) 

  
  return (
    <>
      <Navbar />
      <main className="overflow-y-auto scroll-smooth">
        <Hero />
        <About />
        <EventsPreview upcomingEvents={upcomingEvents} />
        <Team />
        {/* <TimelineSection /> */}
        <Footer />
      </main>
    </>
  );
}
