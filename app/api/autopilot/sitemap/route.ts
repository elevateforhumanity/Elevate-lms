import { generateSitemap } from "@/lib/autopilot/sitemap-generator";

export const runtime = 'edge';
export const maxDuration = 60;

export async function GET() {
  const res = await generateSitemap();
  return Response.json(res);
}
