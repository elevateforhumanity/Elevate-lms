import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What to Bring | VITA Free Tax Prep',
  description: 'Documents and information to bring to your free VITA tax appointment.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/vita/what-to-bring',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
