// Netlify function for saving email to Notion
const { Client } = require('@notionhq/client');

exports.handler = async (event, context) => {
  // Initialize Notion client
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
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
    const { email, timestamp, consent, source } = JSON.parse(event.body);
    
    // Save to Notion database
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        Email: {
          title: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
        Timestamp: {
          date: {
            start: timestamp,
          },
        },
        Consent: {
          checkbox: consent,
        },
        Source: {
          select: {
            name: source,
          },
        },
        Status: {
          select: {
            name: 'active',
          },
        },
      },
    });
    
    console.log('Email saved to Notion:', response.id);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email saved successfully',
        notionId: response.id
      }),
    };
  } catch (error) {
    console.error('Error saving email to Notion:', error);
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
