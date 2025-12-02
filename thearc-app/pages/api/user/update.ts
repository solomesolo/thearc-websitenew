import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";
import { decrypt, encrypt } from "@/lib/encryption";
import { z } from "zod";

const updateSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  country: z.string().min(1),
  timezone: z.string().optional(),
});

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

  const { firstName, lastName, country, timezone } = parsed.data;

  try {
    const updated = await prisma.user.update({
      where: { id: session.userId },
      data: {
        firstName,
        lastName,
        country,
        timezone: timezone || null,
      },
    });

    const email = await decrypt(updated.emailEncrypted);

    return res.status(200).json({
      id: updated.id,
      firstName: updated.firstName,
      lastName: updated.lastName,
      email,
      country: updated.country,
      timezone: updated.timezone,
    });

  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

