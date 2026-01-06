import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://elevateforhumanity.institute';
  const isProduction = process.env.VERCEL_ENV === 'production';
  
  // Also check if we're on a vercel.app domain (preview)
  const isVercelPreview = typeof window === 'undefined' && 
    (process.env.VERCEL_URL?.includes('.vercel.app') || false);

  // Block all crawling on preview/development environments
  if (!isProduction || isVercelPreview) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  // Production robots.txt
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
