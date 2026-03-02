"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/api";
import { getMeApi, loginApi, signupApi, type LoginPayload, type SignupPayload } from "@/lib/api";

const TOKEN_KEY = "gdg_token";

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

type AuthContextValue = AuthState & {
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const clearError = useCallback(() => setError(null), []);

  const refreshUser = useCallback(async () => {
    const t = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!t) return;
    try {
      const u = await getMeApi(t);
      setUser(u);
    } catch {
      setToken(null);
      setUser(null);
      if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
    }
  }, []);

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!t) {
      setLoading(false);
      return;
    }
    setToken(t);
    getMeApi(t)
      .then(setUser)
      .catch(() => {
        setToken(null);
        setUser(null);
        if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      setError(null);
      try {
        const data = await loginApi(payload);
        if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        const u = await getMeApi(data.token);
        setUser(u);
        router.push("/profile");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Login failed");
        throw e;
      }
    },
    [router]
  );

  const signup = useCallback(
    async (payload: SignupPayload) => {
      setError(null);
      try {
        const data = await signupApi(payload);
        if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        const u = await getMeApi(data.token);
        setUser(u);
        router.push("/profile");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Signup failed");
        throw e;
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setError(null);
    if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
    router.push("/");
  }, [router]);

  const value: AuthContextValue = {
    user,
    token,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
