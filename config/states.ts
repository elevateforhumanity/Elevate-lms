// State configuration for SEO pages
// Single source of truth for state-specific content

export interface StateConfig {
  slug: string;
  name: string;
  abbreviation: string;
  demonym: string; // e.g., "Hoosiers" for Indiana
  majorCities: string[];
  careerTraining: {
    headline: string;
    description: string;
    features: string[];
  };
  taxPreparation: {
    headline: string;
    description: string;
    features: string[];
  };
  communityServices: {
    headline: string;
    description: string;
  };
}

export const STATES: Record<string, StateConfig> = {
  indiana: {
    slug: 'indiana',
    name: 'Indiana',
    abbreviation: 'IN',
    demonym: 'Hoosiers',
    majorCities: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel', 'Fishers', 'Bloomington'],
    careerTraining: {
      headline: 'Career Training & Workforce Programs in Indiana',
      description: 'Workforce development and career training programs in Indiana. WIOA-eligible training, apprenticeships, and certification programs serving Indianapolis, Fort Wayne, and statewide. Free for qualifying residents.',
      features: [
        'WIOA-eligible training programs',
        'Registered apprenticeships',
        'Industry certifications',
        'Job placement assistance',
      ],
    },
    taxPreparation: {
      headline: 'Free Tax Preparation in Indiana',
      description: 'VITA-certified free tax preparation services across Indiana. Serving Indianapolis, Fort Wayne, and communities statewide.',
      features: [
        'IRS-certified VITA volunteers',
        'Free federal and state filing',
        'Maximum refund guarantee',
        'Same-day appointments available',
      ],
    },
    communityServices: {
      headline: 'Community Services in Indiana',
      description: 'Trusted support services for Indiana families. We connect Hoosiers with resources for employment, housing, financial stability, and personal growth.',
    },
  },
  illinois: {
    slug: 'illinois',
    name: 'Illinois',
    abbreviation: 'IL',
    demonym: 'Illinoisans',
    majorCities: ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford', 'Springfield', 'Peoria'],
    careerTraining: {
      headline: 'Career Training & Workforce Programs in Illinois',
      description: 'Illinois workforce initiatives often span multiple regions and partners. Structured learning platforms help ensure consistency and accountability across programs.',
      features: [
        'Structured learning paths',
        'Progress tracking',
        'Clear completion criteria',
        'Program oversight',
      ],
    },
    taxPreparation: {
      headline: 'Free Tax Preparation in Illinois',
      description: 'VITA-certified free tax preparation services across Illinois. Serving Chicago, Aurora, and communities statewide.',
      features: [
        'IRS-certified VITA volunteers',
        'Free federal and state filing',
        'Maximum refund guarantee',
        'Bilingual services available',
      ],
    },
    communityServices: {
      headline: 'Community Services in Illinois',
      description: 'Trusted support services for Illinois families. We connect residents with resources for employment, housing, financial stability, and personal growth.',
    },
  },
  ohio: {
    slug: 'ohio',
    name: 'Ohio',
    abbreviation: 'OH',
    demonym: 'Ohioans',
    majorCities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton', 'Youngstown'],
    careerTraining: {
      headline: 'Career Training & Workforce Programs in Ohio',
      description: "Ohio's workforce includes a diverse mix of industries, employers, and training needs. Career training programs supported by structured learning platforms help ensure consistency, accountability, and measurable progress.",
      features: [
        'Skills aligned with employment and industry demand',
        'Defined participation and completion criteria',
        'Transparent progress tracking',
        'Clear administrative and instructional roles',
      ],
    },
    taxPreparation: {
      headline: 'Free Tax Preparation in Ohio',
      description: 'VITA-certified free tax preparation services across Ohio. Serving Columbus, Cleveland, Cincinnati, and communities statewide.',
      features: [
        'IRS-certified VITA volunteers',
        'Free federal and state filing',
        'Maximum refund guarantee',
        'Evening and weekend hours',
      ],
    },
    communityServices: {
      headline: 'Community Services in Ohio',
      description: 'Trusted support services for Ohio families. We connect Ohioans with resources for employment, housing, financial stability, and personal growth.',
    },
  },
  tennessee: {
    slug: 'tennessee',
    name: 'Tennessee',
    abbreviation: 'TN',
    demonym: 'Tennesseans',
    majorCities: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro', 'Franklin'],
    careerTraining: {
      headline: 'Career Training & Workforce Programs in Tennessee',
      description: 'Tennessee workforce programs rely on structured training environments to support learners and program administrators statewide. Digital learning platforms help maintain consistency and accountability.',
      features: [
        'Industry-aligned curriculum',
        'Hands-on training opportunities',
        'Employer partnerships',
        'Career counseling services',
      ],
    },
    taxPreparation: {
      headline: 'Free Tax Preparation in Tennessee',
      description: 'VITA-certified free tax preparation services across Tennessee. Serving Nashville, Memphis, and communities statewide.',
      features: [
        'IRS-certified VITA volunteers',
        'Free federal filing (no state income tax)',
        'Maximum refund guarantee',
        'Walk-in appointments welcome',
      ],
    },
    communityServices: {
      headline: 'Community Services in Tennessee',
      description: 'Trusted support services for Tennessee families. We connect Tennesseans with resources for employment, housing, financial stability, and personal growth.',
    },
  },
  texas: {
    slug: 'texas',
    name: 'Texas',
    abbreviation: 'TX',
    demonym: 'Texans',
    majorCities: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington'],
    careerTraining: {
      headline: 'Career Training & Workforce Programs in Texas',
      description: "Texas offers diverse workforce development opportunities across its major metropolitan areas. Training programs emphasize industry-relevant skills and employer connections.",
      features: [
        'Industry certifications',
        'Apprenticeship programs',
        'Skills training',
        'Employment services',
      ],
    },
    taxPreparation: {
      headline: 'Free Tax Preparation in Texas',
      description: 'VITA-certified free tax preparation services across Texas. Serving Houston, Dallas, San Antonio, and communities statewide.',
      features: [
        'IRS-certified VITA volunteers',
        'Free federal filing (no state income tax)',
        'Maximum refund guarantee',
        'Spanish-language services',
      ],
    },
    communityServices: {
      headline: 'Community Services in Texas',
      description: 'Trusted support services for Texas families. We connect Texans with resources for employment, housing, financial stability, and personal growth.',
    },
  },
};

export const STATE_SLUGS = Object.keys(STATES);

export function getStateConfig(slug: string): StateConfig | undefined {
  return STATES[slug.toLowerCase()];
}

export function getOtherStates(currentSlug: string): StateConfig[] {
  return STATE_SLUGS
    .filter(slug => slug !== currentSlug.toLowerCase())
    .map(slug => STATES[slug]);
}
