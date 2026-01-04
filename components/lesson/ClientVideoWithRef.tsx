"use client";

import { useRef } from "react";
import { ProfessionalVideoPlayer } from "@/components/video/ProfessionalVideoPlayer";
import { LessonSidebar } from "@/components/lesson/LessonSidebar";

type Props = {
  src: string;
  poster?: string;
  lessonId: string;
};

export default function ClientVideoWithRef({ src, poster, lessonId }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Wrap our pro player to expose ref + getters
  const getCurrentTime = () =>
    videoRef.current ? videoRef.current.currentTime || 0 : 0;

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, seconds);
  };

  return (
    <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
      <div>
        <ProfessionalVideoPlayer
          src={src}
          poster={poster}
          lessonId={lessonId}
        />
      </div>
      <LessonSidebar
        lessonId={lessonId}
        getCurrentTime={getCurrentTime}
        seekTo={seekTo}
      />
    </div>
  );
}
