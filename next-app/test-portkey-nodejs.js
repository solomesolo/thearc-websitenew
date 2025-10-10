// Test Portkey NodeJS Integration
import Portkey from 'portkey-ai';

const portkey = new Portkey({
  apiKey: "YOUR_PORTKEY_API_KEY",
  provider: "@YOUR_PROVIDER"
});

async function createChatCompletion() {
  try {
    const chat_complete = await portkey.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello!" }
      ]
    });
    console.log('✅ Portkey NodeJS test successful!');
    console.log('Response:', chat_complete.choices[0].message.content);
    return chat_complete;
  } catch (error) {
    console.error('❌ Portkey NodeJS test failed:', error);
    throw error;
  }
}

// Test health analysis
async function testHealthAnalysis() {
  try {
    const healthResponse = await portkey.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a preventive medicine specialist with expertise in evidence-based health screening." 
        },
        { 
          role: "user", 
          content: "Based on my age (30) and family history of diabetes, what health screenings should I consider?" 
        }
      ],
      max_tokens: 500
    });
    
    console.log('✅ Health analysis test successful!');
    console.log('Health Response:', healthResponse.choices[0].message.content);
    return healthResponse;
  } catch (error) {
    console.error('❌ Health analysis test failed:', error);
    throw error;
  }
}

// Run tests
async function runTests() {
  console.log('🧪 Testing Portkey NodeJS Integration...');
  
  try {
    await createChatCompletion();
    await testHealthAnalysis();
    console.log('🎉 All tests passed!');
  } catch (error) {
    console.error('💥 Tests failed:', error.message);
  }
}

// Export for use in other files
export { createChatCompletion, testHealthAnalysis, runTests };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests();
}
