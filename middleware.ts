import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// LMS domain - routes to /student-portal paths
const LMS_DOMAIN = 'elevateforhumanityeducation.com';

// Supersonic Fast Cash domain - routes to /supersonic-fast-cash paths
const SUPERSONIC_DOMAIN = 'supersonicfastermoney.com';

// Platform licensing subdomain - routes to /platform/licensing paths
const PLATFORM_SUBDOMAIN = 'platform.elevateforhumanity.org';

// Routes that require authentication and specific roles
const PROTECTED_ROUTES: Record<string, string[]> = {
  '/admin': ['admin', 'super_admin'],
  '/staff-portal': ['staff', 'admin', 'super_admin', 'advisor'],
  '/instructor': ['instructor', 'admin', 'super_admin'],
  '/program-holder': ['program_holder', 'admin', 'super_admin'],
  '/workforce-board': ['workforce_board', 'admin', 'super_admin'],
  '/employer': ['employer', 'admin', 'super_admin'],
};

// Routes that require authentication (any role)
const AUTH_REQUIRED_ROUTES = ['/student', '/my-courses', '/my-progress', '/settings'];

// Webhook paths that bypass auth entirely (Stripe signature verification handles security)
// CANONICAL WEBHOOK PATHS (bypass auth)
// Only these two should be registered in Stripe:
// 1. /api/webhooks/stripe - All learner payments
// 2. /api/license/webhook - License lifecycle only
const WEBHOOK_PATHS = [
  '/api/webhooks/stripe',      // Canonical learner webhook
  '/api/license/webhook',      // Canonical license webhook
  '/api/stripe/webhook',       // Deprecated - forwards to canonical
  '/api/store/webhook',        // Deprecated - forwards to canonical
  '/api/store/licenses/webhook', // Deprecated - forwards to canonical
  '/api/donations/webhook',    // Donations (separate product)
];

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // ============================================
  // WEBHOOK BYPASS (PATCH 4.1)
  // Stripe webhooks use signature verification, not auth
  // ============================================
  if (WEBHOOK_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // ============================================
  // DOMAIN-BASED ROUTING
  // ============================================

  // LMS domain routing (elevateforhumanityeducation.com -> /student-portal)
  if (host.includes(LMS_DOMAIN)) {
    // Skip for static files and API routes
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    // Root of LMS domain -> student portal
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/student-portal', request.url));
    }

    // Already on /student-portal path, allow through
    if (pathname.startsWith('/student-portal')) {
      return NextResponse.next();
    }

    // Login/auth pages - allow through
    if (pathname === '/login' || pathname === '/signup' || pathname === '/unauthorized') {
      return NextResponse.next();
    }

    // Common student routes - rewrite to /student-portal/*
    const studentRoutes = ['/my-courses', '/my-progress', '/courses', '/programs', '/certificates', '/settings'];
    if (studentRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.rewrite(new URL(`/student-portal${pathname}`, request.url));
    }

    // Default: rewrite to /student-portal/*
    return NextResponse.rewrite(new URL(`/student-portal${pathname}`, request.url));
  }

  // Supersonic Fast Cash domain routing (supersonicfastermoney.com -> /supersonic-fast-cash)
  if (host.includes(SUPERSONIC_DOMAIN)) {
    // Skip for static files and API routes
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    // Root of Supersonic domain -> supersonic-fast-cash homepage
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/supersonic-fast-cash', request.url));
    }

    // Already on /supersonic-fast-cash path, allow through
    if (pathname.startsWith('/supersonic-fast-cash')) {
      return NextResponse.next();
    }

    // Login/auth pages - allow through
    if (pathname === '/login' || pathname === '/signup' || pathname === '/unauthorized') {
      return NextResponse.next();
    }

    // Rewrite all other paths to /supersonic-fast-cash/*
    return NextResponse.rewrite(new URL(`/supersonic-fast-cash${pathname}`, request.url));
  }

  // Platform subdomain routing (platform.elevateforhumanity.org -> /platform/licensing)
  if (host === PLATFORM_SUBDOMAIN || host === 'platform.elevateforhumanity.org') {
    // Skip for static files and API routes
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    // Root of platform subdomain -> licensing page
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/platform/licensing', request.url));
    }

    // Already on /platform path, allow through
    if (pathname.startsWith('/platform')) {
      return NextResponse.next();
    }

    // Rewrite all other paths to /platform/licensing/*
    return NextResponse.rewrite(new URL(`/platform/licensing${pathname}`, request.url));
  }

  // Redirect non-www .org to www .org
  if (host === 'elevateforhumanity.org') {
    const url = request.nextUrl.clone();
    url.host = 'www.elevateforhumanity.org';
    url.protocol = 'https';
    url.port = '';
    return NextResponse.redirect(url, { status: 308 });
  }

  // ============================================
  // AUTH PROTECTION
  // ============================================

  // Skip auth check for public routes, static files, API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/unauthorized'
  ) {
    return NextResponse.next();
  }

  // Check if route requires protection
  const protectedRoute = Object.keys(PROTECTED_ROUTES).find((route) =>
    pathname.startsWith(route)
  );
  const authRequired = AUTH_REQUIRED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!protectedRoute && !authRequired) {
    return NextResponse.next();
  }

  // Create Supabase client for auth check
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next();
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  // Not authenticated - redirect to login with return URL
  if (!user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl, { status: 307 });
  }

  // Check role for protected routes
  if (protectedRoute) {
    const allowedRoles = PROTECTED_ROUTES[protectedRoute];
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || !allowedRoles.includes(profile.role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url), { status: 307 });
    }
  }

  // ============================================
  // TENANT CONTEXT INJECTION (STEP 4B)
  // ============================================
  // Inject tenant context headers for downstream route handlers
  const tenantId = user.user_metadata?.tenant_id;
  const userRole = user.user_metadata?.role || 'user';

  if (tenantId) {
    response.headers.set('x-tenant-id', tenantId);
  }
  response.headers.set('x-user-id', user.id);
  response.headers.set('x-user-role', userRole);

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
};
