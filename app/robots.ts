import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://elevateforhumanity.institute';
  
  // ALWAYS allow crawling on production
  // Only block on preview deployments (VERCEL_ENV === 'preview')
  const vercelEnv = process.env.VERCEL_ENV;
  
  // Block ONLY if explicitly marked as preview
  if (vercelEnv === 'preview') {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  // Production robots.txt - allow all crawling
  // This will run for production AND development
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/lms/admin/',
          '/staff-portal/',
          '/program-holder/dashboard/',
          '/employer/dashboard/',
          '/_not-found',
          '/_next/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
