# Service Account Setup for Cloud SQL Proxy

## Your Service Account
✅ **Service Account Email:** `p765640149414-ces1n2@gcp-sa-cloud-sql.iam.gserviceaccount.com`

## Step 1: Download Service Account Key

1. **Go to Google Cloud Console:**
   https://console.cloud.google.com/iam-admin/serviceaccounts?project=free-trial-first-project

2. **Find your service account:**
   - Look for: `p765640149414-ces1n2@gcp-sa-cloud-sql.iam.gserviceaccount.com`
   - Or search for: `p765640149414-ces1n2`

3. **Create/Download Key:**
   - Click on the service account
   - Go to **Keys** tab
   - Click **Add Key** > **Create new key**
   - Choose **JSON** format
   - Download the key file (it will be named something like `free-trial-first-project-xxxxx.json`)

4. **Save the key file:**
   - Place it in your project: `thearc-app/service-account-key.json`
   - **IMPORTANT:** Add it to `.gitignore` to keep it secure!

## Step 2: Update .gitignore

Make sure the key file is not committed to git:

```bash
echo "service-account-key.json" >> .gitignore
echo "*.json" >> .gitignore  # Or be more specific
```

## Step 3: Set Environment Variable

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/Users/solo/Desktop/TheArc_website/thearc-app/service-account-key.json"
```

Or add it to your `.env` file (but don't commit the key file itself).

## Step 4: Get Your Cloud SQL Instance Connection Name

You still need the full connection name. Format:
```
free-trial-first-project:REGION:INSTANCE_NAME
```

**To find it:**
1. Go to: https://console.cloud.google.com/sql/instances?project=free-trial-first-project
2. Click on your PostgreSQL instance
3. Copy the **Connection name**

## Step 5: Start Cloud SQL Proxy

Once you have:
- ✅ Service account key file downloaded
- ✅ Connection name

Run:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="./service-account-key.json"
./start-cloud-sql-proxy.sh free-trial-first-project:REGION:INSTANCE_NAME
```

## Alternative: Update Startup Script

I can update the startup script to automatically use the service account if the key file exists.

