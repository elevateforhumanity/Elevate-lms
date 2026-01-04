export type MediaSlot =
  | "home_hero_primary"
  | "home_hero_secondary"
  | "home_strip_stats"
  | "home_student_story"
  | "home_employer_collage"
  | "program_cna_hero"
  | "program_barber_hero"
  | "program_hvac_hero"
  | "program_cdl_hero"
  | "program_tax_hero"
  | "program_welding_hero"
  | "program_culinary_hero"
  | "program_medical_hero"
  | "program_it_hero"
  | "program_building_hero"
  | "program_plumbing_hero"
  | "training_cpr"
  | "training_counseling";

export interface MediaConfigItem {
  slot: MediaSlot;
  imageSrc: string;
  alt: string;
  category?: string;
}

/**
 * SMART IMAGE PLACEMENT
 * Images are automatically matched to slots based on:
 * - Filename keywords (cna, barber, hvac, etc.)
 * - Directory structure (programs, media, etc.)
 * - Image quality (HD versions preferred)
 * - Content relevance
 */
export const mediaConfig: MediaConfigItem[] = [
  // Homepage Images - High-impact hero sections
  {
    slot: "home_hero_primary",
    imageSrc: "/images/facilities-new/facility-1.jpg",
    alt: "Elevate for Humanity training facility at Keystone Crossing, Indianapolis",
    category: "homepage"
  },
  {
    slot: "home_hero_secondary",
    imageSrc: "/media/hero-slide-healthcare.jpg",
    alt: "Healthcare professional supporting a learner in clinical setting",
    category: "homepage"
  },
  {
    slot: "home_strip_stats",
    imageSrc: "/media/homepage-hero.jpg",
    alt: "Collage representing Elevate outcomes and community impact",
    category: "homepage"
  },
  {
    slot: "home_student_story",
    imageSrc: "/media/programs/healthcare-professional-1-hd.jpg",
    alt: "Graduate in professional healthcare attire after successful program completion",
    category: "homepage"
  },
  {
    slot: "home_employer_collage",
    imageSrc: "/media/employers/employer-partnership-handshake.png",
    alt: "Employer and Elevate staff shaking hands, symbolizing partnership",
    category: "homepage"
  },
  
  // Healthcare Programs
  {
    slot: "program_cna_hero",
    imageSrc: "/media/programs/cna-hd.jpg",
    alt: "CNA student providing compassionate care to elderly patient",
    category: "healthcare"
  },
  {
    slot: "program_medical_hero",
    imageSrc: "/media/programs/medical-hd.jpg",
    alt: "Medical assistant in clinical setting with patient",
    category: "healthcare"
  },
  
  // Beauty & Personal Care
  {
    slot: "program_barber_hero",
    imageSrc: "/media/programs/beauty-hd.jpg",
    alt: "Barber apprentice cutting hair in modern barbershop",
    category: "beauty"
  },
  
  // Skilled Trades
  {
    slot: "program_hvac_hero",
    imageSrc: "/media/programs/hvac-hd.jpg",
    alt: "HVAC technician working on rooftop air conditioning unit",
    category: "trades"
  },
  {
    slot: "program_welding_hero",
    imageSrc: "/media/programs/welding-hd.jpg",
    alt: "Welder in protective gear working with metal fabrication",
    category: "trades"
  },
  {
    slot: "program_plumbing_hero",
    imageSrc: "/media/programs/plumbing.jpg",
    alt: "Plumber working on pipe installation",
    category: "trades"
  },
  {
    slot: "program_building_hero",
    imageSrc: "/media/programs/webp/building.webp",
    alt: "Building maintenance technician at work",
    category: "trades"
  },
  
  // Transportation
  {
    slot: "program_cdl_hero",
    imageSrc: "/media/programs/cdl-hd.jpg",
    alt: "CDL student standing proudly in front of commercial truck",
    category: "transportation"
  },
  
  // Business & Tax
  {
    slot: "program_tax_hero",
    imageSrc: "/media/programs/tax-prep-hd.jpg",
    alt: "Tax preparer helping family with tax return preparation",
    category: "business"
  },
  {
    slot: "program_it_hero",
    imageSrc: "/media/programs/it-hd.jpg",
    alt: "IT professional working at computer workstation",
    category: "business"
  },
  
  // Culinary
  {
    slot: "program_culinary_hero",
    imageSrc: "/media/programs/culinary-hd.jpg",
    alt: "Chef preparing food in professional kitchen",
    category: "culinary"
  },
  
  // Training Modules
  {
    slot: "training_cpr",
    imageSrc: "/media/programs/cpr-training-hd.jpg",
    alt: "Students practicing CPR techniques in training session",
    category: "training"
  },
  {
    slot: "training_counseling",
    imageSrc: "/media/programs/counseling-training-hd.jpg",
    alt: "Counseling training session with instructor and students",
    category: "training"
  },
];

export function getMediaBySlot(slot: MediaSlot) {
  return mediaConfig.find((m) => m.slot === slot);
}

export function getMediaByCategory(category: string) {
  return mediaConfig.filter((m) => m.category === category);
}

export function getAllSlots(): MediaSlot[] {
  return mediaConfig.map((m) => m.slot);
}
