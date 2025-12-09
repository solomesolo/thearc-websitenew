/**
 * API Endpoint: Record Health Data Consent
 * 
 * Simplified MVP: Only supports "health_data" consent type
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { recordHealthDataConsent } from "../../../lib/consent-management";
import { getSession } from "../../../lib/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getSession(req);
    if (!session || !session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const ipAddress =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.socket.remoteAddress ||
      "unknown";

    const consent = await recordHealthDataConsent(session.userId, ipAddress);

    return res.status(201).json({
      success: true,
      consent,
      message: "Health data consent recorded successfully",
    });
  } catch (error) {
    console.error("Error recording consent:", error);
    return res.status(500).json({
      error: "Failed to record consent",
    });
  }
}

