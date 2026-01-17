'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

// Lazy load audio component
const PageAudio = dynamic(() => import('@/components/PageAudio'), { ssr: false });

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Routes that should NOT show the marketing header/footer
  const hideMarketingLayout = 
    pathname?.startsWith('/lms/') ||
    pathname?.startsWith('/student/') ||
    pathname?.startsWith('/admin/') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/auth/');

  if (hideMarketingLayout) {
    return (
      <div className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <main id="main-content" className="flex-1" role="main" tabIndex={-1}>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      
      <SiteHeader />

      <main
        id="main-content"
        className="flex-1"
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* Ambient music on pages without video heroes */}
      <PageAudio />

      <SiteFooter />
    </div>
  );
}
