import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tax | Rise up foundation | Free tax help | Elevate for Humanity',
  description: 'Elevate for Humanity - Career training and workforce development programs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/tax/rise-up-foundation/free-tax-help',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
