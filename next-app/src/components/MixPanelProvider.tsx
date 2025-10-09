"use client";
import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

export default function MixPanelProvider() {
  useEffect(() => {
    // Initialize Mixpanel with the configuration from the image
    mixpanel.init('40f8f3af62f75b12b1eaf51be2244298', {
      autocapture: true,
      record_sessions_percent: 100,
      api_host: 'https://api-eu.mixpanel.com',
    });

    // Track page view
    mixpanel.track('Page View', {
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    });

    console.log('MixPanel initialized successfully');
  }, []);

  return null; // This component doesn't render anything
}
