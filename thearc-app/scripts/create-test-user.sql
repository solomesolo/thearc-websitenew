-- Create a test user for development/testing
-- Run this directly in your PostgreSQL database

-- First, you'll need to:
-- 1. Hash the password "test123456" using argon2
-- 2. Encrypt the email "test@thearc.com" using your KMS key
-- 3. Then insert the user

-- For quick testing without encryption, you can temporarily modify the schema
-- or use this approach:

-- Step 1: Hash the password (run this in Node.js or use online tool)
-- const argon2 = require('argon2');
-- argon2.hash('test123456').then(hash => console.log(hash));

-- Step 2: Encrypt the email (requires KMS setup)
-- const { encrypt } = require('./lib/encryption');
-- encrypt('test@thearc.com').then(encrypted => console.log(encrypted));

-- Step 3: Insert user (replace HASHED_PASSWORD and ENCRYPTED_EMAIL with values from above)
/*
INSERT INTO "User" (
  id,
  "firstName",
  "lastName",
  "emailEncrypted",
  "passwordHash",
  country,
  timezone,
  "emailVerified",
  "createdAt",
  "updatedAt"
) VALUES (
  'test-user-id-' || gen_random_uuid()::text,
  'Test',
  'User',
  'ENCRYPTED_EMAIL_HERE',  -- Replace with encrypted email
  'HASHED_PASSWORD_HERE',  -- Replace with argon2 hash
  'US',
  'America/New_York',
  true,
  NOW(),
  NOW()
) RETURNING id;
*/

-- Then insert consents (replace USER_ID with the returned id from above)
/*
INSERT INTO "Consent" (
  id,
  "userId",
  type,
  mandatory,
  accepted,
  "legalVersion",
  "ipAddress",
  timestamp
) VALUES
  (gen_random_uuid()::text, 'USER_ID_HERE', 'health_data_processing', true, true, '2025-01', '127.0.0.1', NOW()),
  (gen_random_uuid()::text, 'USER_ID_HERE', 'international_data_transfer', true, true, '2025-01', '127.0.0.1', NOW()),
  (gen_random_uuid()::text, 'USER_ID_HERE', 'terms_privacy', true, true, '2025-01', '127.0.0.1', NOW()),
  (gen_random_uuid()::text, 'USER_ID_HERE', 'age_confirmed_18', true, true, '2025-01', '127.0.0.1', NOW()),
  (gen_random_uuid()::text, 'USER_ID_HERE', 'marketing_emails', false, false, '2025-01', '127.0.0.1', NOW()),
  (gen_random_uuid()::text, 'USER_ID_HERE', 'product_updates', false, false, '2025-01', '127.0.0.1', NOW()),
  (gen_random_uuid()::text, 'USER_ID_HERE', 'data_research', false, false, '2025-01', '127.0.0.1', NOW());
*/

