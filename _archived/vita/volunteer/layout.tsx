import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VITA Volunteer',
  description: 'VITA free tax preparation - Volunteer information and resources.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/vita/volunteer',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
