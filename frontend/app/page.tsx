import Hero from "./components/Hero";
import About from "./components/About";
import Events from "./components/Events";
import Team from "./components/Team";
import Partners from "./components/Partners";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
      <div className="snap-start">
        <Hero />
      </div>
      <div className="snap-start">
        <About />
      </div>
      <div className="snap-start">
        <Events />
      </div>
      <div className="snap-start">
        <Team />
      </div>
      <div className="snap-start">
        <Partners />
      </div>
      <div className="snap-start">
        <Footer />
      </div>
    </main>
  );
}
