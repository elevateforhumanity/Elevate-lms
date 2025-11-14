export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

// Track custom events
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

// Predefined events
export const trackCourseEnrollment = (courseId: string, courseName: string) => {
  event({
    action: 'enroll',
    category: 'Course',
    label: courseName,
    value: 1,
  });
};

export const trackCourseCompletion = (courseId: string, courseName: string) => {
  event({
    action: 'complete',
    category: 'Course',
    label: courseName,
    value: 1,
  });
};

export const trackCertificateDownload = (certificateId: string) => {
  event({
    action: 'download',
    category: 'Certificate',
    label: certificateId,
  });
};

export const trackPayment = (amount: number, courseId: string) => {
  event({
    action: 'purchase',
    category: 'Payment',
    label: courseId,
    value: amount,
  });
};

export const trackSearch = (searchTerm: string) => {
  event({
    action: 'search',
    category: 'Search',
    label: searchTerm,
  });
};

export const trackSignup = (method: string) => {
  event({
    action: 'sign_up',
    category: 'User',
    label: method,
  });
};

export const trackLogin = (method: string) => {
  event({
    action: 'login',
    category: 'User',
    label: method,
  });
};
