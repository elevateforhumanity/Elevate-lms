import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welding Training Program | Elevate for Humanity',
  description: 'Welding training and certification program. MIG, TIG, and stick welding. AWS certification preparation. WIOA funding available.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/welding',
  },
};

export default function WeldingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
