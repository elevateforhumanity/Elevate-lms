import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VITA Faq',
  description: 'VITA free tax preparation - Faq information and resources.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/vita/faq',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
