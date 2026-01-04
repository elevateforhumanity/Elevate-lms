import { scanRepo } from "@/lib/autopilot/repo-scanner";

export const runtime = 'edge';
export const maxDuration = 60;

export async function GET() {
  const res = await scanRepo();
  return Response.json(res);
}
