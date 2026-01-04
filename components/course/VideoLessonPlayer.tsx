"use client";

import React from 'react';

import { useRef, useState } from "react";
import type { Lesson } from "@/lms-data/courses";

interface Props {
  lesson: Lesson;
}

export function VideoLessonPlayer({ lesson }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (lesson.type !== "video" || !lesson.videoUrl) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-200">
        This lesson is not a video lesson, or no videoUrl is set.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <video
          ref={videoRef}
          className="h-[220px] w-full bg-black md:h-[300px]"
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={lesson.videoUrl} />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="space-y-1 text-xs text-slate-200">
        <p className="text-[11px] font-semibold text-white">{lesson.title}</p>
        {lesson.description && (
          <p className="text-slate-300">{lesson.description}</p>
        )}
        {lesson.durationMinutes && (
          <p className="text-[10px] text-slate-500">
            Approx. {lesson.durationMinutes} minutes •{" "}
            {isPlaying ? "Playing" : "Paused"}
          </p>
        )}
      </div>
    </div>
  );
}
