export const runtime = 'edge';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(req: Request) {
  try {
    const { studentId, shopName, shopAddress, supervisorName, supervisorEmail } =
      await req.json();

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify admin access
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin' && profile?.role !== 'instructor') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Create or update shop placement record
    const { error: placementError } = await supabase
      .from('shop_placements')
      .upsert(
        {
          student_id: studentId,
          shop_name: shopName,
          shop_address: shopAddress,
          supervisor_name: supervisorName,
          supervisor_email: supervisorEmail,
          status: 'active',
          assigned_at: new Date().toISOString(),
        },
        { onConflict: 'student_id' }
      );

    if (placementError) {
      // Error: $1
      return NextResponse.json(
        { error: placementError.message },
        { status: 500 }
      );
    }

    // Mark onboarding step complete
    const { error: onboardingError } = await supabase
      .from('student_onboarding')
      .update({ shop_placed: true })
      .eq('student_id', studentId);

    if (onboardingError) {
      // Error: $1
      // Continue - placement was successful
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    // Error: $1
    return NextResponse.json(
      { error: toErrorMessage(err) || 'Failed to assign shop placement' },
      { status: 500 }
    );
  }
}
