'use client';

import { useEffect, useRef } from 'react';

export default function HomeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.preload = 'auto';
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('muted', '');

    const forcePlay = async () => {
      if (!video.paused) return;
      try {
        video.muted = true;
        video.volume = 0;
        await video.play();
      } catch {
        // Silent fail
      }
    };

    forcePlay();
    const t1 = setTimeout(forcePlay, 50);
    const t2 = setTimeout(forcePlay, 100);
    const t3 = setTimeout(forcePlay, 250);
    const t4 = setTimeout(forcePlay, 500);
    const t5 = setTimeout(forcePlay, 1000);

    video.addEventListener('loadedmetadata', forcePlay);
    video.addEventListener('loadeddata', forcePlay);
    video.addEventListener('canplay', forcePlay);
    video.addEventListener('canplaythrough', forcePlay);
    
    const onVisible = () => {
      if (document.visibilityState === 'visible') forcePlay();
    };
    document.addEventListener('visibilitychange', onVisible);

    const onInteract = () => {
      forcePlay();
      ['click', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(e => 
        document.removeEventListener(e, onInteract)
      );
    };
    ['click', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(e => 
      document.addEventListener(e, onInteract, { passive: true })
    );

    return () => {
      [t1, t2, t3, t4, t5].forEach(clearTimeout);
      video.removeEventListener('loadedmetadata', forcePlay);
      video.removeEventListener('loadeddata', forcePlay);
      video.removeEventListener('canplay', forcePlay);
      video.removeEventListener('canplaythrough', forcePlay);
      document.removeEventListener('visibilitychange', onVisible);
      ['click', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(e => 
        document.removeEventListener(e, onInteract)
      );
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ objectFit: 'cover' }}
      loop
      muted
      playsInline
      autoPlay
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
    >
      <source src="/videos/hero-home-fast.mp4" type="video/mp4" />
    </video>
  );
}
