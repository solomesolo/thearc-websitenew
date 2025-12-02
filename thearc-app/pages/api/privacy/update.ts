import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";
import { z } from "zod";

const updateSchema = z.object({
  marketing_emails: z.boolean().optional(),
  product_updates: z.boolean().optional(),
  data_research: z.boolean().optional(),
});

function getIp(req: NextApiRequest) {
  return req.headers["x-forwarded-for"]?.toString().split(",")[0] || req.socket.remoteAddress || "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = getUserFromCookie(req);

  if (!session) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const legalVersion = "2025-01"; // keep versioning consistent

  try {
    const updates = parsed.data;
    const ipAddress = getIp(req);

    const consentEntries = Object.entries(updates).map(([type, accepted]) => ({
      userId: session.userId,
      type,
      mandatory: false,
      accepted: accepted ?? false,
      timestamp: new Date(),
      ipAddress,
      legalVersion,
    }));

    // Store new consent entries (do NOT overwrite old ones – audit trail!)
    await prisma.consent.createMany({ data: consentEntries });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Consent update error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

