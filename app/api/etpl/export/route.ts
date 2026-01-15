import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { createAdminClient } from '@/lib/supabase/admin';
import { auditExport } from '@/lib/auditLog';

export async function GET(req: Request) {
  try {
    const supabase = createAdminClient();

    // Get ETPL metrics
    const { data: metrics, error } = await supabase
      .from('etpl_metrics')
      .select('*')
      .order('quarter', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 400 });
    }

    // Log the export
    await auditExport(
      'audit_snapshot',
      req.headers.get('x-user-id') || undefined,
      'sponsor',
      req
    );

    return NextResponse.json({
      metrics: metrics || [],
      generated_at: new Date().toISOString(),
    });
  } catch (error) { /* Error handled silently */ 
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
