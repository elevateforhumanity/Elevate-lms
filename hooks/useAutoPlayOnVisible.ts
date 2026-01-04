'use client';

import { useEffect } from 'react';

export function useAutoPlayOnVisible(
  ref: React.RefObject<HTMLVideoElement>,
  options?: IntersectionObserverInit
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = ref.current;
          if (!video) return;

          if (entry.isIntersecting) {
            video.play().catch(() => {
              // some browsers block autoplay, ignore
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.6,
        ...options,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref, options]);
}
