# Quick Setup with Service Account

## ✅ What You Have

- **Project ID:** `free-trial-first-project`
- **Service Account:** `p765640149414-ces1n2@gcp-sa-cloud-sql.iam.gserviceaccount.com`
- **Cloud SQL Proxy:** Downloaded and ready

## 🚀 Quick Steps

### 1. Download Service Account Key

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=free-trial-first-project
2. Find service account: `p765640149414-ces1n2@gcp-sa-cloud-sql.iam.gserviceaccount.com`
3. Click on it → **Keys** tab → **Add Key** → **Create new key** → **JSON**
4. Save the downloaded file as: `thearc-app/service-account-key.json`

### 2. Get Cloud SQL Instance Connection Name

1. Go to: https://console.cloud.google.com/sql/instances?project=free-trial-first-project
2. Click your PostgreSQL instance
3. Copy the **Connection name** (format: `free-trial-first-project:REGION:INSTANCE_NAME`)

### 3. Start Cloud SQL Proxy

```bash
cd thearc-app
./start-cloud-sql-proxy.sh free-trial-first-project:REGION:INSTANCE_NAME
```

The script will automatically detect and use `service-account-key.json` if it exists.

### 4. Update .env File

Once proxy is running, update `.env`:

```env
DATABASE_URL="postgresql://thearc_user:%3FOGT%28JRuR4%2AF2%26%3Cg@127.0.0.1:5432/thearc_prod"
```

(Change `10.117.64.3` to `127.0.0.1`)

### 5. Test Connection

```bash
npx prisma db pull
```

### 6. Run Migrations

```bash
npx prisma migrate deploy
```

### 7. Create Test User

```bash
curl -X POST http://localhost:3002/api/test/create-user
```

### 8. Test Login

Go to `http://localhost:3002/login` and use:
- Email: `test@thearc.com`
- Password: `test123456`

## 📝 Summary

Once you have:
1. ✅ Service account key file → `service-account-key.json`
2. ✅ Connection name → `free-trial-first-project:REGION:INSTANCE_NAME`

Just run:
```bash
./start-cloud-sql-proxy.sh free-trial-first-project:REGION:INSTANCE_NAME
```

Everything else is ready! 🎉

