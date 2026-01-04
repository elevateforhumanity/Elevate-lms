/**
 * Program Categories and Organization
 * Defines how programs are grouped in navigation
 */

export type ProgramCategory = {
  slug: string;
  name: string;
  description: string;
  programs: string[]; // Array of program slugs
};

export const programCategories: ProgramCategory[] = [
  {
    slug: 'apprenticeships',
    name: 'Apprenticeship Programs',
    description:
      'Earn while you learn with paid apprenticeships in skilled trades',
    programs: [
      'barber-apprenticeship',
      'hvac-technician',
      'building-maintenance',
      'building-technician',
    ],
  },
  {
    slug: 'federal-funded',
    name: 'WIOA Programs (ETPL/WRG)',
    description: '100% free training funded by WIOA, ETPL, and WRG',
    programs: [
      'cna',
      'phlebotomy-technician',
      'home-health-aide',
      'direct-support-professional',
      'cdl',
      'cpr-certification',
      'peer-recovery-coach',
      'emergency-health-safety-tech',
    ],
  },
  {
    slug: 'jri',
    name: 'JRI Programs',
    description:
      'Justice Reinvestment Initiative - Second chance career training',
    programs: [
      'cna',
      'phlebotomy-technician',
      'home-health-aide',
      'direct-support-professional',
      'cdl',
      'workforce-readiness',
      'peer-recovery-coach',
    ],
  },
  {
    slug: 'micro-programs',
    name: 'Micro Programs',
    description: 'Short-term certifications you can complete in weeks',
    programs: ['workforce-readiness', 'drug-collector', 'cpr-certification'],
  },
  {
    slug: 'beauty-wellness',
    name: 'Beauty & Wellness',
    description: 'Professional training in cosmetology and esthetics',
    programs: ['professional-esthetician', 'beauty-career-educator'],
  },
  {
    slug: 'business-professional',
    name: 'Business & Professional',
    description: 'Start your business or advance your professional career',
    programs: ['business-startup-marketing', 'tax-prep-financial-services'],
  },
];

export function getCategoryBySlug(slug: string): ProgramCategory | undefined {
  return programCategories.find((cat) => cat.slug === slug);
}

export function getCategoryForProgram(
  programSlug: string
): ProgramCategory | undefined {
  return programCategories.find((cat) => cat.programs.includes(programSlug));
}
