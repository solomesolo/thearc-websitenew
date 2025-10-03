import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 DEBUG: save-email API test endpoint called');
    
    const body = await request.json();
    console.log('📧 Received data:', body);
    
    // Return a simple success response for testing
    return NextResponse.json({
      success: true,
      message: 'Debug endpoint working - new version deployed',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Debug endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
