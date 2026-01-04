"use client";

import React from 'react';

import { useEffect, useState } from 'react';

export function MiladyOrientationTracker({
  userId,
  alreadyCompleted,
}: {
  userId: string;
  alreadyCompleted: boolean;
}) {
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    if (alreadyCompleted || marked) return;

    const markOrientation = async () => {
      try {
        await fetch('/api/student/mark-milady-orientation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        setMarked(true);
      } catch (error: unknown) {
        // Error: $1
      }
    };

    // Mark after 3 seconds on page (proves engagement)
    const timer = setTimeout(markOrientation, 3000);
    return () => clearTimeout(timer);
  }, [userId, alreadyCompleted, marked]);

  return null;
}
