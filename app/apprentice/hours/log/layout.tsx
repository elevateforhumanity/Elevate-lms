import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apprentice | Hours | Log | Elevate for Humanity',
  description: 'Elevate for Humanity - Career training and workforce development programs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/apprentice/hours/log',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
