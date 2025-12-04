# Production Setup Guide

## Required Environment Variables

To set up the application for production (or production-like development), you need the following:

### 1. Database Connection

**Option A: Direct PostgreSQL (Recommended for Production)**
```env
DATABASE_URL="postgresql://username:password@host:5432/database_name?sslmode=require"
```

**Option B: Prisma Accelerate (Development/Testing)**
```env
DATABASE_URL="prisma+postgres://localhost:51213/?api_key=..."
```

### 2. JWT Secret
```env
JWT_SECRET="your-secure-random-string-here"
```
Generate with: `openssl rand -base64 32`

### 3. Google Cloud KMS (For Production Encryption)

**Required for production** to encrypt sensitive data like emails.

**Format:**
```env
CLOUD_KMS_KEY_ID="projects/YOUR_PROJECT_ID/locations/YOUR_LOCATION/keyRings/YOUR_KEY_RING/cryptoKeys/YOUR_KEY_NAME"
```

**To get this value:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **Security** > **Key Management** (KMS)
3. Create or select a key ring and crypto key
4. Copy the full resource name

**For development/testing:** Leave empty - the app will use a base64 fallback (NOT SECURE, but works for testing)

### 4. SendGrid Email (Optional for Testing)

```env
SENDGRID_API_KEY="your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@thearc.com"
```

### 5. Application URL

```env
NEXT_PUBLIC_APP_URL="http://localhost:3002"  # Development
# or
NEXT_PUBLIC_APP_URL="https://your-domain.com"  # Production
```

## Quick Setup Steps

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your values:**
   - Replace `DATABASE_URL` with your PostgreSQL connection string
   - Generate and set `JWT_SECRET`
   - (Optional) Set `CLOUD_KMS_KEY_ID` for production encryption
   - (Optional) Set SendGrid credentials for email

3. **Run database migrations:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Create a test user:**
   ```bash
   curl -X POST http://localhost:3002/api/test/create-user
   ```

5. **Test login:**
   - Go to `http://localhost:3002/login`
   - Use: `test@thearc.com` / `test123456`

## What I Need From You

To set this up properly, please provide:

1. **PostgreSQL Connection Details:**
   - Host
   - Port (usually 5432)
   - Database name
   - Username
   - Password
   - Or a complete connection string

2. **Google Cloud KMS (if available):**
   - Project ID
   - Location
   - Key Ring name
   - Crypto Key name
   - Or the full resource path

3. **SendGrid (if you want email functionality):**
   - API Key
   - From email address

## Current Status

✅ JWT_SECRET - Added with fallback
✅ Encryption - Has fallback for development
✅ Database - Configured to support both direct PostgreSQL and Prisma Accelerate
❌ Database Connection - Needs your PostgreSQL credentials
❌ KMS Encryption - Optional, but recommended for production

