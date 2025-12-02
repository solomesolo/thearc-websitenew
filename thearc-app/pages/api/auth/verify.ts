import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return res.status(400).json({ error: "Invalid or missing token." });
  }

  try {
    const record = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!record) {
      return res.status(400).json({ error: "Invalid token." });
    }

    if (record.used) {
      return res.status(400).json({ error: "This verification link has already been used." });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ error: "This verification link has expired." });
    }

    // Mark user email as verified
    await prisma.user.update({
      where: { id: record.userId },
      data: { emailVerified: true },
    });

    // Mark token as used
    await prisma.verificationToken.update({
      where: { id: record.id },
      data: { used: true },
    });

    return res.status(200).json({ success: true, message: "Email verified successfully." });

  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

