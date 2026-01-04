/**
 * Digital Products Store
 * Public store for one-time digital purchases (NO login required)
 *
 * IMPORTANT: These are separate from platform subscriptions
 * - Digital products: One-time payment, instant delivery
 * - Platform subscriptions: Recurring, unlocks LMS access
 */

export interface DigitalProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // in cents
  priceDisplay: string;
  category: 'toolkit' | 'guide' | 'course' | 'template' | 'donation';
  stripePriceId?: string; // One-time payment price ID
  deliveryType: 'download' | 'email' | 'access';
  downloadUrl?: string;
  fileSize?: string;
  features: string[];
  image?: string;
  featured?: boolean;
}

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'tax-toolkit',
    name: 'Start a Tax Business Toolkit',
    slug: 'tax-toolkit',
    description:
      'Step-by-step digital toolkit to launch your tax business. Includes templates, checklists, and marketing materials.',
    price: 4900, // $49.00
    priceDisplay: '$49',
    category: 'toolkit',
    deliveryType: 'download',
    fileSize: '25 MB',
    features: [
      'Business plan template',
      'Client intake forms',
      'Marketing materials',
      'Pricing calculator',
      'IRS compliance checklist',
      'Social media templates',
    ],
    stripePriceId: 'price_tax_toolkit_49', // Create in Stripe dashboard
    featured: true,
  },
  {
    id: 'grant-guide',
    name: 'Grant Readiness Guide',
    slug: 'grant-guide',
    description:
      'Learn how to prepare your organization for funding. Complete guide to grant applications and compliance.',
    price: 2900, // $29.00
    priceDisplay: '$29',
    category: 'guide',
    deliveryType: 'download',
    fileSize: '5 MB',
    features: [
      'Grant application checklist',
      'Budget template',
      'Narrative writing guide',
      'Compliance requirements',
      'Funder research tips',
    ],
    stripePriceId: 'price_grant_guide_29', // Create in Stripe dashboard
    featured: true,
  },
  {
    id: 'fund-ready-course',
    name: 'Fund-Ready Mini Course',
    slug: 'fund-ready-course',
    description:
      'Short course focused on compliance and positioning for workforce funding. Video lessons and workbook included.',
    price: 14900, // $149.00
    priceDisplay: '$149',
    category: 'course',
    deliveryType: 'access',
    features: [
      '5 video lessons',
      'Downloadable workbook',
      'Compliance templates',
      'Positioning framework',
      'Email support',
      'Lifetime access',
    ],
    stripePriceId: 'price_fund_ready_course_149', // Create in Stripe dashboard
    featured: true,
  },
  {
    id: 'workforce-compliance',
    name: 'Workforce Compliance Checklist',
    slug: 'workforce-compliance',
    description:
      'Essential compliance checklist for workforce training programs. WIOA, FERPA, and accreditation requirements.',
    price: 3900, // $39.00
    priceDisplay: '$39',
    category: 'template',
    deliveryType: 'download',
    fileSize: '2 MB',
    features: [
      'WIOA compliance checklist',
      'FERPA requirements',
      'Accreditation prep',
      'Documentation templates',
      'Audit readiness guide',
    ],
    stripePriceId: 'price_workforce_compliance_39', // Create in Stripe dashboard
  },
  {
    id: 'donation',
    name: 'Support Our Mission',
    slug: 'donation',
    description:
      'Make a tax-deductible donation to support workforce training and career pathways.',
    price: 0, // Custom amount
    priceDisplay: 'Custom',
    category: 'donation',
    deliveryType: 'email',
    features: ['Tax-deductible receipt', 'Impact report', 'Donor recognition'],
    stripePriceId: 'price_donation_custom', // Create in Stripe dashboard with custom amount
  },
];

/**
 * Get product by slug
 */
export function getDigitalProduct(slug: string): DigitalProduct | undefined {
  return DIGITAL_PRODUCTS.find((p) => p.slug === slug);
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): DigitalProduct[] {
  return DIGITAL_PRODUCTS.filter((p) => p.featured);
}

/**
 * Get products by category
 */
export function getProductsByCategory(
  category: DigitalProduct['category']
): DigitalProduct[] {
  return DIGITAL_PRODUCTS.filter((p) => p.category === category);
}
