'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, Volume2, VolumeX, User } from 'lucide-react';

interface AvatarVideoOverlayProps {
  videoSrc: string;
  avatarName?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  autoPlay?: boolean;
  showOnLoad?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function AvatarVideoOverlay({
  videoSrc,
  avatarName = 'AI Guide',
  position = 'bottom-right',
  autoPlay = false,
  showOnLoad = true,
  size = 'medium',
}: AvatarVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(showOnLoad);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    
    if (autoPlay && isVisible) {
      video.play().catch(() => {
        // Autoplay blocked
      });
    }
  }, [autoPlay, isMuted, isVisible]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasInteracted(true);
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleClose = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setIsVisible(false);
    setIsPlaying(false);
  };

  const handleOpen = () => {
    setIsVisible(true);
  };

  // Position classes - same position on mobile and desktop
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-20 right-4',
    'top-left': 'top-20 left-4',
  };

  // Responsive sizes - smaller on mobile
  const sizeClasses = {
    small: isExpanded ? 'w-48 sm:w-64 h-28 sm:h-36' : 'w-36 sm:w-48 h-20 sm:h-28',
    medium: isExpanded ? 'w-56 sm:w-80 h-32 sm:h-48' : 'w-44 sm:w-64 h-24 sm:h-36',
    large: isExpanded ? 'w-64 sm:w-96 h-36 sm:h-56' : 'w-56 sm:w-80 h-32 sm:h-44',
  };

  // Minimized button when closed
  if (!isVisible) {
    return (
      <button
        onClick={handleOpen}
        className={`fixed ${positionClasses[position]} z-[60] flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-full shadow-lg transition-all hover:scale-105`}
        aria-label="Open AI Guide"
      >
        <User className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-xs sm:text-sm font-medium hidden sm:inline">AI Guide</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} z-[60] ${sizeClasses[size]} transition-all duration-300 ease-out`}
    >
      {/* Video Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>

            {/* Mute/Unmute */}
            <button
              onClick={toggleMute}
              className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Avatar name */}
          <span className="text-white text-xs font-medium bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
            {avatarName}
          </span>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Expand/Collapse button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-2 left-2 p-1.5 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all text-xs"
          aria-label={isExpanded ? 'Minimize' : 'Expand'}
        >
          {isExpanded ? '−' : '+'}
        </button>

        {/* Play overlay when not started */}
        {!hasInteracted && !autoPlay && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
            onClick={togglePlay}
          >
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-blue-600 ml-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
