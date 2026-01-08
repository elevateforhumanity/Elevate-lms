import { Metadata } from 'next';
import Intro from '@/components/home/Intro';
import Orientation from '@/components/home/Orientation';
import Pathways from '@/components/home/Pathways';
import Assurance from '@/components/home/Assurance';
import Start from '@/components/home/Start';

export const metadata: Metadata = {
  title: 'Elevate for Humanity | Workforce and Education Hub',
  description:
    'A regulated workforce development and credentialing institute connecting students to approved training, recognized credentials, and real career pathways.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute',
  },
};

// Use ISR for optimal performance with fresh content
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Intro />
      <Orientation />
      <Pathways />
      <Assurance />
      <Start />
    </>
  );
}
