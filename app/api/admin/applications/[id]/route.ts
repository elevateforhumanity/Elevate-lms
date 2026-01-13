export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// app/api/admin/applications/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabaseClients";
import { withAuth } from "@/lib/withAuth";
import { logger } from '@/lib/logger';

export const GET = withAuth(
  async (req: NextRequest, ctx) => {
  const params = await ctx.params as { id: string };
  const { id } = params;
  const supabase = getServerSupabase();

  if (!supabase) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  try {
    const { data: application, error } = await supabase
      .from("applications")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      logger.error("Error fetching application:", error);
      return NextResponse.json(
        { error: "Failed to fetch application" },
        { status: 500 }
      );
    }

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ application });
  } catch (err) {
    logger.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
  },
  { roles: ['admin', 'super_admin'] }
);
