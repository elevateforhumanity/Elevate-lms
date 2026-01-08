import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  
  // Allow all elevateforhumanity domains without redirect
  // No redirects between .org and .institute to prevent loops
  if (
    host === "elevateforhumanity.org" ||
    host === "www.elevateforhumanity.org" ||
    host === "elevateforhumanity.institute" ||
    host === "www.elevateforhumanity.institute"
  ) {
    return NextResponse.next();
  }

  // Only redirect Vercel preview URLs
  if (host.endsWith(".vercel.app")) {
    const url = req.nextUrl.clone();
    url.hostname = "www.elevateforhumanity.org";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
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
