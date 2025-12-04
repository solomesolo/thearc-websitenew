/**
 * API Endpoint: Save Questionnaire Response
 * 
 * GDPR/HIPAA Compliant endpoint for saving questionnaire responses
 * - Verifies consent
 * - Encrypts data at rest
 * - Logs all access
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { saveQuestionnaireResponse } from "../../../lib/data-collection";
import { getSession } from "../../../lib/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Verify user session
    const session = await getSession(req);
    if (!session || !session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { persona, responseData, scores } = req.body;

    if (!persona || !responseData) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Get IP address and user agent for audit logging
    const ipAddress =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.socket.remoteAddress ||
      "unknown";
    const userAgent = req.headers["user-agent"] || "unknown";

    // Save response with encryption and audit logging
    const response = await saveQuestionnaireResponse({
      userId: session.userId,
      persona,
      responseData,
      scores,
      ipAddress,
      userAgent,
    });

    return res.status(201).json({
      success: true,
      responseId: response.id,
      message: "Questionnaire response saved successfully",
    });
  } catch (error) {
    console.error("Error saving questionnaire response:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    
    // Don't expose internal errors to client
    return res.status(500).json({
      error: "Failed to save questionnaire response",
      details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
    });
  }
}

