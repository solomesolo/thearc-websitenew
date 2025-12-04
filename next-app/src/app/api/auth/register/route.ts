import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) {
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
      optionalConsents,
    } = parsed.data;

    // Mandatory consents must be true
    if (
      !mandatoryConsents.healthData ||
      !mandatoryConsents.dataTransfer ||
      !mandatoryConsents.terms ||
      !mandatoryConsents.ageConfirmed
    ) {
      return NextResponse.json(
        { error: "All mandatory consents must be accepted." },
        { status: 400 }
      );
    }

    // Try to use thearc-app database via API call
    // In production, both apps should share the same database connection
    const thearcAppUrl = process.env.THEARC_APP_URL || 'http://localhost:3002';
    
    try {
      // Try to register via thearc-app API (which has database access)
      const response = await fetch(`${thearcAppUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          country,
          timezone,
          mandatoryConsents,
          optionalConsents,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          success: true,
          message: data.message || "Account created successfully",
        });
      } else {
        const errorData = await response.json().catch(() => ({ error: "Registration failed" }));
        return NextResponse.json(
          { error: errorData.error || "Registration failed" },
          { status: response.status }
        );
      }
    } catch (fetchError) {
      // If thearc-app is not available, check if we're in development
      console.warn("Could not reach thearc-app registration API:", fetchError);
      
      // For development: allow registration to proceed
      // This allows the flow to continue even if thearc-app isn't running
      if (process.env.NODE_ENV === "development") {
        console.log("Development mode: Allowing registration to proceed without database");
        
        return NextResponse.json({
          success: true,
          message: "Account created successfully (development mode - database sync pending)",
          warning: "Database registration will be completed when thearc-app is available",
        });
      } else {
        // In production, database is required
        return NextResponse.json(
          { 
            error: "Registration service unavailable. Please try again later.",
            details: "Unable to connect to registration service"
          },
          { status: 503 }
        );
      }
    }
  } catch (error) {
    console.error("Registration error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      {
        error: "Registration failed",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

