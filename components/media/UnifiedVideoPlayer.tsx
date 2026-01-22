"use client";

import React from "react";

type UnifiedVideoPlayerProps = {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
};

export function UnifiedVideoPlayer({
  src,
  poster,
  title = "Course video",
  autoPlay = false,
  controls = true,
  className = "",
}: UnifiedVideoPlayerProps) {
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  const isVimeo = src.includes("vimeo.com");

  if (isYouTube || isVimeo) {
    return (
      <div className={`relative w-full overflow-hidden rounded-xl bg-black ${className}`}>
        <div className="aspect-video">
          <iframe
            src={src}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  // Default HTML5 video
  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-black ${className}`}>
      <video
        src={src}
        poster={poster}
        controls={controls}
        autoPlay={autoPlay}
        className="h-full w-full"
      >
        Sorry, your browser does not support video playback.
      </video>
    </div>
  );
}
