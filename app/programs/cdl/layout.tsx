import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CDL Training Program | Elevate for Humanity',
  description: 'Get your Class A CDL in 4-6 weeks. Free training through WIOA funding available. Job placement assistance included.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/cdl',
  },
  openGraph: {
    title: 'CDL Training Program | Elevate for Humanity',
    description: 'Get your Class A CDL in 4-6 weeks. Free training through WIOA funding available.',
    url: 'https://www.elevateforhumanity.org/programs/cdl',
  },
};

export default function CDLLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
