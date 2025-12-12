import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decryptJson } from "@/lib/encryption";
import argon2 from "argon2";

/**
 * Check if a user exists and verify password
 * Access at: POST /api/test/check-user
 */

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  try {
    const { email, password } = await req.json();
    
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const searchEmail = email.toLowerCase().trim();

    // Try to find user by plaintext email
    let user = await prisma.user.findUnique({
      where: { email: searchEmail },
    });

    // If not found, try encrypted lookup
    if (!user) {
      const allUsers = await prisma.user.findMany();
      for (const u of allUsers) {
        try {
          if (u.emailEncrypted) {
            const decrypted = decryptJson<string>(u.emailEncrypted);
            if (decrypted.toLowerCase() === searchEmail) {
              user = u;
              break;
            }
          }
        } catch (e) {
          continue;
        }
      }
    }

    if (!user) {
      return NextResponse.json({
        found: false,
        message: "User not found",
        searchedEmail: searchEmail,
      });
    }

    // Verify password if provided
    let passwordValid = null;
    if (password) {
      try {
        passwordValid = await argon2.verify(user.passwordHash, password);
      } catch (e) {
        passwordValid = false;
      }
    }

    return NextResponse.json({
      found: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        emailVerified: user.emailVerified,
        hasPasswordHash: !!user.passwordHash,
      },
      passwordValid: passwordValid,
      searchedEmail: searchEmail,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to check user",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

