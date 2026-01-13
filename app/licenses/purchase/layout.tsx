import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purchase License | Elevate For Humanity',
  description: 'Purchase training licenses and certifications.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
