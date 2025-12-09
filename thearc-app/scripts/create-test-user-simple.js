/**
 * Simple script to create a test user
 * Run with: node scripts/create-test-user-simple.js
 * 
 * This script requires:
 * - DATABASE_URL environment variable
 * - ENCRYPTION_KEY environment variable (for encryption, optional - will use fallback if not set)
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');

// Encryption wrapper - uses ENCRYPTION_KEY if available, otherwise falls back to base64
async function simpleEncrypt(value) {
  if (process.env.ENCRYPTION_KEY) {
    // Use real encryption if ENCRYPTION_KEY is configured
    const { encrypt } = require('../lib/encryption');
    return await encrypt(value);
  } else {
    // Fallback: simple base64 (NOT SECURE - for testing only!)
    console.warn('⚠️  WARNING: Using simple base64 encoding. This is NOT secure!');
    console.warn('⚠️  Set up ENCRYPTION_KEY for production use. Generate with: openssl rand -hex 32');
    return Buffer.from(value).toString('base64');
  }
}

async function simpleDecrypt(value) {
  if (process.env.ENCRYPTION_KEY) {
    const { decrypt } = require('../lib/encryption');
    return await decrypt(value);
  } else {
    return Buffer.from(value, 'base64').toString();
  }
}

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    const testEmail = 'test@thearc.com';
    const testPassword = 'test123456';
    const firstName = 'Test';
    const lastName = 'User';

    console.log('🔍 Checking for existing test user...');

    // Check if user already exists
    const allUsers = await prisma.user.findMany();
    let existingUser = null;

    for (const user of allUsers) {
      try {
        const decrypted = await simpleDecrypt(user.emailEncrypted);
        if (decrypted.toLowerCase() === testEmail.toLowerCase()) {
          existingUser = user;
          break;
        }
      } catch (e) {
        // Skip if decryption fails
        continue;
      }
    }

    if (existingUser) {
      console.log('✅ Test user already exists!');
      console.log('\n📧 Login Credentials:');
      console.log(`   Email: ${testEmail}`);
      console.log(`   Password: ${testPassword}`);
      console.log('\n🔗 Login URL: http://localhost:3002/login');
      return;
    }

    console.log('🔐 Encrypting email...');
    const emailEncrypted = await simpleEncrypt(testEmail);

    console.log('🔑 Hashing password...');
    const passwordHash = await argon2.hash(testPassword);

    console.log('👤 Creating user...');
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        emailEncrypted,
        passwordHash,
        country: 'US',
        timezone: 'America/New_York',
        emailVerified: true, // Set to true for testing
      },
    });

    console.log('📋 Creating consents...');
    const legalVersion = '2025-01';
    const ipAddress = '127.0.0.1';

    await prisma.consent.createMany({
      data: [
        {
          userId: user.id,
          type: 'health_data_processing',
          mandatory: true,
          accepted: true,
          legalVersion,
          ipAddress,
        },
        {
          userId: user.id,
          type: 'international_data_transfer',
          mandatory: true,
          accepted: true,
          legalVersion,
          ipAddress,
        },
        {
          userId: user.id,
          type: 'terms_privacy',
          mandatory: true,
          accepted: true,
          legalVersion,
          ipAddress,
        },
        {
          userId: user.id,
          type: 'age_confirmed_18',
          mandatory: true,
          accepted: true,
          legalVersion,
          ipAddress,
        },
        {
          userId: user.id,
          type: 'marketing_emails',
          mandatory: false,
          accepted: false,
          legalVersion,
          ipAddress,
        },
        {
          userId: user.id,
          type: 'product_updates',
          mandatory: false,
          accepted: false,
          legalVersion,
          ipAddress,
        },
        {
          userId: user.id,
          type: 'data_research',
          mandatory: false,
          accepted: false,
          legalVersion,
          ipAddress,
        },
      ],
    });

    console.log('\n✅ Test user created successfully!');
    console.log('\n📧 Login Credentials:');
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}`);
    console.log('\n🔗 Login URL: http://localhost:3002/login');
    console.log('\n✨ User is already verified, so you can login immediately!');

  } catch (error) {
    console.error('❌ Error creating test user:', error);
    if (error.message.includes('DATABASE_URL')) {
      console.error('\n💡 Make sure DATABASE_URL is set in your .env file');
    }
    if (error.message.includes('ENCRYPTION_KEY')) {
      console.error('\n💡 Note: Using simple encryption fallback (not secure for production)');
      console.error('💡 Generate ENCRYPTION_KEY with: openssl rand -hex 32');
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();

