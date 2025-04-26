import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidEmail(email: string): boolean {
  // Simple email regex pattern
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
