/**
 * API Endpoint: Data Deletion (GDPR Right to be Forgotten)
 */

import type { NextApiRequest, NextApiResponse } from "next";
import {
  requestDataDeletion,
  processDataDeletion,
} from "../../../lib/data-rights";
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
    // Request data deletion
    try {
      const {
        deleteProfile,
        deleteResponses,
        deleteConsents,
        anonymizeData,
        reason,
      } = req.body;

      const { request, verificationToken } = await requestDataDeletion(
        session.userId,
        {
          deleteProfile: deleteProfile ?? true,
          deleteResponses: deleteResponses ?? true,
          deleteConsents: deleteConsents ?? false,
          anonymizeData: anonymizeData ?? false,
          reason,
        }
      );

      return res.status(201).json({
        success: true,
        requestId: request.id,
        verificationToken,
        message:
          "Deletion request created. Please verify using the verification token.",
      });
    } catch (error) {
      console.error("Error requesting data deletion:", error);
      return res.status(500).json({
        error: "Failed to request data deletion",
      });
    }
  } else if (req.method === "PUT") {
    // Process deletion request (after verification)
    try {
      const { requestId, verificationToken } = req.body;

      if (!requestId || !verificationToken) {
        return res.status(400).json({
          error: "Missing requestId or verificationToken",
        });
      }

      await processDataDeletion(requestId, verificationToken);

      return res.status(200).json({
        success: true,
        message: "Data deletion completed successfully",
      });
    } catch (error) {
      console.error("Error processing data deletion:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      return res.status(500).json({
        error: "Failed to process data deletion",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

