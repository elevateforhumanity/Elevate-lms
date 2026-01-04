'use client';

import { useEffect, RefObject } from 'react';

type UseVideoProgressOptions = {
  lessonId?: string | number;
  threshold?: number; // e.g. 0.8 for 80%
};

export function useVideoProgress(
  ref: RefObject<HTMLVideoElement>,
  { lessonId, threshold = 0.8 }: UseVideoProgressOptions = {}
) {
  useEffect(() => {
    const video = ref.current;
    if (!video || !lessonId) return;

    let hasReportedComplete = false;

    const handleTimeUpdate = () => {
      if (!video.duration || !lessonId) return;

      const progress = video.currentTime / video.duration;

      if (progress >= threshold && !hasReportedComplete) {
        hasReportedComplete = true;

        // Fire-and-forget call to your Next.js API route
        fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lessonId,
            duration: video.duration,
            watchedSeconds: video.currentTime,
            completed: true,
          }),
        }).catch(() => {
          // ignore errors - don't break video
        });
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [ref, lessonId, threshold]);
}
