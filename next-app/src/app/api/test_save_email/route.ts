import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 TEST SAVE EMAIL API CALLED');
    
    const { email, timestamp, consent, source } = await request.json();
    
    console.log('📧 Test received data:', { email, timestamp, consent, source });
    
    // Just return success without saving to Notion
    return NextResponse.json({
      success: true,
      message: 'Test email save successful',
      receivedEmail: email,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Test save email error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
