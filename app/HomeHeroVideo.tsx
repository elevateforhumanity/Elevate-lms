'use client';

import { useEffect, useRef } from 'react';

const R2_URL = process.env.NEXT_PUBLIC_R2_URL;

export default function HomeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = R2_URL ? `${R2_URL}/videos/hero-home-fast.mp4` : '/videos/hero-home-fast.mp4';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ objectFit: 'cover' }}
      loop
      muted
      playsInline
      autoPlay
      preload="metadata"
      poster="/images/heroes-hq/homepage-hero.jpg"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
