// Redirect configuration for duplicate and legacy pages
export const redirects = [
  // Duplicate program pages
  {
    source: '/supersonicfastcash',
    destination: '/supersonic-fast-cash',
    permanent: true,
  },
  {
    source: '/kingdomkonnect',
    destination: '/kingdom-konnect',
    permanent: true,
  },
  {
    source: '/serenecomfortcare',
    destination: '/serene-comfort-care',
    permanent: true,
  },
  {
    source: '/urbanbuildcrew',
    destination: '/urban-build-crew',
    permanent: true,
  },

  // Duplicate AI tutor pages
  { source: '/aitutor', destination: '/ai-tutor', permanent: true },

  // Duplicate legal pages
  { source: '/privacy', destination: '/privacy-policy', permanent: true },
  { source: '/terms', destination: '/terms-of-service', permanent: true },
  { source: '/refundpolicy', destination: '/refund-policy', permanent: true },
  { source: '/refunds', destination: '/refund-policy', permanent: true },

  // Duplicate certificate pages
  { source: '/cert', destination: '/certificates', permanent: true },
  {
    source: '/verifycertificate',
    destination: '/verify-credential',
    permanent: true,
  },

  // Duplicate video pages
  { source: '/video', destination: '/videos', permanent: true },

  // Duplicate portal pages
  { source: '/sign', destination: '/signup', permanent: true },

  // Legacy pages
  { source: '/page-old-backup', destination: '/', permanent: true },
  { source: '/page-with-search', destination: '/programs', permanent: true },

  // Test pages (redirect to appropriate production pages)
  { source: '/test-enrollment', destination: '/apply', permanent: false },
  { source: '/test-stripe-iframe', destination: '/pay', permanent: false },
  { source: '/pwa-test', destination: '/', permanent: false },
  { source: '/demo', destination: '/', permanent: false },
  { source: '/demos', destination: '/', permanent: false },
];
