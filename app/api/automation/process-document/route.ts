import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { processDocument, processTransferHours } from '@/lib/automation/evidence-processor';

export const dynamic = 'force-dynamic';

/**
 * POST /api/automation/process-document
 * Process a document through the evidence processor pipeline
 */
export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || !['admin', 'super_admin', 'staff'].includes(profile.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const { document_id, process_type, user_id, application_id, enrollment_id } = body;

    if (!document_id) {
      return NextResponse.json({ error: 'document_id required' }, { status: 400 });
    }

    let result;

    if (process_type === 'transfer_hours') {
      if (!user_id) {
        return NextResponse.json({ error: 'user_id required for transfer_hours' }, { status: 400 });
      }
      result = await processTransferHours(user_id, document_id, application_id, enrollment_id);
    } else {
      result = await processDocument(document_id);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Process document error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
