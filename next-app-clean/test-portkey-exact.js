// Test Portkey Integration - Exact Code from Dashboard
import Portkey from 'portkey-ai';

const portkey = new Portkey({
  apiKey: "rh1EFJioiosWBOgkpDiUeZf3Wqrl" // Your actual API key from the dashboard
});

async function main() {
  try {
    console.log('🧪 Testing Portkey integration with exact dashboard code...');
    
    const response = await portkey.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: "What is Portkey" }
      ],
      model: "@TheArc/text-moderation-stable",
      max_tokens: 512
    });
    
    console.log('✅ SUCCESS! Portkey integration is working!');
    console.log('Response:', response.choices[0].message.content);
    return response;
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    
    if (error.message.includes('OpenAI-Project header')) {
      console.log('\n🔧 SOLUTION: The OpenAI-Project header needs to be set.');
      console.log('This means we need to add the project header to our Portkey configuration.');
      console.log('The project should be: @TheArc');
    }
    
    throw error;
  }
}

// Test with OpenAI-Project header
async function testWithHeader() {
  try {
    console.log('\n🧪 Testing with OpenAI-Project header...');
    
    const portkeyWithHeader = new Portkey({
      apiKey: "rh1EFJioiosWBOgkpDiUeZf3Wqrl",
      defaultHeaders: {
        'OpenAI-Project': '@TheArc'
      }
    });
    
    const response = await portkeyWithHeader.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: "What is Portkey" }
      ],
      model: "@TheArc/text-moderation-stable",
      max_tokens: 512
    });
    
    console.log('✅ SUCCESS with header! Portkey integration is working!');
    console.log('Response:', response.choices[0].message.content);
    return response;
    
  } catch (error) {
    console.error('❌ ERROR with header:', error.message);
    throw error;
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting Portkey Integration Tests...\n');
  
  try {
    // Test 1: Without header (should fail)
    await main();
  } catch (error) {
    console.log('Expected error without header - this is normal.\n');
  }
  
  try {
    // Test 2: With header (should work)
    await testWithHeader();
    console.log('\n🎉 All tests completed! Portkey integration is working correctly.');
  } catch (error) {
    console.log('\n💥 Tests failed. Check your API key and project configuration.');
  }
}

// Export for use in other files
export { main, testWithHeader, runTests };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests();
}
