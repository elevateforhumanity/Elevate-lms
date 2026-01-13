import { NextResponse } from "next/server";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { createClient } from "@/lib/supabase/server";
import { toError, toErrorMessage } from '@/lib/safe';

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user is partner
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, tenant_id")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "partner") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Get enrollments for this partner's tenant
  const { data: enrollments, error } = await supabase
    .from("enrollments")
    .select(`
      id,
      user_id,
      course_id,
      status,
      profiles!enrollments_user_id_fkey(full_name, email),
      courses(title)
    `)
    .eq("tenant_id", profile.tenant_id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }

  return NextResponse.json({ enrollments });
}
