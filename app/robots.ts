import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.elevateforhumanity.org';
  const isProduction = process.env.VERCEL_ENV === 'production';

  // Block all crawling on preview/development environments
  if (!isProduction) {
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
