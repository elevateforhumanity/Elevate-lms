import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload Documents | Elevate For Humanity',
  description: 'Upload required documents for your application.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
