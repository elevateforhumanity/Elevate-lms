import { runAutopilot } from "@/lib/autopilot/runner";

export const runtime = 'edge';
export const maxDuration = 60;

export async function POST() {
  await runAutopilot("deploy-netlify");
  return Response.json({ ok: true });
}
