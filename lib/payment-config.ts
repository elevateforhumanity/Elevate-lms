/**
 * Payment Configuration
 * Defines pricing and vendor costs for all programs
 */

export interface ProgramPaymentConfig {
  id: string;
  label: string;
  slug: string;
  price: number;
  vendorName: string | null;
  vendorCost: number;
  description: string;
  features: string[];
}

export const PROGRAM_PAYMENTS: ProgramPaymentConfig[] = [
  {
    id: 'barber',
    label: 'Barber Apprenticeship',
    slug: 'barber-apprenticeship',
    price: 4890,
    vendorName: 'milady',
    vendorCost: 295,
    description: 'Complete barber training with Milady RISE certification',
    features: [
      'Milady RISE online coursework',
      'Hands-on apprenticeship placement',
      'State board exam preparation',
      'AI instructor support 24/7',
    ],
  },
  {
    id: 'dsp',
    label: 'Direct Support Professional (DSP)',
    slug: 'direct-support-professional',
    price: 4325,
    vendorName: null,
    vendorCost: 0,
    description: 'Become a certified Direct Support Professional',
    features: [
      'Complete DSP certification',
      'Job placement assistance',
      'AI instructor support 24/7',
    ],
  },
  {
    id: 'hvac',
    label: 'HVAC Technician',
    slug: 'hvac-technician',
    price: 5000,
    vendorName: null,
    vendorCost: 0,
    description: 'HVAC installation and repair certification',
    features: [
      'EPA certification included',
      'Hands-on training',
      'Job placement assistance',
      'AI instructor support 24/7',
    ],
  },
  {
    id: 'cpr',
    label: 'CPR Certification',
    slug: 'cpr-certification',
    price: 575,
    vendorName: null,
    vendorCost: 0,
    description: 'American Heart Association CPR certification',
    features: [
      'AHA CPR/AED certification',
      'Same-day certification',
      'Digital certificate',
    ],
  },
  {
    id: 'ehst',
    label: 'Emergency Health & Safety Tech',
    slug: 'emergency-health-safety',
    price: 4950,
    vendorName: null,
    vendorCost: 0,
    description: 'Emergency medical and safety technician training',
    features: [
      'EMT-Basic certification prep',
      'Safety protocols training',
      'Job placement assistance',
      'AI instructor support 24/7',
    ],
  },
  {
    id: 'esth',
    label: 'Professional Esthetician',
    slug: 'professional-esthetician',
    price: 4575,
    vendorName: null,
    vendorCost: 0,
    description: 'Licensed esthetician training and certification',
    features: [
      'State board exam preparation',
      'Hands-on training',
      'Business startup guidance',
      'AI instructor support 24/7',
    ],
  },
  {
    id: 'prc',
    label: 'Peer Recovery Coach',
    slug: 'peer-recovery-coach',
    price: 4750,
    vendorName: null,
    vendorCost: 0,
    description: 'Certified peer recovery specialist training',
    features: [
      'State certification',
      'Trauma-informed care training',
      'Job placement assistance',
      'AI instructor support 24/7',
    ],
  },
  {
    id: 'tax',
    label: 'Tax Prep & Financial Services',
    slug: 'tax-prep-financial',
    price: 4950,
    vendorName: null,
    vendorCost: 0,
    description: 'IRS-certified tax preparer training',
    features: [
      'IRS PTIN certification',
      'Tax software training',
      'Business startup guidance',
      'AI instructor support 24/7',
    ],
  },
  {
    id: 'biz',
    label: 'Business Startup & Marketing',
    slug: 'business-startup-marketing',
    price: 4550,
    vendorName: null,
    vendorCost: 0,
    description: 'Launch and grow your business',
    features: [
      'Business plan development',
      'Digital marketing training',
      'LLC formation guidance',
      'AI instructor support 24/7',
    ],
  },
];

/**
 * Get payment configuration for a program
 */
export function getPaymentConfig(programSlug: string): ProgramPaymentConfig | null {
  return PROGRAM_PAYMENTS.find(p => p.slug === programSlug) || null;
}

/**
 * Calculate payment split for a program
 */
export function calculatePaymentSplit(programSlug: string, totalAmount: number) {
  const config = getPaymentConfig(programSlug);

  if (!config) {
    return {
      total: totalAmount,
      vendor: 0,
      elevate: totalAmount,
      vendorName: null,
    };
  }

  return {
    total: totalAmount,
    vendor: config.vendorCost,
    elevate: totalAmount - config.vendorCost,
    vendorName: config.vendorName,
  };
}
