import React from 'react';
import Image from 'next/image';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  height?: 'small' | 'medium' | 'large';
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage = '/images/heroes/hero-homepage.jpg',
  backgroundVideo,
  height = 'medium',
}: PageHeroProps) {
  const heightClasses = {
    small: 'h-[300px] md:h-[350px]',
    medium: 'h-[400px] md:h-[450px]',
    large: 'h-[500px] md:h-[600px]',
  };

  return (
    <section
      className={`relative ${heightClasses[height]} w-full overflow-hidden bg-blue-900`}
    >
      {/* Background */}
      {backgroundVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className="object-cover opacity-40 pointer-events-none"
          sizes="100vw"
        />
      )}

      {/* Text removed from hero banner - clean image only */}
    </section>
  );
}
