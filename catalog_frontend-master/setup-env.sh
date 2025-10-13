#!/bin/bash

# Supabase Environment Setup Script
echo "Setting up Supabase environment variables..."

# Create .env file
cat > .env << 'EOF'
# Supabase Configuration
# Replace these placeholder values with your actual Supabase credentials
# You can find these in your Supabase project dashboard under Settings > API

REACT_APP_SUPABASE_URL=https://wybfjytfwnpjztswoeyh.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5YmZqeXRmd25wanp0c3dvZXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MzE2MjksImV4cCI6MjA2OTAwNzYyOX0.Ro6T9Q3ppzLw50Bs6E_dyPcr-kqM1nLeN2OlnVtIClE

# Example format:
# REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
# REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjM5NzQ5NjAwLCJleHAiOjE5NTUzMjU2MDB9.your_actual_key_here
EOF

echo "✅ .env file created successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Open the .env file in your editor"
echo "2. Replace 'your_supabase_project_url' with your actual Supabase project URL"
echo "3. Replace 'your_supabase_anon_key' with your actual Supabase anon key"
echo "4. Save the file"
echo "5. Restart your development server with 'npm start'"
echo ""
echo "🔗 You can find your Supabase credentials at:"
echo "   https://supabase.com/dashboard/project/[YOUR-PROJECT-ID]/settings/api" 