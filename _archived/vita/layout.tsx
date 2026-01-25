import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | VITA Free Tax Prep | Elevate for Humanity',
    default: 'VITA Free Tax Preparation',
  },
  description: 'Free IRS-certified tax preparation through VITA for income under $64K.',
};

export default function VITALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
