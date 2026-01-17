import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.elevateforhumanity.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  
  // High priority pages (1.0)
  const highPriority = [
    '/',
    '/apply',
    '/programs',
    '/funding',
    '/apprenticeships',
    '/start',
    '/employers',
  ];

  // Program pages (0.9)
  const programs = [
    '/programs/healthcare',
    '/programs/skilled-trades',
    '/programs/technology',
    '/programs/cna',
    '/programs/hvac',
    '/programs/cdl',
    '/programs/cdl-transportation',
    '/programs/barber',
    '/programs/barber-apprenticeship',
    '/programs/cosmetology-apprenticeship',
    '/programs/esthetician-apprenticeship',
    '/programs/nail-technician-apprenticeship',
    '/programs/beauty',
    '/programs/business',
    '/programs/business-financial',
    '/programs/direct-support-professional',
    '/programs/drug-collector',
    '/programs/federal-funded',
    '/programs/jri',
    '/programs/micro-programs',
    '/programs/tax-preparation',
    '/programs/tax-entrepreneurship',
    '/programs/technology/it-support',
    '/programs/technology/cybersecurity',
    '/programs/technology/web-development',
  ];

  // Important pages (0.8)
  const important = [
    '/about',
    '/about/team',
    '/contact',
    '/careers',
    '/employer',
    '/employers/apprenticeships',
    '/employers/benefits',
    '/employers/post-job',
    '/wioa-eligibility',
    '/wioa-eligibility/low-income',
    '/wioa-eligibility/public-assistance',
    '/wioa-eligibility/veterans',
    '/success-stories',
    '/faq',
    '/how-it-works',
    '/eligibility',
    '/certifications',
    '/credentials',
    '/training',
    '/training-providers',
    '/training/certifications',
    '/training/learning-center',
  ];

  // Funding pages (0.8)
  const funding = [
    '/funding/wioa',
    '/funding/jri',
    '/funding/dol',
    '/funding/federal-programs',
    '/funding/grant-programs',
    '/funding/how-it-works',
    '/funding/state-programs',
    '/funding/wrg',
    '/ojt-and-funding',
    '/grants',
  ];

  // Tax services (0.8)
  const tax = [
    '/tax',
    '/tax/free',
    '/tax/professional',
    '/tax/book-appointment',
    '/tax/volunteer',
    '/tax-self-prep',
    '/tax/rise-up-foundation',
    '/tax/rise-up-foundation/documents',
    '/tax/rise-up-foundation/faq',
    '/tax/rise-up-foundation/free-tax-help',
    '/tax/rise-up-foundation/site-locator',
    '/tax/rise-up-foundation/training',
    '/tax/rise-up-foundation/volunteer',
    '/tax/supersonicfastcash',
    '/tax/supersonicfastcash/documents',
    '/tax/supersonicfastcash/faq',
    '/tax/supersonicfastcash/pricing',
    '/tax/supersonicfastcash/services',
  ];

  // Supersonic Fast Cash (0.7)
  const supersonicFastCash = [
    '/supersonic-fast-cash',
    '/supersonic-fast-cash/apply',
    '/supersonic-fast-cash/book-appointment',
    '/supersonic-fast-cash/calculator',
    '/supersonic-fast-cash/careers',
    '/supersonic-fast-cash/careers/apply',
    '/supersonic-fast-cash/careers/training',
    '/supersonic-fast-cash/contact',
    '/supersonic-fast-cash/diy-taxes',
    '/supersonic-fast-cash/locations',
    '/supersonic-fast-cash/pricing',
    '/supersonic-fast-cash/services',
    '/supersonic-fast-cash/services/bookkeeping',
    '/supersonic-fast-cash/services/payroll',
    '/supersonic-fast-cash/services/tax-preparation',
    '/supersonic-fast-cash/tax-information',
    '/supersonic-fast-cash/training',
  ];

  // VITA pages (0.7)
  const vita = [
    '/vita',
    '/vita/about',
    '/vita/contact',
    '/vita/eligibility',
    '/vita/faq',
    '/vita/locations',
    '/vita/schedule',
    '/vita/volunteer',
    '/vita/what-to-bring',
  ];

  // Rise Foundation (0.7)
  const riseFoundation = [
    '/rise-foundation',
    '/rise-foundation/about',
    '/rise-foundation/addiction-rehabilitation',
    '/rise-foundation/divorce-support',
    '/rise-foundation/donate',
    '/rise-foundation/events',
    '/rise-foundation/get-involved',
    '/rise-foundation/programs',
    '/rise-foundation/trauma-recovery',
    '/rise',
  ];

  // Career services (0.7)
  const careerServices = [
    '/career-services',
    '/career-services/career-counseling',
    '/career-services/interview-prep',
    '/career-services/job-placement',
    '/career-services/networking-events',
    '/career-services/ongoing-support',
    '/career-services/resume-building',
    '/hire-graduates',
  ];

  // Courses (0.7)
  const courses = [
    '/courses',
    '/courses/catalog',
    '/courses/careersafe',
    '/courses/hsi',
    '/courses/nds',
    '/courses/nrf',
    '/courses/partners',
    '/lms',
  ];

  // Partners (0.6)
  const partners = [
    '/partners',
    '/partners/careersafe',
    '/partners/hsi',
    '/partners/join',
    '/partners/jri',
    '/partners/nrf',
    '/partners/reentry',
    '/partners/resources',
    '/partners/technology',
    '/partners/training',
    '/partners/training-provider',
    '/partners/workforce',
    '/workforce-partners',
  ];

  // Platform pages (0.6)
  const platform = [
    '/platform',
    '/platform/apps',
    '/platform/architecture',
    '/platform/employer-portal',
    '/platform/partner-portal',
    '/platform/student-portal',
    '/platform/training-providers',
    '/platform/workforce-analytics',
    '/platform/workforce-boards',
  ];

  // Solutions (0.6)
  const solutions = [
    '/solutions',
    '/solutions/distance-learning',
    '/solutions/higher-ed',
    '/solutions/k12',
  ];

  // Community (0.6)
  const community = [
    '/community',
    '/community/communityhub',
    '/community/developers',
    '/community/marketplace',
    '/community/teachers',
    '/mentorship',
    '/events',
    '/webinars',
  ];

  // Nonprofit (0.6)
  const nonprofit = [
    '/nonprofit',
    '/nonprofit/divorce-counseling',
    '/nonprofit/donations',
    '/nonprofit/healing-products',
    '/nonprofit/meet-the-founder',
    '/nonprofit/mental-wellness',
    '/nonprofit/workshops',
    '/nonprofit/young-adult-wellness',
    '/donate',
    '/philanthropy',
  ];

  // Pricing (0.6)
  const pricing = [
    '/pricing',
    '/pricing/independent',
    '/pricing/platform',
    '/pricing/program-holder',
    '/pricing/sponsor-licensing',
    '/store',
    '/marketplace',
  ];

  // Apply pages (0.7)
  const apply = [
    '/apply/student',
    '/apply/employer',
    '/apply/program-holder',
    '/apply/staff',
    '/apply/quick',
    '/getstarted',
    '/enroll',
  ];

  // Onboarding (0.5)
  const onboarding = [
    '/onboarding',
    '/onboarding/employer',
    '/onboarding/learner',
    '/onboarding/partner',
    '/onboarding/school',
    '/onboarding/staff',
    '/onboarding/handbook',
    '/onboarding/mou',
    '/orientation',
  ];

  // Legal/Policy pages (0.4)
  const legal = [
    '/privacy-policy',
    '/privacy',
    '/terms',
    '/terms-of-service',
    '/accessibility',
    '/cookies',
    '/copyright',
    '/dmca',
    '/refund-policy',
    '/equal-opportunity',
    '/federal-compliance',
    '/ferpa',
    '/academic-integrity',
    '/accreditation',
    '/compliance',
    '/consumer-education',
    '/grievance',
    '/security',
    '/transparency',
  ];

  // Policy pages (0.4)
  const policies = [
    '/policies/academic-integrity',
    '/policies/acceptable-use',
    '/policies/admissions',
    '/policies/ai-usage',
    '/policies/attendance',
    '/policies/community-guidelines',
    '/policies/content',
    '/policies/copyright',
    '/policies/credentials',
    '/policies/data-retention',
    '/policies/editorial',
    '/policies/federal-compliance',
    '/policies/ferpa',
    '/policies/funding-verification',
    '/policies/grant-application',
    '/policies/jri',
    '/policies/moderation',
    '/policies/privacy',
    '/policies/privacy-notice',
    '/policies/progress',
    '/policies/response-sla',
    '/policies/revocation',
    '/policies/sam-gov-eligibility',
    '/policies/student-code',
    '/policies/terms',
    '/policies/verification',
    '/policies/wioa',
    '/policies/wrg',
  ];

  // Other public pages (0.5)
  const other = [
    '/blog',
    '/news',
    '/updates',
    '/help',
    '/help/tutorials',
    '/support',
    '/support/contact',
    '/support/ticket',
    '/locations',
    '/directory',
    '/calendar',
    '/schedule',
    '/features',
    '/services',
    '/industries',
    '/industries/healthcare',
    '/pathways',
    '/impact',
    '/founder',
    '/team',
    '/what-we-do',
    '/what-we-offer',
    '/jri',
    '/licensing',
    '/licensing-partnerships',
    '/franchise',
    '/white-label',
    '/government',
    '/agencies',
    '/snap-et-partner',
    '/workone-partner-packet',
    '/student-handbook',
    '/student-portal',
    '/certificates',
    '/certificates/verify',
    '/verify-credential',
    '/videos',
    '/video',
    '/mobile',
    '/mobile-app',
    '/downloads',
    '/ecosystem',
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Add high priority
  highPriority.forEach(url => {
    entries.push({
      url: `${BASE_URL}${url === '/' ? '' : url}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    });
  });

  // Add programs
  programs.forEach(url => {
    entries.push({
      url: `${BASE_URL}${url}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // Add important pages
  [...important, ...funding, ...tax].forEach(url => {
    entries.push({
      url: `${BASE_URL}${url}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Add 0.7 priority pages
  [...supersonicFastCash, ...vita, ...riseFoundation, ...careerServices, ...courses, ...apply].forEach(url => {
    entries.push({
      url: `${BASE_URL}${url}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Add 0.6 priority pages
  [...partners, ...platform, ...solutions, ...community, ...nonprofit, ...pricing].forEach(url => {
    entries.push({
      url: `${BASE_URL}${url}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // Add 0.5 priority pages
  [...onboarding, ...other].forEach(url => {
    entries.push({
      url: `${BASE_URL}${url}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // Add legal/policy pages
  [...legal, ...policies].forEach(url => {
    entries.push({
      url: `${BASE_URL}${url}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    });
  });

  return entries;
}
