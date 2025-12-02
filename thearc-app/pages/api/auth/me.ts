import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encryption";
import { getUserFromCookie } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getUserFromCookie(req);

  if (!session) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const emailDecrypted = await decrypt(user.emailEncrypted);

    return res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: emailDecrypted,
      emailVerified: user.emailVerified,
      country: user.country,
      timezone: user.timezone,
    });

  } catch (error) {
    console.error("Me endpoint error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

