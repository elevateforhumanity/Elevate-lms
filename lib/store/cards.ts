/**
 * Store Landing Card Configuration
 * Centralized taxonomy for consistent card ordering across devices
 */

export interface StoreCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  image: string;
  icon: 'shopping-bag' | 'graduation-cap' | 'book-open' | 'server' | 'credit-card' | 'settings' | 'users' | 'file-text';
  tourId: string; // data-tour attribute value
  tier: 'primary' | 'secondary';
  order: number;
  tourDescription: string; // What the tour says about this card
}

// Tier 1: Primary cards (above the fold, max 5)
export const primaryCards: StoreCard[] = [
  {
    id: 'shop',
    title: 'Shop Gear',
    subtitle: 'Tools, Equipment & Apparel',
    description: 'Professional tools, equipment, scrubs, and study materials for your training programs.',
    href: '/shop',
    image: '/images/programs-hq/hvac-technician.jpg',
    icon: 'shopping-bag',
    tourId: 'store-card-shop',
    tier: 'primary',
    order: 1,
    tourDescription: 'Shop for professional tools, equipment, and apparel. Perfect for students in trades, healthcare, and technical programs.',
  },
  {
    id: 'marketplace',
    title: 'Courses Marketplace',
    subtitle: 'Expert-Created Training',
    description: 'Discover courses from expert creators in trades, healthcare, technology, and business.',
    href: '/marketplace',
    image: '/images/programs-hq/technology-hero.jpg',
    icon: 'graduation-cap',
    tourId: 'store-card-marketplace',
    tier: 'primary',
    order: 2,
    tourDescription: 'Browse courses created by industry experts. Find training in welding, medical coding, cybersecurity, and more.',
  },
  {
    id: 'workbooks',
    title: 'Workbooks & Downloads',
    subtitle: 'Study Materials & Guides',
    description: 'Download workbooks, study guides, and course materials for all programs.',
    href: '/workbooks',
    image: '/images/programs-hq/business-office.jpg',
    icon: 'book-open',
    tourId: 'store-card-workbooks',
    tier: 'primary',
    order: 3,
    tourDescription: 'Access free downloadable workbooks and study guides for enrolled students. Print-ready PDFs for all programs.',
  },
  {
    id: 'licenses',
    title: 'Platform Licenses',
    subtitle: 'LMS & Workforce Solutions',
    description: 'Full workforce platform with LMS, admin dashboard, enrollment, and compliance tools.',
    href: '/store/licenses',
    image: '/images/programs-hq/it-support.jpg',
    icon: 'server',
    tourId: 'store-card-licenses',
    tier: 'primary',
    order: 4,
    tourDescription: 'License our complete workforce platform for your organization. Includes LMS, admin tools, compliance, and white-label options.',
  },
  {
    id: 'pricing',
    title: 'Plans & Pricing',
    subtitle: 'Subscriptions & Checkout',
    description: 'View pricing plans, manage subscriptions, and complete purchases.',
    href: '/store/subscriptions',
    image: '/images/team-hq/team-meeting.jpg',
    icon: 'credit-card',
    tourId: 'store-card-pricing',
    tier: 'primary',
    order: 5,
    tourDescription: 'Compare pricing plans and subscription options. Find the right tier for individuals, schools, or enterprises.',
  },
];

// Tier 2: Secondary cards (below divider)
export const secondaryCards: StoreCard[] = [
  {
    id: 'compliance',
    title: 'Compliance Tools',
    subtitle: 'WIOA, FERPA, WCAG',
    description: 'Compliance checklists, templates, and automated reporting tools.',
    href: '/store/compliance',
    image: '/images/heroes-hq/funding-hero.jpg',
    icon: 'file-text',
    tourId: 'store-card-compliance',
    tier: 'secondary',
    order: 6,
    tourDescription: 'Access WIOA, FERPA, and WCAG compliance tools for workforce programs.',
  },
  {
    id: 'ai-studio',
    title: 'AI & Automation',
    subtitle: 'AI Tutor & Workflows',
    description: 'AI-powered tutoring, automation tools, and intelligent workflows.',
    href: '/store/ai-studio',
    image: '/images/programs-hq/cybersecurity.jpg',
    icon: 'settings',
    tourId: 'store-card-ai',
    tier: 'secondary',
    order: 7,
    tourDescription: 'Explore AI-powered tutoring and automation tools for enhanced learning.',
  },
  {
    id: 'programs',
    title: 'Training Programs',
    subtitle: 'Career-Ready Training',
    description: 'Enroll in WIOA-eligible training programs with job placement support.',
    href: '/programs',
    image: '/images/programs-hq/barber-hero.jpg',
    icon: 'users',
    tourId: 'store-card-programs',
    tier: 'secondary',
    order: 8,
    tourDescription: 'Browse career training programs including Barber, CNA, HVAC, and CDL.',
  },
  {
    id: 'digital',
    title: 'Digital Resources',
    subtitle: 'Toolkits & Templates',
    description: 'Business toolkits, grant guides, and digital templates.',
    href: '/store/digital',
    image: '/images/programs-hq/healthcare-hero.jpg',
    icon: 'file-text',
    tourId: 'store-card-digital',
    tier: 'secondary',
    order: 9,
    tourDescription: 'Download business toolkits, grant writing guides, and professional templates.',
  },
];

// Combined and sorted
export const allStoreCards = [...primaryCards, ...secondaryCards].sort((a, b) => a.order - b.order);

// Helper to get card by ID
export function getStoreCard(id: string): StoreCard | undefined {
  return allStoreCards.find(card => card.id === id);
}

// Tour steps derived from cards
export const storeTourSteps = primaryCards.map(card => ({
  target: `[data-tour="${card.tourId}"]`,
  title: card.title,
  content: card.tourDescription,
  placement: 'bottom' as const,
}));
