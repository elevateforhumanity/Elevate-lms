import { NextResponse } from "next/server";
export const runtime = 'nodejs';
export async function GET() {
  return NextResponse.json({ error: "PDF generation disabled - too large for Vercel" }, { status: 501 });
}
export async function POST() {
  return NextResponse.json({ error: "PDF generation disabled - too large for Vercel" }, { status: 501 });
}
