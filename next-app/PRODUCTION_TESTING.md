# Production-Like Testing Setup

## Connection Configuration

The app is now configured for production-like testing using Supabase's connection pooler in **Transaction Mode** (port 6543).

### Connection String Format
```
postgresql://postgres:PASSWORD@db.pooler.wybfjytfwnpjztswoeyh.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require
```

### Key Parameters:
- **`pgbouncer=true`**: Tells Prisma we're using a connection pooler
- **`connection_limit=1`**: Prevents connection exhaustion in serverless environments
- **`sslmode=require`**: Enforces SSL encryption
- **Port 6543**: Transaction mode (ideal for serverless/server-side)

## Testing Options

### Option 1: Local Testing (Current Setup)
1. Server is running with production-like connection
2. Test endpoints:
   - `http://localhost:3000/api/test/database` - Database connection test
   - `http://localhost:3000/api/questionnaire/save` - Save questionnaire
   - `http://localhost:3000/api/auth/register` - User registration

### Option 2: Deploy to Vercel (True Production Environment)
1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy and test

### Option 3: Test via Supabase SQL Editor
- Use `insert-test-data.sql` to test data insertion directly
- Bypasses connection issues
- Verifies database schema and data flow

## Environment Variables for Production

Make sure these are set in your production environment:

```env
DATABASE_URL="postgresql://postgres:PASSWORD@db.pooler.wybfjytfwnpjztswoeyh.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
ENCRYPTION_KEY="your-64-char-hex-key"
JWT_SECRET="your-jwt-secret"
OPENAI_API_KEY="your-openai-key"
SENDGRID_API_KEY="your-sendgrid-key"
SENDGRID_FROM_EMAIL="thearc@thearcme.com"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
NEXT_PUBLIC_SUPABASE_URL="https://wybfjytfwnpjztswoeyh.supabase.co"
```

## Troubleshooting

### Connection Issues
- **Can't reach database**: Check network/firewall settings
- **SSL errors**: Verify `sslmode=require` is set
- **Connection limit**: Ensure `connection_limit=1` for serverless

### For True Production Testing
Deploy to Vercel or similar platform where:
- Network restrictions are different
- Serverless environment matches production
- Connection pooling works as expected

