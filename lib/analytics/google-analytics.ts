// Google Analytics 4 Integration

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialize GA4
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  }
};

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track conversions
export const trackConversion = (conversionId: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
    });
  }
};

// Track application submissions
export const trackApplicationSubmit = (role: string) => {
  event({
    action: 'submit_application',
    category: 'Application',
    label: role,
  });
};

// Track program views
export const trackProgramView = (programName: string) => {
  event({
    action: 'view_program',
    category: 'Programs',
    label: programName,
  });
};

// Track user signup
export const trackSignup = (method: string) => {
  event({
    action: 'sign_up',
    category: 'User',
    label: method,
  });
};

// Track login
export const trackLogin = (method: string) => {
  event({
    action: 'login',
    category: 'User',
    label: method,
  });
};

// Facebook Pixel
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

export const initFacebookPixel = () => {
  if (typeof window !== 'undefined' && FB_PIXEL_ID) {
    window.fbq('init', FB_PIXEL_ID);
    window.fbq('track', 'PageView');
  }
};

export const trackFBEvent = (eventName: string, data?: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, data);
  }
};

// Type declarations
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
  }
}
