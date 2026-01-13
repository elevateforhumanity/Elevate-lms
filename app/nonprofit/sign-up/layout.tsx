import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Rise Foundation',
  description: 'Rise Foundation - Sign Up programs and resources for mental wellness.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
