"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useAuth } from "@/app/context/AuthContext";
import { isAdminEmail } from "@/lib/utils";
import { getEventsApi, deleteEventApi, type BackendEvent } from "@/lib/api";

export default function AdminEventsPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<BackendEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      // Only attempt to load events once we know the user,
      // and only for admins. Events API itself is public.
      if (!user || !isAdminEmail(user.email)) {
        setLoading(false);
        return;
      }
      try {
        const { events } = await getEventsApi(token || undefined);
        setEvents(events);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load events");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token, user]);

  const handleDelete = async (event: BackendEvent) => {
    if (!token) return;

    const name = event.title || event.slug;
    const input = window.prompt(
      `This will permanently delete the event "${name}".\n\nType "delete" to confirm.`
    );
    if (input !== "delete") {
      return;
    }

    try {
      setDeletingId(event._id);
      await deleteEventApi(token, event._id);
      setEvents((prev) => prev.filter((e) => e._id !== event._id));
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to delete event";
      setError(msg);
    } finally {
      setDeletingId(null);
    }
  };

  if (!user || !isAdminEmail(user.email)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-medium"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Admin access required
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sign in to manage events.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#4285f4] to-[#3367d6] shadow-md hover:opacity-90 transition-opacity"
            >
              Go to Login
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950 relative">
      <Navbar />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise" />
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-red-400/10 dark:bg-red-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-yellow-400/10 dark:bg-yellow-600/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm rounded-full border border-red-200 dark:border-red-800">
              Event Management
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Manage Events
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Edit details, host, speakers and agenda for each event.
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/events/new")}
            className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#4285f4] to-[#3367d6] shadow-md hover:opacity-90 transition-opacity self-start"
          >
            Create New Event
          </button>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/70 dark:border-gray-800/70 shadow-medium p-5 animate-pulse space-y-3"
              >
                <div className="h-5 w-1/2 rounded-full bg-gray-200/80 dark:bg-gray-800/80" />
                <div className="h-4 w-1/3 rounded-full bg-gray-200/80 dark:bg-gray-800/80" />
                <div className="h-3 w-2/3 rounded-full bg-gray-200/70 dark:bg-gray-800/70" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No events found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create your first event to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {event.slug} · {event.location} · {event.venue}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/events/${event.slug}`)}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => handleDelete(event)}
                    disabled={deletingId === event._id}
                    className="px-4 py-2 rounded-full text-sm font-semibold border border-red-500/70 text-red-600 dark:text-red-300 bg-red-50/70 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === event._id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

