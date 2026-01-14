#!/bin/bash

# Complete PDF Generation Test
# This script tests the entire PDF generation pipeline

echo "🧪 Testing Complete PDF Generation Pipeline"
echo "=============================================="

# Check if Next.js server is running
if ! curl -s http://localhost:3000/api/test-env-vars > /dev/null; then
    echo "❌ Next.js server is not running. Please start it with: npm run dev"
    exit 1
fi

echo "✅ Next.js server is running"

# Test PDF generation with complete data
echo "📄 Testing PDF generation with complete test data..."

# Send request to PDF generation API
response=$(curl -s -X POST http://localhost:3000/api/generate-pdf \
  -H "Content-Type: application/json" \
  -d @test/complete-pdf-test.json \
  -w "HTTPSTATUS:%{http_code}")

# Extract HTTP status code
http_code=$(echo $response | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
response_body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')

echo "📊 Response Status: $http_code"

if [ "$http_code" -eq 200 ]; then
    echo "✅ PDF generation successful!"
    
    # Save the PDF to a file
    echo "$response_body" > test-output.pdf
    
    # Check if PDF was created and has content
    if [ -f "test-output.pdf" ] && [ -s "test-output.pdf" ]; then
        file_size=$(stat -f%z "test-output.pdf" 2>/dev/null || stat -c%s "test-output.pdf" 2>/dev/null)
        echo "📁 PDF file created: test-output.pdf (${file_size} bytes)"
        
        # Check if it's a valid PDF (starts with %PDF)
        if head -c 4 "test-output.pdf" | grep -q "%PDF"; then
            echo "✅ Valid PDF format detected"
        else
            echo "❌ Invalid PDF format"
        fi
    else
        echo "❌ PDF file not created or empty"
    fi
else
    echo "❌ PDF generation failed"
    echo "Response: $response_body"
fi

echo ""
echo "🎯 Test Summary:"
echo "- PDF Generation API: $([ "$http_code" -eq 200 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "- PDF File Creation: $([ -f "test-output.pdf" ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "- PDF Format Validation: $([ -f "test-output.pdf" ] && head -c 4 "test-output.pdf" | grep -q "%PDF" && echo "✅ PASS" || echo "❌ FAIL")"

echo ""
echo "📋 Next Steps:"
echo "1. Open test-output.pdf to verify content and formatting"
echo "2. Check that all sections are present and properly formatted"
echo "3. Verify page breaks and typography"
echo "4. Test with different user data to ensure flexibility"
