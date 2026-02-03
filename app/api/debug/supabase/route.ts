import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const projectRef = url
    ? url.replace(/^https:\/\/([^.]+)\.supabase\.co.*$/, "$1")
    : "";

  return NextResponse.json({
    supabaseProjectRef: projectRef,
    anonKeyPrefix: anon.slice(0, 8),
    hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    nodeEnv: process.env.NODE_ENV,
  });
}
