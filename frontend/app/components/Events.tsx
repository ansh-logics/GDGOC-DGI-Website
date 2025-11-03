export default function Events() {
  const events = [
    {
      title: "Android Study Jam 2024",
      date: "December 15, 2024",
      time: "2:00 PM - 5:00 PM",
      speaker: "Sarah Chen",
      role: "Android GDE",
      type: "Workshop",
      color: "blue",
      gradient: "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
      accent: "#4285f4"
    },
    {
      title: "Cloud Next Extended",
      date: "January 20, 2025",
      time: "10:00 AM - 4:00 PM",
      speaker: "Michael Rodriguez",
      role: "Cloud Architect",
      type: "Conference",
      color: "red",
      gradient: "from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20",
      accent: "#ea4335"
    },
    {
      title: "ML Bootcamp: TensorFlow",
      date: "February 5, 2025",
      time: "1:00 PM - 6:00 PM",
      speaker: "Dr. Priya Patel",
      role: "ML Engineer",
      type: "Bootcamp",
      color: "yellow",
      gradient: "from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20",
      accent: "#fbbc04"
    },
    {
      title: "Flutter Forward Meetup",
      date: "February 18, 2025",
      time: "3:00 PM - 6:00 PM",
      speaker: "Alex Thompson",
      role: "Flutter Developer",
      type: "Meetup",
      color: "green",
      gradient: "from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20",
      accent: "#34a853"
    },
    {
      title: "Web Performance Workshop",
      date: "March 8, 2025",
      time: "2:00 PM - 5:00 PM",
      speaker: "Emma Wilson",
      role: "Web Platform Lead",
      type: "Workshop",
      color: "blue",
      gradient: "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
      accent: "#4285f4"
    },
    {
      title: "DevFest 2025",
      date: "March 25, 2025",
      time: "9:00 AM - 6:00 PM",
      speaker: "Multiple Speakers",
      role: "Community Event",
      type: "Festival",
      color: "red",
      gradient: "from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20",
      accent: "#ea4335"
    }
  ];

  return (
    <section id="events" className="min-h-screen flex items-center py-24 px-6 relative bg-gradient-to-br from-orange-50/30 via-white to-yellow-50/30 dark:from-orange-950/10 dark:via-gray-950 dark:to-yellow-950/10">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise"></div>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full border-soft shadow-soft">
            Upcoming Events
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Learn, connect, and build together
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join us for workshops, talks, and hands-on sessions with Google technologies and industry experts
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${event.gradient} rounded-3xl p-6 border-soft shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Event Type Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-xs font-medium rounded-full border-soft">
                  {event.type}
                </span>
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: event.accent }}
                ></div>
              </div>

              {/* Event Title */}
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {event.title}
              </h3>

              {/* Date & Time */}
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-600 dark:text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{event.date}</span>
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{event.time}</span>
              </div>

              {/* Speaker Info */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 flex items-center justify-center font-semibold text-gray-700 dark:text-gray-300 border-soft">
                  {event.speaker.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">{event.speaker}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{event.role}</div>
                </div>
              </div>

              {/* RSVP Button */}
              <button
                className="w-full py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-full border-soft hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-medium group-hover:scale-[1.02]"
              >
                RSVP Now
              </button>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-full border-medium shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
}

