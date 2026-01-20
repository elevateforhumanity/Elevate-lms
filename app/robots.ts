import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Admin and portal pages
          '/admin/',
          '/admin-login',
          '/api/',
          '/staff-portal/',
          '/program-holder/',
          '/workforce-board/',
          '/instructor/',
          '/creator/',
          '/employee/',
          '/shop/',
          '/lms/(app)/',
          '/programs/admin/',
          
          // Employer dashboard pages
          '/employer/dashboard',
          '/employer/analytics',
          '/employer/candidates',
          '/employer/compliance',
          '/employer/documents',
          '/employer/jobs',
          '/employer/opportunities',
          '/employer/placements',
          '/employer/postings',
          '/employer/reports',
          '/employer/settings',
          '/employer/verification',
          
          // Checkout and payment
          '/checkout/',
          '/payment/',
          
          // Auth and verification
          '/reset/',
          '/verify-email',
          '/verify-identity',
          '/auth/',
          
          // Internal tools
          '/usermanagement',
          '/approvals',
          '/messages',
          '/chat',
          '/cm',
          '/analytics',
          '/reports',
          '/metrics',
          '/leaderboard',
          '/file-manager',
          '/curriculumupload',
          '/documents/upload',
          
          // System pages (NOT /_next/ - crawlers need it for JS/CSS)
          '/test-images',
          '/cache-diagnostic',
          '/sentry-test',
          
          // Redirect pages (prevent duplicate content)
          '/license',
          '/donations',
          '/onboarding/',
          '/apprentice/',
        ],
      },
    ],
    sitemap: 'https://www.elevateforhumanity.org/sitemap.xml',
  };
}
