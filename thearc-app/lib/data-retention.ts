/**
 * Data Retention and Anonymization
 * 
 * Implements automatic data retention policies and anonymization
 * for GDPR/HIPAA compliance
 */

import { prisma } from "./prisma";
import { encrypt } from "./encryption";
import { logDataAccess } from "./audit-log";

/**
 * Anonymize questionnaire responses past retention period
 */
export async function anonymizeExpiredResponses() {
  const now = new Date();
  
  // Find responses past retention period
  const expiredResponses = await prisma.questionnaireResponse.findMany({
    where: {
      retentionUntil: {
        lte: now,
      },
      anonymizedAt: null,
    },
  });

  let anonymizedCount = 0;

  for (const response of expiredResponses) {
    try {
      // Anonymize the response data
      const anonymizedData = {
        anonymized: true,
        anonymizedAt: new Date().toISOString(),
        persona: response.persona, // Keep persona for analytics
        version: response.version,
      };

      await prisma.questionnaireResponse.update({
        where: { id: response.id },
        data: {
          responseDataEncrypted: await encrypt(JSON.stringify(anonymizedData)),
          scoresEncrypted: null,
          anonymizedAt: new Date(),
        },
      });

      // Log anonymization
      await logDataAccess({
        userId: response.userId,
        responseId: response.id,
        accessedBy: "system",
        accessType: "update",
        dataType: "questionnaire",
        purpose: "Automatic anonymization after retention period",
      });

      anonymizedCount++;
    } catch (error) {
      console.error(`Failed to anonymize response ${response.id}:`, error);
    }
  }

  return { anonymizedCount, totalExpired: expiredResponses.length };
}

/**
 * Clean up expired export requests
 */
export async function cleanupExpiredExports() {
  const now = new Date();
  
  const result = await prisma.dataExportRequest.updateMany({
    where: {
      expiresAt: {
        lt: now,
      },
      status: {
        not: "expired",
      },
    },
    data: {
      status: "expired",
    },
  });

  return result.count;
}

/**
 * Run all data retention tasks
 * 
 * This should be run as a scheduled job (e.g., daily cron)
 */
export async function runDataRetentionTasks() {
  console.log("Starting data retention tasks...");

  const [anonymizationResult, expiredExports] = await Promise.all([
    anonymizeExpiredResponses(),
    cleanupExpiredExports(),
  ]);

  console.log("Data retention tasks completed:", {
    anonymizedResponses: anonymizationResult.anonymizedCount,
    expiredExports,
  });

  return {
    anonymizedResponses: anonymizationResult.anonymizedCount,
    expiredExports,
  };
}

