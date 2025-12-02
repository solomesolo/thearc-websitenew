import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";
import { getUserFromCookie } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = getUserFromCookie(req);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { oldPassword, newPassword } = parsed.data;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check old password
    const valid = await argon2.verify(user.passwordHash, oldPassword);
    if (!valid) {
      return res.status(400).json({ error: "Incorrect old password." });
    }

    // Hash new password
    const newHash = await argon2.hash(newPassword);

    await prisma.user.update({
      where: { id: session.userId },
      data: { passwordHash: newHash },
    });

    return res.status(200).json({ success: true, message: "Password updated successfully." });

  } catch (error) {
    console.error("Password update error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

