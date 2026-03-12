"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useAuth } from "@/app/context/AuthContext";
import { updateProfilePhotoApi } from "@/lib/api";
import { isAdminEmail } from "@/lib/utils";

const btnClass =
  "px-6 py-2.5 rounded-full font-semibold text-sm transition-all bg-gradient-to-r from-[#4285f4] to-[#3367d6] text-white shadow-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed";

export default function ProfilePage() {
  const { user, token, logout, refreshUser, loading: authLoading } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setUploadError("Please choose a JPG or PNG image.");
      return;
    }
    setUploadError(null);
    setUploading(true);
    try {
      await updateProfilePhotoApi(token, file);
      await refreshUser();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950 flex items-center justify-center">
        <Navbar />
        <div className="text-gray-600 dark:text-gray-400">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950 flex items-center justify-center">
        <Navbar />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">You need to sign in to view your profile.</p>
          <Link href="/login" className={btnClass + " inline-block"}>
            Sign in
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950 relative">
      <Navbar />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise"></div>
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-red-400/10 dark:bg-red-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-yellow-400/10 dark:bg-yellow-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-lg mx-auto px-6 pt-32 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm rounded-full border border-red-200 dark:border-red-800">
            Your profile
          </div>
          <h1 className="text-4xl font-black mb-2 text-gray-900 dark:text-white tracking-tight">
            <span className="bg-gradient-to-r from-[#FBBC04] via-[#EA4335] to-[#4285F4] bg-clip-text text-transparent">
              {user.firstName}
            </span>
            {user.lastName ? ` ${user.lastName}` : ""}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-medium"
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {user.profile_photo ? (
                  <img src={user.profile_photo} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-gray-400 dark:text-gray-500">
                    {user.firstName.charAt(0)}
                    {user.lastName?.charAt(0) || ""}
                  </span>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                disabled={uploading}
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="mt-4 text-sm font-medium text-[#4285F4] hover:underline disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Change photo"}
            </button>
            {uploadError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{uploadError}</p>
            )}
          </div>

          <dl className="mt-8 space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
              <dd className="mt-1 text-gray-900 dark:text-white">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Course</dt>
              <dd className="mt-1 text-gray-900 dark:text-white">{user.course}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Branch</dt>
              <dd className="mt-1 text-gray-900 dark:text-white">{user.branch}</dd>
            </div>
          </dl>

          {isAdminEmail(user.email) && (
            <div className="mt-8 space-y-3">
              <p className="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase">
                Admin actions
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/admin/events"
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#4285f4] to-[#3367d6] shadow-md hover:opacity-90 transition-opacity"
                >
                  Manage events
                </Link>
                <Link
                  href="/admin/events/new"
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-semibold border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Create event
                </Link>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => logout()}
            className="mt-8 w-full py-3 rounded-full font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Sign out
          </button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
