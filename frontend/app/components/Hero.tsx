import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-noise-gradient">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <AnimatedThemeToggler />
      </div>

      {/* Subtle gradient overlay with Google brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-green-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-green-950/20"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* GDG Logo Badge with Google Brand Colors */}
        <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#4285f4] shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#ea4335] shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#fbbc04] shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#34a853] shadow-sm"></div>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide">Google Developer Groups</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-gray-900 dark:text-white leading-[1.1] tracking-tight">
          GDG on Campus
        </h1>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl lg:text-3xl mb-4 text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto">
          Empowering students through technology, innovation, and community
        </p>
        
        <p className="text-base md:text-lg mb-12 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Join a global network of student developers building the future with Google technologies
        </p>

        {/* CTA Buttons - Google Brand Colors */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group px-8 py-4 bg-gradient-to-r from-[#4285f4] to-[#3367d6] hover:from-[#3367d6] hover:to-[#2952b3] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[220px]">
            <span className="flex items-center justify-center gap-2">
              Join the Community
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          
          <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-[#4285f4] dark:hover:border-[#4285f4] hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[220px]">
            View Events
          </button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Events Hosted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">20+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Workshops</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">100+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Projects Built</div>
          </div>
        </div>
      </div>
    </section>
  );
}

