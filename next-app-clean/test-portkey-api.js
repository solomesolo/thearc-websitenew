// Test Portkey Integration via Next.js API
const BASE_URL = 'http://localhost:3002'; // Adjust if your dev server runs on a different port

async function testPortkeyAPI() {
  console.log('🧪 Testing Portkey integration via Next.js API...\n');
  
  try {
    // Test 1: Basic GET request
    console.log('1. Testing basic Portkey integration...');
    const getResponse = await fetch(`${BASE_URL}/api/test-portkey`);
    const getData = await getResponse.json();
    
    console.log('GET Response Status:', getResponse.status);
    console.log('GET Response:', JSON.stringify(getData, null, 2));
    
    if (getData.success) {
      console.log('✅ Basic Portkey integration is working!\n');
    } else {
      console.log('❌ Basic Portkey integration failed\n');
    }
    
  } catch (error) {
    console.error('❌ GET request failed:', error.message);
  }
  
  try {
    // Test 2: Health analysis POST request
    console.log('2. Testing health analysis integration...');
    const postResponse = await fetch(`${BASE_URL}/api/test-portkey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        testType: 'health_analysis',
        responses: [
          { question: "age", answer: "30" },
          { question: "gender", answer: "female" },
          { question: "family_history_diabetes", answer: "yes" }
        ],
        userEmail: "test@example.com"
      }),
    });
    
    const postData = await postResponse.json();
    
    console.log('POST Response Status:', postResponse.status);
    console.log('POST Response:', JSON.stringify(postData, null, 2));
    
    if (postData.success) {
      console.log('✅ Health analysis integration is working!\n');
    } else {
      console.log('❌ Health analysis integration failed\n');
    }
    
  } catch (error) {
    console.error('❌ POST request failed:', error.message);
  }
  
  try {
    // Test 3: Basic completion POST request
    console.log('3. Testing basic completion integration...');
    const basicResponse = await fetch(`${BASE_URL}/api/test-portkey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        testType: 'basic'
      }),
    });
    
    const basicData = await basicResponse.json();
    
    console.log('Basic Response Status:', basicResponse.status);
    console.log('Basic Response:', JSON.stringify(basicData, null, 2));
    
    if (basicData.success) {
      console.log('✅ Basic completion integration is working!\n');
    } else {
      console.log('❌ Basic completion integration failed\n');
    }
    
  } catch (error) {
    console.error('❌ Basic request failed:', error.message);
  }
  
  console.log('🎉 All API tests completed!');
}

// Run tests
testPortkeyAPI();
