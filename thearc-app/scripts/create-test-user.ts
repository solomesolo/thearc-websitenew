import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { encrypt, decrypt } from "../lib/encryption";
import { randomBytes } from "crypto";
import { addHours } from "date-fns";

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    const testEmail = "test@thearc.com";
    const testPassword = "test123456";
    const firstName = "Test";
    const lastName = "User";

    // Check if user already exists
    const allUsers = await prisma.user.findMany();
    let existingUser = null;

    for (const user of allUsers) {
      try {
        const decrypted = await decrypt(user.emailEncrypted);
        if (decrypted.toLowerCase() === testEmail.toLowerCase()) {
          existingUser = user;
          break;
        }
      } catch (e) {
        // Skip if decryption fails
      }
    }

    if (existingUser) {
      console.log("Test user already exists!");
      console.log(`Email: ${testEmail}`);
      console.log(`Password: ${testPassword}`);
      return;
    }

    // Encrypt email
    const emailEncrypted = await encrypt(testEmail);

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
    const ipAddress = "127.0.0.1";

    await prisma.consent.createMany({
      data: [
        {
          userId: user.id,
          type: "health_data_processing",
          mandatory: true,
          accepted: true,
          legalVersion,
          ipAddress,
        },
        {
          userId: user.id,
          type: "international_data_transfer",
          mandatory: true,
          accepted: true,
          legalVersion,
          ipAddress,
        },
        {
          userId: user.id,
          type: "terms_privacy",
          mandatory: true,
          accepted: true,
          legalVersion,
          ipAddress,
        },
        {
          userId: user.id,
          type: "age_confirmed_18",
          mandatory: true,
          accepted: true,
          legalVersion,
          ipAddress,
        },
        {
          userId: user.id,
          type: "marketing_emails",
          mandatory: false,
          accepted: false,
          legalVersion,
          ipAddress,
        },
        {
          userId: user.id,
          type: "product_updates",
          mandatory: false,
          accepted: false,
          legalVersion,
          ipAddress,
        },
        {
          userId: user.id,
          type: "data_research",
          mandatory: false,
          accepted: false,
          legalVersion,
          ipAddress,
        },
      ],
    });

    console.log("✅ Test user created successfully!");
    console.log("\n📧 Login Credentials:");
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}`);
    console.log("\n🔗 Login URL: http://localhost:3002/login");
    console.log("\n✨ User is already verified, so you can login immediately!");

  } catch (error) {
    console.error("❌ Error creating test user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();

