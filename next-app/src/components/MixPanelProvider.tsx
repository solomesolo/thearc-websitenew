"use client";
import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';
import { usePathname } from 'next/navigation';

const MIXPANEL_TOKEN = '40f8f3af62f75b12b1eaf51be2244298';

export default function MixPanelProvider() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      // Initialize Mixpanel with enhanced configuration
      if (MIXPANEL_TOKEN) {
        mixpanel.init(MIXPANEL_TOKEN, {
          autocapture: true,
          record_sessions_percent: 100,
          api_host: 'https://api-eu.mixpanel.com',
          track_pageview: false, // Disable automatic page view tracking to handle it manually
          persistence: 'localStorage', // Ensure data persistence
          cross_subdomain_cookie: false,
          secure_cookie: true,
          ip: false, // Don't track IP for privacy
          property_blacklist: ['$current_url', '$screen_height', '$screen_width'] // Remove sensitive data
        });

        // Generate or retrieve a unique user ID
        let userId = localStorage.getItem('mixpanel_user_id');
        if (!userId) {
          userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
          localStorage.setItem('mixpanel_user_id', userId);
        }

        // Identify the user
        mixpanel.identify(userId);

        // Set user properties
        mixpanel.people.set({
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

        console.log('MixPanel initialized with user ID:', userId);
      }
    } catch (error) {
      console.error('MixPanel initialization error:', error);
    }
  }, []);

  useEffect(() => {
    try {
      // Track page views with enhanced data
      if (mixpanel.track && typeof mixpanel.track === 'function') {
        mixpanel.track('page_view', {
          page: pathname,
          page_title: document.title,
          timestamp: new Date().toISOString(),
          referrer: document.referrer,
          url: window.location.href,
          user_agent: navigator.userAgent,
          screen_resolution: `${screen.width}x${screen.height}`,
          viewport_size: `${window.innerWidth}x${window.innerHeight}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });

        // Track session start
        mixpanel.track('Session Start', {
          timestamp: new Date().toISOString(),
          session_id: Date.now().toString(),
          page: pathname
        });

        console.log('MixPanel Page View tracked:', pathname);
      }
    } catch (error) {
      console.error('MixPanel tracking error:', error);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}
