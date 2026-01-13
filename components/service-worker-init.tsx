"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import { initServiceWorker, setupOfflineSync } from '@/lib/offline/service-worker-manager';
import toast from 'react-hot-toast';
export function ServiceWorkerInit() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  useEffect(() => {
    // Initialize service worker
    initServiceWorker()
      .then((registration) => {
        if (registration) {
          /* Service worker registered */
        }
      })
      .catch(() => {
        /* Service worker registration failed */
      });
    // Setup offline sync
    setupOfflineSync();
    // Listen for service worker updates
    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      setUpdateAvailable(true);
      toast(
        (t) => (
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Update Available</p>
            <p className="text-sm text-black">
              A new version of the app is available.
            </p>
            <button
              onClick={() => {
                window.location.reload();
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
            >
              Reload Now
            </button>
          </div>
        ),
        {
          duration: Infinity,
          position: 'bottom-center',
        }
      );
    };
    window.addEventListener('sw-update', handleUpdate);
    return () => {
      window.removeEventListener('sw-update', handleUpdate);
    };
  }, []);
  return null;
}
