/**
 * SMART IMAGE PLACEMENT SYSTEM
 * 
 * This configuration maps images to slots based on:
 * 1. Filename analysis (keywords in name)
 * 2. Directory structure (where image is stored)
 * 3. Image quality (HD versions preferred)
 * 4. Content relevance (matches program/section)
 */

export interface SmartImageMapping {
  slot: string;
  primaryImage: string;
  fallbackImages: string[];
  keywords: string[];
  description: string;
}

export const smartImageMappings: SmartImageMapping[] = [
  // Homepage Images
  {
    slot: "home_hero_primary",
    primaryImage: "/media/hero-elevate-learners.jpg",
    fallbackImages: [
      "/media/homepage-hero.jpg",
      "/assets/hero-training.jpg",
      "/media/hero-banner-latest.png"
    ],
    keywords: ["hero", "elevate", "learner", "training", "main"],
    description: "Main homepage hero - should show diverse learners in training"
  },
  {
    slot: "home_hero_secondary",
    primaryImage: "/media/hero-slide-healthcare.jpg",
    fallbackImages: [
      "/media/state-funding-hero.jpg",
      "/media/additional-image-14-hd.jpg"
    ],
    keywords: ["healthcare", "slide", "professional", "workplace"],
    description: "Secondary hero - workplace or professional setting"
  },
  {
    slot: "home_student_story",
    primaryImage: "/media/programs/healthcare-professional-1-hd.jpg",
    fallbackImages: [
      "/media/programs/healthcare-professional-2-hd.jpg",
      "/media/testimonials/testimonial-success-4-original.png",
      "/media/testimonials/testimonial-medical-assistant-original.png"
    ],
    keywords: ["student", "success", "graduate", "professional", "testimonial"],
    description: "Student success story - graduate in professional setting"
  },
  {
    slot: "home_employer_collage",
    primaryImage: "/media/employers/employer-partnership-handshake.png",
    fallbackImages: [
      "/media/additional-image-12-hd.jpg"
    ],
    keywords: ["employer", "partnership", "handshake", "business", "workplace"],
    description: "Employer partnerships - professional handshake or workplace"
  },
  
  // Program-Specific Images
  {
    slot: "program_cna_hero",
    primaryImage: "/media/programs/cna-hd.jpg",
    fallbackImages: [
      "/media/program-cna.jpg",
      "/media/programs/cna-training-video-thumbnail.jpg",
      "/media/programs/healthcare-hd.jpg",
      "/media/programs/healthcare-professional-1-hd.jpg"
    ],
    keywords: ["cna", "nursing", "assistant", "healthcare", "patient", "care"],
    description: "CNA program - nursing assistant with patient or in healthcare setting"
  },
  {
    slot: "program_barber_hero",
    primaryImage: "/media/programs/beauty-hd.jpg",
    fallbackImages: [
      "/media/programs/beauty.jpg",
      "/media/programs/webp/barber.webp",
      "/media/programs/webp/beauty.webp"
    ],
    keywords: ["barber", "beauty", "hair", "salon", "cosmetology", "cut"],
    description: "Barber program - barber cutting hair or beauty professional"
  },
  {
    slot: "program_hvac_hero",
    primaryImage: "/media/programs/hvac-hd.jpg",
    fallbackImages: [
      "/media/program-hvac.jpg",
      "/media/programs/webp/hvac.webp"
    ],
    keywords: ["hvac", "heating", "cooling", "air", "conditioning", "technician"],
    description: "HVAC program - technician working on HVAC unit"
  },
  {
    slot: "program_cdl_hero",
    primaryImage: "/media/programs/cdl-hd.jpg",
    fallbackImages: [
      "/media/program-cdl.jpg",
      "/media/programs/webp/cdl.webp"
    ],
    keywords: ["cdl", "truck", "commercial", "driver", "transportation"],
    description: "CDL program - student with commercial truck"
  },
  {
    slot: "program_tax_hero",
    primaryImage: "/media/programs/tax-prep-hd.jpg",
    fallbackImages: [
      "/media/programs/tax-prep-certification-optimized.jpg",
      "/media/programs/tax-prep-certification.png"
    ],
    keywords: ["tax", "vita", "prep", "irs", "accounting"],
    description: "Tax/VITA program - tax preparer helping client"
  },
  {
    slot: "program_welding_hero",
    primaryImage: "/media/programs/welding-hd.jpg",
    fallbackImages: [
      "/media/programs/welding.jpg",
      "/media/programs/webp/welding.webp"
    ],
    keywords: ["welding", "welder", "metal", "fabrication"],
    description: "Welding program - welder at work"
  },
  {
    slot: "program_culinary_hero",
    primaryImage: "/media/programs/culinary-hd.jpg",
    fallbackImages: [
      "/media/programs/culinary-arts-hd.jpg",
      "/media/programs/webp/culinary.webp"
    ],
    keywords: ["culinary", "cooking", "chef", "kitchen", "food"],
    description: "Culinary program - chef in kitchen"
  },
  {
    slot: "program_medical_hero",
    primaryImage: "/media/programs/medical-hd.jpg",
    fallbackImages: [
      "/media/programs/medical-assistant-video-thumbnail.jpg",
      "/media/programs/webp/medical.webp"
    ],
    keywords: ["medical", "assistant", "healthcare", "clinical"],
    description: "Medical Assistant program - medical professional"
  },
  {
    slot: "program_it_hero",
    primaryImage: "/media/programs/it-hd.jpg",
    fallbackImages: [
      "/media/programs/webp/it.webp"
    ],
    keywords: ["it", "technology", "computer", "tech", "digital"],
    description: "IT program - tech professional at computer"
  },
  {
    slot: "program_building_hero",
    primaryImage: "/media/programs/webp/building.webp",
    fallbackImages: [
      "/media/programs/webp/electrical.webp"
    ],
    keywords: ["building", "maintenance", "construction", "electrical"],
    description: "Building Maintenance program - technician at work"
  },
  {
    slot: "program_plumbing_hero",
    primaryImage: "/media/programs/plumbing.jpg",
    fallbackImages: [
      "/media/programs/webp/plumbing.webp"
    ],
    keywords: ["plumbing", "plumber", "pipe", "water"],
    description: "Plumbing program - plumber at work"
  },
  
  // Training/Education Images
  {
    slot: "training_cpr",
    primaryImage: "/media/programs/cpr-training-hd.jpg",
    fallbackImages: [
      "/media/programs/cpr-group-training-hd.jpg",
      "/media/programs/cpr-individual-practice-hd.jpg"
    ],
    keywords: ["cpr", "training", "emergency", "first aid"],
    description: "CPR training - students practicing CPR"
  },
  {
    slot: "training_counseling",
    primaryImage: "/media/programs/counseling-training-hd.jpg",
    fallbackImages: [],
    keywords: ["counseling", "therapy", "mental health", "support"],
    description: "Counseling training - counselor with client"
  }
];

/**
 * Get the best image for a slot based on availability
 */
export function getBestImageForSlot(slot: string): string | null {
  const mapping = smartImageMappings.find(m => m.slot === slot);
  if (!mapping) return null;
  
  // Try primary first
  // In production, you'd check if file exists
  return mapping.primaryImage;
}

/**
 * Get all available images for a slot (primary + fallbacks)
 */
export function getAllImagesForSlot(slot: string): string[] {
  const mapping = smartImageMappings.find(m => m.slot === slot);
  if (!mapping) return [];
  
  return [mapping.primaryImage, ...mapping.fallbackImages];
}

/**
 * Find slots that match keywords (for auto-discovery)
 */
export function findSlotsByKeywords(keywords: string[]): SmartImageMapping[] {
  return smartImageMappings.filter(mapping => 
    keywords.some(keyword => 
      mapping.keywords.some(k => k.includes(keyword.toLowerCase()))
    )
  );
}
