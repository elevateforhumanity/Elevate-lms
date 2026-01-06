import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = {
    now: new Date().toISOString(),
    vercel: process.env.VERCEL ?? null,
    vercelEnv: process.env.VERCEL_ENV ?? null,
    vercelGitCommit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
  };

  const res = NextResponse.json(payload);
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}
