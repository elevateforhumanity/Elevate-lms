import { Metadata } from 'next';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';
import Intro from '@/components/home/Intro';
import Orientation from '@/components/home/Orientation';
import Highlights from '@/components/home/Highlights';
import Pathways from '@/components/home/Pathways';
import Testimonials from '@/components/home/Testimonials';
import Assurance from '@/components/home/Assurance';
import Start from '@/components/home/Start';
import { currentHomeHero } from '@/config/hero-videos';

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
      <VideoHeroBanner
        videoSrc={currentHomeHero}
        withAudio={false}
        headline="Free Career Training. Real Credentials. Clear Pathways."
        subheadline="100% funded workforce training through WIOA, WRG, and DOL programs. No tuition. No debt. Earn industry certifications in healthcare, skilled trades, technology, and business."
        primaryCTA={{ text: 'View Programs', href: '/programs' }}
        secondaryCTA={{ text: 'Check Eligibility', href: '/eligibility' }}
      />
      <Intro />
      <Orientation />
      <Highlights />
      <Pathways />
      <Testimonials />
      <Assurance />
      <Start />
    </>
  );
}
