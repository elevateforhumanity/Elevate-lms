import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://elevateforhumanity.institute';
  
  // Block ONLY on .vercel.app preview domains
  // Check both VERCEL_ENV and VERCEL_URL to be safe
  const vercelEnv = process.env.VERCEL_ENV;
  const vercelUrl = process.env.VERCEL_URL || '';
  
  // Only block if explicitly on preview OR if URL contains .vercel.app
  const isPreview = vercelEnv === 'preview' || vercelUrl.includes('.vercel.app');
  
  // IMPORTANT: Default to ALLOWING crawling for production/custom domains
  if (isPreview) {
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
