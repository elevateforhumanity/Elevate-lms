import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VITA Schedule',
  description: 'VITA free tax preparation - Schedule information and resources.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/vita/schedule',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
