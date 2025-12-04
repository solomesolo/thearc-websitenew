# Cloud SQL Proxy Setup Guide

## Overview

Since your database is on Google Cloud SQL and you're connecting from a local machine, you need to use **Cloud SQL Proxy** for secure connections.

## Step 1: Install Cloud SQL Proxy

### Option A: Download Binary (Recommended)

**For macOS (ARM64 - Apple Silicon):**
```bash
cd thearc-app
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.darwin.arm64
chmod +x cloud-sql-proxy
```

**For macOS (Intel):**
```bash
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.darwin.amd64
chmod +x cloud-sql-proxy
```

**For Linux:**
```bash
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.linux.amd64
chmod +x cloud-sql-proxy
```

### Option B: Using Homebrew (macOS)
```bash
brew install cloud-sql-proxy
```

## Step 2: Get Your Cloud SQL Instance Connection Name

You need the **instance connection name** from Google Cloud Console. It typically looks like:
```
PROJECT_ID:REGION:INSTANCE_NAME
```

For example:
```
my-project:us-central1:thearc-prod
```

**To find it:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **SQL** > **Instances**
3. Click on your instance
4. Copy the **Connection name**

## Step 3: Authenticate with Google Cloud

```bash
# Install gcloud CLI if not already installed
# Then authenticate:
gcloud auth application-default login
```

Or use a service account key:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
```

## Step 4: Start Cloud SQL Proxy

```bash
# Replace INSTANCE_CONNECTION_NAME with your actual connection name
./cloud-sql-proxy INSTANCE_CONNECTION_NAME
```

This will start a local proxy on `127.0.0.1:5432` (default PostgreSQL port).

**Example:**
```bash
./cloud-sql-proxy my-project:us-central1:thearc-prod
```

## Step 5: Update Your .env File

Once the proxy is running, update your `.env`:

```env
DATABASE_URL="postgresql://thearc_user:%3FOGT%28JRuR4%2AF2%26%3Cg@127.0.0.1:5432/thearc_prod"
```

Note: The host changes from `10.117.64.3` to `127.0.0.1` (localhost) because the proxy is running locally.

## Step 6: Test Connection

```bash
# In a new terminal, test the connection
npx prisma db pull
```

## Running Proxy in Background

To run the proxy in the background:

```bash
./cloud-sql-proxy INSTANCE_CONNECTION_NAME > /tmp/cloud-sql-proxy.log 2>&1 &
```

To stop it:
```bash
pkill cloud-sql-proxy
```

## Alternative: Using TCP Port

If you want to use a different port:

```bash
./cloud-sql-proxy INSTANCE_CONNECTION_NAME --port 5433
```

Then update `.env`:
```env
DATABASE_URL="postgresql://thearc_user:%3FOGT%28JRuR4%2AF2%26%3Cg@127.0.0.1:5433/thearc_prod"
```

## Troubleshooting

### "Permission denied" error
- Make sure the binary is executable: `chmod +x cloud-sql-proxy`

### "Authentication failed"
- Run: `gcloud auth application-default login`
- Or set `GOOGLE_APPLICATION_CREDENTIALS` environment variable

### "Instance connection name not found"
- Verify the connection name in Google Cloud Console
- Format: `PROJECT_ID:REGION:INSTANCE_NAME`

### Port already in use
- Use a different port: `./cloud-sql-proxy INSTANCE_CONNECTION_NAME --port 5433`
- Or stop the process using port 5432

## Next Steps

Once the proxy is running and connection is working:

1. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

2. **Create test user:**
   ```bash
   curl -X POST http://localhost:3002/api/test/create-user
   ```

3. **Test login:**
   - Go to `http://localhost:3002/login`
   - Use: `test@thearc.com` / `test123456`

