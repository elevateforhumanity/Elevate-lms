import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Routes that require active enrollment
const ENROLLMENT_PROTECTED_ROUTES = [
  '/dashboard',
  '/courses',
  '/learn',
];

// Routes that are part of the enrollment flow (don't redirect these)
const ENROLLMENT_FLOW_ROUTES = [
  '/enrollment/confirmed',
  '/enrollment/orientation',
  '/enrollment/documents',
  '/enrollment/placement',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and auth
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/auth') ||
    pathname.includes('.') ||
    pathname === '/login' ||
    pathname === '/signup'
  ) {
    return NextResponse.next();
  }

  // Check if route requires enrollment protection
  const requiresEnrollment = ENROLLMENT_PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route)
  );

  if (!requiresEnrollment) {
    return NextResponse.next();
  }

  // Create Supabase client
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Get user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Not logged in - redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check enrollment state
  const { data: enrollment } = await supabase
    .from('program_enrollments')
    .select('enrollment_state')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // No enrollment - allow access to browse programs
  if (!enrollment) {
    return NextResponse.next();
  }

  const state = enrollment.enrollment_state;

  // If enrollment is active or documents_complete, allow access
  if (state === 'active' || state === 'documents_complete') {
    return NextResponse.next();
  }

  // Redirect to appropriate enrollment step
  let redirectPath = '/enrollment/confirmed';
  
  if (state === 'confirmed') {
    redirectPath = '/enrollment/orientation';
  } else if (state === 'orientation_complete') {
    redirectPath = '/enrollment/documents';
  }

  // Don't redirect if already on an enrollment flow page
  if (ENROLLMENT_FLOW_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(redirectPath, request.url));
}

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
