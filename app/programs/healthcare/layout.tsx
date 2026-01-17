import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healthcare Training Programs | Elevate for Humanity',
  description: 'Free healthcare training programs including CNA certification, Direct Support Professional, and Drug Collector. WIOA-funded with job placement support.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/healthcare',
  },
  openGraph: {
    title: 'Healthcare Training Programs | Elevate for Humanity',
    description: 'Start your healthcare career with free training programs in Indianapolis.',
    url: 'https://www.elevateforhumanity.org/programs/healthcare',
  },
};

export default function HealthcareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
