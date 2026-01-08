import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force cache bust - build timestamp + deployment marker
  generateBuildId: async () => {
    return `build-${Date.now()}-production`;
  },
  output: 'standalone',
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      'recharts',
    ],
    webpackBuildWorker: true,
    // optimizeCss: true, // Disabled - requires critters package
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1];
              return `npm.${packageName?.replace('@', '')}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          // Split large UI libraries
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react)[\\/]/,
            name: 'ui-libs',
            priority: 35,
            reuseExistingChunk: true,
          },
          // Split Supabase
          supabase: {
            test: /[\\/]node_modules[\\/](@supabase)[\\/]/,
            name: 'supabase',
            priority: 35,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
        },
      },
    };
    return config;
  },
  images: {
    unoptimized: false, // Enable Next.js image optimization
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    // Allow all external images - no restrictions
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
      // Explicitly allow Wix CDN
      { protocol: 'https', hostname: 'static.wixstatic.com' },
      { protocol: 'https', hostname: '*.wixstatic.com' },
    ],
    // Increase timeout for large images
    loader: 'default',
    loaderFile: undefined,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 180,
  outputFileTracingExcludes: {
    '/api/accreditation/report': ['**/*'],
  },

  // Redirects for consolidated routes
  async redirects() {
    return [
      // Redirect any vercel.app host to canonical domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '.*\\.vercel\\.app',
          },
        ],
        destination: 'https://elevateforhumanity.institute/:path*',
        permanent: true,
      },
      // WWW to non-WWW redirect (canonical domain)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.elevateforhumanity.institute' }],
        destination: 'https://elevateforhumanity.institute/:path*',
        permanent: true,
      },
      
      // Dashboard consolidation
      { source: '/portal/:path*', destination: '/lms/:path*', permanent: true },
      { source: '/student/:path*', destination: '/lms/:path*', permanent: true },
      { source: '/students/:path*', destination: '/lms/:path*', permanent: true },
      { source: '/learners/:path*', destination: '/lms/:path*', permanent: true },
      { source: '/program-holder-portal/:path*', destination: '/program-holder/:path*', permanent: true },
      { source: '/admin-portal/:path*', destination: '/admin/:path*', permanent: true },
      // /dashboard redirect removed - handled by middleware with auth check

      // Tax consolidation
      { source: '/tax-filing/:path*', destination: '/tax/:path*', permanent: true },
      { source: '/tax-services/:path*', destination: '/tax/:path*', permanent: true },
      { source: '/tax-software/:path*', destination: '/tax/:path*', permanent: true },
      { source: '/vita/:path*', destination: '/tax/:path*', permanent: true },

      // Program consolidation
      { source: '/programs-catalog/:path*', destination: '/programs/:path*', permanent: true },
      { source: '/program-finder/:path*', destination: '/programs/:path*', permanent: true },
      { source: '/compare-programs/:path*', destination: '/programs/:path*', permanent: true },

      // Career consolidation
      { source: '/career-center/:path*', destination: '/career-services/:path*', permanent: true },
      { source: '/career-fair/:path*', destination: '/career-services/:path*', permanent: true },

      // Partner consolidation
      { source: '/partner-with-us/:path*', destination: '/partners/:path*', permanent: true },
      { source: '/partner-application/:path*', destination: '/partners/:path*', permanent: true },
      { source: '/partner-courses/:path*', destination: '/partners/:path*', permanent: true },
      { source: '/partner-playbook/:path*', destination: '/partners/:path*', permanent: true },

      // Auth consolidation
      { source: '/forgotpassword', destination: '/auth/forgot-password', permanent: true },
      { source: '/resetpassword', destination: '/auth/reset-password', permanent: true },
      { source: '/verifyemail', destination: '/auth/verify-email', permanent: true },

      // Legal consolidation
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/terms', destination: '/terms-of-service', permanent: true },

      // Verify consolidation
      { source: '/verifycertificate/:path*', destination: '/verify/:path*', permanent: true },

      // Misc redirects
      { source: '/for-students', destination: '/lms', permanent: true },
      { source: '/dashboards/:path*', destination: '/lms/:path*', permanent: true },
      { source: '/portals/:path*', destination: '/lms/:path*', permanent: true },

      // Removed businesses
      { source: '/serene-comfort-care/:path*', destination: '/programs', permanent: true },
      { source: '/kingdom-konnect/:path*', destination: '/programs', permanent: true },
      { source: '/urban-build-crew/:path*', destination: '/programs', permanent: true },
      { source: '/selfish-inc/:path*', destination: '/rise-foundation/:path*', permanent: true },

      // Removed routes
      { source: '/financial-aid/:path*', destination: '/funding/:path*', permanent: true },
      { source: '/forums/:path*', destination: '/blog', permanent: true },
      { source: '/alumni/:path*', destination: '/about', permanent: true },
      { source: '/board/:path*', destination: '/admin/:path*', permanent: true },
      { source: '/receptionist/:path*', destination: '/staff-portal/:path*', permanent: true },
      { source: '/delegate/:path*', destination: '/admin/:path*', permanent: true },
      { source: '/study-groups/:path*', destination: '/lms', permanent: true },
      { source: '/forum/:path*', destination: '/blog', permanent: true },
      { source: '/volunteer/:path*', destination: '/about', permanent: true },
      { source: '/volunteer', destination: '/about', permanent: true },
      { source: '/news/:path*', destination: '/blog/:path*', permanent: true },
      
      // Old 404 URLs from Google - redirect to relevant pages
      { source: '/about/founder', destination: '/about/team', permanent: true },
      { source: '/etpl-programs', destination: '/programs', permanent: true },
      { source: '/intake', destination: '/apply', permanent: true },
      { source: '/scholarships', destination: '/funding', permanent: true },
      { source: '/health-services', destination: '/programs/healthcare', permanent: true },
      { source: '/donate', destination: '/rise-foundation', permanent: true },
      { source: '/resources/:path*', destination: '/blog', permanent: true },
      { source: '/career-uplift-services/:path*', destination: '/career-services', permanent: true },
      { source: '/community', destination: '/blog', permanent: true },
      { source: '/video', destination: '/videos', permanent: true },
    ];
  },
  async headers() {
    const isProduction = process.env.VERCEL_ENV === 'production';
    const isPreview = process.env.VERCEL_ENV === 'preview';
    
    // Base security headers for all environments
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://js.stripe.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src * data: blob: 'unsafe-inline'",
          "font-src 'self' data: https://fonts.gstatic.com",
          "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://api.stripe.com wss://*.supabase.co",
          "frame-src 'self' https://www.youtube.com https://player.vimeo.com https://js.stripe.com",
          "media-src * data: blob:",
          "worker-src 'self' blob:",
        ].join('; '),
      },
    ];

    // Environment-specific robots tag
    if (isPreview) {
      securityHeaders.push({
        key: 'X-Robots-Tag',
        value: 'noindex, nofollow, noarchive',
      });
    } else {
      securityHeaders.push({
        key: 'X-Robots-Tag',
        value: 'noai, noimageai',
      });
    }

    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=3600',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=3600',
          },
        ],
      },

      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=31536000, immutable',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'public, s-maxage=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // Override X-Robots-Tag for images and videos (must come AFTER /:path*)
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=31536000, immutable',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'public, s-maxage=31536000, immutable',
          },
          {
            key: 'X-Robots-Tag',
            value: 'all',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=31536000, immutable',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'public, s-maxage=31536000, immutable',
          },
          {
            key: 'X-Robots-Tag',
            value: 'all',
          },
        ],
      },
    ];
  },
};

// Sentry configuration
const sentryWebpackPluginOptions = {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
