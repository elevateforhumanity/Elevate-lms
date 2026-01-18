import { Metadata } from 'next';

export const metadata: Metadata = {
  title: ' | Elevate for Humanity',
  description: 'Elevate for Humanity - Career training and workforce development programs.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
