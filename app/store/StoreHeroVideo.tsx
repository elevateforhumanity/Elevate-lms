'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

export default function StoreHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {
        // Autoplay blocked - user will need to click play
      });
    }
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const replayVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
      setHasEnded(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-800">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          playsInline
          onEnded={() => setHasEnded(true)}
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src="/videos/avatars/store-assistant.mp4" type="video/mp4" />
        </video>

        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <button
            onClick={toggleMute}
            className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
          
          <span className="text-white text-sm font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
            Store Guide
          </span>
          
          {hasEnded ? (
            <button
              onClick={replayVideo}
              className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all"
              aria-label="Replay"
            >
              <Play className="w-6 h-6" />
            </button>
          ) : (
            <div className="w-12" /> // Spacer for alignment
          )}
        </div>
      </div>
      
      <p className="text-slate-400 text-sm mt-3">
        Watch our guide explain what&apos;s available in the store
      </p>
    </div>
  );
}
