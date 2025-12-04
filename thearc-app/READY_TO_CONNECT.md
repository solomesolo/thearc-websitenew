# Ready to Connect! 🚀

## ✅ What's Ready

- ✅ **Service Account Key**: `service-account-key.json` (copied to project)
- ✅ **Project ID**: `thearc-production`
- ✅ **Cloud SQL Proxy**: Downloaded and ready
- ✅ **Startup Script**: Updated to auto-detect service account
- ✅ **Database Config**: Connection string ready

## 📝 Final Step: Get Connection Name

Your Cloud SQL instance connection name format:
```
thearc-production:REGION:INSTANCE_NAME
```

### To Find It:

1. **Go to Cloud SQL Instances:**
   https://console.cloud.google.com/sql/instances?project=thearc-production

2. **Click on your PostgreSQL instance**

3. **Copy the "Connection name"** (shown at the top of instance details)

   Common formats:
   - `thearc-production:us-central1:thearc-prod`
   - `thearc-production:us-east1:postgres-instance`
   - `thearc-production:europe-west1:thearc-db`

## 🚀 Once You Have the Connection Name

Run:
```bash
cd thearc-app
./start-cloud-sql-proxy.sh thearc-production:REGION:INSTANCE_NAME
```

The script will:
- ✅ Automatically use `service-account-key.json`
- ✅ Start the proxy on `127.0.0.1:5432`
- ✅ Show you what to update in `.env`

## 📋 After Proxy Starts

1. **Update `.env`:**
   ```env
   DATABASE_URL="postgresql://thearc_user:%3FOGT%28JRuR4%2AF2%26%3Cg@127.0.0.1:5432/thearc_prod"
   ```
   (Change `10.117.64.3` to `127.0.0.1`)

2. **Test connection:**
   ```bash
   npx prisma db pull
   ```

3. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

4. **Create test user:**
   ```bash
   curl -X POST http://localhost:3002/api/test/create-user
   ```

5. **Test login:**
   - Go to `http://localhost:3002/login`
   - Use: `test@thearc.com` / `test123456`

## 🎯 Quick Command

Once you have the connection name, just share it and I'll help you start everything!

