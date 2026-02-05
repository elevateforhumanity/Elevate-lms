import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business & Financial Programs | Elevate for Humanity',
  description: 'Business and financial training programs including tax preparation, entrepreneurship, and professional development. Start your business career today.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/business',
  },
  openGraph: {
    title: 'Business & Financial Programs | Elevate for Humanity',
    description: 'Business and financial training programs including tax preparation and entrepreneurship.',
    url: 'https://www.elevateforhumanity.org/programs/business',
  },
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
