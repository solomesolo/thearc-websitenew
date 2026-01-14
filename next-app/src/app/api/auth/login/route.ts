import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { decryptJson } from "@/lib/encryption";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("🔐 Login attempt for email:", body.email);
    
    // Validate input
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      console.error("❌ Validation failed:", parsed.error.flatten());
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 400 }
      );
    }

    let { email, password } = parsed.data;

    // Trim email to remove any leading/trailing spaces
    email = email.trim().toLowerCase();
    password = password.trim();

    try {
      // Database functionality has been removed - return service unavailable
      return NextResponse.json(
        { 
          error: "Authentication service is not available",
          message: "Database functionality has been disabled. This is a static website.",
        },
        { status: 503 }
      );

      // Test database connection first
      await prisma.$connect();
      
      // Try to find user by plaintext email first (more efficient)
      // Registration stores email in plaintext for unique constraint
      let matchedUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      // If not found by plaintext, try decrypting encrypted emails (fallback)
      if (!matchedUser) {
        console.log("⚠️  User not found by plaintext email, trying encrypted lookup...");
        const allUsers = await prisma.user.findMany({
          where: {
            emailEncrypted: { not: null },
          },
        });

        for (const user of allUsers) {
          try {
            if (user.emailEncrypted) {
              const decryptedEmail = decryptJson<string>(user.emailEncrypted);
              if (decryptedEmail.toLowerCase() === email.toLowerCase()) {
                matchedUser = user;
                console.log(`✅ Found user by encrypted email: ${decryptedEmail}`);
                break;
              }
            }
          } catch (decryptError) {
            console.error("Error decrypting email:", decryptError);
            continue;
          }
        }
      } else {
        console.log(`✅ Found user by plaintext email: ${email}`);
      }

      if (!matchedUser) {
        console.log(`❌ User not found for email: ${email}`);
        return NextResponse.json(
          { error: "Invalid email or password." },
          { status: 400 }
        );
      }

      // Check if email is verified (optional - can be skipped for now)
      // if (!matchedUser.emailVerified) {
      //   console.log(`⚠️  Email not verified for: ${email}`);
      //   return NextResponse.json(
      //     { error: "Please verify your email before logging in." },
      //     { status: 403 }
      //   );
      // }

      // Verify password
      try {
        const valid = await argon2.verify(matchedUser.passwordHash, password);
        if (!valid) {
          console.log(`❌ Password verification failed for: ${email}`);
          return NextResponse.json(
            { error: "Invalid email or password." },
            { status: 400 }
          );
        }
        console.log(`✅ Password verified for: ${email}`);
      } catch (verifyError) {
        console.error("Password verification error:", verifyError);
        return NextResponse.json(
          { error: "Invalid email or password." },
          { status: 400 }
        );
      }

      // Create session token
      const sessionToken = jwt.sign(
        {
          userId: matchedUser.id,
          emailVerified: matchedUser.emailVerified || false,
          ts: Date.now(),
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Create response with session cookie
      const response = NextResponse.json({
        success: true,
        message: "Login successful.",
        userId: matchedUser.id,
      });

      // Set session cookie
      const isProduction = process.env.NODE_ENV === "production";
      response.cookies.set("arc_session", sessionToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });

      console.log("✅ Login successful for user:", matchedUser.id);
      return response;

    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      // Handle database connection errors
      if (error instanceof Error && (
        error.message.includes("connect") || 
        error.message.includes("Connection") ||
        error.message.includes("ECONNREFUSED") ||
        error.message.includes("ENOTFOUND") ||
        error.message.includes("timeout") ||
        error.message.includes("getaddrinfo") ||
        error.message.includes("SSL")
      )) {
        const details = process.env.NODE_ENV === "development" 
          ? `Database connection error: ${errorMessage}. DATABASE_URL: ${process.env.DATABASE_URL ? 'Set' : 'Not set'}. Please restart the server after updating .env.local`
          : undefined;
        
        console.error("❌ Database connection error details:", {
          message: errorMessage,
          stack: error instanceof Error ? error.stack : undefined,
          databaseUrlSet: !!process.env.DATABASE_URL,
        });
        
        return NextResponse.json(
          { 
            error: "Database connection failed",
            details: details,
          },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        {
          error: "Login failed",
          details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Request parsing error:", error);
    return NextResponse.json(
      { error: "Invalid request format." },
      { status: 400 }
    );
  }
}

