import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.elevateforhumanity.org';

/**
 * FIRST-WAVE EXPANDED INDEXING
 * 
 * Only pages explicitly approved are indexed.
 * Everything else is excluded.
 * 
 * Indexing gates (all must pass):
 * 1. Public – no auth required
 * 2. Stable – content does not change per user
 * 3. Complete – no empty sections, no placeholders
 * 4. Canonical – one clean URL, no params
 * 5. Evergreen – valid for 6+ months
 * 6. Governed – aligned with authoritative documents
 */

// WAVE 1: Explicitly approved pages for indexing
const APPROVED_PAGES: Array<{
  url: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  category: 'core' | 'tax' | 'lms' | 'resources' | 'store';
}> = [
  // A. CORE MARKETING & TRUST (Priority 1)
  { url: '/', priority: 1.0, changeFrequency: 'daily', category: 'core' },
  { url: '/about', priority: 0.9, changeFrequency: 'monthly', category: 'core' },
  { url: '/how-it-works', priority: 0.9, changeFrequency: 'monthly', category: 'core' },
  { url: '/contact', priority: 0.8, changeFrequency: 'monthly', category: 'core' },
  { url: '/support', priority: 0.7, changeFrequency: 'monthly', category: 'core' },
  { url: '/governance', priority: 0.8, changeFrequency: 'monthly', category: 'core' },
  { url: '/governance/authoritative-docs', priority: 0.8, changeFrequency: 'monthly', category: 'core' },
  { url: '/governance/security', priority: 0.8, changeFrequency: 'monthly', category: 'core' },
  { url: '/governance/compliance', priority: 0.8, changeFrequency: 'monthly', category: 'core' },
  { url: '/governance/seo-indexing', priority: 0.7, changeFrequency: 'monthly', category: 'core' },
  { url: '/governance/operational-controls', priority: 0.7, changeFrequency: 'monthly', category: 'core' },
  { url: '/governance/contact', priority: 0.7, changeFrequency: 'monthly', category: 'core' },
  { url: '/privacy', priority: 0.6, changeFrequency: 'yearly', category: 'core' },
  { url: '/privacy-policy', priority: 0.6, changeFrequency: 'yearly', category: 'core' },
  { url: '/terms', priority: 0.6, changeFrequency: 'yearly', category: 'core' },
  { url: '/terms-of-service', priority: 0.6, changeFrequency: 'yearly', category: 'core' },
  { url: '/accessibility', priority: 0.6, changeFrequency: 'yearly', category: 'core' },
  
  // B. SUPERSONIC FAST CASH / TAX (Public informational only)
  { url: '/supersonic-fast-cash', priority: 0.9, changeFrequency: 'monthly', category: 'tax' },
  { url: '/tax-self-prep', priority: 0.8, changeFrequency: 'monthly', category: 'tax' },
  { url: '/vita', priority: 0.8, changeFrequency: 'monthly', category: 'tax' },
  // Tax State Pages (supersonicfastermoney.com)
  { url: '/supersonic-fast-cash/tax-preparation-indiana', priority: 0.8, changeFrequency: 'monthly', category: 'tax' },
  { url: '/supersonic-fast-cash/tax-preparation-ohio', priority: 0.8, changeFrequency: 'monthly', category: 'tax' },
  { url: '/supersonic-fast-cash/tax-preparation-tennessee', priority: 0.8, changeFrequency: 'monthly', category: 'tax' },
  { url: '/supersonic-fast-cash/tax-preparation-illinois', priority: 0.8, changeFrequency: 'monthly', category: 'tax' },
  { url: '/supersonic-fast-cash/tax-preparation-texas', priority: 0.8, changeFrequency: 'monthly', category: 'tax' },
  
  // C. PROGRAMS (Public overviews)
  { url: '/programs', priority: 0.9, changeFrequency: 'weekly', category: 'lms' },
  { url: '/programs/healthcare', priority: 0.8, changeFrequency: 'monthly', category: 'lms' },
  { url: '/programs/skilled-trades', priority: 0.8, changeFrequency: 'monthly', category: 'lms' },
  { url: '/programs/technology', priority: 0.8, changeFrequency: 'monthly', category: 'lms' },
  { url: '/programs/business', priority: 0.8, changeFrequency: 'monthly', category: 'lms' },
  { url: '/apprenticeships', priority: 0.8, changeFrequency: 'monthly', category: 'lms' },
  { url: '/apply', priority: 0.9, changeFrequency: 'monthly', category: 'lms' },
  
  // D. LMS PUBLIC (Non-instructional)
  { url: '/lms', priority: 0.7, changeFrequency: 'monthly', category: 'lms' },
  // Career Training State Pages (elevateforhumanity.org)
  { url: '/career-training-indiana', priority: 0.8, changeFrequency: 'monthly', category: 'lms' },
  { url: '/career-training-ohio', priority: 0.8, changeFrequency: 'monthly', category: 'lms' },
  { url: '/career-training-tennessee', priority: 0.8, changeFrequency: 'monthly', category: 'lms' },
  { url: '/career-training-illinois', priority: 0.8, changeFrequency: 'monthly', category: 'lms' },
  { url: '/career-training-texas', priority: 0.8, changeFrequency: 'monthly', category: 'lms' },
  
  // E. RESOURCES / KNOWLEDGE
  { url: '/faq', priority: 0.7, changeFrequency: 'monthly', category: 'resources' },
  { url: '/wioa-eligibility', priority: 0.8, changeFrequency: 'monthly', category: 'resources' },
  { url: '/funding', priority: 0.7, changeFrequency: 'monthly', category: 'resources' },
  { url: '/tuition-fees', priority: 0.7, changeFrequency: 'monthly', category: 'resources' },
  { url: '/outcomes', priority: 0.7, changeFrequency: 'monthly', category: 'resources' },
  { url: '/career-services', priority: 0.7, changeFrequency: 'monthly', category: 'resources' },
  { url: '/certifications', priority: 0.7, changeFrequency: 'monthly', category: 'resources' },
  { url: '/success-stories', priority: 0.7, changeFrequency: 'monthly', category: 'resources' },
  
  // F. STORE (Limited, safe)
  { url: '/store', priority: 0.8, changeFrequency: 'weekly', category: 'store' },
  { url: '/store/licenses', priority: 0.7, changeFrequency: 'monthly', category: 'store' },
  { url: '/white-label', priority: 0.7, changeFrequency: 'monthly', category: 'store' },
  
  // G. EMPLOYERS
  { url: '/employers', priority: 0.8, changeFrequency: 'monthly', category: 'core' },
  { url: '/hire-graduates', priority: 0.7, changeFrequency: 'monthly', category: 'core' },
  { url: '/partners', priority: 0.7, changeFrequency: 'monthly', category: 'core' },
  { url: '/ojt-and-funding', priority: 0.7, changeFrequency: 'monthly', category: 'core' },
  
  // H. ABOUT PAGES
  { url: '/about/mission', priority: 0.7, changeFrequency: 'yearly', category: 'core' },
  { url: '/about/team', priority: 0.7, changeFrequency: 'monthly', category: 'core' },
  { url: '/about/partners', priority: 0.7, changeFrequency: 'monthly', category: 'core' },
  { url: '/team', priority: 0.7, changeFrequency: 'monthly', category: 'core' },
  { url: '/locations', priority: 0.7, changeFrequency: 'monthly', category: 'core' },
  { url: '/impact', priority: 0.7, changeFrequency: 'monthly', category: 'core' },
  { url: '/careers', priority: 0.6, changeFrequency: 'weekly', category: 'core' },
  
  // I. BLOG / NEWS (if content-complete)
  { url: '/blog', priority: 0.6, changeFrequency: 'weekly', category: 'resources' },
  { url: '/news', priority: 0.6, changeFrequency: 'weekly', category: 'resources' },
  { url: '/events', priority: 0.6, changeFrequency: 'weekly', category: 'resources' },
];

/**
 * Generate sitemap from explicitly approved pages only
 * 
 * This is a whitelist approach, not a blacklist.
 * Only pages in APPROVED_PAGES are included.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  
  // Generate sitemap entries from approved pages only
  const entries: MetadataRoute.Sitemap = APPROVED_PAGES.map(page => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
  
  return entries;
}

/**
 * Get approved pages by category (for split sitemaps if needed)
 */
export function getApprovedPagesByCategory(category: 'core' | 'tax' | 'lms' | 'resources' | 'store') {
  return APPROVED_PAGES.filter(page => page.category === category);
}

/**
 * Check if a URL is approved for indexing
 */
export function isApprovedForIndexing(url: string): boolean {
  const path = url.replace(BASE_URL, '');
  return APPROVED_PAGES.some(page => page.url === path);
}
