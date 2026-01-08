import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  // Your canonical host
  const CANONICAL = "elevateforhumanity.institute";

  // If request is coming from www or any *.vercel.app, redirect to canonical
  const isWww = host === "www.elevateforhumanity.institute";
  const isVercel = host.endsWith(".vercel.app");

  if ((isWww || isVercel) && host !== CANONICAL) {
    const redirectUrl = new URL(url.toString());
    redirectUrl.host = CANONICAL;
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
