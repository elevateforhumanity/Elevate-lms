import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Enrollment | Elevate for Humanity',
  description: 'Test enrollment checkout flow for development purposes.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/test-enrollment',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestEnrollmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
