"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { GridPattern } from "@/components/ui/grid-pattern";
import GradualBlur from "@/components/GradualBlur";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const taglineTexts = [
    "Learn",
    "Build",
    "Connect",
    "Innovate",
    "Collaborate",
    "Grow",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showBlur, setShowBlur] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % taglineTexts.length);
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, [taglineTexts.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector('main');
      if (!scrollContainer) return;

      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      
      // Calculate how close we are to the bottom (within 200px)
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      
      // Hide blur when near the bottom
      setShowBlur(distanceFromBottom > 200);
    };

    const scrollContainer = document.querySelector('main');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white dark:from-gray-950 dark:via-blue-950/10 dark:to-gray-950">
      {/* Animated Grid Pattern Background */}
      <GridPattern
        width={60}
        height={60}
        x={-1}
        y={-1}
        className="absolute inset-0 h-full w-full stroke-gray-200/40 dark:stroke-gray-800/40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_85%)]"
      />

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/10 dark:bg-green-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-400/10 dark:bg-yellow-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
      
      {/* Gradual Blur Effect - Fixed to Screen Bottom, hidden when scrolled to bottom */}
      {showBlur && (
        <GradualBlur
          position="bottom"
          strength={1.5}
          height="100px"
          divCount={5}
          exponential={false}
          opacity={0.9}
          curve="ease-out"
          target="page"
          zIndex={50}
        />
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium shadow-sm animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Google Developer Groups
          </div>

          {/* Main Heading with improved hierarchy */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white leading-[0.9] tracking-tighter" style={{ fontFamily: 'var(--font-outfit)', letterSpacing: '-0.04em' }}>
              <span className="block mb-2">GDG On Campus</span>
              <span className="block bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
                DGI
              </span>
            </h1>
          </div>
          
          {/* Enhanced Tagline */}
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
              Empowering students to{' '}
              <span 
                key={currentTextIndex}
                className="inline-block font-bold bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] bg-clip-text text-transparent animate-fade-in"
              >
                {taglineTexts[currentTextIndex].toLowerCase()}
              </span>
            </p>
            
            {/* Subtext */}
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Join a community of passionate developers, innovators, and tech enthusiasts building the future together.
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-[#4285f4] to-[#3367d6] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[200px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3367d6] to-[#4285f4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                Join Community
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            
            <button className="group px-8 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-full font-semibold text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[200px]">
              <span className="flex items-center justify-center gap-2">
                Explore Events
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats Section */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Members</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Events</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">20+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Workshops</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Free</div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-16">
            <a 
              href="#about"
              className="group inline-flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                Discover More
              </span>
              <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-start justify-center p-2 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors">
                <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

