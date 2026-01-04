import { createClient } from "@/lib/supabase/server";

export const runtime = 'edge';
export const maxDuration = 60;
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(req: Request) {
  const { path } = await req.json();
  const supabase = await createClient();

  if (!path) {
    return Response.json({ error: "No path provided" }, { status: 400 });
  }

  const { error } = await supabase.storage.from("media").remove([path]);

  if (error) {
    return Response.json({ error: toErrorMessage(error) }, { status: 500 });
  }

  return Response.json({ ok: true });
}
