export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { parseBody, getErrorMessage } from '@/lib/api-helpers';

/**
 * VITA Volunteer Application API
 *
 * Official IRS VITA/TCE Volunteer Signup: https://freetaxassistance.for.irs.gov/s/sign-up-form
 *
 * This endpoint tracks local interest and provides information about the official IRS process.
 * All volunteers must complete the official IRS signup form and training.
 */

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const body = await parseBody<Record<string, any>>(request);
    const { name, email, phone, availability, experience, certifications } =
      body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Check if application already exists
    const { data: existing } = await supabase
      .from('volunteer_applications')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'An application with this email already exists' },
        { status: 400 }
      );
    }

    // Get current user if logged in
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Create local interest record
    const { data: application, error: applicationError } = await supabase
      .from('volunteer_applications')
      .insert({
        name,
        email,
        phone,
        availability: availability || [],
        experience: experience || null,
        certifications: certifications || [],
        user_id: user?.id || null,
        background_check_status: 'not_started',
        approval_status: 'pending',
      })
      .select()
      .single();

    if (applicationError) {
      return NextResponse.json(
        { error: applicationError.message },
        { status: 500 }
      );
    }

    // Send confirmation email with IRS signup link
    await supabase.from('email_queue').insert({
      to_email: email,
      from_email: 'noreply@elevateforhumanity.institute',
      subject: 'VITA Volunteer Interest - Next Steps',
      template_name: 'volunteer_application_received',
      template_data: {
        firstName: name.split(' ')[0],
        irsSignupUrl: 'https://freetaxassistance.for.irs.gov/s/sign-up-form',
        irsVolunteerInfo: 'https://www.irs.gov/individuals/irs-tax-volunteers',
      },
      related_type: 'volunteer_application',
      related_id: application.id,
    });

    return NextResponse.json({
      success: true,
      application,
      message:
        'Interest recorded! Please complete the official IRS VITA/TCE volunteer signup form.',
      irsSignupUrl: 'https://freetaxassistance.for.irs.gov/s/sign-up-form',
      nextSteps: [
        'Complete the official IRS VITA/TCE volunteer signup form',
        'Complete IRS Link & Learn Taxes training online',
        'Pass certification tests',
        'We will contact you about local volunteer opportunities',
      ],
    });
  } catch { /* Error handled silently */ 
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
