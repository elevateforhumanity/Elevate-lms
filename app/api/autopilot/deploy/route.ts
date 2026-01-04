import { prepareDeploy } from "@/lib/autopilot/deploy-prep";

export const runtime = 'edge';
export const maxDuration = 60;

export async function POST() {
  const res = await prepareDeploy();
  return Response.json(res);
}
