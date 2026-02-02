import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dev Studio | Elevate for Humanity',
  description: 'Browser-based development environment with AI assistance.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
