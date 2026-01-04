"use client";

import React from 'react';

import { useState } from "react";

interface ScormPlayerProps {
  launchUrl: string;
  title?: string;
}

export function ScormPlayer({ launchUrl, title }: ScormPlayerProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <h2 className="text-sm font-semibold text-slate-100">
          {title}
        </h2>
      )}
      <div className="relative h-[70vh] w-full overflow-hidden rounded-xl border border-slate-800 bg-black">
        {!loaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/80">
            <p className="rounded-md bg-slate-900 px-3 py-2 text-xs text-slate-200">
              Loading course… If the screen stays blank, make sure the SCORM
              package is unzipped under <code className="font-mono text-[10px]">public{launchUrl}</code>.
            </p>
          </div>
        )}
        <iframe
          src={launchUrl}
          className="h-full w-full border-0"
          onLoad={() => setLoaded(true)}
          title={title || "SCORM Course"}
        />
      </div>
      <p className="text-[11px] text-slate-400">
        Tip: For the best experience, use a laptop or tablet. Progress tracking
        and SCORM data can be wired into the LMS backend next; this player
        focuses on getting content running quickly.
      </p>
    </div>
  );
}
