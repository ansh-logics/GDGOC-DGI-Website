"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import teamData from "@/data/team.json";
import { useState } from "react";

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Helper function to get color based on team name
function getTeamColor(teamName: string): string {
  const colors: { [key: string]: string } = {
    "Android Team": "#34a853",
    "Machine Learning Team": "#4285f4",
    "Cloud Team": "#ea4335",
    "Graphics Team": "#fbbc04",
    "Event Management Team": "#9c27b0",
    "Web Development Team": "#ff9800",
  };
  return colors[teamName] || "#4285f4";
}

// Helper component to render a member card with robust image fallback
function MemberCard({ member }: { member: any }) {
  const { name, image, teamColor, teamName, role, bio, linkedin } = member;
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-[240px] md:w-[280px] lg:w-[320px] bg-white/90 dark:bg-gray-900/90 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="relative">
          {image && !imageError ? (
            <Image
              src={image}
              alt={name}
              width={120}
              height={120}
              className="w-28 h-28 rounded-2xl object-cover object-top shadow-xl"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="w-28 h-28 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl"
              style={{ backgroundColor: teamColor }}
            >
              {getInitials(name)}
            </div>
          )}
          <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-md">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
            {teamName}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm font-semibold" style={{ color: teamColor }}>
            {role}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {bio}
          </p>
        </div>

        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-105 shadow-sm"
            aria-label={`${name} on LinkedIn`}
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">LinkedIn</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Team() {
  const { teams, organizer } = teamData;

  const allMembers = teams.flatMap((team) =>
    team.members.map((member) => ({
      ...member,
      teamName: team.name,
      teamColor: getTeamColor(team.name)
    }))
  );

  const memberLoopItems: LogoItem[] = allMembers.map((member) => ({
    node: <MemberCard member={member} />,
    ariaLabel: `${member.name} (${member.teamName})`
  }));

  return (
    <section id="team" className="min-h-screen flex items-center py-24 px-6 bg-gradient-to-b from-white via-green-50/30 to-white dark:from-gray-950 dark:via-green-950/10 dark:to-gray-950 relative">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-green-400/10 dark:bg-green-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-sm font-medium rounded-full border border-green-200 dark:border-green-800 shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Our Team
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-tight tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
            Meet the{' '}
            <span className="bg-gradient-to-r from-[#34A853] via-[#4285F4] to-[#EA4335] bg-clip-text text-transparent">
              organizers
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dedicated students passionate about empowering the developer community
          </p>
        </motion.div>

        {/* Organizer in Center */}
        {organizer && (
            <motion.div
            className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="flex justify-center">
              <motion.div
                className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-6">
                  {organizer.image ? (
                    <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={organizer.image}
                        alt={organizer.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-32 h-32 mx-auto rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: "#4285f4" }}
                    >
                      {getInitials(organizer.name)}
                </div>
                  )}
                  <div className="absolute bottom-2 right-1/2 translate-x-14 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-md">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
              <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800">
                    Organizer
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {organizer.name}
                </h3>
                  <p className="text-base font-semibold mb-4 text-[#4285f4]">
                    {organizer.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {organizer.bio}
                  </p>
                  {organizer.linkedin && (
                    <a
                      href={organizer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-105 shadow-sm"
                  aria-label="LinkedIn"
                >
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">LinkedIn</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Team Members Loop */}
        {memberLoopItems.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
              Our Team Members
            </h3>

            <div className="relative w-screen mx-[calc(50%-50vw)] px-0">
              {/* Side dissolve gradients (no rounded container) */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-[#0b1120] dark:via-[#0b1120]/90 dark:to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 md:w-40 bg-gradient-to-l from-white via-white/90 to-transparent dark:from-[#0b1120] dark:via-[#0b1120]/90 dark:to-transparent" />

              <LogoLoop
                logos={memberLoopItems}
                speed={110}
                gap={48}
                pauseOnHover
                scaleOnHover
                fadeOut={false}
                ariaLabel="Team members showcase"
                className="py-12"
                renderItem={(item) => ("node" in item ? item.node : null)}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

