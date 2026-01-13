import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { createAdminClient } from '@/lib/supabase/admin';
import { auditExport } from '@/lib/auditLog';

export async function GET(req: Request) {
  try {
    const supabase = createAdminClient();

    // Fetch all monitoring data in parallel
    const [auditResult, etplResult, rulesResult, rapidsResult, fundingResult] =
      await Promise.all([
        supabase.from('audit_snapshot').select('*'),
        supabase.from('etpl_metrics').select('*'),
        supabase.from('state_rules').select('*'),
        supabase.from('rapids_tracking').select('*'),
        supabase.from('funding_cases').select('*'),
      ]);

    // Log the bundle export
    await auditExport(
      'audit_snapshot',
      req.headers.get('x-user-id') || undefined,
      'workone',
      req
    );

    const bundle = {
      generated_at: new Date().toISOString(),
      audit_snapshot: auditResult.data || [],
      etpl_metrics: etplResult.data || [],
      state_rules: rulesResult.data || [],
      rapids_tracking: rapidsResult.data || [],
      funding_cases: fundingResult.data || [],
      summary: {
        total_apprentices: auditResult.data?.length || 0,
        total_funding_cases: fundingResult.data?.length || 0,
        total_rapids_tracked: rapidsResult.data?.length || 0,
        states_supported: rulesResult.data?.length || 0,
      },
    };

    return NextResponse.json(bundle);
  } catch (err: any) {
    return NextResponse.json(
      { err: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
