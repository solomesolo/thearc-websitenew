import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    // Use environment variable for API key
    const resendApiKey = process.env.RESEND_API_KEY;
    
    console.log('🔍 Resend Configuration:');
    console.log('RESEND_API_KEY exists:', !!resendApiKey);
    console.log('RESEND_API_KEY length:', resendApiKey ? resendApiKey.length : 0);
    console.log('RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL);
    
    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY is not configured');
      return NextResponse.json({
        success: false,
        error: 'Email service not configured'
      }, { status: 500 });
    }
    
    // Initialize Resend
    const resend = new Resend(resendApiKey);
    
    const { email } = await request.json();
    
    console.log('📧 Received email signup request:', email);
    
    // Validate email
    if (!email) {
      return NextResponse.json({
        success: false,
        error: 'Email is required'
      }, { status: 400 });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }
    
    console.log('📧 Sending email signup notification');
    console.log('📧 User email:', email);
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'annasolovyova2212@gmail.com',
      subject: `New Email Signup: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Email Signup</h2>
          <p>A new user has signed up for email notifications.</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });
    
    if (error) {
      console.error('❌ Resend API error:', error);
      console.error('❌ Error details:', JSON.stringify(error, null, 2));
      
      // Provide more detailed error information
      let errorMessage = 'Failed to send email';
      let helpfulMessage = '';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'object') {
        errorMessage = JSON.stringify(error);
      }
      
      // Check for common Resend errors
      if (errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
        helpfulMessage = 'Domain verification required. The onboarding@resend.dev domain can only send to verified test emails. Please verify your domain in Resend dashboard or add annasolohere@gmail.com as a test recipient.';
      } else if (errorMessage.includes('domain') || errorMessage.includes('Domain')) {
        helpfulMessage = 'Please verify your domain in Resend dashboard. You can use any verified domain email address (e.g., noreply@yourdomain.com).';
      }
      
      return NextResponse.json({
        success: false,
        error: errorMessage,
        helpfulMessage: helpfulMessage,
        details: error
      }, { status: 500 });
    }
    
    console.log('✅ Email signup notification sent successfully');
    console.log('✅ Resend response:', JSON.stringify(data, null, 2));
    
    return NextResponse.json({
      success: true,
      message: 'Email notification sent successfully',
      data: data
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('❌ Error sending email signup notification:', error);
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      details: error instanceof Error ? error.stack : String(error)
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}

