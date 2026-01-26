'use client';

import { useEffect, useRef } from 'react';

export default function HomeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = 'auto';

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
      preload="auto"
    >
      <source src="/videos/hero-home-fast.mp4" type="video/mp4" />
    </video>
  );
}
