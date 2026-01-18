import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Generate Report | FERPA Portal',
  description: 'Generate a custom FERPA compliance report.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
