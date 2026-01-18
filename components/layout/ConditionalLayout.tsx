'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Component, ErrorInfo, ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

// Lazy load audio component
const PageAudio = dynamic(() => import('@/components/PageAudio'), { ssr: false });



// Error boundary prevents full page crash if header fails to render
class HeaderErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Header render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <header className="w-full h-16 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
            <a href="/" className="font-bold text-black">Elevate for Humanity</a>
            <a href="/apply" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Apply Now</a>
          </div>
        </header>
      );
    }
    return this.props.children;
  }
}

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
      
      <HeaderErrorBoundary>
        <SiteHeader />
      </HeaderErrorBoundary>

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
