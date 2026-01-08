import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "elevateforhumanity.institute";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host");
  
  // Fast path: if no host header or already canonical, skip
  if (!host || host === CANONICAL_HOST) {
    return NextResponse.next();
  }

  // Check if redirect is needed (www or vercel preview)
  const needsRedirect = 
    host === `www.${CANONICAL_HOST}` || 
    host.endsWith(".vercel.app");

  if (needsRedirect) {
    // Clone URL and update host
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.host = CANONICAL_HOST;
    redirectUrl.protocol = "https:";
    return NextResponse.redirect(redirectUrl, 308);
  }

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
