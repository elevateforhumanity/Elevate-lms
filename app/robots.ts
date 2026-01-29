import { MetadataRoute } from 'next';

/**
 * Robots.txt Configuration
 * 
 * EXPANDED INDEXING STRATEGY (with strict governance)
 * 
 * A page may be indexed only if it passes all 6 gates:
 * 1. Public – no auth required
 * 2. Stable – content does not change per user
 * 3. Complete – no empty sections, no placeholders
 * 4. Canonical – one clean URL, no params
 * 5. Evergreen – valid for 6+ months
 * 6. Governed – aligned with authoritative documents
 * 
 * INDEXED:
 * - Core marketing pages
 * - Governance/compliance docs
 * - Public program overviews
 * - Resource/knowledge pages
 * - Store landing and category pages
 * - /lms landing page (public)
 * 
 * BLOCKED:
 * - All auth flows
 * - All dashboards (user, admin, instructor, etc.)
 * - All checkout sessions
 * - All API routes
 * - All query string URLs
 * - Internal/test pages
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // API routes (all backend endpoints)
          '/api/',
          
          // Auth flows (login, registration, password reset)
          '/auth/',
          '/login',
          '/signup',
          '/reset/',
          '/reset-password',
          '/forgot-password',
          '/verify-email',
          '/verify-identity',
          
          // All dashboard routes
          '/dashboard/',
          '/admin/',
          '/admin-login',
          '/staff-portal/',
          '/instructor/',
          '/creator/',
          '/employee/',
          '/program-holder/',
          '/workforce-board/',
          '/employer/dashboard',
          '/employer/analytics',
          '/employer/candidates',
          '/employer/reports',
          '/employer/settings',
          '/partner/dashboard',
          '/student/',
          '/learner/',
          '/portal/',
          
          // LMS app routes (auth-gated interiors)
          '/lms/dashboard',
          '/lms/courses/',      // Course interiors blocked, not /courses landing
          '/lms/achievements',
          '/lms/analytics',
          '/lms/forums',
          '/lms/learning-paths',
          '/lms/certificates',
          '/lms/profile',
          '/lms/settings',
          '/lms/messages',
          '/lms/calendar',
          '/lms/grades',
          '/lms/assignments',
          '/lms/quizzes',
          '/lms/community',
          '/lms/notifications',
          '/lms/progress',
          '/lms/schedule',
          '/lms/files',
          '/lms/groups',
          '/lms/leaderboard',
          '/lms/badges',
          '/lms/portfolio',
          '/lms/placement',
          '/lms/library',
          '/lms/integrations',
          '/lms/ai-tutor',
          '/lms/chat',
          '/lms/collaborate',
          '/lms/social',
          '/lms/study-groups',
          '/lms/video',
          '/lms/scorm',
          '/lms/adaptive',
          '/lms/peer-review',
          '/lms/builder',
          '/lms/enroll',
          '/lms/attendance',
          '/lms/quiz',
          
          // Checkout flows
          '/checkout/',
          '/payment/',
          
          // Query strings (catch-all)
          '/*?',
          
          // Internal/test pages
          '/usermanagement',
          '/approvals',
          '/file-manager',
          '/test-images',
          '/cache-diagnostic',
          '/sentry-test',
          '/onboarding/',
          '/demo/',
          '/demos/',
          '/preview/',
          '/builder/',
          
          // Account and settings
          '/account/',
          '/settings/',
          '/profile/',
          '/messages/',
          
          // Application flows
          '/apply/',
          '/enroll/',
          '/intake/',
          '/eligibility/',
          
          // Success/thank you pages
          '/success/',
          '/thankyou/',
          '/application-success',
        ],
      },
    ],
    sitemap: 'https://www.elevateforhumanity.org/sitemap.xml',
  };
}
