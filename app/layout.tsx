import type { Metadata } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Elevate for Humanity | Workforce Training & Career Development',
  description: 'Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding.',
  keywords: ['workforce training', 'career development', 'WIOA', 'job training', 'technical education', 'apprenticeships', 'Marion County', 'Indiana'],
  authors: [{ name: 'Elevate for Humanity' }],
  openGraph: {
    title: 'Elevate for Humanity | Workforce Training & Career Development',
    description: 'Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding.',
    url: 'https://elevateconnectsdirectory.org',
    siteName: 'Elevate for Humanity',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevate for Humanity | Workforce Training & Career Development',
    description: 'Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '9sXnIdE4X4AoAeRlu16JXWqNxSOIxOCAvbpakSGp3so',
    other: {
      'msvalidate.01': 'add-your-bing-verification-code-here',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo-efh.svg" />
        <meta name="theme-color" content="#2563EB" />
        <StructuredData />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
