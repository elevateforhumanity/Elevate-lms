import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.elevateforhumanity.org/', priority: 1 },
    { url: 'https://www.elevateforhumanity.org/apply', priority: 0.9 },
    { url: 'https://www.elevateforhumanity.org/programs', priority: 0.9 },
    { url: 'https://www.elevateforhumanity.org/programs/cna', priority: 0.8 },
    { url: 'https://www.elevateforhumanity.org/programs/cdl-transportation', priority: 0.8 },
    { url: 'https://www.elevateforhumanity.org/programs/barber-apprenticeship', priority: 0.8 },
    { url: 'https://www.elevateforhumanity.org/programs/healthcare', priority: 0.8 },
    { url: 'https://www.elevateforhumanity.org/programs/skilled-trades', priority: 0.8 },
    { url: 'https://www.elevateforhumanity.org/programs/technology', priority: 0.8 },
    { url: 'https://www.elevateforhumanity.org/updates', priority: 0.6 },
    { url: 'https://www.elevateforhumanity.org/updates/2026/01/program-calendar', priority: 0.6 },
    { url: 'https://www.elevateforhumanity.org/about', priority: 0.7 },
    { url: 'https://www.elevateforhumanity.org/contact', priority: 0.7 },
    { url: 'https://www.elevateforhumanity.org/funding', priority: 0.7 },
    { url: 'https://www.elevateforhumanity.org/employer', priority: 0.7 },
  ];
}

// Legacy sitemap code removed - keeping only .org URLs
const legacySitemap = `
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

`;
