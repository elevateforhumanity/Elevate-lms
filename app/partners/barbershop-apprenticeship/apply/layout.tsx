import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply as Barbershop Partner | Indiana Barber Apprenticeship | Elevate for Humanity',
  description: 'Submit your application to become a worksite partner for the Indiana Barber Apprenticeship program.',
  robots: { index: true, follow: true },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
