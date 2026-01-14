#!/bin/bash

# Test the API endpoint
echo "Testing Questionnaire API endpoint..."

# Start the Next.js development server in the background
echo "Starting Next.js development server..."
cd /Users/solo/Desktop/TheArc_website/next-app
npm run dev &
SERVER_PID=$!

# Wait for server to start
echo "Waiting for server to start..."
sleep 10

# Test the API endpoint
echo "Testing POST /api/score..."
curl -X POST http://localhost:3000/api/score \
  -H "Content-Type: application/json" \
  -d @test/sample-input.json \
  -w "\nHTTP Status: %{http_code}\n"

# Stop the server
echo "Stopping server..."
kill $SERVER_PID

echo "Test completed!"
