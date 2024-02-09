import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkAdminEligibility(email: string): boolean {
  if (email.endsWith("@gmail.com")) {
      return true;
  } else {
      return false;
  }
}