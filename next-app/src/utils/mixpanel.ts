import mixpanel from 'mixpanel-browser';

// Mixpanel tracking utility with standardized events
export class MixpanelTracker {
  private static instance: MixpanelTracker;
  private testStartTime: number | null = null;

  private constructor() {}

  public static getInstance(): MixpanelTracker {
    if (!MixpanelTracker.instance) {
      MixpanelTracker.instance = new MixpanelTracker();
    }
    return MixpanelTracker.instance;
  }

  // Base tracking method with error handling
  private track(eventName: string, properties: Record<string, any> = {}) {
    try {
      if (mixpanel.track && typeof mixpanel.track === 'function') {
        const enhancedProperties = {
          ...properties,
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
          url: window.location.href,
          user_agent: navigator.userAgent,
          screen_resolution: `${screen.width}x${screen.height}`,
          viewport_size: `${window.innerWidth}x${window.innerHeight}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          referrer: document.referrer
        };

        mixpanel.track(eventName, enhancedProperties);
        console.log(`MixPanel tracked: ${eventName}`, enhancedProperties);
      }
    } catch (error) {
      console.error(`MixPanel tracking error for ${eventName}:`, error);
    }
  }

  // Track page views
  public trackPageView(pageName: string, additionalProperties: Record<string, any> = {}) {
    this.track('page_view', {
      page_name: pageName,
      page_title: document.title,
      ...additionalProperties
    });
  }

  // Track test start
  public trackTestStart(testType: string = 'health_screening', additionalProperties: Record<string, any> = {}) {
    this.testStartTime = Date.now();
    this.track('test_start', {
      test_type: testType,
      test_id: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...additionalProperties
    });
  }

  // Track test completion with timing
  public trackTestComplete(testType: string = 'health_screening', additionalProperties: Record<string, any> = {}) {
    const duration = this.testStartTime ? Date.now() - this.testStartTime : null;
    
    this.track('test_complete', {
      test_type: testType,
      test_duration_ms: duration,
      test_duration_seconds: duration ? Math.round(duration / 1000) : null,
      test_id: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...additionalProperties
    });

    // Reset start time
    this.testStartTime = null;
  }

  // Track share reveal
  public trackShareReveal(shareType: string, additionalProperties: Record<string, any> = {}) {
    this.track('share_reveal', {
      share_type: shareType,
      ...additionalProperties
    });
  }

  // Track marketplace view
  public trackMarketplaceView(marketplaceSection: string = 'main', additionalProperties: Record<string, any> = {}) {
    this.track('marketplace_view', {
      marketplace_section: marketplaceSection,
      ...additionalProperties
    });
  }

  // Track button clicks (existing functionality)
  public trackButtonClick(buttonName: string, location: string, additionalProperties: Record<string, any> = {}) {
    this.track('Button Click', {
      button: buttonName,
      location: location,
      ...additionalProperties
    });
  }

  // Track form submissions
  public trackFormSubmission(formType: string, success: boolean, additionalProperties: Record<string, any> = {}) {
    this.track('Form Submission', {
      form_type: formType,
      success: success,
      ...additionalProperties
    });
  }

  // Track email collection
  public trackEmailCollection(source: string, additionalProperties: Record<string, any> = {}) {
    this.track('Email Collection', {
      source: source,
      ...additionalProperties
    });
  }

  // Track email sent
  public trackEmailSent(emailType: string, additionalProperties: Record<string, any> = {}) {
    this.track('Email Sent', {
      email_type: emailType,
      ...additionalProperties
    });
  }

  // Update user properties
  public updateUserProperties(properties: Record<string, any>) {
    try {
      if (mixpanel.people && typeof mixpanel.people.set === 'function') {
        mixpanel.people.set(properties);
        console.log('MixPanel user properties updated:', properties);
      }
    } catch (error) {
      console.error('MixPanel user properties update error:', error);
    }
  }

  // Increment user properties
  public incrementUserProperty(property: string, value: number = 1) {
    try {
      if (mixpanel.people && typeof mixpanel.people.increment === 'function') {
        mixpanel.people.increment(property, value);
        console.log(`MixPanel incremented ${property} by ${value}`);
      }
    } catch (error) {
      console.error('MixPanel increment error:', error);
    }
  }
}

// Export singleton instance
export const mixpanelTracker = MixpanelTracker.getInstance();

// Export individual tracking functions for convenience
export const trackPageView = (pageName: string, properties?: Record<string, any>) => 
  mixpanelTracker.trackPageView(pageName, properties);

export const trackTestStart = (testType?: string, properties?: Record<string, any>) => 
  mixpanelTracker.trackTestStart(testType, properties);

export const trackTestComplete = (testType?: string, properties?: Record<string, any>) => 
  mixpanelTracker.trackTestComplete(testType, properties);

export const trackShareReveal = (shareType: string, properties?: Record<string, any>) => 
  mixpanelTracker.trackShareReveal(shareType, properties);

export const trackMarketplaceView = (marketplaceSection?: string, properties?: Record<string, any>) => 
  mixpanelTracker.trackMarketplaceView(marketplaceSection, properties);

export const trackButtonClick = (buttonName: string, location: string, properties?: Record<string, any>) => 
  mixpanelTracker.trackButtonClick(buttonName, location, properties);

export const trackFormSubmission = (formType: string, success: boolean, properties?: Record<string, any>) => 
  mixpanelTracker.trackFormSubmission(formType, success, properties);

export const trackEmailCollection = (source: string, properties?: Record<string, any>) => 
  mixpanelTracker.trackEmailCollection(source, properties);

export const trackEmailSent = (emailType: string, properties?: Record<string, any>) => 
  mixpanelTracker.trackEmailSent(emailType, properties);
