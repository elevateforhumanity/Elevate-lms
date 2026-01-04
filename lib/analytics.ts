type GtagCommand = 'config' | 'event' | 'set' | 'consent';
type GtagConfigParams = {
  page_path?: string;
  page_title?: string;
  page_location?: string;
  [key: string]: string | number | boolean | undefined;
};
type GtagEventParams = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
};

declare global {
  interface Window {
    gtag?: (
      command: GtagCommand,
      targetId: string,
      params?: GtagConfigParams | GtagEventParams
    ) => void;
  }
}

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

// Additional tracking for Elevate for Humanity
export const trackApplicationSubmission = (programName: string) => {
  event({
    action: 'application_submit',
    category: 'Applications',
    label: programName,
  });
};

export const trackProgramView = (programName: string) => {
  event({
    action: 'program_view',
    category: 'Programs',
    label: programName,
  });
};

export const trackBlogRead = (postTitle: string, readTime?: number) => {
  event({
    action: 'blog_read',
    category: 'Blog',
    label: postTitle,
    value: readTime,
  });
};

export const trackContactSubmission = () => {
  event({
    action: 'contact_submit',
    category: 'Contact',
  });
};

export const trackGrantSearch = (searchTerm: string) => {
  event({
    action: 'grant_search',
    category: 'Grants',
    label: searchTerm,
  });
};

export const trackForumPost = (forumName: string) => {
  event({
    action: 'forum_post',
    category: 'Community',
    label: forumName,
  });
};

export const trackAITutorInteraction = (questionType: string) => {
  event({
    action: 'ai_tutor_interaction',
    category: 'AI',
    label: questionType,
  });
};
