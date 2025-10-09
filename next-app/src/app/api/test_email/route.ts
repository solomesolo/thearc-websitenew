import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Testing email functionality...');
    
    // Check if SendGrid API key is configured
    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'SendGrid API key not configured',
        details: 'SENDGRID_API_KEY environment variable is missing'
      }, { status: 500 });
    }
    
    // Set API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const { to } = await request.json();
    
    if (!to) {
      return NextResponse.json({
        success: false,
        error: 'Email address is required',
        details: 'Please provide a "to" field in the request body'
      }, { status: 400 });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format',
        details: 'Please provide a valid email address'
      }, { status: 400 });
    }
    
    const testMsg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL || 'thearc@thearcme.com',
      subject: 'TheArc - Email Test',
      text: 'This is a test email from TheArc to verify email functionality.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #d946ef;">TheArc Email Test</h2>
          <p>This is a test email to verify that email functionality is working correctly.</p>
          <p>If you received this email, the SendGrid integration is working properly!</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            This is an automated test email from TheArc health screening system.
          </p>
        </div>
      `,
    };
    
    console.log('📧 Sending test email to:', to);
    console.log('📧 From address:', testMsg.from);
    
    await sgMail.send(testMsg);
    
    console.log('✅ Test email sent successfully to:', to);
    
    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      details: {
        to: to,
        from: testMsg.from,
        subject: testMsg.subject,
        timestamp: new Date().toISOString()
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
    
  } catch (error) {
    console.error('❌ Test email failed:', error);
    
    // Handle specific SendGrid errors
    if (error instanceof Error) {
      if (error.message.includes('Forbidden')) {
        return NextResponse.json({
          success: false,
          error: 'SendGrid API key is invalid or expired',
          details: 'Please check your SENDGRID_API_KEY in Vercel environment variables'
        }, { status: 500 });
      }
      if (error.message.includes('Unauthorized')) {
        return NextResponse.json({
          success: false,
          error: 'SendGrid authentication failed',
          details: 'Please verify your SendGrid API key permissions'
        }, { status: 500 });
      }
      if (error.message.includes('Bad Request')) {
        return NextResponse.json({
          success: false,
          error: 'Invalid email request',
          details: error.message
        }, { status: 400 });
      }
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Email test endpoint',
    usage: 'POST with { "to": "email@example.com" } to test email functionality',
    endpoints: {
      test: 'POST /api/test_email',
      send: 'POST /api/send_email',
      env: 'GET /api/test_env'
    }
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
