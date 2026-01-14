// Simple test for the process-personalization API
const testData = {
    user: {
        name: "Test User",
        age: 35,
        sex: "male",
        email: "test@example.com"
    }
};

async function testSimplePipeline() {
    try {
        console.log('🧪 Testing Simple Process-Personalization API...\n');
        
        const response = await fetch('http://localhost:3000/api/process-personalization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        const text = await response.text();
        console.log('Response body:', text);
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testSimplePipeline();





