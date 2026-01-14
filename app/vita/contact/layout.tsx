import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VITA Contact',
  description: 'VITA free tax preparation - Contact information and resources.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/vita/contact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
