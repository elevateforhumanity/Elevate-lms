import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { EnrollmentAction } from '@/lib/enrollment';

/**
 * Staff Override System
 * 
 * Allows staff to temporarily override certain enrollment restrictions.
 * 
 * RULES:
 * - Overrides must be explicit, time-bounded, and logged
 * - Override reason is required
 * - CAN override: Payment hold
 * - CANNOT override: Start date, shop approval (compliance-critical)
 */

// Actions that CAN be overridden
const OVERRIDABLE_ACTIONS: EnrollmentAction[] = [
  EnrollmentAction.CLOCK_IN,
  EnrollmentAction.CLOCK_OUT,
  EnrollmentAction.PWA_CHECKIN,
  EnrollmentAction.LOG_HOURS,
  EnrollmentAction.ACCESS_COURSES,
];

// Actions that CANNOT be overridden (compliance-critical)
const NON_OVERRIDABLE_ACTIONS: EnrollmentAction[] = [
  EnrollmentAction.COMPLETE_ORIENTATION,
  EnrollmentAction.SUBMIT_DOCUMENTS,
];

// Reasons that CANNOT be overridden
const NON_OVERRIDABLE_REASONS = [
  'START_DATE_NOT_REACHED',
  'PARTNER_NOT_APPROVED',
  'SHOP_NOT_APPROVED',
  'ORIENTATION_REQUIRED',
  'DOCUMENTS_REQUIRED',
];

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const adminClient = createAdminClient();
    
    if (!supabase || !adminClient) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    // Verify admin/staff role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || !['admin', 'super_admin', 'staff'].includes(profile.role)) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { 
      user_id,
      action,
      expires_at,
      reason,
      override_reason_code,
    } = body;

    // Validate required fields
    if (!user_id || !action || !expires_at || !reason) {
      return NextResponse.json({
        error: 'Missing required fields',
        required: ['user_id', 'action', 'expires_at', 'reason'],
      }, { status: 400 });
    }

    // Validate action is overridable
    if (!OVERRIDABLE_ACTIONS.includes(action as EnrollmentAction)) {
      return NextResponse.json({
        error: 'This action cannot be overridden',
        action,
        overridable_actions: OVERRIDABLE_ACTIONS,
      }, { status: 400 });
    }

    // Validate reason code is overridable (if provided)
    if (override_reason_code && NON_OVERRIDABLE_REASONS.includes(override_reason_code)) {
      return NextResponse.json({
        error: 'This denial reason cannot be overridden (compliance-critical)',
        reason_code: override_reason_code,
        non_overridable: NON_OVERRIDABLE_REASONS,
      }, { status: 400 });
    }

    // Validate expires_at is in the future and not too far out
    const expiresDate = new Date(expires_at);
    const now = new Date();
    const maxExpiry = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days max

    if (expiresDate <= now) {
      return NextResponse.json({
        error: 'Expiration date must be in the future',
      }, { status: 400 });
    }

    if (expiresDate > maxExpiry) {
      return NextResponse.json({
        error: 'Override cannot exceed 30 days',
        max_expiry: maxExpiry.toISOString(),
      }, { status: 400 });
    }

    // Create the override
    const { data: override, error: insertError } = await adminClient
      .from('enrollment_overrides')
      .insert({
        user_id,
        action,
        expires_at: expiresDate.toISOString(),
        reason,
        override_reason_code,
        created_by: user.id,
        created_at: now.toISOString(),
        active: true,
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('[Override] Insert error:', insertError);
      return NextResponse.json({ error: 'Failed to create override' }, { status: 500 });
    }

    // Log the override creation
    await adminClient.from('enrollment_state_audit').insert({
      user_id,
      event_type: 'override_created',
      attempted_action: action,
      timestamp: now.toISOString(),
      details: {
        override_id: override.id,
        expires_at: expiresDate.toISOString(),
        reason,
        override_reason_code,
        created_by: user.id,
        created_by_email: user.email,
      },
    });

    return NextResponse.json({
      success: true,
      override_id: override.id,
      user_id,
      action,
      expires_at: expiresDate.toISOString(),
      reason,
    });

  } catch (error) {
    console.error('[Override] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET - List active overrides for a user
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    if (!supabase) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json({ error: 'user_id required' }, { status: 400 });
    }

    const { data: overrides } = await supabase
      .from('enrollment_overrides')
      .select('*')
      .eq('user_id', userId)
      .eq('active', true)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });

    return NextResponse.json({
      overrides: overrides || [],
      count: overrides?.length || 0,
    });

  } catch (error) {
    console.error('[Override] GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE - Revoke an override
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const adminClient = createAdminClient();
    
    if (!supabase || !adminClient) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const overrideId = searchParams.get('override_id');

    if (!overrideId) {
      return NextResponse.json({ error: 'override_id required' }, { status: 400 });
    }

    // Get the override first
    const { data: override } = await supabase
      .from('enrollment_overrides')
      .select('*')
      .eq('id', overrideId)
      .single();

    if (!override) {
      return NextResponse.json({ error: 'Override not found' }, { status: 404 });
    }

    // Deactivate the override
    await adminClient
      .from('enrollment_overrides')
      .update({ 
        active: false,
        revoked_at: new Date().toISOString(),
        revoked_by: user.id,
      })
      .eq('id', overrideId);

    // Log the revocation
    await adminClient.from('enrollment_state_audit').insert({
      user_id: override.user_id,
      event_type: 'override_revoked',
      attempted_action: override.action,
      timestamp: new Date().toISOString(),
      details: {
        override_id: overrideId,
        revoked_by: user.id,
        original_expires_at: override.expires_at,
      },
    });

    return NextResponse.json({ success: true, revoked: true });

  } catch (error) {
    console.error('[Override] DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
