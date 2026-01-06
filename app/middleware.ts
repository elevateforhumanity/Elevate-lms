import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Canonical URL redirects - 301 permanent
  const redirects: Record<string, string> = {
    // Privacy policy variants → canonical
    '/policies/privacy': '/privacy-policy',
    '/policies/privacy-notice': '/privacy-policy',
    
    // Terms variants → canonical
    '/terms': '/terms-of-service',
    '/policies/terms': '/terms-of-service',
    
    // Add more duplicates as discovered
  };

  if (redirects[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = redirects[pathname];
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
