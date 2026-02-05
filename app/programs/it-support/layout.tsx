import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IT Support Training | Elevate for Humanity',
  description: 'IT support and help desk training program. CompTIA A+ certification preparation. WIOA funding may be available.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/it-support',
  },
};

export default function ITSupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
