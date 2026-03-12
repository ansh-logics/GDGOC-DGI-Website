import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Temporary frontend-only admin check.
// TODO: replace with proper role-based system from backend.
const ADMIN_EMAILS = new Set<string>([
  "25sharmswati@gmail.com",
  "harshitadargan@gmail.com",
  "anshbhatt140@gmail.com",
]);

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.has(email.toLowerCase());
}

