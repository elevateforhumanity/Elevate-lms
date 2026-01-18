import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Supersonic fast cash | Diy taxes | Elevate for Humanity',
  description: 'Elevate for Humanity - Career training and workforce development programs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/supersonic-fast-cash/diy-taxes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
