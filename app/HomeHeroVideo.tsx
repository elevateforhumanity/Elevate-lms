'use client';

import { useEffect, useRef } from 'react';

const R2_URL = process.env.NEXT_PUBLIC_R2_URL;

export default function HomeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = R2_URL ? `${R2_URL}/videos/hero-home-fast.mp4` : '/videos/hero-home-fast.mp4';
  const posterSrc = '/images/hero-poster.jpg';

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
    <>
      {/* Fallback background image shown while video loads */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${posterSrc})` }}
      />
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectFit: 'cover' }}
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
        poster={posterSrc}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </>
  );
}
