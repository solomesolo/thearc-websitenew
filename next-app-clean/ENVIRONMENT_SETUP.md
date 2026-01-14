# Environment Variables Setup

## Current Status
✅ Notion Token: Configured  
✅ Notion Database ID: Configured  
❌ SendGrid API Key: Missing  
❌ SendGrid From Email: Missing  
❌ OpenAI API Key: Missing  

## Required Environment Variables

Add these to your `.env.local` file:

```bash
NOTION_TOKEN=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
NOTION_DATABASE_ID=22e2fb0fe15980428a2fdf76c44c06af
SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY_HERE
SENDGRID_FROM_EMAIL=thearc@thearcme.com
OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
```

## How to Get API Keys

### SendGrid API Key
1. Go to [SendGrid API Keys](https://app.sendgrid.com/settings/api_keys)
2. Click "Create API Key"
3. Choose "Restricted Access" and enable "Mail Send" permission
4. Copy the generated key (starts with `SG.`)
5. Replace `YOUR_SENDGRID_API_KEY_HERE` with your actual key

### OpenAI API Key
1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Copy the generated key (starts with `sk-`)
4. Replace `YOUR_OPENAI_API_KEY_HERE` with your actual key

## Testing

After updating `.env.local`:

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Test the environment variables:
   ```bash
   curl -X GET http://localhost:3004/api/test_env
   ```

3. Test email saving:
   ```bash
   curl -X POST http://localhost:3004/api/test_save_email \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","timestamp":"2024-01-01T00:00:00Z","consent":true,"source":"test"}'
   ```

## API Endpoints

- `/api/register` - Contact form submissions (Notion)
- `/api/save_email` - Email collection (Notion)
- `/api/send_email` - Send emails (SendGrid)
- `/api/analyze_health` - Health analysis (OpenAI)
- `/api/test_env` - Environment variables test
- `/api/test_save_email` - Email save test

## Troubleshooting

If APIs still don't work after adding environment variables:

1. Check that `.env.local` is in the `next-app` directory
2. Restart the development server completely
3. Check the browser console for errors
4. Check the terminal for server-side errors
