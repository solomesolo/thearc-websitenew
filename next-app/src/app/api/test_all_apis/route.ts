import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'All APIs are accessible',
      timestamp: new Date().toISOString(),
      apis: {
        'save_email': '/api/save_email',
        'send_email': '/api/send_email', 
        'analyze_health': '/api/analyze_health',
        'test_env': '/api/test_env',
        'register': '/api/register',
        'test_email': '/api/test_email'
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
