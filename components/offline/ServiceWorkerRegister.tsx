"use client";

import React from 'react';
// components/offline/ServiceWorkerRegister.tsx

import { useEffect } from 'react';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        // Error: $1
    }
  }, []);

  return null;
}
