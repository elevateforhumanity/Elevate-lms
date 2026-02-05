import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship Program | Elevate For Humanity',
  description: 'Become a licensed barber through our USDOL Registered Apprenticeship. Learn from master barbers, earn while you learn.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/barber',
  },
  openGraph: {
    title: 'Barber Apprenticeship Program | Elevate For Humanity',
    description: 'Become a licensed barber through our USDOL Registered Apprenticeship. Learn from master barbers, earn while you learn.',
    url: 'https://www.elevateforhumanity.org/programs/barber',
  },
};

export default function BarberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
