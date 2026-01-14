/**
 * Utility functions for managing email signups in localStorage
 */

export interface EmailSignup {
  email: string;
  timestamp: string;
  date: string;
}

const STORAGE_KEY = "arc_email_signups";

/**
 * Get all saved email signups from localStorage
 */
export function getSavedEmails(): EmailSignup[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading emails from localStorage:", error);
    return [];
  }
}

/**
 * Get the count of saved email signups
 */
export function getEmailCount(): number {
  return getSavedEmails().length;
}

/**
 * Check if an email already exists in storage
 */
export function emailExists(email: string): boolean {
  const emails = getSavedEmails();
  return emails.some(
    (entry) => entry.email.toLowerCase() === email.toLowerCase()
  );
}

/**
 * Export emails as JSON string (for backup/download)
 */
export function exportEmailsAsJSON(): string {
  return JSON.stringify(getSavedEmails(), null, 2);
}

/**
 * Clear all saved emails (use with caution)
 */
export function clearAllEmails(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing emails from localStorage:", error);
    }
  }
}

