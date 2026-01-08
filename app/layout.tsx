import React from 'react';
import UnregisterSW from "./components/UnregisterSW";
import type { Metadata, Viewport } from 'next';
import './globals.css';
import './globals-mobile-fixes.css';
import './globals-mobile-complete.css';
import '@/branding/brand.css';
import '@/styles/tiktok-animations.css';
import '@/styles/rich-design-system.css';
import './force-black-text.css';
import StructuredData from '@/components/StructuredData';
import { ConditionalLayout } from '@/components/layout/ConditionalLayout';
import { Toaster } from 'react-hot-toast';
import { ClientProviders } from '@/components/ClientProviders';
import { UnregisterServiceWorker } from '@/components/UnregisterServiceWorker';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'sans-serif',
  ],
});

// Viewport configuration (separate from metadata in Next.js 14+)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Global SEO configuration - fixes canonical, OpenGraph, and meta descriptions
const SITE_URL = 'https://www.elevateforhumanity.org';
const isProduction = process.env.VERCEL_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: 'https://www.elevateforhumanity.org',
  },

  title: {
    default: 'Elevate for Humanity',
    template: '%s | Elevate for Humanity',
  },

  // Resource hints for performance
  other: {
    'link': [
      // DNS prefetch for external domains
      { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://connect.facebook.net' },
      // Preconnect for critical resources
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
    ],
  },

  description:
    'Workforce training, credentials, and community programs connecting learners to funded pathways and employer-aligned opportunities.',

  keywords: [
    'free career training Indianapolis',
    'WIOA programs Indiana',
    'free job training Marion County',
    'HVAC training Indianapolis',
    'barber school Indianapolis',
    'healthcare training Indiana',
    'free trade school Indianapolis',
    'workforce development Indianapolis',
    'apprenticeship programs Indiana',
    'free CNA training Indianapolis',
    'free CDL training Indiana',
    'job placement Indianapolis',
    'career change Indianapolis',
    'second chance jobs Indiana',
    'reentry programs Indianapolis',
    'free esthetician school Indianapolis',
    'WIOA eligible programs',
    'WorkOne Indianapolis',
    'free vocational training Indiana',
    'paid training programs Indianapolis',
  ],

  authors: [{ name: 'Elevate for Humanity' }],

  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Elevate for Humanity',
    title: 'Elevate for Humanity',
    description:
      'Workforce training, credentials, and community programs connecting learners to funded pathways and employer-aligned opportunities.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Elevate for Humanity',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Elevate for Humanity',
    description:
      'Workforce training, credentials, and community programs connecting learners to funded pathways and employer-aligned opportunities.',
    images: ['/og-default.jpg'],
  },

  robots: {
    index: isProduction,
    follow: isProduction,
    nocache: !isProduction,
    googleBot: {
      index: isProduction,
      follow: isProduction,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://elevateforhumanity.institute',
    siteName: 'Elevate for Humanity',
    locale: 'en_US',
    images: [
      {
        url: '/images/heroes/hero-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'Elevate for Humanity - Workforce Training and Apprenticeships',
      },
    ],
  },

  facebook: {
    appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Elevate',
  },
  verification: {
    google: '9sXnIdE4X4AoAeRlu16JXWqNxSOIxOCAvbpakSGp3so',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simplified: Always allow indexing on production, always set canonical
  // No async header checks that could cause SSR issues
  const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

  return (
    <html lang="en" className={`light ${inter.variable}`}>
      <head>
        {!isProduction && <meta name="robots" content="noindex,nofollow" />}
        <link rel="canonical" href="https://elevateforhumanity.institute" />
        {/* Preload critical assets to prevent FOUC */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="192x192" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <meta name="theme-color" content="#10b981" />
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <StructuredData />
      </head>
      <body
        className={`${inter.className} min-h-dvh bg-white antialiased`}
        style={{
          fontSize: '16px',
          color: '#000000',
          backgroundColor: '#ffffff',
        }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brandPrimary focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <UnregisterSW />
        <ConditionalLayout>{children}</ConditionalLayout>
        <ClientProviders />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              fontSize: '0.875rem',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
// Cache bust: 2026-01-01T05:30:00Z
// Force rebuild: MOBILE TEXT FIX + CLEAN VIDEO HERO
// Force deployment: 2026-01-01T05:30:00Z
