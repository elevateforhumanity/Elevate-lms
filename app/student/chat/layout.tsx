import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Messages | Student Portal',
  description: 'Chat with instructors and support.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
