'use client';

import { useEffect, useRef } from 'react';

export function CareerHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    const playVideo = () => video.play().catch(() => {});
    playVideo();
    video.addEventListener('canplay', playVideo);
    return () => video.removeEventListener('canplay', playVideo);
  }, []);

  return (
    <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://pub-23811be4d3844e45a8bc2d3dc5e7aaec.r2.dev/videos/career-services-hero.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
