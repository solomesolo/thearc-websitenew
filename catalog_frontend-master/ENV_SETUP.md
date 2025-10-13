# Environment Variables Setup

## Option 1: Using the Setup Script (Recommended)
Run the setup script that was just created:
```bash
./setup-env.sh
```

## Option 2: Manual Setup

Create a `.env` file in the `catalog_frontend-master` directory with the following content:

```env
# Supabase Configuration
# Replace these placeholder values with your actual Supabase credentials
# You can find these in your Supabase project dashboard under Settings > API

REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

# Example format:
# REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
# REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjM5NzQ5NjAwLCJleHAiOjE5NTUzMjU2MDB9.your_actual_key_here
```

## Getting Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** > **API**
3. Copy the **Project URL** (looks like: `https://your-project-id.supabase.co`)
4. Copy the **anon public** key (starts with `eyJ...`)
5. Replace the placeholder values in your `.env` file

## After Setting Up

1. Save the `.env` file
2. Restart your development server:
   ```bash
   npm start
   ```
3. Navigate to `http://localhost:3000/marketplace`

## Troubleshooting

- **Black screen**: Check that your Supabase credentials are correct
- **Console errors**: Open browser dev tools (F12) and check for error messages
- **No data**: Ensure your Supabase database has the required tables and data 