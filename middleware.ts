import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Middleware disabled - no redirects
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon and icons
     * - public files (images, videos, CSS, JS, fonts, manifests)
     * - robots.txt, sitemap.xml
     */
    '/((?!api|_next/static|_next/image|_next/data|favicon|icon-|apple-touch-icon|robots\\.txt|sitemap\\.xml|manifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|ogg|mp3|wav|css|js|woff|woff2|ttf|eot|otf|ico|json|xml|txt)$).*)',
  ],
};
