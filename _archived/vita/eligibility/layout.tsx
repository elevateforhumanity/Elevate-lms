import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VITA Eligibility',
  description: 'VITA free tax preparation - Eligibility information and resources.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/vita/eligibility',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
