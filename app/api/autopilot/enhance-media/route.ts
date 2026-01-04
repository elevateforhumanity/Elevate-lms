import { enhanceImages } from "@/lib/autopilot/media-enhancer";

export const runtime = 'edge';
export const maxDuration = 60;

export async function POST() {
  const res = await enhanceImages();
  return Response.json(res);
}
