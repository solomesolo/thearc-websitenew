import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encryption";
import argon2 from "argon2";
import { z } from "zod";
import { setLoginSession } from "@/lib/session";

// ----------------
// Validation Schema
// ----------------
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// --------------
// API Handler
// --------------
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid email or password." });
  }

  const { email, password } = parsed.data;

  try {
    // Fetch all users (emails are encrypted) and decrypt one by one
    const allUsers = await prisma.user.findMany();

    let matchedUser = null;

    for (const user of allUsers) {
      const decryptedEmail = await decrypt(user.emailEncrypted);
      if (decryptedEmail.toLowerCase() === email.toLowerCase()) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Check if email is verified
    if (!matchedUser.emailVerified) {
      return res.status(403).json({ error: "Please verify your email before logging in." });
    }

    // Verify password
    const valid = await argon2.verify(matchedUser.passwordHash, password);
    if (!valid) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Create session token
    const sessionPayload = {
      userId: matchedUser.id,
      emailVerified: matchedUser.emailVerified,
      ts: Date.now(),
    };

    setLoginSession(res, sessionPayload);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

