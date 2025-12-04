# Environment Variables Setup Guide

## Current Issue: Database Connection Failing

The login form shows "Internal server error" because the database connection is failing. 

## What You Need to Provide

### 1. PostgreSQL Database Connection

You have two options:

**Option A: Use an existing PostgreSQL database**
Provide me with:
- Host (e.g., `localhost`, `your-db-host.com`)
- Port (usually `5432`)
- Database name (e.g., `thearc_db`, `thearc_prod`)
- Username
- Password

I'll format it as: `postgresql://username:password@host:port/database_name`

**Option B: Set up local PostgreSQL**
If you don't have a database yet, I can help you set one up locally.

### 2. Google Cloud KMS (For Production Encryption)

**Required for production** to encrypt sensitive data like emails.

Provide me with:
- Project ID
- Location (e.g., `us-central1`, `europe-west1`)
- Key Ring name
- Crypto Key name

Or provide the full resource path:
```
projects/YOUR_PROJECT_ID/locations/YOUR_LOCATION/keyRings/YOUR_KEY_RING/cryptoKeys/YOUR_KEY_NAME
```

**For development/testing:** We can skip this - the app will use a base64 fallback (NOT SECURE, but works for testing)

### 3. SendGrid (Optional - for email verification)

If you want email functionality:
- SendGrid API Key
- From email address (e.g., `noreply@thearc.com`)

## Current .env File

Your current `.env` file has:
- ✅ `JWT_SECRET` - Set
- ❌ `DATABASE_URL` - Using Prisma Accelerate (connection failing)
- ❌ `CLOUD_KMS_KEY_ID` - Not set (using fallback)
- ❌ `SENDGRID_API_KEY` - Not set
- ❌ `NEXT_PUBLIC_APP_URL` - Not set

## Quick Fix for Testing

If you just want to test the login form without setting up a full database, I can:
1. Set up a local PostgreSQL database
2. Run the migrations
3. Create a test user
4. Test the login

Let me know which option you prefer!

