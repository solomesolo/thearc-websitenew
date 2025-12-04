/**
 * API Endpoint: Get Questionnaire Response
 * 
 * Retrieves a questionnaire response with proper access control and audit logging
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { getQuestionnaireResponse } from "../../../lib/data-collection";
import { getSession } from "../../../lib/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getSession(req);
    if (!session || !session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { responseId } = req.query;

    if (!responseId || typeof responseId !== "string") {
      return res.status(400).json({ error: "Missing responseId" });
    }

    const ipAddress =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.socket.remoteAddress ||
      "unknown";
    const userAgent = req.headers["user-agent"] || "unknown";

    const response = await getQuestionnaireResponse(
      responseId,
      session.userId,
      ipAddress,
      userAgent
    );

    return res.status(200).json({
      success: true,
      response,
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

