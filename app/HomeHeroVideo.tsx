'use client';

import { useEffect, useRef, useState } from 'react';

const R2_URL = process.env.NEXT_PUBLIC_R2_URL;

export default function HomeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoSrc = R2_URL ? `${R2_URL}/videos/hero-home-fast.mp4` : '/videos/hero-home-fast.mp4';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        // Ensure video is muted (required for autoplay)
        video.muted = true;
        video.playsInline = true;
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        // Autoplay blocked - show poster image
        console.log('Video autoplay blocked, showing poster');
      }
    };

    // Try to play immediately
    playVideo();
    
    // Retry on user interaction if autoplay was blocked
    const handleInteraction = () => {
      if (!isPlaying) {
        playVideo();
      }
    };

    // Also try on various events
    video.addEventListener('loadeddata', playVideo);
    video.addEventListener('canplay', playVideo);
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });
    
    // Retry after delays as fallback
    const timeout1 = setTimeout(playVideo, 100);
    const timeout2 = setTimeout(playVideo, 500);
    const timeout3 = setTimeout(playVideo, 1000);
    
    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [isPlaying]);

  return (
    <>
      {/* Fallback poster image - loads instantly via CSS background */}
      <div 
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-poster.jpg')" }}
        aria-hidden="true"
      />
      {/* Video on top */}
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
