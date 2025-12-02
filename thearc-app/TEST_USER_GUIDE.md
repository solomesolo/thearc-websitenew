# Creating a Test User for Login

## Quick Method: Use the API Endpoint

1. **Make sure your server is running:**
   ```bash
   cd /Users/solo/Desktop/TheArc_website/thearc-app
   npm run dev
   ```

2. **Create the test user via API:**
   ```bash
   curl -X POST http://localhost:3002/api/test/create-user
   ```

   Or open in your browser:
   ```
   http://localhost:3002/api/test/create-user
   ```
   (Note: Browser will show an error since it's a POST endpoint, but you can use curl or Postman)

3. **Login Credentials:**
   - **Email:** `test@thearc.com`
   - **Password:** `test123456`

4. **Login at:**
   ```
   http://localhost:3002/login
   ```

## Alternative: Use the Script

If the API doesn't work, you can use the Node.js script:

```bash
cd /Users/solo/Desktop/TheArc_website/thearc-app
npm run create-test-user
```

## Troubleshooting

### If you get Prisma errors:
- Make sure `DATABASE_URL` is set in your `.env` file
- The Prisma client should now work with Prisma Accelerate

### If the user already exists:
- The API will return the credentials without creating a duplicate

### If encryption fails:
- Make sure `CLOUD_KMS_KEY_ID` is set in your `.env` file
- For testing, the script uses a simple fallback (not secure for production)

## Notes

- The test user is **already verified** (`emailVerified: true`), so you can login immediately
- This endpoint only works in **development mode** (disabled in production)
- All mandatory consents are automatically accepted for the test user

