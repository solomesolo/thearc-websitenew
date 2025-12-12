# Database Connection Setup Instructions

## Issue: "Database connection failed"

The login form is showing "Database connection failed" because the `DATABASE_URL` environment variable is not set or is invalid.

## Quick Fix

### Step 1: Check your `.env.local` file

Make sure you have a `.env.local` file in the `next-app` directory with at least:

```env
DATABASE_URL="your-database-connection-string-here"
```

### Step 2: Get your Database URL

You have a few options:

#### Option A: Use Supabase (Recommended for MVP)

If you're using Supabase, your connection string should look like:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.pooler.wybfjytfwnpjztswoeyh.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
```

Replace `YOUR_PASSWORD` with your actual Supabase database password.

#### Option B: Use Local PostgreSQL

If you have PostgreSQL running locally:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/thearc_db"
```

#### Option C: Use Prisma Accelerate (Development)

```env
DATABASE_URL="prisma+postgres://localhost:51213/?api_key=..."
```

### Step 3: Restart the Development Server

After updating `.env.local`, restart your Next.js development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd next-app
npm run dev
```

### Step 4: Test the Connection

Try logging in again. If it still fails, check the server console logs for more details.

## Required Environment Variables

For full functionality, you should also have:

```env
# Database
DATABASE_URL="postgresql://..."

# JWT Secret (for sessions)
JWT_SECRET="your-secret-key-here"
# Generate with: openssl rand -base64 32

# Encryption Key (for email encryption)
ENCRYPTION_KEY="64-character-hex-string"
# Generate with: openssl rand -hex 32

# Optional: OpenAI (for questionnaire processing)
OPENAI_API_KEY="sk-..."
```

## Troubleshooting

### Error: "DATABASE_URL environment variable is not set"
- Make sure `.env.local` exists in the `next-app` directory
- Make sure the file contains `DATABASE_URL=...`
- Restart the development server after adding it

### Error: "Connection refused" or "ENOTFOUND"
- Check that your database server is running
- Verify the host, port, username, and password in your connection string
- For Supabase, make sure you're using the pooler URL (port 6543) not the direct connection

### Error: "SSL required"
- Make sure your connection string includes `?sslmode=require` for remote databases
- For Supabase, use the pooler connection string which includes SSL settings

## Need Help?

If you're still having issues:
1. Check the server console logs for detailed error messages
2. Verify your database credentials
3. Test the connection string with a PostgreSQL client (like pgAdmin or psql)

