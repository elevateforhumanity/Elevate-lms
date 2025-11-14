import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return new Response('You must be logged in to apply.', { status: 401 });
  }

  const body = await req.json();
  const {
    org_name,
    contact_name,
    contact_email,
    phone,
    site_address,
    training_focus,
    funding_sources,
    agree
  } = body || {};

  if (!agree) {
    return new Response('You must agree to terms.', { status: 400 });
  }

  if (!org_name || !contact_name || !contact_email) {
    return new Response('Missing required fields.', { status: 400 });
  }

  // Check if user already has a program holder
  const { data: existingProfile } = await supabase
    .from('user_profiles')
    .select('program_holder_id')
    .eq('user_id', user.id)
    .single();

  if (existingProfile?.program_holder_id) {
    return new Response('You already have a program holder application.', { status: 400 });
  }

  // Create program_holder in "pending" status with default 1/3 share
  const { data: ph, error: phError } = await supabase
    .from('program_holders')
    .insert({
      name: org_name,
      owner_user_id: user.id,
      status: 'pending',
      payout_share: 0.333,
      mou_status: 'not_sent'
    })
    .select('id')
    .single();

  if (phError) {
    return new Response(phError.message, { status: 500 });
  }

  // Store application details
  const { error: appError } = await supabase
    .from('program_holder_applications')
    .insert({
      program_holder_id: ph.id,
      contact_name,
      contact_email,
      phone: phone || null,
      site_address: site_address || null,
      training_focus: training_focus || null,
      funding_sources: funding_sources || null
    });

  if (appError) {
    console.error('Failed to store application details:', appError);
  }

  // Update user profile with program holder and partner role
  await supabase.from('user_profiles').upsert({
    user_id: user.id,
    role: 'partner',
    program_holder_id: ph.id
  }, {
    onConflict: 'user_id'
  });

  // Create delegate record with default permissions
  await supabase.from('delegates').insert({
    program_holder_id: ph.id,
    user_id: user.id,
    can_view_reports: true,
    can_view_learners: true,
    can_edit_courses: false,
    can_view_financials: false
  });

  return Response.json({ ok: true, program_holder_id: ph.id });
}
