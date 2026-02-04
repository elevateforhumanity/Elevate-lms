/**
 * Store Guide Flow Configuration
 * Structured routing based on user needs - config-driven for easy updates
 */

export interface GuideChoice {
  id: string;
  label: string;
  icon: 'shopping-bag' | 'graduation-cap' | 'book-open' | 'server' | 'help-circle';
  route: string;
  startTour?: boolean;
  tourId?: string;
  description?: string;
}

export interface GuideQuestion {
  id: string;
  question: string;
  choices: GuideChoice[];
  followUp?: string; // ID of follow-up question if "Not sure" is selected
}

export interface GuideFlow {
  id: string;
  welcomeMessage: string;
  questions: GuideQuestion[];
}

// Main store guide flow
export const storeGuideFlow: GuideFlow = {
  id: 'store-main',
  welcomeMessage: "Welcome to the Elevate Store! I'll help you find exactly what you need.",
  questions: [
    {
      id: 'main',
      question: 'What are you here for today?',
      choices: [
        {
          id: 'buy-gear',
          label: 'Buy tools or gear',
          icon: 'shopping-bag',
          route: '/shop',
          startTour: true,
          tourId: 'shop-tour',
          description: 'Professional tools, equipment, scrubs, and study materials',
        },
        {
          id: 'find-course',
          label: 'Find a course',
          icon: 'graduation-cap',
          route: '/marketplace',
          startTour: true,
          tourId: 'marketplace-tour',
          description: 'Expert-created courses in trades, healthcare, tech, and more',
        },
        {
          id: 'download-workbooks',
          label: 'Download workbooks',
          icon: 'book-open',
          route: '/workbooks',
          startTour: false,
          description: 'Free study guides and course materials for enrolled students',
        },
        {
          id: 'license-platform',
          label: 'License the platform',
          icon: 'server',
          route: '/store/licenses',
          startTour: true,
          tourId: 'licenses-tour',
          description: 'Run your workforce programs on proven infrastructure. Managed hosting from $1,500/mo or enterprise source-use from $75,000.',
        },
        {
          id: 'not-sure',
          label: "I'm not sure",
          icon: 'help-circle',
          route: '',
          startTour: false,
        },
      ],
      followUp: 'clarify',
    },
    {
      id: 'clarify',
      question: 'Let me help narrow it down. Are you:',
      choices: [
        {
          id: 'student',
          label: 'A student looking for materials',
          icon: 'book-open',
          route: '/workbooks',
          startTour: false,
          description: 'Access workbooks and study guides for your program',
        },
        {
          id: 'learner',
          label: 'Looking to learn new skills',
          icon: 'graduation-cap',
          route: '/marketplace',
          startTour: true,
          tourId: 'marketplace-tour',
          description: 'Browse courses from expert instructors',
        },
        {
          id: 'organization',
          label: 'Representing an organization',
          icon: 'server',
          route: '/store/licenses',
          startTour: true,
          tourId: 'licenses-tour',
          description: 'License the Workforce Operating System for your training provider, workforce board, or agency. Managed or self-hosted options.',
        },
        {
          id: 'browse',
          label: 'Just browsing',
          icon: 'shopping-bag',
          route: '/store',
          startTour: true,
          tourId: 'store-tour',
          description: "I'll give you a quick tour of everything",
        },
      ],
    },
  ],
};

// Destination-specific mini tours
export interface TourStep {
  target: string;
  title: string;
  content: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

export interface DestinationTour {
  id: string;
  name: string;
  steps: TourStep[];
}

export const destinationTours: Record<string, DestinationTour> = {
  'shop-tour': {
    id: 'shop-tour',
    name: 'Shop Tour',
    steps: [
      {
        target: '[data-tour="shop-categories"]',
        title: 'Browse Categories',
        content: 'Filter products by category: Tools, Apparel, Books, Safety gear, and Accessories.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="shop-product"]',
        title: 'Product Cards',
        content: 'Click any product to see details, reviews, and add to cart.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="shop-cart"]',
        title: 'Your Cart',
        content: 'View your cart and proceed to checkout when ready.',
        placement: 'left',
      },
    ],
  },
  'marketplace-tour': {
    id: 'marketplace-tour',
    name: 'Marketplace Tour',
    steps: [
      {
        target: '[data-tour="marketplace-search"]',
        title: 'Search Courses',
        content: 'Search for courses by topic, skill, or instructor name.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="marketplace-filters"]',
        title: 'Filter by Category',
        content: 'Browse courses in Trades, Healthcare, Technology, Business, and Creative fields.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="marketplace-course"]',
        title: 'Course Cards',
        content: 'See ratings, student count, duration, and price. Click to view full details.',
        placement: 'bottom',
      },
    ],
  },
  'licenses-tour': {
    id: 'licenses-tour',
    name: 'Platform Licenses Tour',
    steps: [
      {
        target: '[data-tour="license-hero"]',
        title: 'Workforce Operating System',
        content: 'License a complete platform for enrollment, training delivery, compliance reporting, and outcome tracking. Stop building from scratch.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="license-managed"]',
        title: 'Managed Platform ($1,500-$3,500/mo)',
        content: 'We host and maintain everything. You get your own branded instance with your domain. Includes LMS, student/instructor/employer portals, WIOA compliance, and 24/7 support. Launch in 2 weeks.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="license-source"]',
        title: 'Source-Use License ($75,000+)',
        content: 'For large agencies requiring on-premise deployment. Get restricted code access to deploy on your infrastructure. Requires dedicated DevOps team and enterprise approval.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="license-features"]',
        title: 'What Every License Includes',
        content: 'Complete LMS with courses and certificates, multi-stakeholder portals, WIOA-compliant reporting, automated workflows, enterprise security, and dedicated support.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="license-cta"]',
        title: 'Ready to Get Started?',
        content: 'View detailed pricing, watch a demo, or schedule a call with our team to discuss your specific needs.',
        placement: 'top',
      },
    ],
  },
  'store-tour': {
    id: 'store-tour',
    name: 'Store Overview Tour',
    steps: [
      {
        target: '[data-tour="store-card-shop"]',
        title: 'Shop Gear',
        content: 'Professional tools, equipment, and apparel for training programs.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="store-card-marketplace"]',
        title: 'Courses Marketplace',
        content: 'Expert-created courses in trades, healthcare, tech, and business.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="store-card-workbooks"]',
        title: 'Workbooks & Downloads',
        content: 'Free study guides and materials for enrolled students.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="store-card-licenses"]',
        title: 'Platform Licenses',
        content: 'License our complete workforce platform for your organization.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="store-card-pricing"]',
        title: 'Plans & Pricing',
        content: 'Compare subscription plans and complete purchases.',
        placement: 'bottom',
      },
    ],
  },
};

// LocalStorage keys for persistence
export const GUIDE_STORAGE_KEYS = {
  DISMISSED: 'elevate-store-guide-dismissed',
  COMPLETED: 'elevate-store-guide-completed',
  TOUR_COMPLETED: (tourId: string) => `elevate-tour-${tourId}-completed`,
};

// Analytics event names
export const GUIDE_ANALYTICS = {
  GUIDE_OPENED: 'guide_opened',
  GUIDE_COMPLETED: 'guide_completed',
  GUIDE_DISMISSED: 'guide_dismissed',
  TOUR_STARTED: 'tour_started',
  TOUR_COMPLETED: 'tour_completed',
  ROUTE_SELECTED: 'route_selected',
};
