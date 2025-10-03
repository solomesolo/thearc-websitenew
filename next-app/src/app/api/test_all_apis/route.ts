import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'All APIs are accessible',
      timestamp: new Date().toISOString(),
      apis: {
        'save-email': '/api/save-email',
        'send-email': '/api/send-email', 
        'analyze-health': '/api/analyze-health',
        'test-env': '/api/test-env'
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
