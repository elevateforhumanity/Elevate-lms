import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phlebotomy Training | Elevate for Humanity',
  description: 'Phlebotomy technician training program. Learn blood draw techniques and lab procedures. WIOA funding may be available.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/phlebotomy',
  },
};

export default function PhlebotomyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
