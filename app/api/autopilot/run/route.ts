import { runAutopilot } from "@/lib/autopilot/autopilot-runner";

export const runtime = 'edge';
export const maxDuration = 60;

export async function POST(req: Request) {
  const { type, payload } = await req.json();
  const res = await runAutopilot(type, payload);
  return Response.json(res);
}
