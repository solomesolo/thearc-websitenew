/**
 * API Endpoint: Save Questionnaire Response
 * 
 * Simplified MVP endpoint for saving questionnaire responses
 * - Verifies user session
 * - Checks health data consent
 * - Encrypts data using AES-256-GCM
 * - Saves to database
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { encryptJson } from "../../../lib/encryption";
import { hasHealthDataConsent } from "../../../lib/consent-management";
import { getSessionFromRequest } from "../../../lib/session";
import { z } from "zod";

// Validation schema
const saveQuestionnaireSchema = z.object({
  persona: z.string().min(1, "Persona is required"),
  responseData: z.record(z.any()), // Flexible object structure
  scores: z.record(z.number()).optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. Verify user session
    const session = getSessionFromRequest(req);
    if (!session || !session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = session.userId;

    // 2. Check health data consent
    const hasConsent = await hasHealthDataConsent(userId);
    if (!hasConsent) {
      return res.status(403).json({
        error: "Health data consent required",
        message: "You must provide consent for health data collection before submitting a questionnaire.",
      });
    }

    // 3. Validate request body
    const parsed = saveQuestionnaireSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid request body",
        details: parsed.error.flatten(),
      });
    }

    const { persona, responseData, scores } = parsed.data;

    // 4. Encrypt response data using AES-256-GCM
    const responseDataEncrypted = encryptJson(responseData);

    // 5. Encrypt scores if provided
    let scoresEncrypted: string | null = null;
    if (scores && Object.keys(scores).length > 0) {
      scoresEncrypted = encryptJson(scores);
    }

    // 6. Save encrypted response to database
    const response = await prisma.questionnaireResponse.create({
      data: {
        userId,
        persona,
        responseDataEncrypted,
        scoresEncrypted,
      },
    });

    // 7. Return success response
    return res.status(201).json({
      success: true,
      responseId: response.id,
    });
  } catch (error) {
    console.error("Error saving questionnaire response:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    return res.status(500).json({
      error: "Failed to save questionnaire response",
      details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
    });
  }
}
