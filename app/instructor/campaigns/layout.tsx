import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instructor | Campaigns | Elevate for Humanity',
  description: 'Elevate for Humanity - Career training and workforce development programs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/instructor/campaigns',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
