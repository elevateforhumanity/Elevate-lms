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
    
    // Force immediate play
    const playImmediately = () => {
      video.play().catch(() => {});
    };
    
    // Try to play immediately
    playImmediately();
    
    // Also try on canplay event
    video.addEventListener('canplay', playImmediately);
    
    return () => {
      video.removeEventListener('canplay', playImmediately);
    };
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
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
