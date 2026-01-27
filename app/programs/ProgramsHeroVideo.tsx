'use client';

import { useEffect, useRef } from 'react';

export default function ProgramsHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    
    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        setTimeout(() => {
          video.play().catch(() => {});
        }, 100);
      }
    };

    playVideo();
    video.addEventListener('loadeddata', playVideo);
    
    return () => {
      video.removeEventListener('loadeddata', playVideo);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover brightness-110"
      loop
      muted
      playsInline
      autoPlay
      preload="auto"
      poster="/images/artlist/hero-training-3.jpg"
    >
      <source src="/videos/programs-overview-video-with-narration.mp4" type="video/mp4" />
    </video>
  );
}
