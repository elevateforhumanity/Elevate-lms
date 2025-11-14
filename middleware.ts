import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const { pathname } = request.nextUrl;

    // Public routes that don't require auth
    const publicRoutes = [
      '/',
      '/login',
      '/signup',
      '/about',
      '/contact',
      '/faq',
      '/blog',
      '/programs',
      '/pricing',
      '/demo',
      '/compare',
      '/privacy-policy',
      '/terms-of-service',
      '/cert/verify',
      '/apply',
      '/enroll',
      '/robots.txt',
      '/sitemap.xml',
      '/api',
    ];

    const isPublicRoute = publicRoutes.some(route => 
      pathname === route || pathname.startsWith(`${route}/`)
    );

    // Add security headers to all responses
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Allow public routes without any checks
    if (isPublicRoute) {
      return response;
    }

    // For now, allow all routes to work - we'll add auth later
    // This prevents the middleware from crashing the site
    return response;

  } catch (error) {
    // If anything goes wrong, just let the request through
    console.error('Middleware error:', error);
    return NextResponse.next();
  }

}

// Configure which routes use middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
