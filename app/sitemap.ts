import { MetadataRoute } from 'next';
import { videos } from '@/lms-data/videos';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.elevateforhumanity.org';
  const currentDate = new Date();

  // ONLY pages that exist and return 200 - verified working pages
  const publicPages = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/about/team', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/programs', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/apprenticeships', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/services', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/credentials', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/apply', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/blog', priority: 0.7, changeFrequency: 'daily' as const },
    { url: '/employer', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/rise-foundation', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/supersonic-fast-cash', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' as const },
    { url: '/terms-of-service', priority: 0.5, changeFrequency: 'yearly' as const },
    { url: '/accessibility', priority: 0.5, changeFrequency: 'yearly' as const },
    { url: '/careers', priority: 0.6, changeFrequency: 'monthly' as const },
  ];

  // Program pages that exist
  const programPages = [
    'cna',
    'cdl-transportation',
    'barber-apprenticeship',
    'tax-preparation',
    'direct-support-professional',
    'drug-collector',
    'healthcare',
    'skilled-trades',
    'technology',
    'business',
  ].map((program) => ({
    url: `/programs/${program}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  // Career services pages
  const careerPages = [
    '/career-services',
    '/career-services/job-placement',
    '/career-services/resume-building',
    '/career-services/interview-prep',
    '/career-services/career-counseling',
  ].map((url) => ({
    url,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  // Funding pages
  const fundingPages = [
    '/funding',
    '/funding/wioa',
    '/funding/wrg',
    '/funding/jri',
  ].map((url) => ({
    url,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  // Video pages
  const videoPages = [
    { url: '/videos', priority: 0.7, changeFrequency: 'weekly' as const },
    ...videos.map((video) => ({
      url: `/videos/${video.id}`,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    })),
  ];

  // Combine all pages
  const allPages = [
    ...publicPages,
    ...programPages,
    ...careerPages,
    ...fundingPages,
    ...videoPages,
  ];

  return allPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
