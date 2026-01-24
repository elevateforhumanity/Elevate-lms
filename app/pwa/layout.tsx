import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Elevate Apps',
  description: 'Mobile apps for Elevate for Humanity programs',
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function PWALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
