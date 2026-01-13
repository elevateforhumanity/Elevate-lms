import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alumni Network | LMS | Elevate For Humanity',
  description: 'Connect with fellow graduates and access alumni resources.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
