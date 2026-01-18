'use client';

import { usePathname } from 'next/navigation';
import { Component, ErrorInfo, ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { LogoBanner } from './LogoBanner';

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

  // Routes that should NOT show the marketing header/footer
  // Default to showing header/footer if pathname is null (SSR safety)
  const hideMarketingLayout = pathname ? (
    pathname.startsWith('/lms/') ||
    pathname.startsWith('/student/') ||
    pathname.startsWith('/admin/') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/auth/')
  ) : false;

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
      
      <header style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '70px', 
        backgroundColor: '#ffffff', 
        zIndex: 9999,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/logo.png" alt="Elevate" width="40" height="40" style={{ width: '40px', height: '40px' }} />
            <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#111827' }}>Elevate</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="/apply" style={{ 
              backgroundColor: '#2563eb', 
              color: 'white', 
              padding: '10px 20px', 
              borderRadius: '9999px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Apply Now
            </a>
            <a href="/programs" style={{ color: '#374151', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Programs</a>
            <a href="/contact" style={{ color: '#374151', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Contact</a>
          </div>
        </div>
      </header>

      {/* Logo stamp in corner for brand recognition */}
      <LogoBanner />

      <main
        id="main-content"
        className="flex-1"
        style={{ paddingTop: '70px' }}
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
