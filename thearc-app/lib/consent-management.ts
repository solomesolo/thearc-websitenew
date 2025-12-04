/**
 * Consent Management System
 * 
 * GDPR and HIPAA require explicit consent for data collection and processing.
 * This module handles consent collection, verification, and withdrawal.
 */

import { prisma } from "./prisma";
import { logDataAccess } from "./audit-log";

export interface ConsentParams {
  userId: string;
  type: string; // health_data, marketing, research, third_party
  mandatory: boolean;
  accepted: boolean;
  legalVersion: string;
  ipAddress?: string;
  purpose?: string;
  expiresAt?: Date;
}

/**
 * Record user consent
 */
export async function recordConsent(params: ConsentParams) {
  const consent = await prisma.consent.create({
    data: {
      userId: params.userId,
      type: params.type,
      mandatory: params.mandatory,
      accepted: params.accepted,
      legalVersion: params.legalVersion,
      ipAddress: params.ipAddress,
      purpose: params.purpose,
      expiresAt: params.expiresAt,
    },
  });

  // Log consent recording
  await logDataAccess({
    userId: params.userId,
    accessedBy: params.userId,
    accessType: "create",
    dataType: "consent",
    ipAddress: params.ipAddress,
    purpose: `Consent ${params.accepted ? "granted" : "denied"} for ${params.type}`,
  });

  return consent;
}

/**
 * Check if user has valid consent for a specific purpose
 */
export async function hasValidConsent(
  userId: string,
  type: string
): Promise<boolean> {
  const consent = await prisma.consent.findFirst({
    where: {
      userId,
      type,
      accepted: true,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
      withdrawnAt: null,
    },
    orderBy: { timestamp: "desc" },
  });

  return !!consent;
}

/**
 * Withdraw consent (GDPR Right to Withdraw)
 */
export async function withdrawConsent(
  userId: string,
  type: string,
  ipAddress?: string
) {
  // Mark all active consents of this type as withdrawn
  const result = await prisma.consent.updateMany({
    where: {
      userId,
      type,
      accepted: true,
      withdrawnAt: null,
    },
    data: {
      withdrawnAt: new Date(),
    },
  });

  // Log withdrawal
  await logDataAccess({
    userId,
    accessedBy: userId,
    accessType: "update",
    dataType: "consent",
    ipAddress,
    purpose: `Consent withdrawn for ${type}`,
  });

  return result;
}

/**
 * Get user's consent history
 */
export async function getUserConsents(userId: string, requestedBy: string) {
  // Verify user is requesting their own consents
  if (userId !== requestedBy) {
    throw new Error("Unauthorized access");
  }

  const consents = await prisma.consent.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
  });

  // Log access
  await logDataAccess({
    userId,
    accessedBy: requestedBy,
    accessType: "read",
    dataType: "consent",
    purpose: "User requested consent history",
  });

  return consents;
}

