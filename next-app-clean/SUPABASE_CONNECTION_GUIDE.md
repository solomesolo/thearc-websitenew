# Supabase Connection Setup Guide

## The Problem
Supabase's direct connection (port 5432 with `db.wybfjytfwnpjztswoeyh.supabase.co`) doesn't work with IPv4 unless you have the IPv4 addon. The solution is to use the **Session Pooler**.

## Solution: Use Session Pooler

### Step 1: Get Your Session Pooler Connection String

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `wybfjytfwnpjztswoeyh`
3. Go to **Settings** → **Database**
4. Scroll down to **Connection string** section
5. Select **Session mode** (NOT Transaction mode)
6. Copy the connection string

The format should look like:
```
postgresql://postgres.wybfjytfwnpjztswoeyh:[YOUR-PASSWORD]@db.wybfjytfwnpjztswoeyh.pooler.supabase.com:5432/postgres
```

Or it might be:
```
postgresql://postgres.wybfjytfwnpjztswoeyh:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

### Step 2: Update .env.local

Replace the `DATABASE_URL` in `.env.local` with the connection string from Step 1.

### Step 3: Restart the Server

```bash
# Stop the server (Ctrl+C)
cd next-app
npm run dev
```

### Step 4: Test Connection

Visit: `http://localhost:3000/api/test/db-connection`

Should show: `{"success": true, "message": "Database connection successful"}`

## Key Differences

**Direct Connection (doesn't work with IPv4):**
- Host: `db.wybfjytfwnpjztswoeyh.supabase.co`
- Port: `5432`
- Username: `postgres`

**Session Pooler (works with IPv4):**
- Host: `db.wybfjytfwnpjztswoeyh.pooler.supabase.com` or `aws-0-[region].pooler.supabase.com`
- Port: `5432`
- Username: `postgres.wybfjytfwnpjztswoeyh` (includes project ref)

## Why Session Pooler?

- ✅ Works with IPv4 (no addon needed)
- ✅ Better for serverless environments
- ✅ Handles connection pooling automatically
- ✅ Same port (5432) as direct connection

## Performance Notes

Session pooler maintains connections in a pool, which is actually better for serverless/Next.js API routes. There should be no performance degradation - in fact, it might be better for your use case.

