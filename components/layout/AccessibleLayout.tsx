'use client';

import { useEffect } from 'react';
import { announceToScreenReader } from '@/lib/wcag/accessibility';

interface AccessibleLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function AccessibleLayout({ children, pageTitle }: AccessibleLayoutProps) {
  useEffect(() => {
    if (pageTitle) {
      announceToScreenReader(`Navigated to ${pageTitle}`);
    }
  }, [pageTitle]);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Skip to main content
      </a>

      <main id="main-content" role="main" tabIndex={-1} className="flex-1">
        {children}
      </main>
    </div>
  );
}
