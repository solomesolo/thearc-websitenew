-- Run this SQL in Supabase SQL Editor to create all required tables

-- CreateTable: User
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailEncrypted" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "country" TEXT NOT NULL,
    "timezone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Consent
CREATE TABLE IF NOT EXISTS "Consent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT true,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "withdrawnAt" TIMESTAMP(3),

    CONSTRAINT "Consent_pkey" PRIMARY KEY ("id")
);

-- CreateTable: QuestionnaireResponse
CREATE TABLE IF NOT EXISTS "QuestionnaireResponse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "persona" TEXT NOT NULL,
    "responseDataEncrypted" TEXT NOT NULL,
    "scoresEncrypted" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionnaireResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable: VerificationToken
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable: PasswordResetToken
CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: User email unique
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- CreateIndex: User email
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");

-- CreateIndex: User emailEncrypted
CREATE INDEX IF NOT EXISTS "User_emailEncrypted_idx" ON "User"("emailEncrypted");

-- CreateIndex: Consent userId
CREATE INDEX IF NOT EXISTS "Consent_userId_idx" ON "Consent"("userId");

-- CreateIndex: Consent type
CREATE INDEX IF NOT EXISTS "Consent_type_idx" ON "Consent"("type");

-- CreateIndex: QuestionnaireResponse userId
CREATE INDEX IF NOT EXISTS "QuestionnaireResponse_userId_idx" ON "QuestionnaireResponse"("userId");

-- CreateIndex: QuestionnaireResponse persona
CREATE INDEX IF NOT EXISTS "QuestionnaireResponse_persona_idx" ON "QuestionnaireResponse"("persona");

-- CreateIndex: QuestionnaireResponse createdAt
CREATE INDEX IF NOT EXISTS "QuestionnaireResponse_createdAt_idx" ON "QuestionnaireResponse"("createdAt");

-- CreateIndex: VerificationToken token unique
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex: VerificationToken userId
CREATE INDEX IF NOT EXISTS "VerificationToken_userId_idx" ON "VerificationToken"("userId");

-- CreateIndex: VerificationToken token
CREATE INDEX IF NOT EXISTS "VerificationToken_token_idx" ON "VerificationToken"("token");

-- CreateIndex: PasswordResetToken token unique
CREATE UNIQUE INDEX IF NOT EXISTS "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex: PasswordResetToken userId
CREATE INDEX IF NOT EXISTS "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- CreateIndex: PasswordResetToken token
CREATE INDEX IF NOT EXISTS "PasswordResetToken_token_idx" ON "PasswordResetToken"("token");

-- AddForeignKey: Consent -> User
ALTER TABLE "Consent" 
    DROP CONSTRAINT IF EXISTS "Consent_userId_fkey",
    ADD CONSTRAINT "Consent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: QuestionnaireResponse -> User
ALTER TABLE "QuestionnaireResponse" 
    DROP CONSTRAINT IF EXISTS "QuestionnaireResponse_userId_fkey",
    ADD CONSTRAINT "QuestionnaireResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: VerificationToken -> User
ALTER TABLE "VerificationToken" 
    DROP CONSTRAINT IF EXISTS "VerificationToken_userId_fkey",
    ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: PasswordResetToken -> User
ALTER TABLE "PasswordResetToken" 
    DROP CONSTRAINT IF EXISTS "PasswordResetToken_userId_fkey",
    ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

