import Hero from "./components/Hero";
import About from "./components/About";
import EventsPreview from "./components/EventsPreview";
import Team from "./components/Team";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import eventsData from "@/data/events.json";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
        <div className="snap-start will-change-transform">
          <Hero />
        </div>
        <div className="snap-start will-change-transform">
          <About />
        </div>
        <div className="snap-start will-change-transform">
          <EventsPreview upcomingEvents={eventsData.upcoming} />
        </div>
        <div className="snap-start will-change-transform">
          <Team />
        </div>
        <div className="snap-start will-change-transform">
          <Footer />
        </div>
      </main>
    </>
  );
}
