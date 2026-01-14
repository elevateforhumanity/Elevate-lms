import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VITA Faq',
  description: 'VITA free tax preparation - Faq information and resources.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/vita/faq',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
