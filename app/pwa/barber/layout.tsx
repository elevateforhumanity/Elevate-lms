import type { Metadata, Viewport } from 'next';
import { ServiceWorkerRegistration } from '@/components/pwa/ServiceWorkerRegistration';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { OfflineIndicator } from '@/components/pwa/OfflineIndicator';

export const metadata: Metadata = {
  title: 'Elevate Barber Apprentice',
  description: 'Track your barber apprenticeship hours and progress',
  manifest: '/manifest-barber.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Barber App',
  },
};

export const viewport: Viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function BarberPWALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceWorkerRegistration />
      <OfflineIndicator />
      {children}
      <InstallPrompt 
        appName="Barber Apprentice" 
        appDescription="Track your hours and progress toward licensure"
        themeColor="#7c3aed"
      />
    </>
  );
}
