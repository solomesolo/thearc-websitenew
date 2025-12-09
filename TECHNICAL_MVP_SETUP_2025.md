# Technical MVP Setup - January 2025

## Overview

This document outlines the technical infrastructure changes made to simplify the ARC platform to a minimal viable product (MVP) focused on core functionality: user authentication, questionnaire data collection, and secure data storage.

**Date:** January 2025  
**Branch:** `cheap-mvp`  
**Goal:** Remove complex GDPR/HIPAA infrastructure, simplify to core MVP features

---

## 1. Environment Configuration

### 1.1 Removed Google Cloud Dependencies

**Removed Variables:**
- `CLOUD_KMS_KEY_ID`
- `USE_IAM_AUTH`
- `GCP_SERVICE_ACCOUNT_EMAIL`
- All Cloud SQL-related URLs

**Files Updated:**
- `thearc-app/.env.example`
- `next-app/.env.example`
- `thearc-app/.env.local`
- `next-app/.env.local`

### 1.2 New Environment Variables

**Database:**
```env
DATABASE_URL="postgresql://postgres:PASSWORD@db.pooler.wybfjytfwnpjztswoeyh.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
```

**Encryption:**
```env
# Must be a 32-byte key in hex format (64 characters)
# Generate with: openssl rand -hex 32
ENCRYPTION_KEY="64-character-hex-string"
```

**API Keys:**
```env
OPENAI_API_KEY="..."
NOTION_TOKEN="..."
NOTION_DATABASE_ID="..."
SENDGRID_API_KEY="..."
SENDGRID_FROM_EMAIL="thearc@thearcme.com"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
NEXT_PUBLIC_SUPABASE_URL="https://wybfjytfwnpjztswoeyh.supabase.co"
```

---

## 2. Encryption System

### 2.1 Implementation

**File:** `thearc-app/lib/encryption.ts`  
**File:** `next-app/src/lib/encryption.ts`

**Replaced:** Google Cloud KMS  
**With:** AES-256-GCM using Node.js `crypto` module

### 2.2 Functions

```typescript
// Encrypt any JSON-serializable data
encryptJson(payload: unknown): string
// Returns: Base64-encoded string (IV + AuthTag + Ciphertext)

// Decrypt and parse JSON
decryptJson<T = any>(ciphertextB64: string): T
// Returns: Decrypted and parsed JSON value
```

### 2.3 Key Requirements

- **Key Format:** 64 hex characters (32 bytes)
- **Algorithm:** AES-256-GCM
- **IV:** 12-byte random IV per encryption
- **Auth Tag:** 16-byte authentication tag
- **Output:** Base64 string containing IV + AuthTag + Ciphertext

### 2.4 Key Generation

```bash
openssl rand -hex 32
```

---

## 3. Database Schema Simplification

### 3.1 Prisma Schema Changes

**File:** `thearc-app/prisma/schema.prisma`  
**File:** `next-app/prisma/schema.prisma`

### 3.2 Removed Models

- `DataAccessLog` - Detailed audit logging
- `DataExportRequest` - GDPR data export
- `DataDeletionRequest` - GDPR data deletion
- `DataBreachLog` - Breach tracking

### 3.3 Simplified Models

#### User Model
```prisma
model User {
  id                    String                 @id @default(cuid())
  firstName             String
  lastName              String
  email                 String                  @unique
  emailEncrypted        String
  passwordHash          String
  emailVerified         Boolean                @default(false)
  country               String
  timezone              String?
  createdAt             DateTime               @default(now())
  updatedAt             DateTime               @updatedAt
  deletedAt             DateTime?

  questionnaireResponses QuestionnaireResponse[]
  consents               Consent[]
  verificationTokens     VerificationToken[]
  passwordResetTokens    PasswordResetToken[]

  @@index([email])
  @@index([emailEncrypted])
}
```

#### Consent Model
```prisma
model Consent {
  id         String   @id @default(cuid())
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId     String
  type       String   // "health_data" only
  accepted   Boolean  @default(true)
  acceptedAt DateTime @default(now())
  withdrawnAt DateTime?

  @@index([userId])
  @@index([type])
}
```

#### QuestionnaireResponse Model
```prisma
model QuestionnaireResponse {
  id                    String   @id @default(cuid())
  user                  User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId                String
  persona               String
  responseDataEncrypted String   // Base64 AES-256-GCM encrypted JSON
  scoresEncrypted       String?   // Optional encrypted scores JSON
  createdAt             DateTime @default(now())
  completedAt           DateTime @default(now())

  @@index([userId])
  @@index([persona])
  @@index([createdAt])
}
```

### 3.4 Removed Fields

From `QuestionnaireResponse`:
- `retentionUntil`
- `anonymizedAt`
- `version`
- `updatedAt`

From `Consent`:
- `ipAddress`
- `legalVersion`
- `mandatory`
- `timestamp`
- `expiresAt`
- `purpose`

---

## 4. Consent Management Simplification

### 4.1 File: `lib/consent-management.ts`

**Changed:** Single consent type (`health_data` only)

### 4.2 Functions

```typescript
// Check if user has health data consent
hasHealthDataConsent(userId: string): Promise<boolean>

// Record health data consent
recordHealthDataConsent(userId: string, ipAddress?: string)

// Withdraw health data consent
withdrawHealthDataConsent(userId: string)

// Get user's consent status
getHealthDataConsent(userId: string)
```

### 4.3 Removed

- Support for `marketing`, `research`, `third_party` consent types
- Complex expiration logic
- IP address tracking
- Legal version tracking

---

## 5. Audit Logging Removal

### 5.1 File: `lib/audit-log.ts`

**Changed:** Replaced database writes with `console.log` (development only)

**Removed:**
- `DataAccessLog` writes
- `getUserAuditLogs()`
- `getResponseAuditLogs()`
- All HIPAA-specific logging

**Current Implementation:**
- Simple `console.log` for development debugging
- No database writes

---

## 6. Data Retention Removal

### 6.1 File: `lib/data-retention.ts`

**Status:** Completely removed

**Removed:**
- `runDataRetentionTasks()`
- Automatic anonymization
- Scheduled deletion jobs
- Cron job entry points

---

## 7. API Routes Updates

### 7.1 POST /api/questionnaire/save

**File:** `thearc-app/pages/api/questionnaire/save.ts`  
**File:** `next-app/src/app/api/questionnaire/save/route.ts`

**Functionality:**
1. Verifies user session/auth
2. Checks `hasHealthDataConsent(userId)`
3. Validates request body (Zod schema)
4. Encrypts `responseData` and optional `scores` using `encryptJson()`
5. Creates `QuestionnaireResponse` record
6. Returns `{ success: true, responseId: string }`

**Request Body:**
```typescript
{
  persona: string;
  responseData: Record<string, any>;
  scores?: Record<string, any>;
}
```

**Removed:**
- KMS encryption
- Data access log writes
- Retention field updates
- IP address/user agent tracking

### 7.2 GET /api/questionnaire/get

**File:** `thearc-app/pages/api/questionnaire/get.ts`

**Functionality:**
1. Verifies user session/auth
2. Validates `responseId` belongs to authenticated user
3. Fetches `QuestionnaireResponse` by id
4. Decrypts `responseDataEncrypted` and `scoresEncrypted` using `decryptJson()`
5. Returns decrypted response

**Response:**
```typescript
{
  success: true;
  response: {
    id: string;
    persona: string;
    responseData: Record<string, any>;
    scores?: Record<string, any>;
    createdAt: string;
  };
}
```

**Removed:**
- HIPAA audit logs
- Retention flags
- KMS decryption
- IP address/user agent tracking

### 7.3 POST /api/auth/register

**File:** `next-app/src/app/api/auth/register/route.ts`

**Updated:** Now saves directly to Supabase database (no longer depends on `thearc-app`)

**Functionality:**
1. Validates input (Zod schema)
2. Checks for existing user by email
3. Hashes password with `argon2`
4. Encrypts email with `encryptJson()`
5. Creates user in database
6. Records health data consent
7. Creates verification token
8. Sets session cookie (JWT)
9. Returns success response

---

## 8. Prisma Setup in next-app

### 8.1 Files Created

- `next-app/prisma/schema.prisma` - Database schema
- `next-app/prisma.config.ts` - Prisma 7 configuration
- `next-app/src/lib/prisma.ts` - Prisma client with Supabase connection
- `next-app/src/lib/encryption.ts` - AES-256-GCM encryption
- `next-app/src/lib/session.ts` - Session management (App Router)
- `next-app/src/lib/consent-management.ts` - Consent handling

### 8.2 Dependencies Added

```json
{
  "@prisma/client": "^7.1.0",
  "prisma": "^7.1.0",
  "@prisma/adapter-pg": "^7.0.1",
  "pg": "^8.16.3",
  "jsonwebtoken": "^9.0.2",
  "@types/jsonwebtoken": "^9.0.10",
  "argon2": "^0.44.0",
  "date-fns": "^4.1.0"
}
```

### 8.3 Prisma Configuration

**File:** `prisma.config.ts`
```typescript
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

### 8.4 Database Connection

**File:** `src/lib/prisma.ts`

**Features:**
- Supports Supabase connection pooler (port 6543)
- SSL configuration for remote connections
- Connection pooling with `pgbouncer=true`
- Connection limit for serverless (`connection_limit=1`)
- Automatic adapter selection (PrismaPg for direct PostgreSQL)

---

## 9. Database Migration

### 9.1 Migration Created

**File:** `thearc-app/prisma/migrations/20250104180000_init_cheap_mvp/migration.sql`

**Actions:**
1. Adds `email` column to `User` (nullable first, then required)
2. Populates email for existing users (placeholder if needed)
3. Removes unwanted columns from `Consent`
4. Removes unwanted columns from `QuestionnaireResponse`
5. Drops unwanted tables (`DataAccessLog`, `DataDeletionRequest`, etc.)
6. Updates `PasswordResetToken` and `VerificationToken`

### 9.2 Manual SQL Script

**File:** `next-app/create-tables.sql`

Created for manual execution in Supabase SQL Editor to set up tables if Prisma CLI connection fails.

---

## 10. Production-Like Testing Configuration

### 10.1 Connection String Format

```
postgresql://postgres:PASSWORD@db.pooler.wybfjytfwnpjztswoeyh.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require
```

**Parameters:**
- `pgbouncer=true` - Indicates connection pooler usage
- `connection_limit=1` - Optimized for serverless
- `sslmode=require` - Enforces SSL encryption
- Port `6543` - Transaction mode (ideal for serverless)

### 10.2 Prisma Pool Configuration

**File:** `next-app/src/lib/prisma.ts`

**Settings:**
- Respects `connection_limit` from URL
- Increased timeout to 30 seconds
- SSL properly configured for Supabase
- Connection pooling optimized for serverless

### 10.3 Testing Endpoints

**Created:** `next-app/src/app/api/test/database/route.ts`

**Functionality:**
- Tests database connection
- Creates test user
- Creates consent record
- Creates questionnaire response
- Verifies data retrieval
- Returns statistics

**Access:** `GET /api/test/database` (development only)

---

## 11. Code Cleanup

### 11.1 Removed Files

- `thearc-app/lib/data-retention.ts` - Completely removed
- All KMS-related imports and functions

### 11.2 Updated Files

**Encryption:**
- `thearc-app/lib/data-collection.ts` - Uses `encryptJson`/`decryptJson`
- `thearc-app/lib/data-rights.ts` - Disabled functions (models removed)
- `thearc-app/scripts/create-test-user-simple.js` - Uses new encryption

**Session Management:**
- `thearc-app/lib/session.ts` - Renamed `getSession` to `getSessionFromRequest`
- `next-app/src/lib/session.ts` - App Router version (uses `NextRequest`)

**Consent:**
- `thearc-app/pages/api/consent/record.ts` - Simplified to `health_data` only
- `next-app/src/app/api/auth/register/route.ts` - Uses simplified consent

---

## 12. Database Connection Issues

### 12.1 Local Development

**Issue:** Prisma CLI cannot connect to Supabase from local machine  
**Cause:** Network/firewall blocking ports 5432/6543  
**Workaround:** 
- Use Supabase SQL Editor for manual operations
- Connection works in deployed environments (Vercel, etc.)

### 12.2 Connection Pooler

**Recommended:** Use port 6543 (transaction mode) for serverless  
**Format:** `db.pooler.wybfjytfwnpjztswoeyh.supabase.co:6543`

### 12.3 Direct Connection

**Alternative:** Port 5432 (session mode) for persistent connections  
**Format:** `db.wybfjytfwnpjztswoeyh.supabase.co:5432`

---

## 13. Security Considerations

### 13.1 Encryption

- **Algorithm:** AES-256-GCM (authenticated encryption)
- **Key Management:** Environment variable (must be 64 hex characters)
- **Key Storage:** Never commit to repository
- **Key Rotation:** Generate new key and re-encrypt data if compromised

### 13.2 Data Storage

- **At Rest:** All questionnaire data encrypted (AES-256-GCM)
- **In Transit:** SSL/TLS required (`sslmode=require`)
- **Email:** Encrypted in database (`emailEncrypted` field)

### 13.3 Session Management

- **JWT Tokens:** 7-day expiration
- **HttpOnly Cookies:** Prevents XSS attacks
- **SameSite=Lax:** CSRF protection
- **Secure Flag:** Enabled in production (HTTPS)

---

## 14. API Key Configuration

### 14.1 Required Keys

All keys configured in `.env.local`:

- `OPENAI_API_KEY` - For questionnaire processing
- `NOTION_TOKEN` - For Notion integration
- `NOTION_DATABASE_ID` - Notion database ID
- `SENDGRID_API_KEY` - Email sending
- `SENDGRID_FROM_EMAIL` - Sender email address
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase client key
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase API URL
- `DATABASE_URL` - PostgreSQL connection string
- `ENCRYPTION_KEY` - 64-character hex key
- `JWT_SECRET` - JWT signing secret

### 14.2 Key Generation

```bash
# Encryption key
openssl rand -hex 32

# JWT secret
openssl rand -base64 32
```

---

## 15. Migration Guide

### 15.1 For Existing Data

If migrating from old schema:

1. Run migration SQL manually in Supabase
2. Existing users will get placeholder emails (`user-{id}@temp.local`)
3. Users should update emails on next login
4. Old encrypted data may need re-encryption if key changed

### 15.2 For New Deployments

1. Set up Supabase database
2. Run `create-tables.sql` in Supabase SQL Editor
3. Generate `ENCRYPTION_KEY` and `JWT_SECRET`
4. Configure all environment variables
5. Run `npx prisma generate` in both apps
6. Deploy to production

---

## 16. Testing

### 16.1 Database Testing

**Option 1: SQL Script**
- Use `insert-test-data.sql` in Supabase SQL Editor
- Bypasses connection issues
- Verifies schema and data flow

**Option 2: API Endpoint**
- `GET /api/test/database` (development only)
- Tests full Prisma connection
- Creates test data via API

### 16.2 Production Testing

**Recommended:** Deploy to Vercel for true production environment testing
- Network restrictions different
- Serverless environment matches production
- Connection pooling works as expected

---

## 17. File Structure

### 17.1 New Files Created

```
next-app/
├── prisma/
│   ├── schema.prisma
│   └── prisma.config.ts
├── src/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── encryption.ts
│   │   ├── session.ts
│   │   └── consent-management.ts
│   └── app/
│       └── api/
│           ├── questionnaire/
│           │   └── save/
│           │       └── route.ts
│           └── test/
│               └── database/
│                   └── route.ts
├── scripts/
│   └── test-database.ts
├── create-tables.sql
└── insert-test-data.sql
```

### 17.2 Updated Files

```
thearc-app/
├── lib/
│   ├── encryption.ts (new implementation)
│   ├── consent-management.ts (simplified)
│   ├── audit-log.ts (console.log only)
│   └── data-collection.ts (uses new encryption)
├── pages/
│   └── api/
│       ├── questionnaire/
│       │   ├── save.ts (updated)
│       │   └── get.ts (updated)
│       └── consent/
│           └── record.ts (simplified)
└── prisma/
    └── schema.prisma (simplified)
```

---

## 18. Dependencies

### 18.1 Removed

- `@google-cloud/kms` - No longer needed

### 18.2 Added (next-app)

- `@prisma/client`
- `prisma`
- `@prisma/adapter-pg`
- `pg`
- `jsonwebtoken`
- `@types/jsonwebtoken`
- `argon2`
- `date-fns`
- `tsx` (dev dependency)

---

## 19. Next Steps

### 19.1 Production Deployment

1. **Generate Keys:**
   ```bash
   openssl rand -hex 32  # ENCRYPTION_KEY
   openssl rand -base64 32  # JWT_SECRET
   ```

2. **Set Environment Variables:**
   - Configure all keys in Vercel/production environment
   - Never commit secrets to repository

3. **Database Setup:**
   - Ensure Supabase tables are created
   - Verify connection string format
   - Test connection from production environment

4. **Deploy:**
   - Push code to repository
   - Deploy to Vercel
   - Verify all endpoints work

### 19.2 Monitoring

- Monitor database connection errors
- Track encryption/decryption failures
- Log consent management issues
- Monitor API response times

---

## 20. Troubleshooting

### 20.1 Database Connection

**Error:** `Can't reach database server`

**Solutions:**
- Check network/firewall settings
- Verify connection string format
- Try connection pooler (port 6543)
- Test from production environment

### 20.2 Encryption Errors

**Error:** `ENCRYPTION_KEY must be exactly 64 hex characters`

**Solution:**
```bash
openssl rand -hex 32
# Copy output to ENCRYPTION_KEY
```

### 20.3 Prisma Errors

**Error:** `Migration failed`

**Solutions:**
- Run SQL manually in Supabase
- Check schema matches database
- Verify `prisma.config.ts` is correct

---

## 21. Summary

### 21.1 What Was Removed

- Google Cloud KMS encryption
- Complex GDPR/HIPAA audit logging
- Data retention and anonymization
- Multiple consent types
- Data export/deletion request handling
- Breach logging

### 21.2 What Was Added

- AES-256-GCM encryption (Node.js crypto)
- Simplified consent management (health_data only)
- Supabase database integration
- Production-ready connection pooling
- MVP-focused API routes
- Comprehensive testing endpoints

### 21.3 What Was Simplified

- Database schema (3 core models)
- Consent logic (single type)
- Audit logging (console.log only)
- API routes (removed complex features)
- Environment configuration

---

## 22. References

- **Prisma 7 Documentation:** https://www.prisma.io/docs
- **Supabase Connection Pooling:** https://supabase.com/docs/guides/database/connecting-to-postgres
- **AES-256-GCM:** Node.js crypto module documentation
- **Argon2:** https://github.com/ranisalt/node-argon2

---

**Last Updated:** January 2025  
**Status:** MVP Ready for Production Testing

