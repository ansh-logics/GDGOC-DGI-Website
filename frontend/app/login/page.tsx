"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { useAuth } from "@/app/context/AuthContext";

const inputClass =
  "w-full px-5 py-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/20 focus:border-[#4285F4] transition-all shadow-sm";
const btnClass =
  "w-full px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#4285f4] to-[#3367d6] shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed";

export default function LoginPage() {
  const { login, error, clearError, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (!email.trim() || !password) return;
    setLoading(true);
    try {
      await login({ email: email.trim(), password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950 relative">
      <Navbar />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-noise"></div>
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-red-400/10 dark:bg-red-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-yellow-400/10 dark:bg-yellow-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-10 lg:pt-24 relative z-10">
        <div className="grid gap-8 lg:gap-10 grid-cols-1 lg:grid-cols-2 items-stretch min-h-[520px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex h-full rounded-3xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/70 dark:border-gray-800/70 shadow-medium p-8 flex-col justify-between"
          >
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm rounded-full border border-red-200 dark:border-red-800 w-fit">
                Welcome back
              </div>
              <h1 className="text-4xl xl:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                Welcome to the{" "}
                <span className="bg-gradient-to-r from-[#FBBC04] via-[#EA4335] to-[#4285F4] bg-clip-text text-transparent">
                  Community
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                Sign in to access your GDG account, track events, and stay connected with the community.
              </p>
            </div>
            <div className="mt-6 rounded-3xl overflow-hidden border border-gray-200/70 dark:border-gray-800/70 bg-white/90 dark:bg-gray-900/90">
              <div className="relative w-full h-[280px] lg:h-[320px]">
                <img
                  src="/Signup.png"
                  alt="Welcome to the community"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full w-full max-w-md mx-auto lg:max-w-none lg:mx-0 rounded-3xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 shadow-medium p-8 flex flex-col justify-center"
          >
            <div className="mb-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm rounded-full border border-red-200 dark:border-red-800">
                Welcome back
              </div>
              <h2 className="text-3xl font-black mb-2 text-gray-900 dark:text-white tracking-tight">
                Sign <span className="bg-gradient-to-r from-[#FBBC04] via-[#EA4335] to-[#4285F4] bg-clip-text text-transparent">in</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Enter your credentials to continue.
              </p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                  disabled={loading || authLoading}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                  disabled={loading || authLoading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || authLoading || !email.trim() || !password}
                className={`${btnClass} mt-2`}
              >
                {loading || authLoading ? "Signing in…" : "Sign in"}
              </button>
              <p className="pt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold text-[#4285F4] hover:underline">
                  Sign up
                </Link>
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
