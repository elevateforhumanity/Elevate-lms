import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    if (!supabase) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // NOTE: No hard enforcement here - onboarding should flow freely
    // Regulated actions (timeclock, hours) will enforce compliance

    const { program } = await req.json();

    // Update enrollment to mark documents submitted
    const { error } = await supabase
      .from('enrollments')
      .update({ 
        documents_submitted_at: new Date().toISOString(),
        status: 'active'
      })
      .eq('user_id', user.id)
      .is('documents_submitted_at', null);

    if (error) {
      console.error('Error updating enrollment:', error);
      // Don't fail - let the flow continue
    }

    return NextResponse.json({ success: true, program });
  } catch (error) {
    console.error('Document submission error:', error);
    return NextResponse.json({ success: true }); // Don't block flow
  }
}
