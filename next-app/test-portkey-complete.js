// Complete Portkey test with environment variables and header fix
require('dotenv').config({ path: '.env.local' });
const { default: Portkey } = require('portkey-ai');

console.log('🔍 Environment Check:');
console.log('PORTKEY_API_KEY exists:', !!process.env.PORTKEY_API_KEY);
console.log('PORTKEY_API_KEY length:', process.env.PORTKEY_API_KEY?.length || 0);
console.log('OPENAI_PROJECT_ID:', process.env.OPENAI_PROJECT_ID || 'Not set');
console.log('');

async function testWithoutHeader() {
  console.log('🧪 Test 1: Without OpenAI-Project header (should fail)...');
  
  const portkey = new Portkey({
    apiKey: process.env.PORTKEY_API_KEY || "rh1EFJioiosWBOgkpDiUeZf3Wqrl"
  });
  
  try {
    const response = await portkey.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: "What is Portkey" }
      ],
      model: "@TheArc/text-moderation-stable",
      max_tokens: 512
    });
    
    console.log('✅ SUCCESS without header!');
    console.log('Response:', response.choices[0].message.content);
    return true;
  } catch (error) {
    console.log('❌ Expected error without header:', error.message);
    return false;
  }
}

async function testWithHeader() {
  console.log('\n🧪 Test 2: With OpenAI-Project header (should work)...');
  
  const portkey = new Portkey({
    apiKey: process.env.PORTKEY_API_KEY || "rh1EFJioiosWBOgkpDiUeZf3Wqrl",
    defaultHeaders: {
      'OpenAI-Project': process.env.OPENAI_PROJECT_ID || '@TheArc'
    }
  });
  
  try {
    const response = await portkey.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: "What is Portkey" }
      ],
      model: "@TheArc/text-moderation-stable",
      max_tokens: 512
    });
    
    console.log('✅ SUCCESS with header!');
    console.log('Response:', response.choices[0].message.content);
    return true;
  } catch (error) {
    console.log('❌ Error with header:', error.message);
    return false;
  }
}

async function testHealthAnalysis() {
  console.log('\n🧪 Test 3: Health analysis with header...');
  
  const portkey = new Portkey({
    apiKey: process.env.PORTKEY_API_KEY || "rh1EFJioiosWBOgkpDiUeZf3Wqrl",
    defaultHeaders: {
      'OpenAI-Project': process.env.OPENAI_PROJECT_ID || '@TheArc'
    }
  });
  
  try {
    const response = await portkey.chat.completions.create({
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
      model: "@TheArc/text-moderation-stable",
      max_tokens: 500
    });
    
    console.log('✅ Health analysis SUCCESS!');
    console.log('Response:', response.choices[0].message.content);
    return true;
  } catch (error) {
    console.log('❌ Health analysis error:', error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Starting Complete Portkey Integration Tests...\n');
  
  const results = {
    withoutHeader: await testWithoutHeader(),
    withHeader: await testWithHeader(),
    healthAnalysis: await testHealthAnalysis()
  };
  
  console.log('\n📊 Test Results Summary:');
  console.log('Without header:', results.withoutHeader ? '✅ PASS' : '❌ FAIL (expected)');
  console.log('With header:', results.withHeader ? '✅ PASS' : '❌ FAIL');
  console.log('Health analysis:', results.healthAnalysis ? '✅ PASS' : '❌ FAIL');
  
  if (results.withHeader && results.healthAnalysis) {
    console.log('\n🎉 All tests passed! Portkey integration is working correctly!');
  } else {
    console.log('\n💥 Some tests failed. Check your API key and configuration.');
  }
}

runAllTests();
