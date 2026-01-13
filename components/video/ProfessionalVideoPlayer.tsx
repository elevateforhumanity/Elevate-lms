"use client";

import React from 'react';

import { useEffect, useRef, useState } from "react";

type CaptionTrack = {
  src: string;
  label: string;
  srclang: string;
  default?: boolean;
};

type ProfessionalVideoPlayerProps = {
  src: string;
  poster?: string;
  lessonId: string;
  className?: string;
  captions?: CaptionTrack[];
};

export function ProfessionalVideoPlayer({
  src,
  poster,
  lessonId,
  className,
  captions,
}: ProfessionalVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loading, setLoading] = useState(true);

  // Restore last position
  useEffect(() => {
    let canceled = false;

    async function fetchProgress() {
      try {
        const res = await fetch(
          `/api/video/progress?lessonId=${lessonId}`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const json = await res.json();
        if (!json?.progress || canceled) return;

        const { last_position_seconds } = json.progress;
        if (
          videoRef.current &&
          last_position_seconds &&
          last_position_seconds > 0
        ) {
          videoRef.current.currentTime = last_position_seconds;
        }
      } catch (e) {
        // Error: $1
      }
    }

    fetchProgress();
    return () => {
      canceled = true;
    };
  }, [lessonId]);

  // Save progress periodically
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handler = () => {
      if (!video.duration || isNaN(video.duration)) return;

      // 1) Save progress
      fetch("/api/video/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          lastPositionSeconds: video.currentTime,
          durationSeconds: video.duration,
        }),
      // Error: $1

      // 2) Log watch tick (for streaks & goals)
      // Assume interval is 8 seconds
      fetch("/api/activity/watch-tick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seconds: 8 }),
      // Error: $1
    };

    const interval = window.setInterval(handler, 8000); // every 8 seconds

    return () => {
      window.clearInterval(interval);
      handler(); // final save
    };
  }, [lessonId]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(
      0,
      Math.min(video.duration || Infinity, video.currentTime + seconds)
    );
  };

  const changeSpeed = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = value;
    setSpeed(value);
  };

  const enterPiP = async () => {
    const video = videoRef.current as any;
    try {
      if (video && document.pictureInPictureEnabled) {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await video.requestPictureInPicture();
        }
      }
    } catch (e) {
      // Error: $1
    }
  };

  const toggleCaptions = () => {
    const video = videoRef.current;
    if (!video) return;

    // Toggle first text track
    const tracks = video.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      track.mode = track.mode === "showing" ? "hidden" : "showing";
    }
  };

  return (
    <div
      className={`w-full rounded-xl border p-4 flex flex-col gap-3 ${className || ""}`}
    >
      <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="h-full w-full"
          playsInline
          onCanPlay={() => {
            setLoading(false);
            setIsReady(true);
          }}
          onWaiting={() => setLoading(true)}
          onPlaying={() => setLoading(false)}
          controls={false}
        >
          {captions?.map((track, idx) => (
            <track
              key={idx}
              kind="subtitles"
              src={track.src}
              label={track.label}
              srcLang={track.srclang}
              default={track.default}
            />
          ))}
        </video>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm bg-black/40">
            Loading video…
          </div>
        )}
        {!loading && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0"
            aria-label="Play / pause"
          />
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => skip(-10)}
            className="rounded-full border px-3 py-1 hover:bg-slate-100 transition"
          >
            -10s
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="rounded-full border px-4 py-1 font-semibold hover:bg-slate-100 transition"
          >
            Play / Pause
          </button>
          <button
            type="button"
            onClick={() => skip(10)}
            className="rounded-full border px-3 py-1 hover:bg-slate-100 transition"
          >
            +10s
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1">
            Speed
            <select
              value={speed}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => changeSpeed(Number(e.target.value))}
              className="rounded border px-2 py-1 text-sm"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </label>

          <button
            type="button"
            onClick={enterPiP}
            className="rounded-full border px-3 py-1 hover:bg-slate-100 transition"
          >
            PiP
          </button>

          {captions && captions.length > 0 && (
            <button
              type="button"
              onClick={toggleCaptions}
              className="rounded-full border px-3 py-1 hover:bg-slate-100 transition"
            >
              CC
            </button>
          )}
        </div>
      </div>

      {!isReady && (
        <p className="text-xs text-slate-500">
          Video initializing… controls will become active in a moment.
        </p>
      )}
    </div>
  );
}
