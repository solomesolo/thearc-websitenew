/**
 * API Endpoint: Get Questionnaire Response
 * 
 * Simplified MVP endpoint for retrieving questionnaire responses
 * - Verifies user session
 * - Ensures user owns the response
 * - Decrypts data using AES-256-GCM
 * - Returns decrypted response
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { decryptJson } from "../../../lib/encryption";
import { getSessionFromRequest } from "../../../lib/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. Verify user session
    const session = getSessionFromRequest(req);
    if (!session || !session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = session.userId;

    // 2. Get responseId from query parameters
    const { responseId } = req.query;

    if (!responseId || typeof responseId !== "string") {
      return res.status(400).json({ error: "Missing or invalid responseId" });
    }

    // 3. Fetch questionnaire response
    const response = await prisma.questionnaireResponse.findUnique({
      where: { id: responseId },
    });

    if (!response) {
      return res.status(404).json({ error: "Questionnaire response not found" });
    }

    // 4. Verify user owns this response
    if (response.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized access to questionnaire response" });
    }

    // 5. Decrypt response data
    const responseData = decryptJson(response.responseDataEncrypted);

    // 6. Decrypt scores if present
    let scores: Record<string, number> | null = null;
    if (response.scoresEncrypted) {
      scores = decryptJson<Record<string, number>>(response.scoresEncrypted);
    }

    // 7. Return decrypted response
    return res.status(200).json({
      success: true,
      response: {
        id: response.id,
        persona: response.persona,
        responseData,
        scores,
        createdAt: response.createdAt,
        completedAt: response.completedAt,
      },
    });
  } catch (error) {
    console.error("Error retrieving questionnaire response:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    return res.status(500).json({
      error: "Failed to retrieve questionnaire response",
      details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
    });
  }
}
