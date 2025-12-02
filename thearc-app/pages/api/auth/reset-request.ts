import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encryption";
import { z } from "zod";
import { randomBytes } from "crypto";
import { sendPasswordResetEmail } from "@/lib/sendPasswordResetEmail";
import { addHours } from "date-fns";

const schema = z.object({
  email: z.string().email(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const { email } = parsed.data;

  try {
    // Fetch all users and decrypt emails
    const users = await prisma.user.findMany();
    let matchedUser = null;

    for (const user of users) {
      const decrypted = await decrypt(user.emailEncrypted);
      if (decrypted.toLowerCase() === email.toLowerCase()) {
        matchedUser = user;
        break;
      }
    }

    // Do not reveal if the email exists
    if (!matchedUser) {
      return res.status(200).json({
        success: true,
        message: "If that email exists, password reset instructions were sent.",
      });
    }

    // Create reset token
    const token = randomBytes(32).toString("hex");

    await prisma.passwordResetToken.create({
      data: {
        userId: matchedUser.id,
        token,
        expiresAt: addHours(new Date(), 1), // 1 hour validity
      },
    });

    // Send reset email
    const decryptedEmail = await decrypt(matchedUser.emailEncrypted);

    await sendPasswordResetEmail({
      email: decryptedEmail,
      token,
      firstName: matchedUser.firstName,
    });

    return res.status(200).json({
      success: true,
      message: "If that email exists, password reset instructions were sent.",
    });

  } catch (error) {
    console.error("Reset request error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}

