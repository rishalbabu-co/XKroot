import * as Sentry from "@sentry/react";

export const trackEvent = (eventName: string, data: Record<string, any> = {}) => {
  try {
    // Track with Sentry
    Sentry.addBreadcrumb({
      category: 'analytics',
      message: eventName,
      data,
      level: 'info',
    });

    // Here you would typically also track with other analytics services
    // like Google Analytics, Mixpanel, etc.
    
    if (import.meta.env.DEV) {
      console.log('Analytics Event:', eventName, data);
    }
  } catch (error) {
    console.error('Analytics Error:', error);
  }
};

export const trackError = (error: Error, context: Record<string, any> = {}) => {
  Sentry.captureException(error, {
    extra: context
  });
};