#!/bin/bash

# Test PDF Generation API
echo "Testing PDF Generation API..."

# Test the API endpoint
echo "Testing POST /api/generate-pdf..."
curl -X POST http://localhost:3000/api/generate-pdf \
  -H "Content-Type: application/json" \
  -o blueprint.pdf \
  -d @test/pdf-payload.json \
  -w "\nHTTP Status: %{http_code}\n"

# Check if PDF was created
if [ -f "blueprint.pdf" ]; then
    echo "✅ PDF generated successfully!"
    echo "📄 File: blueprint.pdf"
    echo "📏 File size: $(ls -lh blueprint.pdf | awk '{print $5}')"
    
    # Try to get PDF info (if pdfinfo is available)
    if command -v pdfinfo &> /dev/null; then
        echo "📊 PDF Info:"
        pdfinfo blueprint.pdf
    fi
    
    echo ""
    echo "🚀 You can now open blueprint.pdf to verify the content!"
    echo "   - Open with: Preview (Mac), Adobe Reader, or any PDF viewer"
    echo "   - Check for proper page breaks and formatting"
    echo "   - Verify all sections are present and personalized"
else
    echo "❌ PDF generation failed!"
    echo "Check the server logs for error details."
fi

echo ""
echo "Test completed!"
