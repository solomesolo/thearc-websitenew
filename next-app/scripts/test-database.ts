/**
 * Test script to verify database connection and insert dummy data
 * Run with: npx tsx scripts/test-database.ts
 */

import { prisma } from "../src/lib/prisma";
import { encryptJson } from "../src/lib/encryption";
import argon2 from "argon2";

async function testDatabase() {
  console.log("🧪 Testing database connection and data insertion...\n");

  try {
    // 1. Test connection
    console.log("1️⃣ Testing database connection...");
    await prisma.$connect();
    console.log("✅ Database connected successfully!\n");

    // 2. Create a test user
    console.log("2️⃣ Creating test user...");
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
    console.log(`✅ User created: ${user.id} (${testEmail})\n`);

    // 3. Create consent
    console.log("3️⃣ Creating health data consent...");
    const consent = await prisma.consent.create({
      data: {
        userId: user.id,
        type: "health_data",
        accepted: true,
        acceptedAt: new Date(),
      },
    });
    console.log(`✅ Consent created: ${consent.id}\n`);

    // 4. Create questionnaire response
    console.log("4️⃣ Creating questionnaire response...");
    const dummyAnswers = {
      "0.1": "45",
      "0.2": "165cm, 70kg",
      "0.3": "irregular periods",
      "1.1": "3",
      "1.2": "2",
      "1.3": "2",
      "1.4": "1",
      "1.5": "2",
      // ... more dummy answers
    };

    const dummyScores = {
      stress_load_score: 65,
      sleep_quality_score: 72,
      nutrition_risk_score: 58,
      cortisol_regulation_score: 68,
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
    console.log(`✅ Questionnaire response created: ${questionnaireResponse.id}\n`);

    // 5. Verify data retrieval
    console.log("5️⃣ Verifying data retrieval...");
    
    const retrievedUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        consents: true,
        questionnaireResponses: true,
      },
    });

    if (retrievedUser) {
      console.log(`✅ User retrieved: ${retrievedUser.firstName} ${retrievedUser.lastName}`);
      console.log(`   - Consents: ${retrievedUser.consents.length}`);
      console.log(`   - Questionnaire responses: ${retrievedUser.questionnaireResponses.length}`);
    }

    // 6. Count all records
    console.log("\n6️⃣ Database statistics:");
    const userCount = await prisma.user.count();
    const consentCount = await prisma.consent.count();
    const responseCount = await prisma.questionnaireResponse.count();
    
    console.log(`   - Total Users: ${userCount}`);
    console.log(`   - Total Consents: ${consentCount}`);
    console.log(`   - Total Questionnaire Responses: ${responseCount}`);

    console.log("\n✅ All tests passed! Database is working correctly.");
    console.log(`\n📧 Test credentials:`);
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}`);

  } catch (error) {
    console.error("\n❌ Error during testing:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log("\n🔌 Database connection closed.");
  }
}

// Run the test
testDatabase();

