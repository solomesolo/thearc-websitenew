/**
 * API Endpoint: Record User Consent
 * 
 * GDPR/HIPAA compliant consent recording
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { recordConsent } from "../../../lib/consent-management";
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

    const { type, mandatory, accepted, legalVersion, purpose, expiresAt } =
      req.body;

    if (!type || mandatory === undefined || accepted === undefined || !legalVersion) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const ipAddress =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.socket.remoteAddress ||
      "unknown";

    const consent = await recordConsent({
      userId: session.userId,
      type,
      mandatory,
      accepted,
      legalVersion,
      ipAddress,
      purpose,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    });

    return res.status(201).json({
      success: true,
      consent,
      message: "Consent recorded successfully",
    });
  } catch (error) {
    console.error("Error recording consent:", error);
    return res.status(500).json({
      error: "Failed to record consent",
    });
  }
}

