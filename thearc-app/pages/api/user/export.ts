import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";
import { decrypt } from "@/lib/encryption";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = getUserFromCookie(req);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        consents: true,
        verificationTokens: true,
        resetTokens: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const email = await decrypt(user.emailEncrypted);

    // Build export object
    const exportData = {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email,
        country: user.country,
        timezone: user.timezone,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      consents: user.consents,
      verificationTokens: user.verificationTokens,
      resetTokens: user.resetTokens,
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="thearc-data-export-${user.id}.json"`
    );

    return res.status(200).send(JSON.stringify(exportData, null, 2));

  } catch (error) {
    console.error("Export error:", error);
    return res.status(500).json({ error: "Failed to export data." });
  }
}

