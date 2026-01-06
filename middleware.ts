import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  // Your canonical host
  const CANONICAL = "elevateforhumanity.institute";

  // If request is coming from www, old domain, or any *.vercel.app, redirect to canonical
  const isWww = host === "www.elevateforhumanity.institute";
  const isOldDomain = host === "elevateforhumanity.institute" || host === "www.elevateforhumanity.institute";
  const isVercel = host.endsWith(".vercel.app");

  if ((isWww || isOldDomain || isVercel) && host !== CANONICAL) {
    const redirectUrl = new URL(url.toString());
    redirectUrl.host = CANONICAL;
    redirectUrl.protocol = "https:";
    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
