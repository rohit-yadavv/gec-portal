import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkAdminEligibility(email: string): boolean {
  if (email.endsWith("@cuh.ac.in")) {
      return true;
  } else {
      return false;
  }
}