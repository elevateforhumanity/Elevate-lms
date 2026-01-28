'use client';

import { useEffect, useRef } from 'react';

const R2_URL = process.env.NEXT_PUBLIC_R2_URL;

export default function HomeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = R2_URL ? `${R2_URL}/videos/hero-home-fast.mp4` : '/videos/hero-home-fast.mp4';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force play immediately
    const playVideo = () => {
      video.play().catch(() => {});
    };

    // Try to play right away
    playVideo();
    
    // Also try on various events
    video.addEventListener('loadeddata', playVideo);
    video.addEventListener('canplay', playVideo);
    
    // Retry after short delay as fallback
    const timeout = setTimeout(playVideo, 100);
    
    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {/* Fallback poster image - loads instantly via CSS background, hidden behind video */}
      <div 
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-poster.jpg')" }}
        aria-hidden="true"
      />
      {/* Video on top - starts immediately on page load */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{ objectFit: 'cover' }}
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
        poster="/images/hero-poster.jpg"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </>
  );
}
