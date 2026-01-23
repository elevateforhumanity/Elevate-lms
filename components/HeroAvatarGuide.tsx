'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';

interface HeroAvatarGuideProps {
  videoSrc: string;
  avatarName?: string;
  message?: string;
}

export default function HeroAvatarGuide({
  videoSrc,
  avatarName = 'Guide',
  message = 'Need help? Click to learn more about this program.',
}: HeroAvatarGuideProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  if (isDismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Avatar Video Thumbnail */}
          <div 
            className={`relative cursor-pointer transition-all duration-300 ${
              isExpanded ? 'w-64 h-36' : 'w-20 h-20'
            } rounded-xl overflow-hidden shadow-lg flex-shrink-0`}
            onClick={isExpanded ? togglePlay : handleExpand}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              loop
              playsInline
              onEnded={() => setIsPlaying(false)}
            />
            
            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Play className="w-8 h-8 text-white" fill="white" />
              </div>
            )}

            {/* Controls when expanded */}
            {isExpanded && isPlaying && (
              <div className="absolute bottom-2 right-2 flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  className="p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70"
                >
                  <Pause className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Message */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm">{avatarName}</p>
            <p className="text-gray-600 text-sm truncate">{message}</p>
            {!isExpanded && (
              <button 
                onClick={handleExpand}
                className="text-blue-600 text-sm font-medium hover:text-blue-700 mt-1"
              >
                Watch video guide →
              </button>
            )}
          </div>

          {/* Dismiss */}
          <button
            onClick={() => setIsDismissed(true)}
            className="p-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
