// Simple, direct Mixpanel implementation
(function() {
    'use strict';
    
    const MIXPANEL_TOKEN = '40f8f3af62f75b12b1eaf51be2244298';
    
    // Load Mixpanel script
    (function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};f&&d(f,"state")&&(j=JSON.parse(decodeURIComponent(d(f,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(".");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,0)))}}var e=a;"undefined"!==typeof g?e=a[g]=[]:g="mixpanel";e.people=e.people||[];e.toString=function(b){var a="mixpanel";"mixpanel"!==g&&(a+="."+g);b||(a+=" (stub)");return a};e.people.toString=function(){return e.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<l.length;h++)c(e,l[h]);var f=a._i;function b(a,b){var c=b.split(".");2==c.length&&(a=a[c[0]],b=c[1]);a[b]=function(){a.push([b].concat(Array.prototype.slice.call(arguments,0)))}}for(var j="set_config add_group remove_group set_group people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" "),k=0;k<j.length;k++)b(e,j[k]);e._i=[];e.toString=function(a){var b="mixpanel";"mixpanel"!==g&&(b+="."+g);a||(b+=" (stub)");return b};e.people.toString=function(){return e.toString(1)+".people (stub)"};f&&(a._i=f);a.__SV=1.2;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===c.location.protocol&&"//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js";d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);
    
    // Initialize Mixpanel
    mixpanel.init(MIXPANEL_TOKEN, {
        api_host: 'https://api.mixpanel.com',
        track_pageview: false,
        persistence: 'localStorage'
    });
    
    // Generate or retrieve user ID
    let userId = localStorage.getItem('mixpanel_user_id');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('mixpanel_user_id', userId);
    }
    mixpanel.identify(userId);
    
    // Set user properties
    mixpanel.people.set({
        '$first_name': 'Anonymous',
        '$last_name': 'User',
        'user_type': 'visitor',
        'platform': 'web'
    });
    
    // Register UTM and referrer as super properties
    mixpanel.register({
        'initial_referrer': document.referrer || '(direct)',
        'initial_referring_domain': document.referrer ? new URL(document.referrer).hostname : '(direct)',
        'utm_source': new URLSearchParams(window.location.search).get('utm_source') || '(direct)',
        'utm_medium': new URLSearchParams(window.location.search).get('utm_medium') || '(direct)',
        'utm_campaign': new URLSearchParams(window.location.search).get('utm_campaign') || '(direct)',
        'utm_term': new URLSearchParams(window.location.search).get('utm_term') || '(direct)',
        'utm_content': new URLSearchParams(window.location.search).get('utm_content') || '(direct)'
    });
    
    console.log('✅ Mixpanel initialized with user ID:', userId);
    
    // Track page view immediately
    mixpanel.track('page_view', {
        page: window.location.pathname,
        title: document.title
        // UTM & referrer already registered as super properties via mixpanel.register
    });
    
    // Test start button tracking
    document.addEventListener('DOMContentLoaded', function() {
        const startTestBtn = document.getElementById('start-test-btn');
        if (startTestBtn) {
            startTestBtn.addEventListener('click', function(){
                // start a timed event so we capture completion duration
                mixpanel.time_event('test_complete');
                mixpanel.track('test_start', {
                    button_id: 'start-test-btn',
                    referrer: document.referrer || '(direct)'
                });
                console.log('✅ test_start tracked');
            });
        }
    });
    
    // Test complete function
    window.onTestComplete = function(baselineWord){
        mixpanel.track('test_complete', {
            baseline_word: baselineWord || 'unknown',
            time_spent: Math.round(performance.now()/1000) // optional client-side duration in seconds
            // UTMs and initial_referrer are attached as super properties automatically
        });
        // optionally set a lightweight user profile property (no PII)
        try {
            mixpanel.people.set({
                'last_test_date': new Date().toISOString(),
                'baseline_word': baselineWord || null,
                'has_completed_test': true
            });
        } catch(e) { console.warn('people.set failed', e); }
        console.log('✅ test_complete tracked');
    };
    
    // Marketplace view tracking
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.provider-link').forEach(function(el){
            el.addEventListener('click', function(){
                mixpanel.track('marketplace_view', {
                    provider_id: el.dataset.providerId,
                    provider_category: el.dataset.category
                });
                console.log('✅ marketplace_view tracked');
            });
        });
    });
    
    // Share reveal tracking
    window.trackShareReveal = function() {
        mixpanel.track('share_reveal', {
            share_type: 'results',
            page: window.location.pathname,
            title: document.title
        });
        console.log('✅ share_reveal tracked');
    };
    
    // Test function
    window.testMixpanel = function() {
        mixpanel.track('test_event', {
            test: true,
            timestamp: new Date().toISOString()
        });
        console.log('✅ Test event sent!');
    };
    
})();
