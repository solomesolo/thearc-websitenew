/**
 * Consent Management System (Simplified MVP)
 * 
 * Handles health data consent for GDPR/HIPAA compliance.
 * Only supports "health_data" consent type.
 */

import { prisma } from "./prisma";

/**
 * Check if user has valid health data consent
 * 
 * @param userId - User ID to check
 * @returns true if user has active, non-withdrawn health_data consent
 */
export async function hasHealthDataConsent(userId: string): Promise<boolean> {
  const consent = await prisma.consent.findFirst({
    where: {
      userId,
      type: "health_data",
      accepted: true,
      withdrawnAt: null,
    },
    orderBy: { acceptedAt: "desc" },
  });

  return !!consent;
}

/**
 * Record health data consent
 * 
 * @param userId - User ID
 * @param ipAddress - Optional IP address for audit
 * @returns Created consent record
 */
export async function recordHealthDataConsent(
  userId: string,
  ipAddress?: string
) {
  const consent = await prisma.consent.create({
    data: {
      userId,
      type: "health_data",
      accepted: true,
      acceptedAt: new Date(),
    },
  });

  return consent;
}

/**
 * Withdraw health data consent (GDPR Right to Withdraw)
 * 
 * @param userId - User ID
 * @returns Number of consents withdrawn
 */
export async function withdrawHealthDataConsent(userId: string) {
  const result = await prisma.consent.updateMany({
    where: {
      userId,
      type: "health_data",
      accepted: true,
      withdrawnAt: null,
    },
    data: {
      withdrawnAt: new Date(),
    },
  });

  return result.count;
}

/**
 * Get user's health data consent status
 * 
 * @param userId - User ID
 * @returns Most recent health_data consent or null
 */
export async function getHealthDataConsent(userId: string) {
  return await prisma.consent.findFirst({
    where: {
      userId,
      type: "health_data",
    },
    orderBy: { acceptedAt: "desc" },
  });
}
