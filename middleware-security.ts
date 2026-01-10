import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { apiRateLimit } from '@/lib/rate-limit';

export async function securityMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (apiRateLimit) {
      const ip = request.headers.get('x-forwarded-for') || 
                  request.headers.get('x-real-ip') || 
                  'unknown';
      
      const { success, limit, remaining, reset } = await apiRateLimit.limit(ip);
      
      response.headers.set('X-RateLimit-Limit', limit.toString());
      response.headers.set('X-RateLimit-Remaining', remaining.toString());
      response.headers.set('X-RateLimit-Reset', reset.toString());
      
      if (!success) {
        return new NextResponse('Too Many Requests', {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': reset.toString(),
          },
        });
      }
    }
  }
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
