import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/lms/profile',
          '/lms/messages',
          '/lms/notifications',
          '/_next/',
          '/private/',
        ],
      },
    ],
    sitemap: 'https://elevateconnectsdirectory.org/sitemap.xml',
  };
}
