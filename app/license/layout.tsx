import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'License the Elevate LMS | Elevate for Humanity',
  description: 'White-label LMS + Workforce Platform Licensing. Built for training providers, workforce boards, and employer partners.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/license',
  },
};

export default function LicenseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
