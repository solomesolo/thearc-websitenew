import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  try {
    console.log("🔍 Testing database connection...");
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
    console.log("DATABASE_URL preview:", process.env.DATABASE_URL?.substring(0, 30) + "...");

    // Test connection
    await prisma.$connect();
    console.log("✅ Database connected successfully!");

    // Try a simple query
    const userCount = await prisma.user.count();
    console.log(`✅ Query successful! User count: ${userCount}`);

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      userCount: userCount,
      databaseUrl: process.env.DATABASE_URL?.substring(0, 30) + "...",
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
        details: errorMessage,
        databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

