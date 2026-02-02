/**
 * Hero Configuration System
 * 
 * Rules:
 * 1. Every page MUST have a hero
 * 2. No gradient overlays - ever
 * 3. Images are category-owned, not page-owned
 * 4. Three variants only: full, split, illustration
 */

import type { HeroVariant, HeroHeight, HeroCTA } from '@/components/ui/HeroSection';

// Category-based hero image assignments
// Same category = same visual family, different specific images
export const HERO_IMAGES = {
  // Healthcare family
  healthcare: {
    cna: '/images/heroes/cna-training.jpg',
    medicalAssistant: '/images/heroes/medical-assistant.jpg',
    phlebotomy: '/images/heroes/phlebotomy.jpg',
    cprFirstAid: '/images/heroes/cpr-first-aid.jpg',
    drugCollector: '/images/heroes/drug-collector.jpg',
    dsp: '/images/heroes/direct-support.jpg',
  },
  
  // Trades family
  trades: {
    hvac: '/images/heroes/hvac-training.jpg',
    cdl: '/images/heroes/cdl-training.jpg',
    welding: '/images/heroes/welding.jpg',
    electrical: '/images/heroes/electrical.jpg',
    plumbing: '/images/heroes/plumbing.jpg',
    diesel: '/images/heroes/diesel-mechanic.jpg',
  },
  
  // Beauty/Apprenticeship family
  apprenticeship: {
    barber: '/images/heroes/barber-apprenticeship.jpg',
    cosmetology: '/images/heroes/cosmetology.jpg',
    esthetician: '/images/heroes/esthetician.jpg',
    nailTech: '/images/heroes/nail-technician.jpg',
  },
  
  // Technology family
  technology: {
    itSupport: '/images/heroes/it-support.jpg',
    cybersecurity: '/images/heroes/cybersecurity.jpg',
    webDev: '/images/heroes/web-development.jpg',
  },
  
  // Business family
  business: {
    taxPrep: '/images/heroes/tax-preparation.jpg',
    entrepreneurship: '/images/heroes/entrepreneurship.jpg',
    businessAdmin: '/images/heroes/business-admin.jpg',
  },
  
  // Enterprise/Licensing family
  enterprise: {
    licensing: '/images/heroes/enterprise-licensing.jpg',
    whiteLabel: '/images/heroes/white-label.jpg',
    partners: '/images/heroes/partners.jpg',
    government: '/images/heroes/government.jpg',
  },
  
  // Marketing/General
  marketing: {
    homepage: '/images/heroes/homepage-hero.jpg',
    programs: '/images/heroes/programs-index.jpg',
    about: '/images/heroes/about-mission.jpg',
    careers: '/images/heroes/careers.jpg',
    contact: '/images/heroes/contact.jpg',
  },
  
  // LMS/Portal (use screenshots/UI imagery)
  lms: {
    studentPortal: '/images/heroes/student-portal.jpg',
    dashboard: '/images/heroes/dashboard.jpg',
    courses: '/images/heroes/courses.jpg',
  },
  
  // Governance/Policy (use illustrations/diagrams)
  governance: {
    privacy: '/images/heroes/privacy-policy.jpg',
    terms: '/images/heroes/terms.jpg',
    ferpa: '/images/heroes/ferpa.jpg',
    accessibility: '/images/heroes/accessibility.jpg',
  },
} as const;

// Page-specific hero configurations
export interface PageHeroConfig {
  title: string;
  subtitle?: string;
  image: string;
  variant: HeroVariant;
  height?: HeroHeight;
  badge?: string;
  ctaPrimary?: HeroCTA;
  ctaSecondary?: HeroCTA;
  metadata?: Array<{ label: string; value: string }>;
}

// Pre-defined hero configs for key pages
export const PAGE_HEROES: Record<string, PageHeroConfig> = {
  // Homepage
  '/': {
    title: 'Free Career Training That Changes Lives',
    subtitle: 'WIOA-funded workforce programs in healthcare, skilled trades, and technology. No cost if you qualify.',
    image: HERO_IMAGES.marketing.homepage,
    variant: 'full',
    height: 'full',
    ctaPrimary: { label: 'Find a Program', href: '/programs' },
    ctaSecondary: { label: 'For Partners', href: '/partner' },
  },
  
  // Programs index
  '/programs': {
    title: 'Career Training Programs',
    subtitle: 'Industry-recognized certifications in high-demand fields. Free for eligible participants.',
    image: HERO_IMAGES.marketing.programs,
    variant: 'split',
    height: 'medium',
    ctaPrimary: { label: 'Check Eligibility', href: '/wioa-eligibility' },
  },
  
  // Apply/Enroll
  '/apply': {
    title: 'Start Your Application',
    subtitle: 'Take the first step toward a new career. Our team will guide you through the process.',
    image: HERO_IMAGES.marketing.contact,
    variant: 'split',
    height: 'medium',
    badge: 'Free Training Available',
  },
  
  // Licensing/Enterprise
  '/store/licenses': {
    title: 'Enterprise Licensing',
    subtitle: 'Deploy the Elevate LMS platform for your organization. Managed infrastructure, your brand.',
    image: HERO_IMAGES.enterprise.licensing,
    variant: 'illustration',
    height: 'medium',
    ctaPrimary: { label: 'View Plans', href: '/store/licenses/managed' },
    ctaSecondary: { label: 'Contact Sales', href: '/contact' },
  },
  
  // Student Portal
  '/student-portal': {
    title: 'Student Portal',
    subtitle: 'Access your courses, track progress, and manage your training journey.',
    image: HERO_IMAGES.lms.studentPortal,
    variant: 'split',
    height: 'compact',
  },
};

// Helper to get hero config for a page
export function getHeroConfig(pathname: string): PageHeroConfig | null {
  return PAGE_HEROES[pathname] || null;
}

// Helper to get category image
export function getCategoryImage(
  category: keyof typeof HERO_IMAGES,
  subcategory: string
): string {
  const categoryImages = HERO_IMAGES[category];
  if (categoryImages && subcategory in categoryImages) {
    return categoryImages[subcategory as keyof typeof categoryImages];
  }
  // Fallback to a default
  return HERO_IMAGES.marketing.programs;
}
