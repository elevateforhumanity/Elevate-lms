import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MOU Template | Indiana Barbershop Apprenticeship | Elevate for Humanity',
  description: 'Memorandum of Understanding template for Indiana Barbershop Apprenticeship worksite partners.',
};

export default function MOULayout({ children }: { children: React.ReactNode }) {
  return children;
}
