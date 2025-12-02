import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getUserFromCookie(req);

  if (!session) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    const consents = await prisma.consent.findMany({
      where: { userId: session.userId },
      orderBy: { timestamp: "asc" },
    });

    return res.status(200).json({ consents });

  } catch (error) {
    console.error("Consent fetch error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

