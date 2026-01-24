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
  '/employer-portal': ['employer', 'admin', 'super_admin'],
  '/employer/dashboard': ['employer', 'admin', 'super_admin'],
  '/employer/candidates': ['employer', 'admin', 'super_admin'],
  '/employer/jobs': ['employer', 'admin', 'super_admin'],
  '/employer/reports': ['employer', 'admin', 'super_admin'],
  '/employer/settings': ['employer', 'admin', 'super_admin'],
};

// Routes restricted to specific admin emails only
const ADMIN_ONLY_ROUTES = ['/admin'];

// Routes that require authentication (any role)
const AUTH_REQUIRED_ROUTES = ['/student', '/my-courses', '/my-progress', '/settings'];

// Routes that require onboarding completion
const ONBOARDING_REQUIRED_ROUTES = ['/hub', '/lms', '/student-portal', '/my-courses', '/my-progress'];

// Super admin emails - full platform access (platform owner)
const SUPER_ADMIN_EMAILS = ['elizabethpowell6262@gmail.com'];

// Admin emails that bypass onboarding requirement (includes super admins)
const ADMIN_EMAILS = ['elizabethpowell6262@gmail.com'];

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

  // Check if route is admin-only
  const isAdminOnlyRoute = ADMIN_ONLY_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isAdminOnlyRoute) {
    // Super admins (platform owner) have full access
    if (SUPER_ADMIN_EMAILS.includes(user.email || '')) {
      return response;
    }

    // For license holders - check if they are admin of their own tenant
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, tenant_id')
      .eq('id', user.id)
      .single();

    // License holders with admin/super_admin role can access their tenant's admin
    if (profile?.role === 'admin' || profile?.role === 'super_admin') {
      // They can only access admin for their own tenant
      // Inject tenant context for downstream handlers
      if (profile.tenant_id) {
        response.headers.set('x-tenant-id', profile.tenant_id);
      }
      return response;
    }

    // Staff with admin permissions granted by license holder
    if (profile?.role === 'staff') {
      // Check if staff has admin permissions for their tenant
      const { data: permissions } = await supabase
        .from('staff_permissions')
        .select('can_access_admin')
        .eq('user_id', user.id)
        .eq('tenant_id', profile.tenant_id)
        .single();

      if (permissions?.can_access_admin) {
        if (profile.tenant_id) {
          response.headers.set('x-tenant-id', profile.tenant_id);
        }
        return response;
      }
    }

    // No access
    return NextResponse.redirect(new URL('/unauthorized', request.url), { status: 307 });
  }

  // Check role for protected routes
  if (protectedRoute && !isAdminOnlyRoute) {
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

  // Check onboarding completion for restricted routes
  const requiresOnboarding = ONBOARDING_REQUIRED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (requiresOnboarding) {
    // Skip onboarding check for the welcome page itself
    if (pathname === '/hub/welcome') {
      return response;
    }

    // Admin emails bypass onboarding requirement
    if (ADMIN_EMAILS.includes(user.email || '')) {
      return response;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed, role')
      .eq('id', user.id)
      .single();

    // Admins and super_admins bypass onboarding
    if (profile?.role === 'admin' || profile?.role === 'super_admin') {
      return response;
    }

    // If onboarding not completed, redirect to onboarding
    if (!profile?.onboarding_completed) {
      return NextResponse.redirect(new URL('/onboarding', request.url), { status: 307 });
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
