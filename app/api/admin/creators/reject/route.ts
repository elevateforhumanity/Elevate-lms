// Using Node.js runtime for email compatibility
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendCreatorRejectionEmail } from '@/lib/email/resend';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { creatorId, reason } = await req.json();

    // Get creator details before deletion
    const { data: creator } = await supabase
      .from('marketplace_creators')
      .select('user_id, profiles(email, full_name)')
      .eq('id', creatorId)
      .single();

    // Delete the creator application (or mark as rejected)
    const { error } = await supabase
      .from('marketplace_creators')
      .delete()
      .eq('id', creatorId);

    if (error) throw error;

    // Send rejection email
    const creatorProfile = creator?.profiles as unknown;
    if (creatorProfile?.email) {
      try {
        await sendCreatorRejectionEmail({
          email: creatorProfile.email,
          name: creatorProfile.full_name || 'Applicant',
          reason: reason || 'Application does not meet requirements',
        });
      } catch (emailError) {}
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ err: toErrorMessage(err) }, { status: 500 });
  }
}
