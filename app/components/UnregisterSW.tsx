"use client";

import { useEffect } from "react";

export default function UnregisterSW() {
  useEffect(() => {
    // If any Service Worker is controlling this site, unregister it.
    // This is the #1 reason mobile keeps forcing an older build.
    if (typeof window === "undefined") return;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations()
        .then((regs) => Promise.all(regs.map((r) => r.unregister())))
        .catch(() => {});
    }

    // Also try to clear Cache Storage if present.
    if ("caches" in window) {
      caches.keys()
        .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
        .catch(() => {});
    }
  }, []);

  return null;
}
