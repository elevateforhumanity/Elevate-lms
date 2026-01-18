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
    stripePriceId: 'price_1SqluqIRNf5vPH3ACSGhnzrO',
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
    stripePriceId: 'price_1SqluqIRNf5vPH3Au88XZjmR',
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
    stripePriceId: 'price_1SqluqIRNf5vPH3AD2ZIRqg0',
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
    stripePriceId: 'price_1SqlurIRNf5vPH3AtDLNBIVX',
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
    stripePriceId: 'price_donation_custom',
  },
  // AI STUDIO PRODUCTS
  {
    id: 'ai-studio-starter',
    name: 'AI Studio - Starter',
    slug: 'ai-studio-starter',
    description:
      'Generate AI videos, images, avatars, and voiceovers for your courses. Perfect for individual creators.',
    price: 9900, // $99/month
    priceDisplay: '$99/mo',
    category: 'toolkit',
    deliveryType: 'access',
    features: [
      '50 AI video generations/month',
      '200 AI images/month',
      '100 voiceovers/month',
      '10 AI avatar videos/month',
      'HD quality exports',
      'Commercial license',
    ],
    stripePriceId: 'price_1SqlurIRNf5vPH3A6j37XvWk',
    featured: true,
    image: '/images/store/ai-studio.jpg',
  },
  {
    id: 'ai-studio-pro',
    name: 'AI Studio - Professional',
    slug: 'ai-studio-pro',
    description:
      'Unlimited AI content generation for training providers and schools. Includes custom AI instructors.',
    price: 29900, // $299/month
    priceDisplay: '$299/mo',
    category: 'toolkit',
    deliveryType: 'access',
    features: [
      'Unlimited AI video generations',
      'Unlimited AI images',
      'Unlimited voiceovers',
      'Unlimited AI avatar videos',
      '4K quality exports',
      'Custom AI instructor voices',
      'White-label exports',
      'API access',
      'Priority support',
    ],
    stripePriceId: 'price_1SqlusIRNf5vPH3AqLbVXWn2',
    featured: true,
    image: '/images/store/ai-studio-pro.jpg',
  },
  {
    id: 'ai-instructor-pack',
    name: 'AI Instructor Pack',
    slug: 'ai-instructor-pack',
    description:
      '6 pre-built AI instructors with unique voices and personalities for different course categories.',
    price: 49900, // $499 one-time
    priceDisplay: '$499',
    category: 'toolkit',
    deliveryType: 'access',
    features: [
      'Dr. Sarah Chen - Healthcare',
      'Marcus Johnson - Skilled Trades',
      'James Williams - Barbering',
      'Lisa Martinez - Technology',
      'Robert Davis - CDL/Transportation',
      'Angela Thompson - Business',
      'Custom voice cloning',
      'Lesson script generator',
      'Lifetime access',
    ],
    stripePriceId: 'price_1SqlusIRNf5vPH3AT11GLqso',
    featured: true,
    image: '/images/store/ai-instructors.jpg',
  },
  {
    id: 'community-hub-license',
    name: 'Community Hub License',
    slug: 'community-hub-license',
    description:
      'Launch your own learning community with forums, marketplace, and member management.',
    price: 199900, // $1,999 one-time
    priceDisplay: '$1,999',
    category: 'toolkit',
    deliveryType: 'access',
    features: [
      'Full community platform',
      'Discussion forums',
      'Member marketplace',
      'Teacher community',
      'Developer community',
      'Admin tools',
      'Custom branding',
      'Unlimited members',
      'Source code access',
    ],
    stripePriceId: 'price_1SqlusIRNf5vPH3A4OVqbua3',
    image: '/images/store/community-hub.jpg',
  },
  {
    id: 'crm-hub-license',
    name: 'CRM Hub License',
    slug: 'crm-hub-license',
    description:
      'Complete CRM system with contacts, campaigns, deals, and email marketing. Built for training providers.',
    price: 149900, // $1,499 one-time
    priceDisplay: '$1,499',
    category: 'toolkit',
    deliveryType: 'access',
    features: [
      'Contact management',
      'Email campaigns',
      'Deal pipeline',
      'Lead tracking',
      'Appointment scheduling',
      'Follow-up reminders',
      'HubSpot integration',
      'Salesforce integration',
      'Custom reports',
    ],
    stripePriceId: 'price_1SqlutIRNf5vPH3AIb2JXemT',
    image: '/images/store/crm-hub.jpg',
  },
  {
    id: 'ai-tutor-license',
    name: 'AI Tutor License',
    slug: 'ai-tutor-license',
    description:
      '24/7 AI tutoring system for your students. Chat, essay help, study guides, and personalized learning.',
    price: 99900, // $999 one-time
    priceDisplay: '$999',
    category: 'toolkit',
    deliveryType: 'access',
    features: [
      'AI chat tutor',
      'Essay assistance',
      'Study guide generator',
      'Quiz practice mode',
      'Progress tracking',
      'Multiple AI personalities',
      'Voice interaction',
      'Unlimited students',
      'API access',
    ],
    stripePriceId: 'price_1SqlutIRNf5vPH3A3dTfpAoH',
    featured: true,
    image: '/images/store/ai-tutor.jpg',
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
