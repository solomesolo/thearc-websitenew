import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { encryptJson } from "@/lib/encryption";
import argon2 from "argon2";

/**
 * Delete and recreate test user with fresh password hash
 * Access at: POST /api/test/recreate-test-user
 */

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  try {
    const testEmail = "test@thearc.com";
    const testPassword = "TestPassword123!";

    // Delete existing test user if exists
    const existing = await prisma.user.findUnique({
      where: { email: testEmail },
    });

    if (existing) {
      // Delete related records first
      await prisma.consent.deleteMany({
        where: { userId: existing.id },
      });
      
      await prisma.user.delete({
        where: { id: existing.id },
      });
      console.log(`🗑️  Deleted existing test user: ${existing.id}`);
    }

    // Create fresh password hash
    const passwordHash = await argon2.hash(testPassword);
    const emailEncrypted = encryptJson(testEmail);

    // Create new test user
    const user = await prisma.user.create({
      data: {
        firstName: "Test",
        lastName: "User",
        email: testEmail,
        emailEncrypted: emailEncrypted,
        passwordHash: passwordHash,
        country: "US",
        timezone: "America/New_York",
        emailVerified: true,
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

    // Verify the password works
    const passwordValid = await argon2.verify(passwordHash, testPassword);

    console.log(`✅ Test user recreated: ${user.id} (${testEmail})`);
    console.log(`✅ Password verification test: ${passwordValid ? "PASSED" : "FAILED"}`);

    return NextResponse.json({
      success: true,
      message: "Test user recreated successfully",
      credentials: {
        email: testEmail,
        password: testPassword,
      },
      userId: user.id,
      passwordVerified: passwordValid,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    console.error("Error recreating test user:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to recreate test user",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

