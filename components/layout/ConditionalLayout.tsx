'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Always show header/footer - all pages should be discoverable
  const shouldShowHeaderFooter = true;

  return (
    <div className="min-h-screen flex flex-col [--header-h:72px]">
      <header className="fixed inset-x-0 top-0 z-[99999] h-[var(--header-h)] bg-white shadow-sm">
        <SiteHeader />
      </header>

      <main
        id="main-content"
        className="pt-[var(--header-h)] flex-1"
      >
        <Breadcrumbs />
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
