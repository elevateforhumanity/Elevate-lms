'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface PageAvatarProps {
  videoSrc: string;
  title: string;
  poster?: string;
}

const R2_URL = process.env.NEXT_PUBLIC_R2_URL;

export default function PageAvatar({ videoSrc, title, poster }: PageAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  
  // Use R2 URL if configured and video is from /videos/
  const finalVideoSrc = R2_URL && videoSrc.startsWith('/videos/') 
    ? `${R2_URL}${videoSrc}` 
    : videoSrc;

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

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className="w-full bg-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            playsInline
            autoPlay
            muted
            loop
            preload="auto"
          >
            <source src={finalVideoSrc} type="video/mp4" />
          </video>
          
          {/* Mute/Unmute button */}
          <button
            onClick={toggleMute}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </button>
          
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg">
            <span className="font-medium">{title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
