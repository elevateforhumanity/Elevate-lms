import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Safe imports only - no env-dependent modules, no server calls
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ClientProviders } from '@/components/ClientProviders';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.elevateforhumanity.org'),
  title: {
    default: 'Elevate for Humanity | Free Career Training',
    template: '%s | Elevate for Humanity',
  },
  description: 'Free career training programs in healthcare, skilled trades, and technology. WIOA-funded with job placement support.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-dvh bg-white antialiased`}>
        <ClientProviders>
          <Header />
          <main className="flex-1 pt-[70px]">{children}</main>
          <Footer />
        </ClientProviders>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
