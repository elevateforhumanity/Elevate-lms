"use client";

import React from 'react';

import { useState } from 'react';


interface ProgramOrientationVideoProps {
  onComplete?: () => void;
  videoUrl?: string;
  title?: string;
  description?: string;
}

export default function ProgramOrientationVideo({
  onComplete,
  videoUrl = '/videos/programs-overview-video-with-narration.mp4',
  title = 'Program Orientation',
  description = 'Watch this orientation video to learn about our programs, what to expect, and how to succeed.',
}: ProgramOrientationVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleVideoEnd = () => {
    setHasWatched(true);
    if (onComplete) {
      onComplete();
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Trigger Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
              {hasWatched ? (
                
              ) : (
                <Play className="w-8 h-8 text-blue-600" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-sm text-slate-600 mb-4">{description}</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Play className="w-4 h-4" />
              {hasWatched ? 'Watch Again' : 'Watch Orientation'}
            </button>
            {hasWatched && (
              <span className="ml-3 text-sm text-green-600 font-medium">
                ✓ Completed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Video Container */}
            <div className="relative bg-black aspect-video">
              <video
                className="w-full h-full"
                controls
                autoPlay
                playsInline
                onEnded={handleVideoEnd}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-3">
                {description}
              </p>
              {hasWatched && (
                <div className="flex items-center gap-2 text-green-600">
                  
                  <span className="font-medium">
                    Orientation completed! You can close this window.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
