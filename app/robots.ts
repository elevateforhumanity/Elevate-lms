import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://elevateforhumanity.institute';
  
  // Check if we're on a vercel.app preview domain
  // VERCEL_URL is set on all Vercel deployments, so check if it contains .vercel.app
  const vercelUrl = process.env.VERCEL_URL || '';
  const isVercelPreview = vercelUrl.includes('.vercel.app');

  // Block all crawling ONLY on preview/development environments
  if (isVercelPreview) {
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
