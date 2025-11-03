export default function Team() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Lead Organizer",
      bio: "Full-stack developer passionate about cloud technologies",
      avatar: "AJ",
      color: "#4285f4"
    },
    {
      name: "Priya Sharma",
      role: "Tech Lead",
      bio: "Android enthusiast and ML researcher",
      avatar: "PS",
      color: "#ea4335"
    },
    {
      name: "Marcus Chen",
      role: "Community Manager",
      bio: "Building inclusive tech communities",
      avatar: "MC",
      color: "#fbbc04"
    },
    {
      name: "Sofia Rodriguez",
      role: "Content Lead",
      bio: "Technical writer and Flutter developer",
      avatar: "SR",
      color: "#34a853"
    },
    {
      name: "David Kim",
      role: "Events Coordinator",
      bio: "Organizing impactful developer events",
      avatar: "DK",
      color: "#4285f4"
    },
    {
      name: "Emma Williams",
      role: "Design Lead",
      bio: "UX designer creating beautiful experiences",
      avatar: "EW",
      color: "#ea4335"
    },
    {
      name: "Ryan Patel",
      role: "Marketing Lead",
      bio: "Growing our developer community",
      avatar: "RP",
      color: "#fbbc04"
    },
    {
      name: "Lisa Zhang",
      role: "Partnerships Lead",
      bio: "Building industry connections",
      avatar: "LZ",
      color: "#34a853"
    }
  ];

  return (
    <section id="team" className="min-h-screen flex items-center py-24 px-6 bg-white dark:bg-gray-950 relative">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise"></div>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-sm font-medium rounded-full border border-green-200 dark:border-green-800">
            Our Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Meet the organizers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dedicated students passionate about empowering the developer community
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-6 border-soft shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
            >
              {/* Avatar */}
              <div className="relative mb-4">
                <div
                  className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-medium"
                  style={{ backgroundColor: member.color }}
                >
                  {member.avatar}
                </div>
                {/* Status Indicator */}
                <div className="absolute bottom-0 right-1/2 translate-x-8 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>

              {/* Member Info */}
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  {member.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-soft"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-soft"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-soft"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-3xl border-soft shadow-soft">
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Want to join our team?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              We're always looking for passionate students to help organize and grow our community
            </p>
            <button className="px-8 py-4 bg-[#4285f4] hover:bg-[#3367d6] text-white font-medium rounded-full shadow-medium hover:shadow-large transition-all duration-300 hover:scale-105">
              Apply to Join
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

