// Robust Mixpanel implementation for static HTML files
(function() {
    'use strict';
    
    const MIXPANEL_TOKEN = '40f8f3af62f75b12b1eaf51be2244298';
    
    // Global state
    window.mixpanelReady = false;
    window.mixpanelUserId = null;
    
    // Load Mixpanel script dynamically
    function loadMixpanelScript() {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (window.mixpanel && window.mixpanel.__SV) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = 'https://cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js';
            
            script.onload = function() {
                console.log('✅ Mixpanel script loaded successfully');
                resolve();
            };
            
            script.onerror = function() {
                console.error('❌ Failed to load Mixpanel script from primary CDN');
                // Try alternative CDN
                const altScript = document.createElement('script');
                altScript.type = 'text/javascript';
                altScript.async = true;
                altScript.src = 'https://cdn.jsdelivr.net/npm/mixpanel-browser@2.45.0/dist/mixpanel.min.js';
                
                altScript.onload = function() {
                    console.log('✅ Mixpanel script loaded from alternative CDN');
                    resolve();
                };
                
                altScript.onerror = function() {
                    console.error('❌ Failed to load Mixpanel script from both CDNs');
                    reject(new Error('Failed to load Mixpanel script'));
                };
                
                document.head.appendChild(altScript);
            };
            
            document.head.appendChild(script);
        });
    }
    
    // Initialize Mixpanel
    async function initializeMixpanel() {
        try {
            console.log('🔄 Starting Mixpanel initialization...');
            
            // Load the script first
            await loadMixpanelScript();
            
            // Wait a bit for Mixpanel to be fully available
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (!window.mixpanel) {
                throw new Error('Mixpanel not available after loading');
            }
            
            console.log('🔄 Initializing Mixpanel with token:', MIXPANEL_TOKEN);
            
            // Initialize Mixpanel with same config as Next.js version
            window.mixpanel.init(MIXPANEL_TOKEN, {
                autocapture: true,
                record_sessions_percent: 100,
                api_host: 'https://api-eu.mixpanel.com', // Use EU API like Next.js version
                track_pageview: false,
                persistence: 'localStorage',
                cross_subdomain_cookie: false,
                secure_cookie: true,
                ip: false,
                property_blacklist: ['$current_url', '$screen_height', '$screen_width']
            });
            
            // Generate or retrieve user ID (same logic as Next.js)
            let userId = localStorage.getItem('mixpanel_user_id');
            if (!userId) {
                userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
                localStorage.setItem('mixpanel_user_id', userId);
            }
            
            window.mixpanelUserId = userId;
            
            // Identify the user
            window.mixpanel.identify(userId);
            
            // Set user properties (same as Next.js version)
            window.mixpanel.people.set({
                '$first_name': 'Anonymous',
                '$last_name': 'User',
                '$email': 'anonymous@thearcme.com',
                'user_type': 'visitor',
                'signup_date': new Date().toISOString(),
                'platform': 'web',
                'browser': navigator.userAgent,
                'screen_resolution': `${screen.width}x${screen.height}`,
                'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
            });
            
            window.mixpanelReady = true;
            console.log('✅ Mixpanel initialized successfully with user ID:', userId);
            
            // Track page view immediately
            trackPageView();
            
        } catch (error) {
            console.error('❌ Mixpanel initialization failed:', error);
            window.mixpanelReady = false;
        }
    }
    
    // Track page view
    function trackPageView() {
        try {
            if (window.mixpanelReady && window.mixpanel && window.mixpanel.track) {
                window.mixpanel.track('page_view', {
                    page: window.location.pathname,
                    page_title: document.title,
                    timestamp: new Date().toISOString(),
                    referrer: document.referrer,
                    url: window.location.href,
                    user_agent: navigator.userAgent,
                    screen_resolution: `${screen.width}x${screen.height}`,
                    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                });
                console.log('✅ page_view tracked for', window.location.pathname);
            }
        } catch (error) {
            console.error('❌ page_view tracking error:', error);
        }
    }
    
    // Test start button tracking
    function setupTestStartTracking() {
        document.addEventListener('DOMContentLoaded', function() {
            const startTestBtn = document.getElementById('start-test-btn');
            if (startTestBtn) {
                startTestBtn.addEventListener('click', function(){
                    console.log('🔄 test_start button clicked');
                    if (window.mixpanelReady && window.mixpanel && window.mixpanel.track) {
                        // Start timed event
                        window.mixpanel.time_event('test_complete');
                        
                        window.mixpanel.track('test_start', {
                            button_id: 'start-test-btn',
                            referrer: document.referrer || '(direct)',
                            timestamp: new Date().toISOString(),
                            page: window.location.pathname,
                            url: window.location.href
                        });
                        console.log('✅ test_start tracked');
                    } else {
                        console.error('❌ Mixpanel not ready for test_start tracking');
                    }
                });
            }
        });
    }
    
    // Test complete function
    window.onTestComplete = function(baselineWord){
        try {
            console.log('🔄 onTestComplete called with:', baselineWord);
            if (window.mixpanelReady && window.mixpanel && window.mixpanel.track) {
                window.mixpanel.track('test_complete', {
                    baseline_word: baselineWord || 'unknown',
                    time_spent: Math.round(performance.now()/1000),
                    timestamp: new Date().toISOString(),
                    page: window.location.pathname,
                    url: window.location.href
                });
                
                // Set user properties
                try {
                    window.mixpanel.people.set({
                        'last_test_date': new Date().toISOString(),
                        'baseline_word': baselineWord || null,
                        'has_completed_test': true
                    });
                } catch(e) { 
                    console.warn('people.set failed', e); 
                }
                
                console.log('✅ test_complete tracked');
            } else {
                console.error('❌ Mixpanel not ready for test_complete tracking');
            }
        } catch (error) {
            console.error('❌ test_complete tracking error:', error);
        }
    };
    
    // Marketplace view tracking
    function setupMarketplaceTracking() {
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.provider-link').forEach(function(el){
                el.addEventListener('click', function(){
                    console.log('🔄 marketplace_view link clicked');
                    if (window.mixpanelReady && window.mixpanel && window.mixpanel.track) {
                        window.mixpanel.track('marketplace_view', {
                            provider_id: el.dataset.providerId,
                            provider_category: el.dataset.category,
                            timestamp: new Date().toISOString(),
                            page: window.location.pathname,
                            url: window.location.href
                        });
                        console.log('✅ marketplace_view tracked');
                    } else {
                        console.error('❌ Mixpanel not ready for marketplace_view tracking');
                    }
                });
            });
        });
    }
    
    // Share reveal tracking
    window.trackShareReveal = function() {
        try {
            console.log('🔄 trackShareReveal called');
            if (window.mixpanelReady && window.mixpanel && window.mixpanel.track) {
                window.mixpanel.track('share_reveal', {
                    share_type: 'results',
                    page: window.location.pathname,
                    title: document.title,
                    timestamp: new Date().toISOString(),
                    url: window.location.href
                });
                console.log('✅ share_reveal tracked');
            } else {
                console.error('❌ Mixpanel not ready for share_reveal tracking');
            }
        } catch (error) {
            console.error('❌ share_reveal tracking error:', error);
        }
    };
    
    // Test function
    window.testMixpanel = function() {
        try {
            console.log('🧪 Testing Mixpanel...');
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
    };
    
    // Initialize everything
    async function init() {
        try {
            await initializeMixpanel();
            setupTestStartTracking();
            setupMarketplaceTracking();
        } catch (error) {
            console.error('❌ Initialization failed:', error);
        }
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
