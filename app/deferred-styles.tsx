'use client';

import { useEffect } from 'react';

export function DeferredStyles() {
  useEffect(() => {
    const stylesheets = [
      '/app/font-consistency.css',
      '/app/globals-mobile-complete.css',
      '/app/globals-mobile-pro.css',
      '/app/globals-modern-design.css',
      '/branding/brand.css',
      '/styles/tiktok-animations.css',
      '/styles/rich-design-system.css',
    ];

    stylesheets.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print';
      link.onload = function() {
        (this as HTMLLinkElement).media = 'all';
      };
      document.head.appendChild(link);
    });
  }, []);

  return null;
}
