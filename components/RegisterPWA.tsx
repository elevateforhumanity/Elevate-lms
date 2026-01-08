"use client";

import { useEffect } from "react";

export default function RegisterPWA() {
  useEffect(() => {
    // Don't auto-register service worker
    // Only register when user clicks "Install" in PWAInstallPrompt
    // This prevents PWA from loading before user wants it
    
    // The service worker will be registered by PWAInstallPrompt component
    // when user explicitly chooses to install the app
  }, []);

  return null;
}
