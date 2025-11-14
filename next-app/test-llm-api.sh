#!/bin/bash

# Test the LLM API endpoint
echo "Testing LLM Enrichment API endpoint..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file..."
    echo "OPENAI_API_KEY=your_openai_api_key_here" > .env.local
    echo "Please add your OpenAI API key to .env.local file"
    echo "You can get one from: https://platform.openai.com/api-keys"
    exit 1
fi

# Check if OpenAI API key is set
if grep -q "your_openai_api_key_here" .env.local; then
    echo "Please update .env.local with your actual OpenAI API key"
    exit 1
fi

# Test the API endpoint
echo "Testing POST /api/personalize/llm..."
curl -X POST http://localhost:3000/api/personalize/llm \
  -H "Content-Type: application/json" \
  -d @test/personalize-llm-input.json \
  -w "\nHTTP Status: %{http_code}\n"

echo "Test completed!"
