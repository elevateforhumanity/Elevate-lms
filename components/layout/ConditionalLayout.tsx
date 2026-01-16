'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Hide header/footer when embedded in demo iframe
  const isEmbed = searchParams.get('embed') === 'true';

  if (isEmbed) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col [--header-h:72px]">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      
      <header className="fixed inset-x-0 top-0 z-[99999] h-[var(--header-h)] bg-white shadow-sm" role="banner">
        <SiteHeader />
      </header>

      <main
        id="main-content"
        className="pt-[var(--header-h)] flex-1"
        role="main"
        tabIndex={-1}
      >
        <Breadcrumbs />
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
