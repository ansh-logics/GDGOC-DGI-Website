export default function Partners() {
  const partners = [
    { name: "Google Cloud", category: "Platinum" },
    { name: "Firebase", category: "Platinum" },
    { name: "Android", category: "Gold" },
    { name: "Flutter", category: "Gold" },
    { name: "TensorFlow", category: "Gold" },
    { name: "Chrome", category: "Silver" },
    { name: "Angular", category: "Silver" },
    { name: "Kubernetes", category: "Silver" },
    { name: "GitHub", category: "Community" },
    { name: "JetBrains", category: "Community" },
    { name: "Microsoft", category: "Community" },
    { name: "AWS", category: "Community" }
  ];

  return (
    <section id="partners" className="min-h-screen flex items-center py-24 px-6 relative bg-gradient-to-br from-blue-50/30 via-white to-green-50/30 dark:from-blue-950/10 dark:via-gray-950 dark:to-green-950/10">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise"></div>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full border-soft shadow-soft">
            Our Partners
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Supported by industry leaders
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We collaborate with top tech companies to bring you the best resources and opportunities
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 border-soft shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center aspect-square"
            >
              {/* Category Badge */}
              <div className="absolute top-3 right-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  partner.category === 'Platinum' ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300' :
                  partner.category === 'Gold' ? 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300' :
                  partner.category === 'Silver' ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300' :
                  'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300'
                }`}>
                  {partner.category}
                </span>
              </div>

              {/* Partner Logo Placeholder */}
              <div className="w-full h-20 flex items-center justify-center mb-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-400 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                    {partner.name.substring(0, 2).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Partner Name */}
              <h3 className="text-base font-semibold text-gray-900 dark:text-white text-center group-hover:text-[#4285f4] dark:group-hover:text-[#4285f4] transition-colors">
                {partner.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Partnership Info */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-soft shadow-soft text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#4285f4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Resources</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Access to cutting-edge tools and platforms
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-soft shadow-soft text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-950/50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#ea4335]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Funding</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Financial support for events and projects
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-soft shadow-soft text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-950/50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#34a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Mentorship</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Guidance from industry professionals
            </p>
          </div>
        </div>

        {/* Become a Partner CTA */}
        <div className="mt-12 text-center">
          <div className="inline-block p-8 bg-white dark:bg-gray-900 rounded-3xl border-soft shadow-soft">
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Interested in partnering with us?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Support the next generation of developers and grow your brand
            </p>
            <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-full border-medium shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105">
              Become a Partner
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

