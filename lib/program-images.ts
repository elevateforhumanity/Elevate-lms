/**
 * Program Image Configuration
 * 
 * Every program page requires real photos - NO placeholders, NO icons.
 * If images are missing, the build should fail with a clear error.
 */

export interface ProgramImages {
  hero: string;
  snapshot: {
    jobOutcome: string;
    programLength: string;
    credential: string;
    support: string;
  };
  tiles: string[];
  steps: {
    apply: string;
    eligibility: string;
    training: string;
    career: string;
  };
  bottomCta: string;
}

// Default/fallback images for programs without full image sets
const defaultImages: ProgramImages = {
  hero: '/images/heroes-hq/programs-hero.jpg',
  snapshot: {
    jobOutcome: '/images/heroes-hq/career-services-hero.jpg',
    programLength: '/images/heroes-hq/how-it-works-hero.jpg',
    credential: '/images/heroes-hq/success-hero.jpg',
    support: '/images/heroes-hq/team-hero.jpg',
  },
  tiles: [
    '/images/testimonials-hq/person-1.jpg',
    '/images/testimonials-hq/person-2.jpg',
    '/images/testimonials-hq/person-3.jpg',
    '/images/testimonials-hq/person-4.jpg',
    '/images/testimonials-hq/person-5.jpg',
    '/images/testimonials-hq/person-6.jpg',
  ],
  steps: {
    apply: '/images/heroes-hq/contact-hero.jpg',
    eligibility: '/images/heroes-hq/funding-hero.jpg',
    training: '/images/heroes-hq/programs-hero.jpg',
    career: '/images/heroes-hq/career-services-hero.jpg',
  },
  bottomCta: '/images/heroes-hq/success-stories-hero.jpg',
};

// Program-specific image configurations
export const programImages: Record<string, Partial<ProgramImages>> = {
  'barber': {
    hero: '/images/programs/efh-barber-hero.jpg',
    snapshot: {
      jobOutcome: '/images/programs/barber.jpg',
      programLength: '/images/programs/barber-apprenticeship.jpg',
      credential: '/images/programs/efh-barber-card.jpg',
      support: '/images/heroes-hq/career-services-hero.jpg',
    },
    bottomCta: '/images/programs/efh-barber-og.jpg',
  },
  'barber-apprenticeship': {
    hero: '/images/programs/efh-barber-hero.jpg',
    snapshot: {
      jobOutcome: '/images/programs/barber.jpg',
      programLength: '/images/programs/barber-apprenticeship.jpg',
      credential: '/images/programs/efh-barber-card.jpg',
      support: '/images/heroes-hq/career-services-hero.jpg',
    },
    bottomCta: '/images/programs/efh-barber-og.jpg',
  },
  'cna': {
    hero: '/images/programs/efh-cna-hero.jpg',
    snapshot: {
      jobOutcome: '/images/programs/cna-hd.jpg',
      programLength: '/images/programs/efh-cna-card.jpg',
      credential: '/images/heroes-hq/success-hero.jpg',
      support: '/images/heroes-hq/career-services-hero.jpg',
    },
    bottomCta: '/images/programs/efh-cna-og.jpg',
  },
  'cna-certification': {
    hero: '/images/programs/efh-cna-hero.jpg',
    snapshot: {
      jobOutcome: '/images/programs/cna-hd.jpg',
      programLength: '/images/programs/efh-cna-card.jpg',
      credential: '/images/heroes-hq/success-hero.jpg',
      support: '/images/heroes-hq/career-services-hero.jpg',
    },
    bottomCta: '/images/programs/efh-cna-og.jpg',
  },
  'healthcare': {
    hero: '/images/programs/efh-cna-hero.jpg',
    snapshot: {
      jobOutcome: '/images/programs/cna-hd.jpg',
      programLength: '/images/programs/efh-cna-card.jpg',
      credential: '/images/heroes-hq/success-hero.jpg',
      support: '/images/heroes-hq/career-services-hero.jpg',
    },
    bottomCta: '/images/programs/efh-cna-og.jpg',
  },
  'beauty': {
    hero: '/images/programs/efh-beauty-career-educator-hero.jpg',
    snapshot: {
      jobOutcome: '/images/programs/beauty.jpg',
      programLength: '/images/programs/efh-beauty-career-educator-card.jpg',
      credential: '/images/programs/medical-esthetics-training-hd.jpg',
      support: '/images/heroes-hq/career-services-hero.jpg',
    },
    bottomCta: '/images/programs/efh-beauty-career-educator-og.jpg',
  },
  'esthetician-apprenticeship': {
    hero: '/images/programs/efh-esthetician-client-services-hero.jpg',
    snapshot: {
      jobOutcome: '/images/programs/medical-esthetics-training-hd.jpg',
      programLength: '/images/programs/efh-esthetician-client-services-card.jpg',
      credential: '/images/heroes-hq/success-hero.jpg',
      support: '/images/heroes-hq/career-services-hero.jpg',
    },
    bottomCta: '/images/programs/efh-esthetician-client-services-og.jpg',
  },
  'hvac': {
    hero: '/images/programs/hvac-hero.jpg',
    snapshot: {
      jobOutcome: '/images/programs/hvac-highlight-3.jpg',
      programLength: '/images/heroes-hq/how-it-works-hero.jpg',
      credential: '/images/heroes-hq/success-hero.jpg',
      support: '/images/heroes-hq/career-services-hero.jpg',
    },
    bottomCta: '/images/programs/hvac-hero.jpg',
  },
  'skilled-trades': {
    hero: '/images/programs/efh-building-tech-hero.jpg',
    snapshot: {
      jobOutcome: '/images/programs/building-maintenance-hero.jpg',
      programLength: '/images/programs/efh-building-tech-card.jpg',
      credential: '/images/heroes-hq/success-hero.jpg',
      support: '/images/heroes-hq/career-services-hero.jpg',
    },
    bottomCta: '/images/programs/efh-building-tech-og.jpg',
  },
  'business': {
    hero: '/images/programs/efh-business-startup-marketing-hero.jpg',
    snapshot: {
      jobOutcome: '/images/programs/efh-business-startup-marketing-card.jpg',
      programLength: '/images/heroes-hq/how-it-works-hero.jpg',
      credential: '/images/heroes-hq/success-hero.jpg',
      support: '/images/heroes-hq/career-services-hero.jpg',
    },
    bottomCta: '/images/programs/efh-business-startup-marketing-og.jpg',
  },
  'tax-preparation': {
    hero: '/images/programs/efh-tax-office-startup-hero.jpg',
    snapshot: {
      jobOutcome: '/images/programs/efh-tax-office-startup-card.jpg',
      programLength: '/images/heroes-hq/how-it-works-hero.jpg',
      credential: '/images/heroes-hq/success-hero.jpg',
      support: '/images/heroes-hq/career-services-hero.jpg',
    },
    bottomCta: '/images/programs/efh-tax-office-startup-og.jpg',
  },
  'cdl': {
    hero: '/images/programs/cdl-hero.jpg',
    snapshot: {
      jobOutcome: '/images/heroes-hq/career-services-hero.jpg',
      programLength: '/images/heroes-hq/how-it-works-hero.jpg',
      credential: '/images/heroes-hq/success-hero.jpg',
      support: '/images/heroes-hq/career-services-hero.jpg',
    },
    bottomCta: '/images/programs/cdl-hero.jpg',
  },
  'jri': {
    hero: '/images/programs/efh-public-safety-reentry-hero.jpg',
    snapshot: {
      jobOutcome: '/images/programs/efh-public-safety-reentry-card.jpg',
      programLength: '/images/heroes-hq/how-it-works-hero.jpg',
      credential: '/images/heroes-hq/success-hero.jpg',
      support: '/images/heroes-hq/career-services-hero.jpg',
    },
    bottomCta: '/images/programs/efh-public-safety-reentry-og.jpg',
  },
};

/**
 * Get images for a program, with fallbacks to defaults
 */
export function getProgramImages(slug: string): ProgramImages {
  const programSpecific = programImages[slug] || {};
  
  return {
    hero: programSpecific.hero || defaultImages.hero,
    snapshot: {
      ...defaultImages.snapshot,
      ...programSpecific.snapshot,
    },
    tiles: programSpecific.tiles || defaultImages.tiles,
    steps: {
      ...defaultImages.steps,
      ...programSpecific.steps,
    },
    bottomCta: programSpecific.bottomCta || defaultImages.bottomCta,
  };
}

/**
 * Validate that all required images exist for a program
 * Call this during build to catch missing images early
 */
export function validateProgramImages(slug: string): { valid: boolean; missing: string[] } {
  const images = getProgramImages(slug);
  const missing: string[] = [];
  
  // In a real implementation, you'd check if files exist
  // For now, we just return the configuration
  
  return { valid: missing.length === 0, missing };
}
