# Login System Troubleshooting Guide

## Issues Fixed

### 1. Missing JWT_SECRET
**Problem:** JWT_SECRET environment variable was not set, causing JWT signing/verification to fail.

**Solution:** 
- Added JWT_SECRET to `.env` file
- Added fallback values in `lib/session.ts`, `lib/auth.ts`, and `middleware.ts` for development

### 2. Missing CLOUD_KMS_KEY_ID
**Problem:** Google Cloud KMS was not configured, causing encryption/decryption to fail.

**Solution:**
- Updated `lib/encryption.ts` to use a simple base64 fallback when KMS is not configured
- This is NOT secure for production but works for development/testing

### 3. Database Connection
**Problem:** Prisma Accelerate connection may fail if the local Prisma server is not running.

**Solution:**
- Prisma client is configured to handle Prisma Accelerate URLs
- If connection fails, check that Prisma server is running: `npx prisma dev`

## Testing Login

### Step 1: Create a Test User
```bash
curl -X POST http://localhost:3002/api/test/create-user
```

This will create a test user with:
- Email: `test@thearc.com`
- Password: `test123456`

### Step 2: Test Login
```bash
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@thearc.com","password":"test123456"}' \
  -v
```

The `-v` flag will show the Set-Cookie header with the session token.

### Step 3: Verify Session
```bash
curl http://localhost:3002/api/auth/me \
  -H "Cookie: arc_session=YOUR_TOKEN_HERE"
```

## Common Issues

### "Invalid email or password"
- Check that the user exists in the database
- Verify the email is correct (case-insensitive)
- Verify the password matches the hash in the database

### "Please verify your email before logging in"
- The user's `emailVerified` field is `false`
- Use the test user creation endpoint which sets `emailVerified: true`

### "Internal server error"
- Check server logs for detailed error messages
- Verify database connection is working
- Verify encryption/decryption is working (check for KMS errors)

### Database Connection Errors
- Ensure Prisma server is running: `npx prisma dev`
- Check DATABASE_URL in `.env` is correct
- For Prisma Accelerate, ensure the API key is valid

## Environment Variables Required

```env
DATABASE_URL="prisma+postgres://..."
JWT_SECRET="your-secret-key-here"
CLOUD_KMS_KEY_ID=""  # Optional for development
```

## Next Steps

1. Test login with the test user
2. Verify session cookie is set correctly
3. Test protected routes (currently only `/account`, `/privacy`, `/settings`)
4. Dashboard is accessible without login for demo purposes

