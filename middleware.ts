import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const canonicalHost = 'elevateforhumanity.org';

  // Redirect www to non-www (canonical)
  if (host === 'www.elevateforhumanity.org') {
    const url = request.nextUrl.clone();
    url.host = canonicalHost;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  // Redirect any vercel.app domain to canonical
  if (host.endsWith('.vercel.app')) {
    const url = request.nextUrl.clone();
    url.host = canonicalHost;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  const isProduction = process.env.VERCEL_ENV === 'production';
  const isCanonical = host === canonicalHost;
  
  // Block indexing on non-canonical hosts
  if (!isCanonical) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
