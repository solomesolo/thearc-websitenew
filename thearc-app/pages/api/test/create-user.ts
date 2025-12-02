import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

// Simple encryption fallback for testing (NOT for production!)
async function simpleEncrypt(value: string): Promise<string> {
  try {
    const { encrypt } = await import("@/lib/encryption");
    return await encrypt(value);
  } catch (error) {
    // Fallback: simple base64 (NOT SECURE - for testing only!)
    console.warn("⚠️  Using simple base64 encoding fallback (not secure!)");
    return Buffer.from(value).toString("base64");
  }
}

async function simpleDecrypt(value: string): Promise<string> {
  try {
    const { decrypt } = await import("@/lib/encryption");
    return await decrypt(value);
  } catch (error) {
    // Fallback: simple base64 decode
    return Buffer.from(value, "base64").toString();
  }
}

/**
 * DEVELOPMENT ONLY - Creates a test user for testing purposes
 * This endpoint should be disabled in production
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "This endpoint is only available in development" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const testEmail = "test@thearc.com";
    const testPassword = "test123456";
    const firstName = "Test";
    const lastName = "User";

    // Check if user already exists
    const allUsers = await prisma.user.findMany();
    let existingUser = null;

    // Try to find existing user by checking all encrypted emails
    // Note: This is inefficient but works for testing
    for (const user of allUsers) {
      try {
        const decrypted = await simpleDecrypt(user.emailEncrypted);
        if (decrypted.toLowerCase() === testEmail.toLowerCase()) {
          existingUser = user;
          break;
        }
      } catch (e) {
        // Skip if decryption fails (might be different encryption key)
        continue;
      }
    }

    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "Test user already exists",
        credentials: {
          email: testEmail,
          password: testPassword,
        },
      });
    }

    // Encrypt email
    const emailEncrypted = await simpleEncrypt(testEmail);

    // Hash password
    const passwordHash = await argon2.hash(testPassword);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        emailEncrypted,
        passwordHash,
        country: "US",
        timezone: "America/New_York",
        emailVerified: true, // Set to true for testing
      },
    });

    // Create mandatory consents
    const legalVersion = "2025-01";
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";

    await prisma.consent.createMany({
      data: [
        {
          userId: user.id,
          type: "health_data_processing",
          mandatory: true,
          accepted: true,
          legalVersion,
          ipAddress: String(ipAddress),
        },
        {
          userId: user.id,
          type: "international_data_transfer",
          mandatory: true,
          accepted: true,
          legalVersion,
          ipAddress: String(ipAddress),
        },
        {
          userId: user.id,
          type: "terms_privacy",
          mandatory: true,
          accepted: true,
          legalVersion,
          ipAddress: String(ipAddress),
        },
        {
          userId: user.id,
          type: "age_confirmed_18",
          mandatory: true,
          accepted: true,
          legalVersion,
          ipAddress: String(ipAddress),
        },
        {
          userId: user.id,
          type: "marketing_emails",
          mandatory: false,
          accepted: false,
          legalVersion,
          ipAddress: String(ipAddress),
        },
        {
          userId: user.id,
          type: "product_updates",
          mandatory: false,
          accepted: false,
          legalVersion,
          ipAddress: String(ipAddress),
        },
        {
          userId: user.id,
          type: "data_research",
          mandatory: false,
          accepted: false,
          legalVersion,
          ipAddress: String(ipAddress),
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Test user created successfully",
      credentials: {
        email: testEmail,
        password: testPassword,
      },
    });
  } catch (error) {
    console.error("Error creating test user:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    return res.status(500).json({
      error: "Failed to create test user",
      details: errorMessage,
      stack: process.env.NODE_ENV === "development" ? errorStack : undefined,
    });
  }
}

