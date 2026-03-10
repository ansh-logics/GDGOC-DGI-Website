"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useAuth } from "@/app/context/AuthContext";
import {
  getEventBySlugApi,
  updateEventApi,
  type BackendEvent,
} from "@/lib/api";
import { isAdminEmail } from "@/lib/utils";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/20 focus:border-[#4285F4] transition-all text-sm";

const labelClass =
  "block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wide";

export default function AdminEditEventPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const { user, token } = useAuth();

  const [event, setEvent] = useState<BackendEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    description: "",
    startTime: "",
    endTime: "",
    eventType: "offline" as BackendEvent["eventType"],
    location: "",
    venue: "",
    registrationUrl: "",
    tags: "",
    bannerUrl: "",
    thumbnailUrl: "",
    hostName: "",
    hostAvatar: "",
    hostTitle: "",
    hostBio: "",
    hostLinkedin: "",
    hostX: "",
    speakers: [
      {
        name: "",
        avatar: "",
        title: "",
        bio: "",
        linkedin: "",
        x: "",
      },
    ] as Array<{
      name: string;
      avatar: string;
      title: string;
      bio: string;
      linkedin: string;
      x: string;
    }>,
    agenda: [
      {
        time: "",
        title: "",
        description: "",
      },
    ] as Array<{ time: string; title: string; description: string }>,
  });

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        const backend = await getEventBySlugApi(slug, token || undefined);
        if (!backend) {
          setError("Event not found");
          setLoading(false);
          return;
        }
        setEvent(backend);
        setForm({
          title: backend.title,
          slug: backend.slug,
          summary: backend.summary,
          description: backend.description,
          startTime: backend.startTime,
          endTime: backend.endTime,
          eventType: backend.eventType,
          location: backend.location,
          venue: backend.venue,
          registrationUrl: backend.registrationUrl,
          tags: backend.tags.join(", "),
          bannerUrl: backend.bannerUrl || "",
          thumbnailUrl: backend.thumbnailUrl || "",
          hostName: backend.host?.name || "",
          hostAvatar: backend.host?.avatar || "",
          hostTitle: backend.host?.title || "",
          hostBio: backend.host?.bio || "",
          hostLinkedin: backend.host?.linkedin || "",
          hostX: backend.host?.x || "",
          speakers:
            backend.speakers && backend.speakers.length > 0
              ? backend.speakers.map((s) => ({
                  name: s.name || "",
                  avatar: s.avatar || "",
                  title: s.title || "",
                  bio: s.bio || "",
                  linkedin: s.linkedin || "",
                  x: s.x || "",
                }))
              : [
                  {
                    name: "",
                    avatar: "",
                    title: "",
                    bio: "",
                    linkedin: "",
                    x: "",
                  },
                ],
          agenda:
            backend.agenda && backend.agenda.length > 0
              ? backend.agenda.map((a) => ({
                  time: a.time || "",
                  title: a.title || "",
                  description: a.description || "",
                }))
              : [
                  {
                    time: "",
                    title: "",
                    description: "",
                  },
                ],
        });
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Failed to load event details"
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, token]);

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
              Sign in to edit events.
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

  const handleChange = (
    field: keyof typeof form,
    value: string | BackendEvent["eventType"]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpeakerChange = (
    index: number,
    field: keyof (typeof form.speakers)[number],
    value: string
  ) => {
    setForm((prev) => {
      const next = [...prev.speakers];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, speakers: next };
    });
  };

  const addSpeaker = () => {
    setForm((prev) => ({
      ...prev,
      speakers: [
        ...prev.speakers,
        { name: "", avatar: "", title: "", bio: "", linkedin: "", x: "" },
      ],
    }));
  };

  const handleAgendaChange = (
    index: number,
    field: keyof (typeof form.agenda)[number],
    value: string
  ) => {
    setForm((prev) => {
      const next = [...prev.agenda];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, agenda: next };
    });
  };

  const addAgendaItem = () => {
    setForm((prev) => ({
      ...prev,
      agenda: [...prev.agenda, { time: "", title: "", description: "" }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !token) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateEventApi(token, event._id, {
        title: form.title,
        slug: form.slug,
        summary: form.summary,
        description: form.description,
        startTime: form.startTime,
        endTime: form.endTime,
        eventType: form.eventType,
        location: form.location,
        venue: form.venue,
        registrationUrl: form.registrationUrl,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        bannerUrl: form.bannerUrl || undefined,
        thumbnailUrl: form.thumbnailUrl || undefined,
        host: {
          name: form.hostName,
          avatar: form.hostAvatar,
          title: form.hostTitle,
          bio: form.hostBio,
          linkedin: form.hostLinkedin,
          x: form.hostX,
        },
        speakers: form.speakers.filter((s) => s.name.trim()),
        agenda: form.agenda.filter((a) => a.title.trim()),
      });
      setSuccess("Event updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update event details"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950 relative">
      <Navbar />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise" />
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-red-400/10 dark:bg-red-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-yellow-400/10 dark:bg-yellow-600/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-24 relative z-10">
        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            Loading event…
          </div>
        ) : error && !event ? (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        ) : !event ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            Event not found.
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <button
                type="button"
                onClick={() => router.push("/admin/events")}
                className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to events
              </button>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm rounded-full border border-red-200 dark:border-red-800">
                Edit Event
              </div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                {event.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Update core details, host, speakers and agenda.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-medium space-y-8"
            >
              {error && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm">
                  {success}
                </div>
              )}

              {/* Basic Info */}
              <section>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                  Basic Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Title</label>
                    <input
                      className={inputClass}
                      value={form.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Slug</label>
                    <input
                      className={inputClass}
                      value={form.slug}
                      onChange={(e) => handleChange("slug", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Summary</label>
                    <input
                      className={inputClass}
                      value={form.summary}
                      onChange={(e) => handleChange("summary", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Event Type</label>
                    <select
                      className={inputClass}
                      value={form.eventType}
                      onChange={(e) =>
                        handleChange(
                          "eventType",
                          e.target.value as BackendEvent["eventType"]
                        )
                      }
                    >
                      <option value="offline">Offline</option>
                      <option value="inperson">In person</option>
                      <option value="virtual">Virtual</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Description</label>
                    <textarea
                      className={`${inputClass} min-h-[90px]`}
                      value={form.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                    />
                  </div>
                </div>
              </section>

              {/* Timing & Location */}
              <section>
                <h2 className="text-sm font-semibold text-gray-900 dark:text_WHITE mb-4 uppercase tracking-wide">
                  Timing & Location
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Start Time (ISO)</label>
                    <input
                      className={inputClass}
                      value={form.startTime}
                      onChange={(e) =>
                        handleChange("startTime", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>End Time (ISO)</label>
                    <input
                      className={inputClass}
                      value={form.endTime}
                      onChange={(e) => handleChange("endTime", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Location</label>
                    <input
                      className={inputClass}
                      value={form.location}
                      onChange={(e) =>
                        handleChange("location", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Venue</label>
                    <input
                      className={inputClass}
                      value={form.venue}
                      onChange={(e) => handleChange("venue", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Registration URL</label>
                    <input
                      className={inputClass}
                      value={form.registrationUrl}
                      onChange={(e) =>
                        handleChange("registrationUrl", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Tags (comma separated)</label>
                    <input
                      className={inputClass}
                      value={form.tags}
                      onChange={(e) => handleChange("tags", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Banner URL</label>
                    <input
                      className={inputClass}
                      value={form.bannerUrl}
                      onChange={(e) =>
                        handleChange("bannerUrl", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Thumbnail URL</label>
                    <input
                      className={inputClass}
                      value={form.thumbnailUrl}
                      onChange={(e) =>
                        handleChange("thumbnailUrl", e.target.value)
                      }
                    />
                  </div>
                </div>
              </section>

              {/* Host */}
              <section>
                <h2 className="text-sm font-semibold text-gray-900 dark:text_WHITE mb-4 uppercase tracking-wide">
                  Host
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Name</label>
                    <input
                      className={inputClass}
                      value={form.hostName}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          hostName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Title</label>
                    <input
                      className={inputClass}
                      value={form.hostTitle}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          hostTitle: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Avatar URL</label>
                    <input
                      className={inputClass}
                      value={form.hostAvatar}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          hostAvatar: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>LinkedIn</label>
                    <input
                      className={inputClass}
                      value={form.hostLinkedin}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          hostLinkedin: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Bio</label>
                    <textarea
                      className={`${inputClass} min-h-[70px]`}
                      value={form.hostBio}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          hostBio: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </section>

              {/* Speakers */}
              <section>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text_WHITE uppercase tracking-wide">
                    Speakers
                  </h2>
                  <button
                    type="button"
                    onClick={addSpeaker}
                    className="text-xs font-semibold text-[#4285F4] hover:underline"
                  >
                    + Add speaker
                  </button>
                </div>
                <div className="space-y-4">
                  {form.speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="grid md:grid-cols-2 gap-4 border border-gray-200 dark:border-gray-800 rounded-xl p-4"
                    >
                      <div>
                        <label className={labelClass}>Name</label>
                        <input
                          className={inputClass}
                          value={speaker.name}
                          onChange={(e) =>
                            handleSpeakerChange(index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Title</label>
                        <input
                          className={inputClass}
                          value={speaker.title}
                          onChange={(e) =>
                            handleSpeakerChange(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Avatar URL</label>
                        <input
                          className={inputClass}
                          value={speaker.avatar}
                          onChange={(e) =>
                            handleSpeakerChange(
                              index,
                              "avatar",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>LinkedIn</label>
                        <input
                          className={inputClass}
                          value={speaker.linkedin}
                          onChange={(e) =>
                            handleSpeakerChange(
                              index,
                              "linkedin",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClass}>Bio</label>
                        <textarea
                          className={`${inputClass} min-h-[60px]`}
                          value={speaker.bio}
                          onChange={(e) =>
                            handleSpeakerChange(index, "bio", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Agenda */}
              <section>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text_WHITE uppercase tracking-wide">
                    Agenda
                  </h2>
                  <button
                    type="button"
                    onClick={addAgendaItem}
                    className="text-xs font-semibold text-[#4285F4] hover:underline"
                  >
                    + Add agenda item
                  </button>
                </div>
                <div className="space-y-4">
                  {form.agenda.map((item, index) => (
                    <div
                      key={index}
                      className="grid md:grid-cols-2 gap-4 border border-gray-200 dark:border-gray-800 rounded-xl p-4"
                    >
                      <div>
                        <label className={labelClass}>Time</label>
                        <input
                          className={inputClass}
                          value={item.time}
                          onChange={(e) =>
                            handleAgendaChange(index, "time", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Title</label>
                        <input
                          className={inputClass}
                          value={item.title}
                          onChange={(e) =>
                            handleAgendaChange(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClass}>Description</label>
                        <textarea
                          className={`${inputClass} min-h-[60px]`}
                          value={item.description}
                          onChange={(e) =>
                            handleAgendaChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#4285f4] to-[#3367d6] shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </motion.form>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

