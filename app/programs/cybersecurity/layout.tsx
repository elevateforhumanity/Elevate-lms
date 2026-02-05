import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cybersecurity Training | Elevate for Humanity',
  description: 'Launch your cybersecurity career with industry-recognized certifications. WIOA funding may be available.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/cybersecurity',
  },
};

export default function CybersecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
