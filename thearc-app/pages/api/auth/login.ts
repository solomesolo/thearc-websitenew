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
    // Test database connection first
    await prisma.$connect();
    
    // Fetch all users (emails are encrypted) and decrypt one by one
    const allUsers = await prisma.user.findMany();

    let matchedUser = null;

    for (const user of allUsers) {
      try {
        const decryptedEmail = await decrypt(user.emailEncrypted);
        if (decryptedEmail.toLowerCase() === email.toLowerCase()) {
          matchedUser = user;
          console.log(`✅ Found user: ${decryptedEmail}`);
          break;
        }
      } catch (decryptError) {
        console.error("Error decrypting email:", decryptError);
        continue;
      }
    }

    if (!matchedUser) {
      console.log(`❌ User not found for email: ${email}`);
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Check if email is verified
    if (!matchedUser.emailVerified) {
      console.log(`⚠️  Email not verified for: ${email}`);
      return res.status(403).json({ error: "Please verify your email before logging in." });
    }

    // Verify password
    try {
      const valid = await argon2.verify(matchedUser.passwordHash, password);
      if (!valid) {
        console.log(`❌ Password verification failed for: ${email}`);
        return res.status(400).json({ error: "Invalid email or password." });
      }
      console.log(`✅ Password verified for: ${email}`);
    } catch (verifyError) {
      console.error("Password verification error:", verifyError);
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ 
      error: "Internal server error.",
      details: process.env.NODE_ENV === "development" ? errorMessage : undefined
    });
  }
}

