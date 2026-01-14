import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = {
    now: new Date().toISOString(),
    platform: 'netlify',
    env: process.env.NODE_ENV ?? null,
    commit: process.env.COMMIT_REF ?? null,
  };

  const res = NextResponse.json(payload);
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}
