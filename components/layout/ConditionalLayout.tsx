'use client';

import { usePathname } from 'next/navigation';
import { Component, ErrorInfo, ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

// Generic error boundary for layout components
class LayoutErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode; name: string },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode; name: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[${this.props.name}] Render error:`, error.message);
    if (typeof window !== 'undefined') {
      console.error(`[${this.props.name}] Stack:`, errorInfo.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

// Fallback header if SiteHeader crashes
function FallbackHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <a href="/" className="font-bold text-gray-900">Elevate for Humanity</a>
        <a href="/apply" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Apply Now</a>
      </div>
    </header>
  );
}

// Fallback footer if SiteFooter crashes
function FallbackFooter() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} Elevate for Humanity</p>
      </div>
    </footer>
  );
}

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Routes that use AppShell (no marketing header/footer)
  // These are authenticated app routes with their own navigation
  const APP_SHELL_ROUTES = [
    '/lms/',           // LMS app routes (has LMSNavigation)
    '/admin/',         // Admin dashboard
    '/admin-login',    // Admin login
    '/staff-portal/',  // Staff portal
    '/instructor/',    // Instructor portal
    '/employer/',      // Employer dashboard
    '/partner/',       // Partner portal
    '/program-holder/',// Program holder dashboard
    '/workforce-board/',// Workforce board
    '/creator/',       // Creator dashboard
    '/student/',       // Student routes
  ];
  
  // Routes that use minimal shell (login/auth pages - no header/footer)
  const MINIMAL_SHELL_ROUTES = [
    '/login',
    '/signup',
    '/auth/',
    '/reset-password',
    '/forgot-password',
    '/verify-email',
  ];
  
  // Determine which shell to use
  const useAppShell = pathname ? APP_SHELL_ROUTES.some(route => pathname.startsWith(route)) : false;
  const useMinimalShell = pathname ? MINIMAL_SHELL_ROUTES.some(route => pathname.startsWith(route)) : false;
  const hideMarketingLayout = useAppShell || useMinimalShell;

  // Minimal layout for app routes (LMS, admin, etc.)
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

  // Full marketing layout with header and footer
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      
      <LayoutErrorBoundary name="Header" fallback={<FallbackHeader />}>
        <SiteHeader />
      </LayoutErrorBoundary>

      <main
        id="main-content"
        className="flex-1 pt-[70px]"
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>

      <LayoutErrorBoundary name="Footer" fallback={<FallbackFooter />}>
        <SiteFooter />
      </LayoutErrorBoundary>
    </div>
  );
}
