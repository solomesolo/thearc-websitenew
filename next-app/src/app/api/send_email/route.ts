import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export async function POST(request: NextRequest) {
  try {
    // Debug environment variables
    console.log('🔍 SendGrid Environment check:');
    console.log('SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);
    console.log('SENDGRID_FROM_EMAIL:', process.env.SENDGRID_FROM_EMAIL);
    
    // Set API key inside the handler
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    
    const { to, subject, htmlContent, textContent } = await request.json();
    
      const msg = {
        to: to,
        from: 'thearc@thearcme.com', // Hardcoded to avoid Vercel env var issues
        subject: subject,
        text: textContent,
        html: htmlContent,
      };
    
    await sgMail.send(msg);
    console.log('Email sent successfully to:', to);
    
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
