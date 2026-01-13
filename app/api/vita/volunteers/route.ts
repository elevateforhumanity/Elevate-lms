export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { parseBody, getErrorMessage } from '@/lib/api-helpers';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user is admin or tax coordinator
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (
      !profile ||
      !['admin', 'super_admin', 'tax_coordinator'].includes(profile.role)
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const backgroundStatus = searchParams.get('background_status');

    let query = supabase
      .from('volunteer_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('approval_status', status);
    }

    if (backgroundStatus) {
      query = query.eq('background_check_status', backgroundStatus);
    }

    const { data: applications, error } = await query;

    if (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }

    // Get counts by status
    const { data: allApplications } = await supabase
      .from('volunteer_applications')
      .select('approval_status, background_check_status');

    const statusCounts = {
      pending:
        allApplications?.filter((a) => a.approval_status === 'pending')
          .length || 0,
      approved:
        allApplications?.filter((a) => a.approval_status === 'approved')
          .length || 0,
      rejected:
        allApplications?.filter((a) => a.approval_status === 'rejected')
          .length || 0,
      backgroundPending:
        allApplications?.filter((a) => a.background_check_status === 'pending')
          .length || 0,
      backgroundApproved:
        allApplications?.filter((a) => a.background_check_status === 'approved')
          .length || 0,
    };

    return NextResponse.json({
      applications,
      total: applications?.length || 0,
      statusCounts,
    });
  } catch { /* Error handled silently */ 
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user is admin or tax coordinator
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (
      !profile ||
      !['admin', 'super_admin', 'tax_coordinator'].includes(profile.role)
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await parseBody<Record<string, any>>(request);
    const { application_id, approval_status, rejection_reason } = body;

    if (!application_id || !approval_status) {
      return NextResponse.json(
        { error: 'application_id and approval_status are required' },
        { status: 400 }
      );
    }

    const updateData: any = {
      approval_status,
      updated_at: new Date().toISOString(),
    };

    if (approval_status === 'approved') {
      updateData.approved_by = user.id;
      updateData.approved_at = new Date().toISOString();
    }

    if (approval_status === 'rejected' && rejection_reason) {
      updateData.rejection_reason = rejection_reason;
    }

    const { data: application, error } = await supabase
      .from('volunteer_applications')
      .update(updateData)
      .eq('id', application_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }

    // Send notification email
    await supabase.from('email_queue').insert({
      to_email: application.email,
      from_email: 'noreply@elevateforhumanity.institute',
      subject: `VITA Volunteer Application ${approval_status === 'approved' ? 'Approved' : 'Update'}`,
      template_name: `volunteer_application_${approval_status}`,
      template_data: {
        firstName: application.name.split(' ')[0],
        rejectionReason: rejection_reason || null,
      },
      related_type: 'volunteer_application',
      related_id: application.id,
    });

    return NextResponse.json({
      success: true,
      application,
    });
  } catch { /* Error handled silently */ 
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
