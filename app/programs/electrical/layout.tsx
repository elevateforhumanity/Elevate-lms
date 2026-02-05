import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electrical Training Program | Elevate for Humanity',
  description: 'Electrical training and certification program. Learn residential and commercial electrical work. WIOA funding available.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/electrical',
  },
};

export default function ElectricalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
