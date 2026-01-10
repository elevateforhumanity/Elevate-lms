'use client';

import React from 'react';

import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
  poster?: string;
  overlay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function VideoBackground({
  videoUrl,
  poster,
  overlay = true,
  className = '',
  children,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Au video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked, that's okay
      });
    }
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
