// Simple Portkey test using the exact same configuration as our Next.js API
require('dotenv').config({ path: '.env.local' });
const { default: Portkey } = require('portkey-ai');

console.log('🔍 Testing Portkey with exact Next.js API configuration...');
console.log('API Key:', process.env.PORTKEY_API_KEY ? 'Set' : 'Not set');
console.log('Project ID:', process.env.OPENAI_PROJECT_ID || 'Not set');
console.log('');

async function testPortkeyIntegration() {
  try {
    // This is the exact same configuration as in our Next.js API
    const portkey = new Portkey({
      apiKey: process.env.PORTKEY_API_KEY,
      defaultHeaders: {
        'OpenAI-Project': process.env.OPENAI_PROJECT_ID || '@TheArc'
      }
    });

    console.log('🧪 Making test request...');
    
    const response = await portkey.chat.completions.create({
      model: '@TheArc/text-moderation-stable',
      messages: [
        { role: 'user', content: 'What is Portkey?' }
      ],
      max_tokens: 100,
      temperature: 0.7
    });

    console.log('✅ SUCCESS! Portkey integration is working!');
    console.log('Response:', response.choices[0].message.content);
    
    return true;
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    
    if (error.message.includes('Invalid API Key')) {
      console.log('\n🔧 The API key might be incorrect or not activated.');
      console.log('Please verify the API key in your Portkey dashboard.');
    } else if (error.message.includes('OpenAI-Project header')) {
      console.log('\n🔧 The OpenAI-Project header is still not matching.');
      console.log('Current project ID:', process.env.OPENAI_PROJECT_ID);
    } else {
      console.log('\n🔧 Unexpected error. Check your Portkey configuration.');
    }
    
    return false;
  }
}

testPortkeyIntegration();
