'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

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
    
    const handleCanPlay = () => {
      video.play().catch(() => {});
    };
    
    video.addEventListener('canplay', handleCanPlay);
    
    if (video.readyState >= 3) {
      handleCanPlay();
    }
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <>
      {/* Poster image behind video - loads immediately, hidden by video once it plays */}
      <Image
        src="/images/hero-poster.jpg"
        alt=""
        fill
        priority
        className="object-cover z-0"
        sizes="100vw"
      />
      {/* Video on top - covers poster once loaded */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{ objectFit: 'cover' }}
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </>
  );
}
