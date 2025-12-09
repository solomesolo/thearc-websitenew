/**
 * Test API endpoint to verify database connection and insert dummy data
 * Access at: GET /api/test/database
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { encryptJson } from "@/lib/encryption";
import argon2 from "argon2";

export async function GET(req: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  try {
    const results: any = {
      steps: [],
      statistics: {},
      testCredentials: {},
    };

    // 1. Test connection
    results.steps.push({ step: "1", action: "Testing database connection", status: "running" });
    await prisma.$connect();
    results.steps.push({ step: "1", action: "Testing database connection", status: "success" });

    // 2. Create test user
    results.steps.push({ step: "2", action: "Creating test user", status: "running" });
    const testEmail = `test-${Date.now()}@thearc.com`;
    const testPassword = "TestPassword123!";
    
    const emailEncrypted = encryptJson(testEmail);
    const passwordHash = await argon2.hash(testPassword);

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
    results.steps.push({ step: "2", action: "Creating test user", status: "success", userId: user.id });
    results.testCredentials = { email: testEmail, password: testPassword };

    // 3. Create consent
    results.steps.push({ step: "3", action: "Creating health data consent", status: "running" });
    const consent = await prisma.consent.create({
      data: {
        userId: user.id,
        type: "health_data",
        accepted: true,
        acceptedAt: new Date(),
      },
    });
    results.steps.push({ step: "3", action: "Creating health data consent", status: "success", consentId: consent.id });

    // 4. Create questionnaire response
    results.steps.push({ step: "4", action: "Creating questionnaire response", status: "running" });
    const dummyAnswers = {
      "0.1": "45",
      "0.2": "165cm, 70kg",
      "0.3": "irregular periods",
      "1.1": "3",
      "1.2": "2",
      "1.3": "2",
      "1.4": "1",
      "1.5": "2",
      "2.1": "2",
      "2.2": "1",
      "2.3": "2",
      "3.1": "2",
      "3.2": "1",
      "3.3": "2",
      "3.4": "2",
      "4.1": "2",
      "4.2": "0",
      "4.3": "false",
      "4.4": "1",
      "4.5": "1",
      "4.6": "1",
      "5.1": "2",
      "5.2": "2",
      "6.1": "2",
      "6.2": "1",
      "7.1": "2",
      "7.2": "2",
      "7.3": "2",
      "7.4": "2",
      "7.5": "2",
      "7.6": "2",
      "7.7": "2",
      "7.8": "2",
    };

    const dummyScores = {
      stress_load_score: 65,
      sleep_quality_score: 72,
      nutrition_risk_score: 58,
      cortisol_regulation_score: 68,
      cognitive_recovery_score: 70,
    };

    const responseDataEncrypted = encryptJson(dummyAnswers);
    const scoresEncrypted = encryptJson(dummyScores);

    const questionnaireResponse = await prisma.questionnaireResponse.create({
      data: {
        userId: user.id,
        persona: "women",
        responseDataEncrypted: responseDataEncrypted,
        scoresEncrypted: scoresEncrypted,
        completedAt: new Date(),
      },
    });
    results.steps.push({ step: "4", action: "Creating questionnaire response", status: "success", responseId: questionnaireResponse.id });

    // 5. Verify data retrieval
    results.steps.push({ step: "5", action: "Verifying data retrieval", status: "running" });
    const retrievedUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        consents: true,
        questionnaireResponses: true,
      },
    });
    results.steps.push({ 
      step: "5", 
      action: "Verifying data retrieval", 
      status: "success",
      userData: {
        name: `${retrievedUser?.firstName} ${retrievedUser?.lastName}`,
        consentsCount: retrievedUser?.consents.length || 0,
        responsesCount: retrievedUser?.questionnaireResponses.length || 0,
      }
    });

    // 6. Get statistics
    results.steps.push({ step: "6", action: "Getting database statistics", status: "running" });
    const userCount = await prisma.user.count();
    const consentCount = await prisma.consent.count();
    const responseCount = await prisma.questionnaireResponse.count();
    
    results.statistics = {
      totalUsers: userCount,
      totalConsents: consentCount,
      totalQuestionnaireResponses: responseCount,
    };
    results.steps.push({ step: "6", action: "Getting database statistics", status: "success" });

    return NextResponse.json({
      success: true,
      message: "All database tests passed!",
      ...results,
    });

  } catch (error) {
    console.error("Database test error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      {
        success: false,
        error: "Database test failed",
        message: errorMessage,
        details: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.stack : String(error)) : undefined,
      },
      { status: 500 }
    );
  }
}

