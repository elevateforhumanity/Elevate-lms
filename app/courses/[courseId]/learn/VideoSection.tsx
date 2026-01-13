"use client";

import React from 'react';

import { useRef, useState } from 'react';

interface VideoSectionProps {
  videoUrl: string;
  lessonId: string;
  courseId: string;
}

export default function VideoSection({ videoUrl, lessonId, courseId }: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percent);

      // Au progress every 5 seconds
      if (Math.floor(videoRef.current.currentTime) % 5 === 0) {
        saveProgress(videoRef.current.currentTime);
      }
    }
  };

  const saveProgress = async (currentTime: number) => {
    try {
      await fetch(`/api/courses/${courseId}/lessons/${lessonId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: currentTime }),
      });
    } catch { /* Error handled silently */ 
    // Error handled
  }
  };

  return (
    <div className="bg-black rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full aspect-video"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => saveProgress(videoRef.current?.duration || 0)}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
