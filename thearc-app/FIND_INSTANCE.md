# Find Your Cloud SQL Instance Connection Name

## Your Project ID
✅ **Project ID:** `free-trial-first-project`

## Get the Full Connection Name

### Option 1: Google Cloud Console (Easiest)

1. **Go to Cloud SQL Instances:**
   https://console.cloud.google.com/sql/instances?project=free-trial-first-project

2. **Click on your PostgreSQL instance** (likely named something like `thearc-prod` or similar)

3. **Copy the Connection name** - it's displayed at the top of the instance details page

   Format: `free-trial-first-project:REGION:INSTANCE_NAME`

### Option 2: Using gcloud CLI

If you have gcloud CLI installed and authenticated:

```bash
gcloud sql instances list --project=free-trial-first-project
```

This will show all instances. The connection name format is:
```
PROJECT_ID:REGION:INSTANCE_NAME
```

### Common Regions

- `us-central1` (Iowa)
- `us-east1` (South Carolina)
- `us-west1` (Oregon)
- `europe-west1` (Belgium)
- `europe-west4` (Netherlands)
- `asia-east1` (Taiwan)

## Example Connection Names

Your connection name will look like one of these:
- `free-trial-first-project:us-central1:thearc-prod`
- `free-trial-first-project:us-east1:postgres-instance`
- `free-trial-first-project:europe-west1:thearc-db`

## Once You Have It

Run:
```bash
./start-cloud-sql-proxy.sh free-trial-first-project:REGION:INSTANCE_NAME
```

Then update your `.env`:
```env
DATABASE_URL="postgresql://thearc_user:%3FOGT%28JRuR4%2AF2%26%3Cg@127.0.0.1:5432/thearc_prod"
```

