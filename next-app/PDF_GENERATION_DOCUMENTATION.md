# PDF Generation API Documentation

## Overview
The PDF Generation API merges deterministic and LLM content into a professional HTML template and renders it as a PDF using Puppeteer. It creates comprehensive, personalized longevity blueprints with proper page breaks, typography, and formatting.

## Endpoint

### POST /api/generate-pdf

**Purpose**: Generate personalized PDF reports from health assessment data and LLM content.

## Request Format

### Sample Request Body
```json
{
  "user": {
    "name": "Anna",
    "age": 35,
    "sex": "female"
  },
  "scores": {
    "family_risk": 85,
    "physiological": 52,
    "lifestyle_load": 65,
    "biological": 10,
    "cognitive": 56
  },
  "explanations": {
    "family_risk": "Family risk score of 85 indicates high genetic predisposition...",
    "physiological": "A physiological score of 52 suggests average physiological health...",
    "lifestyle_load": "Lifestyle load score of 65 shows moderate impact...",
    "biological": "A biological score of 10 indicates low biological aging...",
    "cognitive": "Cognitive score of 56 suggests average cognitive health..."
  },
  "screenings": [
    {
      "name": "CRP",
      "why": "To monitor inflammation and assess cardiovascular disease risk.",
      "when": "once now, then every 6–12 months"
    }
  ],
  "nutrition": {
    "archetype": "Anti-inflammatory Mediterranean",
    "principles": ["High in fruits and vegetables", "Low in red meat"],
    "days": [
      {
        "day": 1,
        "breakfast": "Greek yogurt with mixed berries",
        "lunch": "Grilled vegetable salad",
        "dinner": "Baked salmon with quinoa",
        "snacks": ["A handful of almonds", "Sliced cucumber with hummus"]
      }
    ]
  },
  "supplements": [
    {
      "name": "Magnesium glycinate",
      "dose": "200–400 mg",
      "timing": "evening",
      "why": "Supports muscle relaxation and sleep quality",
      "safety": "Generally well-tolerated, may cause loose stools at high doses"
    }
  ],
  "breath_recovery": [
    {
      "name": "Cardiac coherence",
      "how": "Inhale 4s, exhale 6s, 5 minutes morning."
    }
  ],
  "phase_order": ["Decode", "Rebalance", "Strengthen", "Nourish", "Refine", "Sustain"],
  "months": [
    {
      "name": "Decode",
      "goal": "Understand your current health baseline",
      "why": "Foundation for all subsequent interventions",
      "daily": ["Track symptoms in a journal", "Monitor energy levels"],
      "weekly_reflection": "Assess progress and adjust approach"
    }
  ],
  "executive_summary": "The personalised longevity blueprint is a comprehensive plan...",
  "disclaimer": "This report is educational and informational only..."
}
```

## PDF Structure

### **Page Layout (8-16 pages typical)**

1. **Cover Page**
   - Personalized title with user's name
   - User information (age, sex)
   - Generation date
   - Professional branding

2. **Executive Summary**
   - LLM-generated summary
   - Key recommendations overview
   - Personalized insights

3. **Health Predisposition Map**
   - Visual score grid (5 health dimensions)
   - Score values with explanations
   - Color-coded risk levels

4. **Recommended Screenings**
   - Test names with explanations
   - Timing recommendations
   - Risk-based prioritization

5. **Personalised Nutrition Plan**
   - Nutrition archetype
   - Key principles
   - 3-day meal plan with detailed meals

6. **Targeted Supplementation**
   - Supplement details (dose, timing, rationale, safety)
   - Evidence-based recommendations
   - Personalized selection

7. **Breathwork & Recovery Techniques**
   - Technique names and instructions
   - Stress management focus
   - Daily practice guidance

8. **Monthly Phases (6 phases)**
   - Phase goals and rationale
   - Daily action items
   - Weekly reflection prompts
   - Progressive health journey

9. **Closing & Next Steps**
   - Journey continuation guidance
   - Implementation roadmap
   - Professional disclaimer

## Technical Features

### **Page Break Management**
- **Hard page breaks** before each major section
- **Cover page**: Always starts on page 1
- **Predisposition Map**: New page
- **Screenings**: New page (if content exists)
- **Nutrition Plan**: New page (if content exists)
- **Supplements**: New page (if content exists)
- **Breathwork**: New page (if content exists)
- **Each Phase**: New page (if content exists)
- **Closing**: New page

### **Typography & Styling**
- **Body text**: 11pt Times New Roman
- **Headers**: Consistent hierarchy (18pt, 14pt, 12pt)
- **Color scheme**: Professional blues and grays
- **Margins**: 2cm on all sides
- **Line spacing**: 1.4 for readability

### **Responsive Design**
- **A4 format**: Standard business document size
- **Print optimization**: Background colors and borders
- **Font fallbacks**: Times New Roman with serif fallbacks
- **Page numbering**: Automatic via CSS

### **Content Handling**
- **Empty sections**: Graceful fallback messages
- **Missing data**: "Not available" placeholders
- **Array validation**: Length checks before rendering
- **Personalization**: User name throughout document

## Response Format

### **Success Response (200)**
- **Content-Type**: `application/pdf`
- **Content-Disposition**: `attachment; filename="longevity-blueprint-{name}.pdf"`
- **Body**: Binary PDF stream

### **Error Response (400/500)**
```json
{
  "ok": false,
  "error": "Invalid input data",
  "details": [
    {
      "instancePath": "/user/name",
      "schemaPath": "#/properties/user/properties/name/type",
      "keyword": "type",
      "params": {"type": "string"},
      "message": "must be string"
    }
  ]
}
```

## Dependencies

### **Required Packages**
```bash
npm install puppeteer
```

### **System Requirements**
- **Node.js**: 18+ (for Puppeteer compatibility)
- **Memory**: 512MB+ (for PDF generation)
- **Chrome**: Puppeteer includes Chromium

## Testing

### **Local Test**
```bash
# Test the API endpoint
curl -X POST http://localhost:3000/api/generate-pdf \
  -H "Content-Type: application/json" \
  -o blueprint.pdf \
  -d @test/pdf-payload.json

# Verify PDF was created
ls -lh blueprint.pdf

# Open PDF to verify content
open blueprint.pdf  # macOS
# or use any PDF viewer
```

### **Test Script**
```bash
# Run the comprehensive test
./test-pdf-generation.sh
```

### **Expected Results**
- **File size**: 500KB - 2MB (typical)
- **Page count**: 8-16 pages
- **Format**: A4 with 2cm margins
- **Content**: All sections present and personalized
- **Quality**: Professional, print-ready

## Performance

### **Generation Time**
- **Typical**: 3-5 seconds
- **Complex**: 5-10 seconds (many sections)
- **Memory usage**: ~100MB during generation

### **Optimization Features**
- **Headless Chrome**: No GUI overhead
- **Network idle**: Wait for content to load
- **Print media**: Optimized CSS for PDF
- **Background rendering**: Non-blocking generation

## Error Handling

### **Input Validation**
- **Schema validation**: All required fields
- **Type checking**: String, number, array validation
- **Content validation**: Non-empty arrays and objects

### **Generation Errors**
- **Puppeteer failures**: Browser launch issues
- **Memory errors**: Large content handling
- **Timeout errors**: Long generation times
- **Template errors**: HTML/CSS issues

### **Fallback Handling**
- **Empty sections**: Hide with placeholder text
- **Missing data**: Graceful degradation
- **Template errors**: Basic fallback layout
- **Browser crashes**: Automatic retry logic

## Security

### **Input Sanitization**
- **HTML escaping**: Prevent XSS in user data
- **Content filtering**: Remove malicious scripts
- **File naming**: Safe filename generation
- **Memory limits**: Prevent DoS attacks

### **Output Security**
- **PDF validation**: Ensure valid PDF format
- **Content verification**: Check generated content
- **File size limits**: Prevent oversized PDFs
- **Access control**: Secure endpoint access

## File Structure

```
src/app/api/generate-pdf/
├── route.ts                    # Main PDF generation endpoint
test/
├── pdf-payload.json           # Test data for PDF generation
└── test-pdf-generation.sh     # Test script
```

## Integration

This API works as the final step in the complete health assessment pipeline:

1. **Questionnaire API** (`/api/score`): Computes health scores
2. **Personalization API** (`/api/personalize`): Selects interventions
3. **LLM Enrichment API** (`/api/personalize/llm`): Generates content
4. **PDF Generation API** (`/api/generate-pdf`): Creates final report

## Future Enhancements

- **Charts & Graphs**: Visual score representations
- **Images**: Personalized health diagrams
- **Templates**: Multiple PDF layouts
- **Branding**: Custom logos and styling
- **Multi-language**: Internationalization support
- **Caching**: Template and PDF caching
- **Batch processing**: Multiple PDF generation
- **Cloud storage**: PDF storage and retrieval

## Troubleshooting

### **Common Issues**
- **Puppeteer timeout**: Increase timeout settings
- **Memory errors**: Reduce content size or increase memory
- **Font issues**: Ensure system fonts are available
- **Page breaks**: Check CSS page-break properties
- **Content overflow**: Verify margin and padding settings

### **Debug Mode**
- **Verbose logging**: Enable detailed error messages
- **HTML output**: Save intermediate HTML for debugging
- **Screenshot capture**: Visual debugging of layout issues
- **Performance monitoring**: Track generation metrics

The PDF Generation API provides a complete solution for creating professional, personalized health reports that are ready for distribution to users.
