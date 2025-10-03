#!/bin/bash

echo "Setting up environment variables for Vercel..."

# Add OpenAI API Key
echo "YOUR_OPENAI_API_KEY_HERE" | vercel env add OPENAI_API_KEY production

# Add Notion Token
echo "YOUR_NOTION_TOKEN_HERE" | vercel env add NOTION_TOKEN production

# Add Notion Database ID
echo "YOUR_NOTION_DATABASE_ID_HERE" | vercel env add NOTION_DATABASE_ID production

# Add SendGrid API Key
echo "YOUR_SENDGRID_API_KEY_HERE" | vercel env add SENDGRID_API_KEY production

# Add SendGrid From Email
echo "thearc@thearcme.com" | vercel env add SENDGRID_FROM_EMAIL production

echo "Environment variables added successfully!"
