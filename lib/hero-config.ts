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
// TOP 10 PRIORITY PAGES - these get migrated first
export const PAGE_HEROES: Record<string, PageHeroConfig> = {
  
  // ============================================
  // PRIORITY 1: Homepage
  // ============================================
  '/': {
    title: 'Free Career Training That Changes Lives',
    subtitle: 'WIOA-funded workforce programs in healthcare, skilled trades, and technology. No cost if you qualify.',
    image: '/images/heroes/marketing-homepage.jpg',
    variant: 'full',
    height: 'full',
    ctaPrimary: { label: 'Find a Program', href: '/programs' },
    ctaSecondary: { label: 'For Partners', href: '/partner' },
  },
  
  // ============================================
  // PRIORITY 2: Programs Index
  // ============================================
  '/programs': {
    title: 'Career Training Programs',
    subtitle: 'Industry-recognized certifications in high-demand fields. Free for eligible participants.',
    image: '/images/heroes/marketing-programs-index.jpg',
    variant: 'split',
    height: 'medium',
    ctaPrimary: { label: 'Check Eligibility', href: '/wioa-eligibility' },
    ctaSecondary: { label: 'View All Programs', href: '#programs' },
  },
  
  // ============================================
  // PRIORITY 3-7: Top 5 Programs
  // ============================================
  
  // Barber Apprenticeship
  '/programs/barber-apprenticeship': {
    title: 'Barber Apprenticeship Program',
    subtitle: 'Become a licensed barber through our USDOL-registered apprenticeship. Earn while you learn.',
    image: '/images/heroes/program-apprenticeship-barber.jpg',
    variant: 'split',
    height: 'medium',
    badge: 'USDOL Registered',
    metadata: [
      { label: 'Duration', value: '1,500 hours' },
      { label: 'Format', value: 'In-Shop Training' },
      { label: 'Cost', value: 'Free if eligible' },
    ],
    ctaPrimary: { label: 'Apply Now', href: '/programs/barber-apprenticeship/apply' },
    ctaSecondary: { label: 'Find a Host Shop', href: '/programs/barber-apprenticeship/host-shops' },
  },
  
  // CNA Certification
  '/programs/cna': {
    title: 'CNA Certification Training',
    subtitle: 'Become a Certified Nursing Assistant in 4-6 weeks. High-demand healthcare career.',
    image: '/images/heroes/program-healthcare-cna.jpg',
    variant: 'split',
    height: 'medium',
    badge: 'WIOA Funded',
    metadata: [
      { label: 'Duration', value: '4-6 weeks' },
      { label: 'Format', value: 'Hybrid' },
      { label: 'Cost', value: 'Free if eligible' },
    ],
    ctaPrimary: { label: 'Apply Now', href: '/apply?program=cna' },
    ctaSecondary: { label: 'Check Eligibility', href: '/wioa-eligibility' },
  },
  
  // Esthetician Apprenticeship
  '/programs/esthetician-apprenticeship': {
    title: 'Esthetician Apprenticeship',
    subtitle: 'Launch your skincare career through hands-on apprenticeship training.',
    image: '/images/heroes/program-apprenticeship-esthetician.jpg',
    variant: 'split',
    height: 'medium',
    badge: 'State Approved',
    metadata: [
      { label: 'Duration', value: '700 hours' },
      { label: 'Format', value: 'In-Salon Training' },
      { label: 'Cost', value: 'Free if eligible' },
    ],
    ctaPrimary: { label: 'Apply Now', href: '/apply?program=esthetician' },
    ctaSecondary: { label: 'Learn More', href: '#program-details' },
  },
  
  // CDL Training
  '/programs/cdl': {
    title: 'CDL Training Program',
    subtitle: 'Get your Commercial Driver\'s License and start a career in transportation.',
    image: '/images/heroes/program-trades-cdl.jpg',
    variant: 'split',
    height: 'medium',
    badge: 'ELDT Certified',
    metadata: [
      { label: 'Duration', value: '3-4 weeks' },
      { label: 'Format', value: 'In-Person' },
      { label: 'Cost', value: 'Free if eligible' },
    ],
    ctaPrimary: { label: 'Apply Now', href: '/apply?program=cdl' },
    ctaSecondary: { label: 'Check Eligibility', href: '/wioa-eligibility' },
  },
  
  // IT Support
  '/programs/technology/it-support': {
    title: 'IT Support Training',
    subtitle: 'CompTIA A+ certification training. Launch your career in technology.',
    image: '/images/heroes/program-technology-it-support.jpg',
    variant: 'split',
    height: 'medium',
    badge: 'CompTIA Partner',
    metadata: [
      { label: 'Duration', value: '8-12 weeks' },
      { label: 'Format', value: 'Hybrid' },
      { label: 'Certification', value: 'CompTIA A+' },
    ],
    ctaPrimary: { label: 'Apply Now', href: '/apply?program=it-support' },
    ctaSecondary: { label: 'Check Eligibility', href: '/wioa-eligibility' },
  },
  
  // ============================================
  // PRIORITY 8: Apply/Enrollment
  // ============================================
  '/apply': {
    title: 'Start Your Application',
    subtitle: 'Take the first step toward a new career. Our team will guide you through the process.',
    image: '/images/heroes/marketing-apply.jpg',
    variant: 'split',
    height: 'medium',
    badge: 'Free Training Available',
    ctaPrimary: { label: 'Begin Application', href: '#application-form' },
  },
  
  // ============================================
  // PRIORITY 9: Enterprise/Licensing
  // ============================================
  '/store/licenses': {
    title: 'Enterprise Licensing',
    subtitle: 'Deploy the Elevate LMS platform for your organization. Managed infrastructure, your brand.',
    image: '/images/heroes/enterprise-licensing.jpg',
    variant: 'illustration',
    height: 'medium',
    ctaPrimary: { label: 'View Plans', href: '/store/licenses/managed' },
    ctaSecondary: { label: 'Contact Sales', href: '/contact' },
  },
  
  // ============================================
  // PRIORITY 10: Student Portal (LMS)
  // ============================================
  '/student-portal': {
    title: 'Student Portal',
    subtitle: 'Access your courses, track progress, and manage your training journey.',
    image: '/images/heroes/lms-student-portal.jpg',
    variant: 'split',
    height: 'compact',
  },
  
  // ============================================
  // ADDITIONAL KEY PAGES
  // ============================================
  
  // About
  '/about': {
    title: 'About Elevate for Humanity',
    subtitle: 'Breaking the cycle of poverty through free workforce training since 2020.',
    image: '/images/heroes/marketing-about.jpg',
    variant: 'split',
    height: 'medium',
    ctaPrimary: { label: 'Our Mission', href: '/about/mission' },
    ctaSecondary: { label: 'Meet the Team', href: '/about/team' },
  },
  
  // Contact
  '/contact': {
    title: 'Contact Us',
    subtitle: 'Questions about programs, enrollment, or partnerships? We\'re here to help.',
    image: '/images/heroes/marketing-contact.jpg',
    variant: 'split',
    height: 'medium',
    ctaPrimary: { label: 'Call Now', href: 'tel:3173143757' },
  },
  
  // Testimonials
  '/testimonials': {
    title: 'Success Stories',
    subtitle: 'Real graduates. Real careers. Real impact.',
    image: '/images/heroes/marketing-testimonials.jpg',
    variant: 'split',
    height: 'medium',
    ctaPrimary: { label: 'Start Your Journey', href: '/apply' },
  },
  
  // FERPA (Governance)
  '/policies/ferpa': {
    title: 'FERPA Privacy Policy',
    subtitle: 'How we protect student education records under federal law.',
    image: '/images/heroes/governance-ferpa.jpg',
    variant: 'illustration',
    height: 'compact',
  },
  
  // Privacy Policy (Governance)
  '/privacy': {
    title: 'Privacy Policy',
    subtitle: 'How we collect, use, and protect your information.',
    image: '/images/heroes/governance-privacy.jpg',
    variant: 'illustration',
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
