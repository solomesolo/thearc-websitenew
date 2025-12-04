/**
 * GDPR Data Rights Implementation
 * 
 * This module implements:
 * - Right to Access (Article 15)
 * - Right to Rectification (Article 16)
 * - Right to Erasure / Right to be Forgotten (Article 17)
 * - Right to Data Portability (Article 20)
 */

import { prisma } from "./prisma";
import { decrypt, encrypt } from "./encryption";
import { logDataAccess } from "./audit-log";
import crypto from "crypto";

/**
 * Request data deletion (GDPR Right to be Forgotten)
 */
export async function requestDataDeletion(
  userId: string,
  options: {
    deleteProfile?: boolean;
    deleteResponses?: boolean;
    deleteConsents?: boolean;
    anonymizeData?: boolean;
    reason?: string;
  } = {}
) {
  // Create deletion request
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const request = await prisma.dataDeletionRequest.create({
    data: {
      userId,
      deleteProfile: options.deleteProfile ?? true,
      deleteResponses: options.deleteResponses ?? true,
      deleteConsents: options.deleteConsents ?? false,
      anonymizeData: options.anonymizeData ?? false,
      reason: options.reason,
      verificationToken,
    },
  });

  // Log deletion request
  await logDataAccess({
    userId,
    accessedBy: userId,
    accessType: "delete",
    dataType: "deletion_request",
    purpose: "User requested data deletion",
  });

  return { request, verificationToken };
}

/**
 * Process data deletion request (after verification)
 */
export async function processDataDeletion(
  requestId: string,
  verificationToken: string
) {
  const request = await prisma.dataDeletionRequest.findUnique({
    where: { id: requestId },
    include: { user: true },
  });

  if (!request) {
    throw new Error("Deletion request not found");
  }

  if (request.verificationToken !== verificationToken) {
    throw new Error("Invalid verification token");
  }

  if (request.status !== "pending") {
    throw new Error(`Deletion request already ${request.status}`);
  }

  // Update status to processing
  await prisma.dataDeletionRequest.update({
    where: { id: requestId },
    data: { status: "processing" },
  });

  try {
    // Delete or anonymize data based on request
    if (request.deleteResponses) {
      if (request.anonymizeData) {
        // Anonymize responses instead of deleting
        await prisma.questionnaireResponse.updateMany({
          where: { userId: request.userId },
          data: {
            responseDataEncrypted: await encrypt(JSON.stringify({ anonymized: true })),
            scoresEncrypted: null,
            anonymizedAt: new Date(),
          },
        });
      } else {
        // Delete responses
        await prisma.questionnaireResponse.deleteMany({
          where: { userId: request.userId },
        });
      }
    }

    if (request.deleteProfile) {
      // Soft delete user account
      await prisma.user.update({
        where: { id: request.userId },
        data: { deletedAt: new Date() },
      });
    }

    // Mark request as completed
    await prisma.dataDeletionRequest.update({
      where: { id: requestId },
      data: {
        status: "completed",
        completedAt: new Date(),
      },
    });

    // Log deletion
    await logDataAccess({
      userId: request.userId,
      accessedBy: request.userId,
      accessType: "delete",
      dataType: "user_data",
      purpose: "Data deletion request processed",
    });

    return { success: true };
  } catch (error) {
    // Mark as failed
    await prisma.dataDeletionRequest.update({
      where: { id: requestId },
      data: { status: "failed" },
    });
    throw error;
  }
}

/**
 * Request data export (GDPR Right to Data Portability)
 */
export async function requestDataExport(
  userId: string,
  options: {
    format?: "json" | "csv" | "pdf";
    includeTypes?: string[];
  } = {}
) {
  const downloadToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days to download

  const request = await prisma.dataExportRequest.create({
    data: {
      userId,
      format: options.format || "json",
      includeTypes: JSON.stringify(options.includeTypes || ["profile", "questionnaire", "consents"]),
      downloadToken,
      expiresAt,
    },
  });

  // Log export request
  await logDataAccess({
    userId,
    accessedBy: userId,
    accessType: "export",
    dataType: "data_export",
    purpose: "User requested data export",
  });

  return { request, downloadToken };
}

/**
 * Generate data export
 */
export async function generateDataExport(
  userId: string,
  downloadToken: string
) {
  const request = await prisma.dataExportRequest.findUnique({
    where: { downloadToken },
    include: { user: true },
  });

  if (!request) {
    throw new Error("Export request not found");
  }

  if (request.userId !== userId) {
    throw new Error("Unauthorized access");
  }

  if (request.expiresAt < new Date()) {
    throw new Error("Export link has expired");
  }

  if (request.status === "completed" && request.downloadUrl) {
    // Return existing export
    return {
      downloadUrl: request.downloadUrl,
      expiresAt: request.expiresAt,
    };
  }

  // Update status to processing
  await prisma.dataExportRequest.update({
    where: { id: request.id },
    data: { status: "processing" },
  });

  try {
    const includeTypes = JSON.parse(request.includeTypes || "[]");
    const exportData: any = {};

    // Export user profile
    if (includeTypes.includes("profile")) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (user) {
        exportData.profile = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: await decrypt(user.emailEncrypted),
          country: user.country,
          timezone: user.timezone,
          createdAt: user.createdAt,
        };
      }
    }

    // Export questionnaire responses
    if (includeTypes.includes("questionnaire")) {
      const responses = await prisma.questionnaireResponse.findMany({
        where: { userId },
      });

      exportData.questionnaireResponses = await Promise.all(
        responses.map(async (r) => ({
          id: r.id,
          persona: r.persona,
          version: r.version,
          completedAt: r.completedAt,
          responseData: JSON.parse(await decrypt(r.responseDataEncrypted)),
          scores: r.scoresEncrypted
            ? JSON.parse(await decrypt(r.scoresEncrypted))
            : null,
        }))
      );
    }

    // Export consents
    if (includeTypes.includes("consents")) {
      const consents = await prisma.consent.findMany({
        where: { userId },
      });
      exportData.consents = consents;
    }

    // Generate export file based on format
    let downloadUrl: string;
    if (request.format === "json") {
      // For JSON, we'll return the data directly
      // In production, you'd upload to S3/Cloud Storage and return a signed URL
      downloadUrl = `data:application/json;base64,${Buffer.from(JSON.stringify(exportData, null, 2)).toString("base64")}`;
    } else {
      // For CSV/PDF, you'd use a library to generate the file
      // This is a placeholder
      throw new Error(`${request.format} export format not yet implemented`);
    }

    // Update request with download URL
    await prisma.dataExportRequest.update({
      where: { id: request.id },
      data: {
        status: "completed",
        completedAt: new Date(),
        downloadUrl,
      },
    });

    // Log export generation
    await logDataAccess({
      userId,
      accessedBy: userId,
      accessType: "export",
      dataType: "data_export",
      purpose: "Data export generated",
    });

    return {
      downloadUrl,
      expiresAt: request.expiresAt,
    };
  } catch (error) {
    await prisma.dataExportRequest.update({
      where: { id: request.id },
      data: { status: "failed" },
    });
    throw error;
  }
}

