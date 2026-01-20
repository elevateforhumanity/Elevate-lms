
"use client";

import { useEffect, useRef, useState } from 'react';

interface OptimizedVideoProps {
  src: string;
  className?: string;
  audioTrack?: string; // Optional voiceover/TTS audio track
}

export function OptimizedVideo({ src, className = '', audioTrack }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video) return;

    // Auto-play video and audio when component mounts
    const playMedia = async () => {
      try {
        if (audioTrack && audio) {
          // Play video muted with separate audio track
          video.muted = true;
          await Promise.all([video.play(), audio.play()]);
        } else {
          // Play video with its own audio
          video.muted = false;
          await video.play();
        }
        setIsPlaying(true);
      } catch (error) { /* Error handled silently */ 
        // Autoplay blocked by browser, that's fine
        // Silently handle - this is expected behavior
      }
    };

    // Small delay to ensure media is loaded
    const timer = setTimeout(playMedia, 100);

    return () => clearTimeout(timer);
  }, [audioTrack]);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full"
        loop
        muted
        playsInline
        controls={isPlaying}
      />
      {audioTrack && (
        <audio
          ref={audioRef}
          src={audioTrack}
          loop
          className="hidden"
        />
      )}
    </div>
  );
}
