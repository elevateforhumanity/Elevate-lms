import { MetadataRoute } from 'next';

const BASE_URL = 'https://elevateforhumanity.institute';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, priority: 1, changeFrequency: 'daily' },
    { url: `${BASE_URL}/apply`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/programs`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/programs/cna`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/programs/cdl-transportation`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/programs/barber-apprenticeship`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/programs/healthcare`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/programs/skilled-trades`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/programs/business-financial`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/programs/tax-preparation`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/about`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/contact`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/funding`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/employer`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/wioa-eligibility`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/success-stories`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/faq`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/careers`, priority: 0.6, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/apprenticeships`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/support`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/privacy-policy`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/terms`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/accessibility`, priority: 0.5, changeFrequency: 'yearly' },
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
