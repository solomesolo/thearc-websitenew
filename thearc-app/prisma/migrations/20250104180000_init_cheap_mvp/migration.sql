-- Migration: init_cheap_mvp
-- This migration simplifies the schema to MVP: User, Consent, QuestionnaireResponse
-- Handles existing data by populating email for existing users

-- Step 1: Add email column as nullable first (to handle existing rows)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "email" TEXT;

-- Step 2: Populate email for existing users (using a placeholder if needed)
-- For users without email, use a temporary placeholder that they'll need to update
UPDATE "User" 
SET "email" = COALESCE("email", 'user-' || "id" || '@temp.local')
WHERE "email" IS NULL;

-- Step 3: Make email required and add unique constraint
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- Step 4: Add index on email if it doesn't exist
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");

-- Step 5: Remove unwanted columns from Consent table
ALTER TABLE "Consent" 
  DROP COLUMN IF EXISTS "ipAddress",
  DROP COLUMN IF EXISTS "legalVersion",
  DROP COLUMN IF EXISTS "mandatory",
  DROP COLUMN IF EXISTS "timestamp",
  DROP COLUMN IF EXISTS "expiresAt",
  DROP COLUMN IF EXISTS "purpose";

-- Step 6: Update Consent to use acceptedAt instead of accepted (if needed)
-- Check if acceptedAt column exists, if not add it
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'Consent' AND column_name = 'acceptedAt') THEN
    ALTER TABLE "Consent" ADD COLUMN "acceptedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
    -- Migrate data: if accepted = true, set acceptedAt to now, otherwise leave null
    UPDATE "Consent" SET "acceptedAt" = CURRENT_TIMESTAMP WHERE "accepted" = true;
  END IF;
END $$;

-- Step 7: Remove unwanted columns from QuestionnaireResponse
ALTER TABLE "QuestionnaireResponse"
  DROP COLUMN IF EXISTS "version",
  DROP COLUMN IF EXISTS "updatedAt",
  DROP COLUMN IF EXISTS "retentionUntil",
  DROP COLUMN IF EXISTS "anonymizedAt";

-- Step 8: Ensure completedAt exists and has default
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'QuestionnaireResponse' AND column_name = 'completedAt') THEN
    ALTER TABLE "QuestionnaireResponse" ADD COLUMN "completedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
    -- Set completedAt to createdAt for existing rows
    UPDATE "QuestionnaireResponse" SET "completedAt" = "createdAt" WHERE "completedAt" IS NULL;
  END IF;
END $$;

-- Step 9: Drop unwanted tables (if they exist)
DROP TABLE IF EXISTS "DataAccessLog" CASCADE;
DROP TABLE IF EXISTS "DataDeletionRequest" CASCADE;
DROP TABLE IF EXISTS "DataExportRequest" CASCADE;
DROP TABLE IF EXISTS "DataBreachLog" CASCADE;

-- Step 10: Update PasswordResetToken - remove 'used' column, add 'usedAt' if needed
ALTER TABLE "PasswordResetToken" 
  DROP COLUMN IF EXISTS "used";

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'PasswordResetToken' AND column_name = 'usedAt') THEN
    ALTER TABLE "PasswordResetToken" ADD COLUMN "usedAt" TIMESTAMP(3);
  END IF;
END $$;

-- Step 11: Update VerificationToken - remove 'used' column
ALTER TABLE "VerificationToken" 
  DROP COLUMN IF EXISTS "used";

-- Step 12: Ensure Consent.type is set correctly (migrate old types to 'health_data' if needed)
-- This is optional - you may want to keep existing types
-- UPDATE "Consent" SET "type" = 'health_data' WHERE "type" NOT IN ('health_data', 'terms_privacy', 'marketing_emails');

-- Step 13: Clean up old indexes that may no longer be needed
-- (Prisma will recreate necessary indexes based on schema)

