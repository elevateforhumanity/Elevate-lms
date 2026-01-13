import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Privacy | Elevate For Humanity',
  description: 'Student privacy settings and data management.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
