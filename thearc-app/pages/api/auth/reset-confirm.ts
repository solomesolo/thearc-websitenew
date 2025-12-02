import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";
import { z } from "zod";

const schema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(8),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { token, newPassword } = parsed.data;

  try {
    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetRecord) {
      return res.status(400).json({ error: "Invalid or expired reset token." });
    }

    if (resetRecord.used) {
      return res.status(400).json({ error: "This reset link has already been used." });
    }

    if (resetRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: "Reset token has expired." });
    }

    // Update password
    const newHash = await argon2.hash(newPassword);

    await prisma.user.update({
      where: { id: resetRecord.userId },
      data: { passwordHash: newHash },
    });

    // Mark token as used
    await prisma.passwordResetToken.update({
      where: { id: resetRecord.id },
      data: { used: true },
    });

    return res.status(200).json({ success: true, message: "Password updated successfully." });

  } catch (error) {
    console.error("Reset confirm error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}

