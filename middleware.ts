import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  // Your canonical host (you chose non-www)
  const CANONICAL = "elevateforhumanity.org";

  // If request is coming from www or any *.vercel.app, redirect to canonical
  const isWww = host === "www.elevateforhumanity.org";
  const isVercel = host.endsWith(".vercel.app");

  if ((isWww || isVercel) && host !== CANONICAL) {
    const redirectUrl = new URL(url.toString());
    redirectUrl.host = CANONICAL;
    redirectUrl.protocol = "https:";
    return NextResponse.redirect(redirectUrl, 308); // 308 preserves method; browsers handle it well
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
