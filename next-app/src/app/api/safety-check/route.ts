import { NextRequest, NextResponse } from 'next/server';
import { checkContraindications, UserResponses, Supplement } from '../../../lib/safetyUtils';
import Ajv from 'ajv';

// Input validation schema
const inputSchema = {
  type: "object",
  required: ["responses", "supplements"],
  properties: {
    responses: {
      type: "object",
      properties: {
        pregnancy_status: { 
          type: "string", 
          enum: ["pregnant", "trying_to_conceive", "not_applicable"] 
        },
        medications: { 
          type: "array", 
          items: { type: "string" } 
        },
        medical_conditions: { 
          type: "array", 
          items: { type: "string" } 
        },
        gerd: { type: "boolean" },
        kidney_disease: { type: "boolean" },
        thyroid_disease: { type: "boolean" },
        anticoagulants: { type: "boolean" }
      }
    },
    supplements: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "dose", "timing", "why", "safety"],
        properties: {
          name: { type: "string" },
          dose: { type: "string" },
          timing: { type: "string" },
          why: { type: "string" },
          safety: { type: "string" }
        }
      }
    }
  }
};

// Response validation schema
const responseSchema = {
  type: "object",
  required: ["ok", "supplements", "warnings"],
  properties: {
    ok: { type: "boolean" },
    supplements: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "dose", "timing", "why", "safety"],
        properties: {
          name: { type: "string" },
          dose: { type: "string" },
          timing: { type: "string" },
          why: { type: "string" },
          safety: { type: "string" }
        }
      }
    },
    banner: { type: "string" },
    warnings: { 
      type: "array", 
      items: { type: "string" } 
    }
  }
};

export async function POST(request: NextRequest) {
  try {
    const ajv = new Ajv();
    
    // Parse request body
    const body = await request.json();
    
    // Validate input
    const validate = ajv.compile(inputSchema);
    const valid = validate(body);
    
    if (!valid) {
      return NextResponse.json(
        { 
          ok: false, 
          error: "Invalid input data", 
          details: validate.errors 
        },
        { status: 400 }
      );
    }
    
    const { responses, supplements } = body;
    
    // Check contraindications
    const safetyResult = checkContraindications(responses as UserResponses, supplements as Supplement[]);
    
    // Create response with ok flag
    const response = {
      ok: true,
      ...safetyResult
    };
    
    // Validate response
    const validateResponse = ajv.compile(responseSchema);
    const responseValid = validateResponse(response);
    
    if (!responseValid) {
      console.log('Response validation failed:', validateResponse.errors);
      return NextResponse.json(
        { 
          ok: false, 
          error: "Invalid response data", 
          details: validateResponse.errors 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Safety Check API Error:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Safety Check API is running",
    endpoints: {
      "POST /api/safety-check": "Check contraindications and modify supplement safety"
    },
    example: {
      responses: {
        pregnancy_status: "pregnant",
        medications: ["Warfarin"],
        anticoagulants: true,
        kidney_disease: true,
        thyroid_disease: true,
        gerd: true
      },
      supplements: [
        {
          name: "Omega-3 EPA/DHA",
          dose: "1-2 g/day",
          timing: "with meals",
          why: "Reduces inflammation",
          safety: "Safe for most people"
        }
      ]
    }
  });
}
