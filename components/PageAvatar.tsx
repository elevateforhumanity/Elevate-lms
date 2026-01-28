'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';

interface PageAvatarProps {
  videoSrc: string;
  title: string;
  poster?: string;
}

const R2_URL = process.env.NEXT_PUBLIC_R2_URL;

export default function PageAvatar({ videoSrc, title, poster }: PageAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayPrompt, setShowPlayPrompt] = useState(true);
  
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

  const enableSound = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = false;
    setIsMuted(false);
    setShowPlayPrompt(false);
    video.currentTime = 0;
    video.play();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(video.muted);
    setShowPlayPrompt(false);
  };

  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-white py-8">
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
          
          {/* Click to hear prompt - prominent */}
          {showPlayPrompt && isMuted && (
            <button
              onClick={enableSound}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer group"
            >
              <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-full font-semibold flex items-center gap-3 shadow-lg transform group-hover:scale-105 transition-transform">
                <Play className="w-6 h-6" fill="white" />
                Click to Hear Guide
              </div>
            </button>
          )}
          
          {/* Mute/Unmute button */}
          {!showPlayPrompt && (
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
          )}
          
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg">
            <span className="font-medium">{title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
