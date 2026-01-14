import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Steps | Elevate For Humanity',
  description: 'Your next steps after applying for career training programs.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/next-steps',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
