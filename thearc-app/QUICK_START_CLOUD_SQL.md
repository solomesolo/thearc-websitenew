# Quick Start: Connect to Cloud SQL

## ✅ What's Ready

- ✅ Cloud SQL Proxy downloaded (`cloud-sql-proxy`)
- ✅ Startup script created (`start-cloud-sql-proxy.sh`)
- ✅ Database connection string configured
- ✅ Prisma schema fixed

## 🚀 Next Steps

### Step 1: Get Your Instance Connection Name

You need the **Cloud SQL instance connection name**. It looks like:
```
PROJECT_ID:REGION:INSTANCE_NAME
```

**To find it:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/sql/instances)
2. Click on your PostgreSQL instance
3. Copy the **Connection name** (shown at the top)

**Example:** `my-project:us-central1:thearc-prod`

### Step 2: Authenticate with Google Cloud

**Option A: Using gcloud CLI (if installed)**
```bash
gcloud auth application-default login
```

**Option B: Using Service Account Key**
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-service-account-key.json"
```

**Option C: Install gcloud CLI (if not installed)**
```bash
# macOS
brew install google-cloud-sdk

# Then authenticate
gcloud auth application-default login
```

### Step 3: Start Cloud SQL Proxy

**Using the startup script:**
```bash
cd thearc-app
./start-cloud-sql-proxy.sh PROJECT_ID:REGION:INSTANCE_NAME
```

**Or manually:**
```bash
./cloud-sql-proxy PROJECT_ID:REGION:INSTANCE_NAME
```

The proxy will start on `127.0.0.1:5432` (localhost).

### Step 4: Update .env File

Once the proxy is running, update your `.env`:

```env
DATABASE_URL="postgresql://thearc_user:%3FOGT%28JRuR4%2AF2%26%3Cg@127.0.0.1:5432/thearc_prod"
```

**Note:** Changed from `10.117.64.3` to `127.0.0.1` because the proxy runs locally.

### Step 5: Test Connection

```bash
npx prisma db pull
```

If successful, you'll see the database schema.

### Step 6: Run Migrations

```bash
npx prisma migrate deploy
```

### Step 7: Create Test User

```bash
curl -X POST http://localhost:3002/api/test/create-user
```

### Step 8: Test Login

1. Go to `http://localhost:3002/login`
2. Use: `test@thearc.com` / `test123456`

## 📝 Example Commands

```bash
# 1. Authenticate
gcloud auth application-default login

# 2. Start proxy (replace with your connection name)
./start-cloud-sql-proxy.sh my-project:us-central1:thearc-prod

# 3. In another terminal, update .env and test
# Edit .env: change 10.117.64.3 to 127.0.0.1
npx prisma db pull

# 4. Run migrations
npx prisma migrate deploy

# 5. Create test user
curl -X POST http://localhost:3002/api/test/create-user
```

## 🛑 To Stop the Proxy

```bash
pkill cloud-sql-proxy
```

## ❓ Need Help?

**Can't find connection name?**
- Check Google Cloud Console > SQL > Instances
- The connection name is displayed on the instance details page

**Authentication errors?**
- Make sure you have Cloud SQL Client role
- Or use a service account with proper permissions

**Port already in use?**
- Use a different port: `./cloud-sql-proxy INSTANCE_NAME --port 5433`
- Update `.env` to use port 5433

