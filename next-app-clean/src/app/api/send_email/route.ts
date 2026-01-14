import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

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
    // Debug environment variables
    console.log('🔍 SendGrid Environment check:');
    console.log('SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);
    console.log('SENDGRID_FROM_EMAIL:', process.env.SENDGRID_FROM_EMAIL);
    
    // Check if SendGrid API key is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.error('❌ SENDGRID_API_KEY is not configured');
      return NextResponse.json({
        success: false,
        error: 'SendGrid API key not configured. Please contact support.'
      }, { status: 500 });
    }
    
    // Set API key inside the handler
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const { to, subject, htmlContent, textContent } = await request.json();
    
    // Validate required fields
    if (!to || !subject || !htmlContent) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: to, subject, htmlContent'
      }, { status: 400 });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }
    
    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL || 'thearc@thearcme.com',
      subject: subject,
      text: textContent || 'Please view this email in HTML format.',
      html: htmlContent,
    };
    
    console.log('📧 Attempting to send email to:', to);
    console.log('📧 Email subject:', subject);
    console.log('📧 From address:', msg.from);
    
    await sgMail.send(msg);
    console.log('✅ Email sent successfully to:', to);
    
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    // Handle specific SendGrid errors
    if (error instanceof Error) {
      if (error.message.includes('Forbidden')) {
        return NextResponse.json({
          success: false,
          error: 'SendGrid API key is invalid or expired. Please contact support.'
        }, { status: 500 });
      }
      if (error.message.includes('Unauthorized')) {
        return NextResponse.json({
          success: false,
          error: 'SendGrid authentication failed. Please contact support.'
        }, { status: 500 });
      }
      if (error.message.includes('Bad Request')) {
        return NextResponse.json({
          success: false,
          error: 'Invalid email request. Please try again.'
        }, { status: 400 });
      }
    }
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred while sending email'
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
