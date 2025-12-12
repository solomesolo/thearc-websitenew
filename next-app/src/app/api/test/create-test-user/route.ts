import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { encryptJson } from "@/lib/encryption";
import argon2 from "argon2";

/**
 * Create a test user with dummy data for login testing
 * Access at: POST /api/test/create-test-user
 */

export async function POST(req: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  try {
    const testEmail = "test@thearc.com";
    const testPassword = "TestPassword123!";

    // Check if test user already exists
    const existing = await prisma.user.findUnique({
      where: { email: testEmail },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Test user already exists",
        credentials: {
          email: testEmail,
          password: testPassword,
        },
        userId: existing.id,
      });
    }

    // Encrypt email
    const emailEncrypted = encryptJson(testEmail);

    // Hash password
    const passwordHash = await argon2.hash(testPassword);

    // Create test user with dummy data
    const user = await prisma.user.create({
      data: {
        firstName: "Test",
        lastName: "User",
        email: testEmail,
        emailEncrypted: emailEncrypted,
        passwordHash: passwordHash,
        country: "US",
        timezone: "America/New_York",
        emailVerified: true, // Set to true so login works immediately
      },
    });

    // Create health data consent
    await prisma.consent.create({
      data: {
        userId: user.id,
        type: "health_data",
        accepted: true,
        acceptedAt: new Date(),
      },
    });

    console.log(`✅ Test user created: ${user.id} (${testEmail})`);

    return NextResponse.json({
      success: true,
      message: "Test user created successfully",
      credentials: {
        email: testEmail,
        password: testPassword,
      },
      userId: user.id,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    console.error("Error creating test user:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create test user",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

