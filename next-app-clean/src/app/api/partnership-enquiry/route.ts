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
    
    console.log('🔍 Resend Configuration for Partnership Enquiry:');
    console.log('RESEND_API_KEY exists:', !!resendApiKey);
    
    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY is not configured');
      return NextResponse.json({
        success: false,
        error: 'Email service not configured'
      }, { status: 500 });
    }
    
    // Initialize Resend
    const resend = new Resend(resendApiKey);
    
    const { name, organization, email, partnershipInterest } = await request.json();
    
    console.log('📧 Received partnership enquiry:', { name, organization, email });
    
    // Validate required fields
    if (!name || !organization || !email || !partnershipInterest) {
      return NextResponse.json({
        success: false,
        error: 'All fields are required'
      }, { status: 400 });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }
    
    // Determine from email - use environment variable or default
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    console.log('📧 Sending partnership enquiry notification');
    console.log('📧 From email:', fromEmail);
    console.log('📧 To email: annasolovyova2212@gmail.com');
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: 'annasolovyova2212@gmail.com',
      subject: `New Partnership Enquiry: ${organization}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Partnership Enquiry</h2>
          <p>A new partnership enquiry has been submitted.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Organization:</strong> ${organization}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 8px 0;"><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="margin: 8px 0;"><strong>Partnership Interest:</strong></p>
              <p style="margin: 8px 0; color: #555; line-height: 1.6;">${partnershipInterest.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        </div>
      `,
      text: `New Partnership Enquiry\n\nName: ${name}\nOrganization: ${organization}\nEmail: ${email}\nTimestamp: ${new Date().toLocaleString()}\n\nPartnership Interest:\n${partnershipInterest}`,
    });
    
    if (error) {
      console.error('❌ Resend API error:', error);
      console.error('❌ Error details:', JSON.stringify(error, null, 2));
      
      let errorMessage = 'Failed to send email';
      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'object') {
        errorMessage = JSON.stringify(error);
      }
      
      return NextResponse.json({
        success: false,
        error: errorMessage,
        details: error
      }, { status: 500 });
    }
    
    console.log('✅ Partnership enquiry notification sent successfully');
    console.log('✅ Resend response:', JSON.stringify(data, null, 2));
    
    return NextResponse.json({
      success: true,
      message: 'Partnership enquiry sent successfully',
      data: data
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('❌ Error sending partnership enquiry:', error);
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

