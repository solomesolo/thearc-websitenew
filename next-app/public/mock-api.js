// Mock API for testing without backend
const mockAPI = {
    async analyzeHealth(data) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return {
            success: true,
            results: {
                urgent: [
                    {
                        test: "Blood Pressure Check",
                        reason: "Based on your age and family history",
                        timeframe: "Within 1 month"
                    }
                ],
                dueSoon: [
                    {
                        test: "Cholesterol Panel",
                        reason: "Routine screening recommended",
                        timeframe: "Within 3 months"
                    }
                ],
                optional: [
                    {
                        test: "Vitamin D Level",
                        reason: "General wellness screening",
                        timeframe: "Within 6 months"
                    }
                ]
            }
        };
    },
    
    async sendEmail(data) {
        // Simulate email sending
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Mock email sent to:', data.to);
        return { success: true, message: 'Email sent successfully' };
    },
    
    async saveEmail(data) {
        // Simulate saving email
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log('Mock email saved:', data.email);
        return { success: true, message: 'Email saved successfully' };
    }
};

// Override fetch to use mock API
const originalFetch = window.fetch;
window.fetch = async (url, options) => {
    if (url.includes('/api/analyze-health')) {
        const data = JSON.parse(options.body);
        const result = await mockAPI.analyzeHealth(data);
        return {
            ok: true,
            json: () => Promise.resolve(result)
        };
    }
    
    if (url.includes('/api/send-email')) {
        const data = JSON.parse(options.body);
        const result = await mockAPI.sendEmail(data);
        return {
            ok: true,
            json: () => Promise.resolve(result)
        };
    }
    
    if (url.includes('/api/save-email')) {
        const data = JSON.parse(options.body);
        const result = await mockAPI.saveEmail(data);
        return {
            ok: true,
            json: () => Promise.resolve(result)
        };
    }
    
    // For other requests, use original fetch
    return originalFetch(url, options);
};

console.log('Mock API loaded - using simulated backend responses');
