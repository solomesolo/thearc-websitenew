// Unified Mixpanel initialization script for both Next.js and static HTML files
(function() {
    'use strict';
    
    const MIXPANEL_TOKEN = '40f8f3af62f75b12b1eaf51be2244298';
    const API_HOST = 'https://api.mixpanel.com'; // Try default API host first
    
    // Global Mixpanel state
    window.mixpanelReady = false;
    window.mixpanelUserId = null;
    
    // Initialize Mixpanel
    function initializeMixpanel() {
        try {
            // Load Mixpanel script if not already loaded
            if (typeof window.mixpanel === 'undefined') {
                loadMixpanelScript();
                return;
            }
            
            // Initialize Mixpanel
            console.log('🔄 Initializing Mixpanel with token:', MIXPANEL_TOKEN);
            console.log('🔄 Using API host:', API_HOST);
            
            try {
                window.mixpanel.init(MIXPANEL_TOKEN, {
                    autocapture: true,
                    record_sessions_percent: 100,
                    api_host: API_HOST,
                    track_pageview: false,
                    persistence: 'localStorage',
                    cross_subdomain_cookie: false,
                    secure_cookie: true,
                    ip: false,
                    property_blacklist: ['$current_url', '$screen_height', '$screen_width']
                });
                console.log('✅ Mixpanel initialized successfully with', API_HOST);
            } catch (initError) {
                console.log('⚠️ Failed to initialize with default API, trying EU API...');
                window.mixpanel.init(MIXPANEL_TOKEN, {
                    autocapture: true,
                    record_sessions_percent: 100,
                    api_host: 'https://api-eu.mixpanel.com',
                    track_pageview: false,
                    persistence: 'localStorage',
                    cross_subdomain_cookie: false,
                    secure_cookie: true,
                    ip: false,
                    property_blacklist: ['$current_url', '$screen_height', '$screen_width']
                });
                console.log('✅ Mixpanel initialized successfully with EU API');
            }
            
            // Generate or retrieve a unique user ID (same logic as Next.js)
            let userId = localStorage.getItem('mixpanel_user_id');
            if (!userId) {
                userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
                localStorage.setItem('mixpanel_user_id', userId);
            }
            
            window.mixpanelUserId = userId;
            
            // Identify the user
            window.mixpanel.identify(userId);
            
            // Set user properties (same as Next.js)
            window.mixpanel.people.set({
                '$first_name': 'Anonymous',
                '$last_name': 'User',
                '$email': 'anonymous@thearcme.com',
                'user_type': 'visitor',
                'signup_date': new Date().toISOString(),
                'platform': 'web',
                'browser': navigator.userAgent,
                'screen_resolution': screen.width + 'x' + screen.height,
                'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
            });
            
            window.mixpanelReady = true;
            console.log('✅ Unified MixPanel initialized with user ID:', userId);
            
            // Track page view for static HTML files
            trackPageView();
            
        } catch (error) {
            console.error('❌ Unified MixPanel initialization error:', error);
            window.mixpanelReady = false;
        }
    }
    
    // Load Mixpanel script dynamically
    function loadMixpanelScript() {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js';
        script.onload = function() {
            console.log('✅ Mixpanel script loaded successfully');
            // Wait a bit for Mixpanel to be available
            setTimeout(initializeMixpanel, 200);
        };
        script.onerror = function() {
            console.error('❌ Failed to load Mixpanel script');
            // Try alternative CDN
            const altScript = document.createElement('script');
            altScript.type = 'text/javascript';
            altScript.async = true;
            altScript.src = 'https://cdn.jsdelivr.net/npm/mixpanel-browser@2.45.0/dist/mixpanel.min.js';
            altScript.onload = function() {
                console.log('✅ Mixpanel script loaded from alternative CDN');
                setTimeout(initializeMixpanel, 200);
            };
            altScript.onerror = function() {
                console.error('❌ Failed to load Mixpanel script from both CDNs');
            };
            document.head.appendChild(altScript);
        };
        document.head.appendChild(script);
    }
    
    // Track page view
    function trackPageView() {
        try {
            console.log('🔄 Attempting to track page_view...');
            console.log('🔄 Mixpanel ready:', window.mixpanelReady);
            console.log('🔄 Mixpanel object exists:', typeof window.mixpanel !== 'undefined');
            console.log('🔄 Mixpanel track function exists:', typeof window.mixpanel?.track === 'function');
            
            if (window.mixpanelReady && window.mixpanel && window.mixpanel.track) {
                const eventData = {
                    page: window.location.pathname,
                    page_title: document.title,
                    timestamp: new Date().toISOString(),
                    referrer: document.referrer,
                    url: window.location.href,
                    user_agent: navigator.userAgent,
                    screen_resolution: screen.width + 'x' + screen.height,
                    viewport_size: window.innerWidth + 'x' + window.innerHeight,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                };
                
                console.log('🔄 Tracking page_view with data:', eventData);
                window.mixpanel.track('page_view', eventData);
                console.log('✅ Unified MixPanel: page_view tracked for', window.location.pathname);
            } else {
                console.log('⚠️ Mixpanel not ready for page_view tracking');
            }
        } catch (error) {
            console.error('❌ Unified MixPanel page_view tracking error:', error);
        }
    }
    
    // Track test start
    function trackTestStart() {
        try {
            const testStartTime = Date.now();
            const testId = 'test_' + testStartTime + '_' + Math.random().toString(36).substr(2, 9);
            
            // Store test start time and ID for duration calculation
            localStorage.setItem('testStartTime', testStartTime.toString());
            localStorage.setItem('testId', testId);
            
            if (window.mixpanelReady && window.mixpanel && window.mixpanel.track) {
                window.mixpanel.track('test_start', {
                    test_type: 'health_screening',
                    test_id: testId,
                    timestamp: new Date().toISOString(),
                    page: window.location.pathname,
                    url: window.location.href,
                    user_agent: navigator.userAgent,
                    screen_resolution: screen.width + 'x' + screen.height,
                    viewport_size: window.innerWidth + 'x' + window.innerHeight,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    referrer: document.referrer
                });
                console.log('✅ Unified MixPanel: test_start tracked with ID:', testId);
            } else {
                console.log('⚠️ Unified MixPanel not ready yet, retrying in 1 second...');
                setTimeout(trackTestStart, 1000);
            }
        } catch (error) {
            console.error('❌ Unified MixPanel test_start tracking error:', error);
        }
    }
    
    // Track test complete
    function trackTestComplete() {
        try {
            const testStartTime = localStorage.getItem('testStartTime');
            const testId = localStorage.getItem('testId');
            const testCompleteTime = Date.now();
            
            let testDuration = null;
            let testDurationSeconds = null;
            
            if (testStartTime) {
                testDuration = testCompleteTime - parseInt(testStartTime);
                testDurationSeconds = Math.round(testDuration / 1000);
            }
            
            if (window.mixpanelReady && window.mixpanel && window.mixpanel.track) {
                window.mixpanel.track('test_complete', {
                    test_type: 'health_screening',
                    test_id: testId || 'unknown',
                    test_duration_ms: testDuration,
                    test_duration_seconds: testDurationSeconds,
                    timestamp: new Date().toISOString(),
                    page: window.location.pathname,
                    url: window.location.href,
                    user_agent: navigator.userAgent,
                    screen_resolution: screen.width + 'x' + screen.height,
                    viewport_size: window.innerWidth + 'x' + window.innerHeight,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    referrer: document.referrer,
                    has_results: true,
                    results_source: 'cached'
                });
                console.log('✅ Unified MixPanel: test_complete tracked with duration:', testDurationSeconds + 's');
            } else {
                console.log('⚠️ Unified MixPanel not ready yet, retrying in 1 second...');
                setTimeout(trackTestComplete, 1000);
            }
        } catch (error) {
            console.error('❌ Unified MixPanel test_complete tracking error:', error);
        }
    }
    
    // Track share reveal
    function trackShareReveal() {
        try {
            if (window.mixpanelReady && window.mixpanel && window.mixpanel.track) {
                window.mixpanel.track('share_reveal', {
                    share_type: 'results',
                    timestamp: new Date().toISOString(),
                    page: window.location.pathname,
                    url: window.location.href,
                    user_agent: navigator.userAgent,
                    screen_resolution: screen.width + 'x' + screen.height,
                    viewport_size: window.innerWidth + 'x' + window.innerHeight,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    referrer: document.referrer
                });
                console.log('✅ Unified MixPanel: share_reveal tracked');
            } else {
                console.log('⚠️ Unified MixPanel not ready yet, retrying in 1 second...');
                setTimeout(trackShareReveal, 1000);
            }
        } catch (error) {
            console.error('❌ Unified MixPanel share_reveal tracking error:', error);
        }
    }
    
    // Track marketplace view
    function trackMarketplaceView() {
        try {
            if (window.mixpanelReady && window.mixpanel && window.mixpanel.track) {
                window.mixpanel.track('marketplace_view', {
                    marketplace_section: 'catalog',
                    timestamp: new Date().toISOString(),
                    page: window.location.pathname,
                    url: window.location.href,
                    user_agent: navigator.userAgent,
                    screen_resolution: screen.width + 'x' + screen.height,
                    viewport_size: window.innerWidth + 'x' + window.innerHeight,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    referrer: document.referrer
                });
                console.log('✅ Unified MixPanel: marketplace_view tracked');
            } else {
                console.log('⚠️ Unified MixPanel not ready yet, retrying in 1 second...');
                setTimeout(trackMarketplaceView, 1000);
            }
        } catch (error) {
            console.error('❌ Unified MixPanel marketplace_view tracking error:', error);
        }
    }
    
    // Test function to verify Mixpanel is working
    function testMixpanel() {
        try {
            console.log('🧪 Testing Mixpanel...');
            console.log('🧪 Mixpanel ready:', window.mixpanelReady);
            console.log('🧪 Mixpanel object:', window.mixpanel);
            console.log('🧪 User ID:', window.mixpanelUserId);
            
            if (window.mixpanelReady && window.mixpanel && window.mixpanel.track) {
                window.mixpanel.track('test_event', {
                    test: true,
                    timestamp: new Date().toISOString(),
                    source: 'manual_test'
                });
                console.log('✅ Test event sent successfully!');
            } else {
                console.log('❌ Mixpanel not ready for testing');
            }
        } catch (error) {
            console.error('❌ Test event error:', error);
        }
    }
    
    // Expose functions globally
    window.trackTestStart = trackTestStart;
    window.trackTestComplete = trackTestComplete;
    window.trackShareReveal = trackShareReveal;
    window.trackMarketplaceView = trackMarketplaceView;
    window.testMixpanel = testMixpanel;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMixpanel);
    } else {
        initializeMixpanel();
    }
    
})();
