"use client";

import { useEffect } from "react";

export default function RegisterPWA() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    // Only register service worker AFTER page is fully loaded
    const registerSW = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("PWA: Service Worker registered after page load");
        })
        .catch((error) => {
          console.error("PWA: Service Worker registration failed:", error);
        });
    };

    // Wait for page to be completely loaded
    if (document.readyState === "complete") {
      // Page already loaded
      setTimeout(registerSW, 1000); // Wait 1 second after load
    } else {
      // Wait for load event
      window.addEventListener("load", () => {
        setTimeout(registerSW, 1000); // Wait 1 second after load
      });
    }
  }, []);

  return null;
}
