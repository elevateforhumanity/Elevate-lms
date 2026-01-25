import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VITA Locations',
  description: 'VITA free tax preparation - Locations information and resources.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/vita/locations',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
