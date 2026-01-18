import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programs | Barber apprenticeship | Apply | Elevate for Humanity',
  description: 'Elevate for Humanity - Career training and workforce development programs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/barber-apprenticeship/apply',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
