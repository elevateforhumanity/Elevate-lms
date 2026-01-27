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
      preload="metadata"
      poster="/images/artlist/hero-training-3.jpg"
    >
      <source src="https://pub-23811be4d3844e45a8bc2d3dc5e7aaec.r2.dev/videos/programs-overview-video-with-narration.mp4" type="video/mp4" />
    </video>
  );
}
