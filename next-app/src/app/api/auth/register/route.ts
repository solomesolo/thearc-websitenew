import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { encryptJson } from "@/lib/encryption";
import { recordHealthDataConsent } from "@/lib/consent-management";
import argon2 from "argon2";
import { randomBytes } from "crypto";
import { addHours } from "date-fns";
import jwt from "jsonwebtoken";

// Validation schema
const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  country: z.string().min(1, "Country is required"),
  timezone: z.string().optional(),

  mandatoryConsents: z.object({
    healthData: z.boolean(),
    dataTransfer: z.boolean(),
    terms: z.boolean(),
    ageConfirmed: z.boolean(),
  }),

  optionalConsents: z.object({
    marketing: z.boolean().optional(),
    productUpdates: z.boolean().optional(),
    dataResearch: z.boolean().optional(),
  }),
});

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    ""
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📝 Registration request received:", {
      email: body.email,
      hasMandatoryConsents: !!body.mandatoryConsents,
      consents: body.mandatoryConsents,
    });
    
    // Validate input
    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) {
      console.error("❌ Validation failed:", parsed.error.flatten());
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      email,
      password,
      country,
      timezone,
      mandatoryConsents,
    } = parsed.data;

    // Mandatory consents must be true
    if (
      !mandatoryConsents.healthData ||
      !mandatoryConsents.dataTransfer ||
      !mandatoryConsents.terms ||
      !mandatoryConsents.ageConfirmed
    ) {
      console.error("❌ Missing mandatory consents:", {
        healthData: mandatoryConsents.healthData,
        dataTransfer: mandatoryConsents.dataTransfer,
        terms: mandatoryConsents.terms,
        ageConfirmed: mandatoryConsents.ageConfirmed,
      });
      return NextResponse.json(
        { 
          error: "All mandatory consents must be accepted.",
          details: {
            healthData: mandatoryConsents.healthData,
            dataTransfer: mandatoryConsents.dataTransfer,
            terms: mandatoryConsents.terms,
            ageConfirmed: mandatoryConsents.ageConfirmed,
          }
        },
        { status: 400 }
      );
    }

    // Encrypt email for GDPR compliance
    const emailEncrypted = encryptJson(email);

    // Check if user already exists (by email - plaintext for unique constraint)
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await argon2.hash(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email, // Plaintext for unique constraint and lookups
        emailEncrypted, // Encrypted for GDPR compliance
        passwordHash,
        country,
        timezone: timezone || null,
      },
    });

    const ipAddress = getClientIp(req);

    // Record health data consent
    await recordHealthDataConsent(user.id, ipAddress);

    // Create verification token
    const token = randomBytes(32).toString("hex");

    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: addHours(new Date(), 24),
      },
    });

    // Create session token
    const sessionToken = jwt.sign(
      {
        userId: user.id,
        emailVerified: user.emailVerified,
        ts: Date.now(),
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      message: "Account created successfully",
      userId: user.id,
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

    console.log("✅ User registered and saved to database:", user.id);

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    // Log full error details in development
    if (process.env.NODE_ENV === "development") {
      console.error("Full error details:", {
        message: errorMessage,
        stack: errorStack,
        error: error,
      });
    }
    
    // Handle Prisma/database errors
    if (error instanceof Error) {
      // Handle unique constraint violation (email already exists)
      if (error.message.includes("Unique constraint") || error.message.includes("Unique")) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }
      
      // Handle database connection errors
      if (error.message.includes("connect") || error.message.includes("Connection") || error.message.includes("ECONNREFUSED")) {
        return NextResponse.json(
          { 
            error: "Database connection failed",
            details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
          },
          { status: 503 }
        );
      }
      
      // Handle Prisma errors
      if (error.message.includes("prisma") || error.message.includes("Prisma")) {
        return NextResponse.json(
          { 
            error: "Database error occurred",
            details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
          },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      {
        error: "Registration failed",
        details: process.env.NODE_ENV === "development" ? errorMessage : "Please try again later",
      },
      { status: 500 }
    );
  }
}

