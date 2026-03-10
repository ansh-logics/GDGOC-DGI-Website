"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useAuth } from "@/app/context/AuthContext";
import {
  createEventApi,
  type CreateEventPayload,
  uploadBannerApi,
  uploadThumbnailApi,
} from "@/lib/api";
import { isAdminEmail } from "@/lib/utils";
import EventDetailContent from "@/app/components/EventDetailContent";
import type { Main } from "@/types/event";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/20 focus:border-[#4285F4] transition-all text-sm";

const labelClass =
  "block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wide";

export default function AdminNewEventPage() {
  const { user, token } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<CreateEventPayload>({
    title: "",
    slug: "",
    description: "",
    summary: "",
    startTime: "",
    endTime: "",
    eventType: "offline",
    location: "",
    venue: "",
    registrationUrl: "",
    tags: [],
    bannerUrl: "",
    thumbnailUrl: "",
  });

  const [tagsText, setTagsText] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [eventDate, setEventDate] = useState("");
  const [startTimeLocal, setStartTimeLocal] = useState("");
  const [endTimeLocal, setEndTimeLocal] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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
              Sign in to create events.
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
    field: keyof CreateEventPayload,
    value: string | CreateEventPayload["eventType"]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError(null);
    try {
      const baseDate =
        eventDate || new Date().toISOString().slice(0, 10); // YYYY-MM-DD

      const startIso = startTimeLocal
        ? new Date(`${baseDate}T${startTimeLocal}`).toISOString()
        : new Date().toISOString();

      const endIso = endTimeLocal
        ? new Date(`${baseDate}T${endTimeLocal}`).toISOString()
        : startIso;

      const payload: CreateEventPayload = {
        ...form,
        startTime: startIso,
        endTime: endIso,
        tags: tagsText
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      const created = await createEventApi(token, payload);

      // Optional image uploads using backend upload routes
      if (thumbnailFile) {
        await uploadThumbnailApi(token, created._id, thumbnailFile);
      }
      if (bannerFile) {
        await uploadBannerApi(token, created._id, bannerFile);
      }

      router.push(`/admin/events/${created.slug}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create event"
      );
    } finally {
      setSaving(false);
    }
  };

  const previewEvent: Main = useMemo(() => {
    const baseDate =
      eventDate || new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const startIso = startTimeLocal
      ? new Date(`${baseDate}T${startTimeLocal}`).toISOString()
      : form.startTime || new Date().toISOString();

    const endIso = endTimeLocal
      ? new Date(`${baseDate}T${endTimeLocal}`).toISOString()
      : form.endTime || startIso;

    const startDate = new Date(startIso);
    const endDate = new Date(endIso);

    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();

    const now = new Date();
    let status: string = "past";
    if (now < startDate) status = "upcoming";
    else if (now >= startDate && now <= endDate) status = "ongoing";

    const tagsArray =
      tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean) || [];

    return {
      id: "preview",
      title: form.title || "Untitled Event",
      slug: form.slug || "preview-slug",
      summary: form.summary || "",
      description: form.description || "",
      start: startIso,
      end: endIso,
      location: form.location || "TBA",
      venue: form.venue || "",
      bannerUrl:
        bannerPreview ||
        form.bannerUrl ||
        thumbnailPreview ||
        form.thumbnailUrl ||
        "",
      thumbnailUrl:
        thumbnailPreview ||
        form.thumbnailUrl ||
        bannerPreview ||
        form.bannerUrl ||
        "",
      commudleUrl: form.registrationUrl || "#",
      tags: tagsArray.join(", "),
      status,
      date: day,
      month,
      year,
      host: {
        name: user?.firstName || "GDG on Campus Dronacharya",
        avatar: user?.profile_photo || "/images/gdg-logo.png",
        role: "Organizer",
        email: user?.email || "",
        linkedin: "",
        x: "",
      },
      speakers: [],
      agenda: [],
    };
  }, [
    bannerPreview,
    form.bannerUrl,
    form.description,
    form.endTime,
    form.location,
    form.registrationUrl,
    form.slug,
    form.startTime,
    form.summary,
    form.thumbnailUrl,
    form.title,
    form.venue,
    tagsText,
    thumbnailPreview,
    user,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950 relative">
      <Navbar />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise" />
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-red-400/10 dark:bg-red-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-yellow-400/10 dark:bg-yellow-600/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <button
              type="button"
              onClick={() => router.push("/admin/events")}
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text白 mb-3"
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
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-gray-900 dark:text白 tracking-tight">
                Create Event
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-semibold rounded-full border border-red-200 dark:border-red-800">
                New
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Fill in the event details and save to publish it.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 text-sm font-semibold text-gray-800 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Preview
          </button>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-medium space-y-6"
        >
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <section>
            <h2 className="text-sm font-semibold text-gray-900 dark:text白 mb-4 uppercase tracking-wide">
              Basic Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Title</label>
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Slug</label>
                <input
                  className={inputClass}
                  value={form.slug}
                  onChange={(e) => handleChange("slug", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Summary</label>
                <input
                  className={inputClass}
                  value={form.summary}
                  onChange={(e) => handleChange("summary", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Event Type</label>
                <div className="relative">
                  <select
                    className={`${inputClass} pr-10 appearance-none`}
                    value={form.eventType}
                    onChange={(e) =>
                      handleChange(
                        "eventType",
                        e.target.value as CreateEventPayload["eventType"]
                      )
                    }
                  >
                    <option value="offline">Offline</option>
                    <option value="inperson">In person</option>
                    <option value="virtual">Virtual</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className={labelClass}>Description</label>
              <textarea
                className={`${inputClass} min-h-[90px]`}
                value={form.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
                required
              />
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-gray-900 dark:text白 mb-4 uppercase tracking-wide">
              Timing & Location
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Date</label>
                <input
                  type="date"
                  className={inputClass}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Start Time</label>
                <input
                  type="time"
                  className={inputClass}
                  value={startTimeLocal}
                  onChange={(e) => setStartTimeLocal(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>End Time</label>
                <input
                  className={inputClass}
                  type="time"
                  value={endTimeLocal}
                  onChange={(e) => setEndTimeLocal(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  className={inputClass}
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Venue</label>
                <input
                  className={inputClass}
                  value={form.venue}
                  onChange={(e) => handleChange("venue", e.target.value)}
                  required
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
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Tags (comma separated)</label>
                <input
                  className={inputClass}
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="web, android, cloud"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-gray-900 dark:text白 mb-4 uppercase tracking-wide">
              Event Images
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Banner Image (optional)</label>
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-6 cursor-pointer hover:border-[#4285F4] hover:bg-gray-50/70 dark:hover:bg-gray-900/60 transition-colors">
                  {bannerPreview ? (
                    <img
                      src={bannerPreview}
                      alt="Banner preview"
                      className="w-full h-32 object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586A2 2 0 0119 12h0a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-3"
                        />
                      </svg>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                        Click to upload banner image
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        PNG, JPG up to ~5MB
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      setBannerFile(file);
                      if (file) {
                        setBannerPreview(URL.createObjectURL(file));
                      } else {
                        setBannerPreview(null);
                      }
                    }}
                  />
                </label>
              </div>
              <div>
                <label className={labelClass}>Thumbnail Image (optional)</label>
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-6 cursor-pointer hover:border-[#4285F4] hover:bg-gray-50/70 dark:hover:bg-gray-900/60 transition-colors">
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-32 object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586A2 2 0 0119 12h0a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-3"
                        />
                      </svg>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                        Click to upload thumbnail
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        PNG, JPG up to ~5MB
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      setThumbnailFile(file);
                      if (file) {
                        setThumbnailPreview(URL.createObjectURL(file));
                      } else {
                        setThumbnailPreview(null);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </section>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#4285f4] to-[#3367d6] shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Creating…" : "Create Event"}
            </button>
          </div>
        </motion.form>
      </div>
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-transparent overflow-hidden">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="absolute top-3 right-3 z-20 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="overflow-y-auto max-h-[90vh] rounded-2xl shadow-2xl">
              <EventDetailContent event={previewEvent} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

