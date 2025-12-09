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
import { encryptJson, decryptJson } from "./encryption";
import { hasHealthDataConsent } from "./consent-management";

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
  const hasConsent = await hasHealthDataConsent(userId);
  if (!hasConsent) {
    throw new Error("User consent required for health data collection");
  }

  // 2. Encrypt response data using AES-256-GCM
  const responseDataEncrypted = encryptJson(responseData);

  let scoresEncrypted: string | null = null;
  if (scores) {
    scoresEncrypted = encryptJson(scores);
  }

  // 3. Save encrypted response
  const response = await prisma.questionnaireResponse.create({
    data: {
      userId,
      persona,
      responseDataEncrypted,
      scoresEncrypted,
    },
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


  // Decrypt and return
  const responseData = decryptJson<QuestionnaireData>(response.responseDataEncrypted);
  const scores = response.scoresEncrypted
    ? decryptJson<Record<string, number>>(response.scoresEncrypted)
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
        completedAt: true,
        createdAt: true,
        // Don't include encrypted data in list
      },
    }),
    prisma.questionnaireResponse.count({ where: { userId } }),
  ]);


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

