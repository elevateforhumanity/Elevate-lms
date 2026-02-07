import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface VideoHeroProps {
  videoSrc: string;
  badge?: {
    icon: LucideIcon;
    text: string;
    href?: string;
  };
  headline: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  overlayColor?: string;
}

export function VideoHero({
  videoSrc,
  badge,
  headline,
  description,
  primaryCTA,
  secondaryCTA,
  overlayColor = 'from-black/60 via-black/50 to-black/70',
}: VideoHeroProps) {
  return (
    <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {/* Text removed from hero banner - clean video only */}
    </section>
  );
}
