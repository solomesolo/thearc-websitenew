#!/bin/bash
# Update .env to use localhost instead of direct IP
sed -i '' 's|@10\.117\.64\.3:5432|@127.0.0.1:5432|g' .env
echo "✅ Updated .env to use localhost (127.0.0.1)"
cat .env | grep DATABASE_URL
