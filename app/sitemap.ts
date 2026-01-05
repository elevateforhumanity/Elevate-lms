import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.elevateforhumanity.org';
  const currentDate = new Date();

  // Static pages - deduplicated
  const routes = [
    '',
    '/about',
    '/hub',
    '/programs',
    '/apply',
    '/contact',
    '/blog',
    '/privacy-policy',
    '/terms-of-service',
    '/apprenticeships',
    '/employer',
    '/volunteer',

    // Businesses
    '/supersonic-fast-cash',
    '/kingdom-konnect',
    '/serene-comfort-care',
    '/urban-build-crew',
    '/selfish-inc',
    '/rise-foundation',

    // Services
    '/career-services',
    '/advising',
    '/mentorship',
    '/tax',
    '/drug-testing',
    '/support',
    '/marketplace',
    '/booking',

    // Employers
    '/hire-graduates',
    '/ojt-and-funding',
    '/industries',
    '/workforce-partners',

    // Resources
    '/docs',
    '/downloads',
    '/forms',
    '/grants',
    '/search',

    // Partnerships
    '/partners',
    '/snap-et-partner',
    '/fssa-partnership-request',
    '/workone-partner-packet',
    '/jri',
    '/franchise',
    '/white-label',

    // Community
    '/forums',
    '/events',
    '/webinars',
    '/reels',
    '/success-stories',

    // Features
    '/courses',
    '/certificates',
    '/credentials',
    '/pathways',

    // AI Features
    '/ai',
    '/ai-chat',
    '/ai-studio',
    '/ai-tutor',

    // Marketplace - removed duplicates
    '/shop',
    '/store',
    '/checkout',
    '/banking',

    // Learning
    '/lessons',
    '/syllabi',
    '/workbooks',
    '/orientation',
    '/student-handbook',
  ];

  // Deduplicate routes
  const uniqueRoutes = [...new Set(routes)];

  const staticPages = uniqueRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route === '/hub' ? 0.9 : 0.8,
  }));

  // Program pages
  const programs = [
    'medical-assistant',
    'hvac',
    'cdl-transportation',
    'barber-apprenticeship',
    'building-maintenance',
    'cna',
    'business-financial',
    'tax-preparation',
  ].map((program: any) => ({
    url: `${baseUrl}/programs/${program}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...programs];
}
