import { Metadata } from 'next';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';
import Intro from '@/components/home/Intro';
import FrameworkDiagram from '@/components/home/FrameworkDiagram';
import Orientation from '@/components/home/Orientation';
import Programs from '@/components/home/Programs';
import Pathways from '@/components/home/Pathways';
import Assurance from '@/components/home/Assurance';
import Start from '@/components/home/Start';
import { currentHomeHero, enableAudioNarration } from '@/config/hero-videos';

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
        withAudio={enableAudioNarration}
        voiceoverSrc="/videos/voiceover.mp3"
        headline="Elevate for Humanity"
        subheadline="A regulated workforce development and credentialing institute"
        primaryCTA={{ text: 'Explore Programs', href: '/programs' }}
        secondaryCTA={{ text: 'Check Eligibility', href: '/eligibility' }}
      />
      <Intro />
      <FrameworkDiagram />
      <Orientation />
      <Programs />
      <Pathways />
      <Assurance />
      <Start />
    </>
  );
}
