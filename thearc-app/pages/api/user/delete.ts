import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";
import { getUserFromCookie } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  password: z.string().min(1),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = getUserFromCookie(req);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Password required." });
  }

  const { password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) return res.status(404).json({ error: "User not found." });

    // Confirm password
    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) {
      return res.status(400).json({ error: "Incorrect password." });
    }

    // Delete all sensitive data first (order matters due to foreign keys)
    await prisma.verificationToken.deleteMany({ where: { userId: user.id } });
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
    
    // Delete consents (GDPR allows deletion when user requests account deletion)
    // Note: If audit trail is legally required, consents can be kept but will be orphaned
    // For full deletion, we remove consents as user has requested complete data removal
    await prisma.consent.deleteMany({ where: { userId: user.id } });

    // Delete account (this will cascade delete related records)
    await prisma.user.delete({
      where: { id: user.id },
    });

    return res.status(200).json({ success: true, message: "Account deleted successfully." });

  } catch (error) {
    console.error("Delete account error:", error);
    return res.status(500).json({ error: "Failed to delete account." });
  }
}

