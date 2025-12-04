/**
 * API Endpoint: Data Export (GDPR Right to Data Portability)
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { requestDataExport, generateDataExport } from "../../../lib/data-rights";
import { getSession } from "../../../lib/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req);
  if (!session || !session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    // Request data export
    try {
      const { format, includeTypes } = req.body;

      const { request, downloadToken } = await requestDataExport(
        session.userId,
        {
          format: format || "json",
          includeTypes: includeTypes || ["profile", "questionnaire", "consents"],
        }
      );

      return res.status(201).json({
        success: true,
        requestId: request.id,
        downloadToken,
        message: "Data export requested. Use downloadToken to retrieve your data.",
      });
    } catch (error) {
      console.error("Error requesting data export:", error);
      return res.status(500).json({
        error: "Failed to request data export",
      });
    }
  } else if (req.method === "GET") {
    // Generate/download data export
    try {
      const { token } = req.query;

      if (!token || typeof token !== "string") {
        return res.status(400).json({ error: "Missing download token" });
      }

      const { downloadUrl, expiresAt } = await generateDataExport(
        session.userId,
        token
      );

      return res.status(200).json({
        success: true,
        downloadUrl,
        expiresAt,
      });
    } catch (error) {
      console.error("Error generating data export:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      return res.status(500).json({
        error: "Failed to generate data export",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

