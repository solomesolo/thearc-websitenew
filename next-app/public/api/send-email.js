// Netlify function for sending emails via SendGrid
const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  // Set API key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const { to, subject, htmlContent, textContent } = JSON.parse(event.body);
    
    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL || 'thearc@thearcme.com',
      subject: subject,
      text: textContent,
      html: htmlContent,
    };
    
    await sgMail.send(msg);
    console.log('Email sent successfully to:', to);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully'
      }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      }),
    };
  }
};
