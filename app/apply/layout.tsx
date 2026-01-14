import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply Now | Free Career Training | Elevate For Humanity',
  description: 'Apply for 100% free career training programs in healthcare, skilled trades, technology, and business. WIOA-funded programs with job placement support.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/apply',
  },
  openGraph: {
    title: 'Apply Now | Free Career Training',
    description: 'Start your career journey with free training programs. Apply in 10 minutes.',
    url: 'https://elevateforhumanity.institute/apply',
  },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
