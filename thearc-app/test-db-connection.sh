#!/bin/bash

# Test database connection
echo "Testing database connection..."
echo ""

# Try to connect with psql
PGPASSWORD='?OGT(JRuR4*F2&<g' psql -h 127.0.0.1 -p 5432 -U thearc_user -d thearc_prod -c "SELECT 1 as test;" 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database connection successful!"
else
    echo ""
    echo "❌ Database connection failed"
    echo ""
    echo "Trying with URL-encoded password..."
    # The password in .env is URL-encoded: %3FOGT%28JRuR4%2AF2%26%3Cg
    # Decoded: ?OGT(JRuR4*F2&<g
fi
