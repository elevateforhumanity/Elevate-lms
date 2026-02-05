import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plumbing Training Program | Elevate for Humanity',
  description: 'Plumbing training and certification program. Learn residential and commercial plumbing. WIOA funding available.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/plumbing',
  },
};

export default function PlumbingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
