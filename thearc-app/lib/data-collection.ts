/**
 * GDPR/HIPAA Compliant Data Collection Utilities
 * 
 * This module handles secure, encrypted data collection with:
 * - Encryption at rest
 * - Audit logging
 * - Consent verification
 * - Data minimization
 */

import { prisma } from "./prisma";
import { encrypt, decrypt } from "./encryption";
import { logDataAccess } from "./audit-log";

export interface QuestionnaireData {
  [sectionId: string]: {
    [questionId: string]: any;
  };
}

export interface SaveResponseParams {
  userId: string;
  persona: string;
  responseData: QuestionnaireData;
  scores?: Record<string, number>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Save questionnaire response with encryption and audit logging
 */
export async function saveQuestionnaireResponse({
  userId,
  persona,
  responseData,
  scores,
  ipAddress,
  userAgent,
}: SaveResponseParams) {
  // 1. Verify user has consent for health data collection
  const consent = await prisma.consent.findFirst({
    where: {
      userId,
      type: "health_data",
      accepted: true,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
      withdrawnAt: null,
    },
    orderBy: { timestamp: "desc" },
  });

  if (!consent) {
    throw new Error("User consent required for health data collection");
  }

  // 2. Encrypt response data
  const responseDataJson = JSON.stringify(responseData);
  const responseDataEncrypted = await encrypt(responseDataJson);

  let scoresEncrypted: string | null = null;
  if (scores) {
    const scoresJson = JSON.stringify(scores);
    scoresEncrypted = await encrypt(scoresJson);
  }

  // 3. Calculate retention period (default: 7 years for medical records per HIPAA)
  const retentionUntil = new Date();
  retentionUntil.setFullYear(retentionUntil.getFullYear() + 7);

  // 4. Save encrypted response
  const response = await prisma.questionnaireResponse.create({
    data: {
      userId,
      persona,
      responseDataEncrypted,
      scoresEncrypted,
      retentionUntil,
    },
  });

  // 5. Log data access (creation)
  await logDataAccess({
    userId,
    responseId: response.id,
    accessedBy: userId,
    accessType: "create",
    dataType: "questionnaire",
    ipAddress,
    userAgent,
    purpose: "Questionnaire response submission",
  });

  return response;
}

/**
 * Retrieve questionnaire response (decrypted) with audit logging
 */
export async function getQuestionnaireResponse(
  responseId: string,
  requestedBy: string,
  ipAddress?: string,
  userAgent?: string
) {
  const response = await prisma.questionnaireResponse.findUnique({
    where: { id: responseId },
    include: { user: true },
  });

  if (!response) {
    throw new Error("Questionnaire response not found");
  }

  // Verify user has access to this response
  if (response.userId !== requestedBy) {
    throw new Error("Unauthorized access to questionnaire response");
  }

  // Log access
  await logDataAccess({
    userId: response.userId,
    responseId: response.id,
    accessedBy: requestedBy,
    accessType: "read",
    dataType: "questionnaire",
    ipAddress,
    userAgent,
    purpose: "Retrieve questionnaire response",
  });

  // Decrypt and return
  const responseData = JSON.parse(await decrypt(response.responseDataEncrypted));
  const scores = response.scoresEncrypted
    ? JSON.parse(await decrypt(response.scoresEncrypted))
    : null;

  return {
    ...response,
    responseData,
    scores,
    // Remove encrypted fields from response
    responseDataEncrypted: undefined,
    scoresEncrypted: undefined,
  };
}

/**
 * Get all questionnaire responses for a user (with pagination)
 */
export async function getUserQuestionnaireResponses(
  userId: string,
  requestedBy: string,
  page: number = 1,
  limit: number = 10,
  ipAddress?: string,
  userAgent?: string
) {
  // Verify user is requesting their own data
  if (userId !== requestedBy) {
    throw new Error("Unauthorized access");
  }

  const skip = (page - 1) * limit;

  const [responses, total] = await Promise.all([
    prisma.questionnaireResponse.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { completedAt: "desc" },
      select: {
        id: true,
        persona: true,
        version: true,
        completedAt: true,
        createdAt: true,
        // Don't include encrypted data in list
      },
    }),
    prisma.questionnaireResponse.count({ where: { userId } }),
  ]);

  // Log access
  await logDataAccess({
    userId,
    accessedBy: requestedBy,
    accessType: "read",
    dataType: "questionnaire_list",
    ipAddress,
    userAgent,
    purpose: "List questionnaire responses",
  });

  return {
    responses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

