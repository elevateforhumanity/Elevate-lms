import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;
import { createClient } from '@supabase/supabase-js';
import {
  sendProgramHolderApplicationConfirmation,
  sendAdminProgramHolderNotification,
} from '@/lib/email/service';
import { checkRateLimit, verifyTurnstileToken } from '@/lib/turnstile';

// Use service role for anonymous submissions
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Rate limiting by email
    if (body.contactEmail) {
      const rateLimit = checkRateLimit(
        `program-holder:${body.contactEmail}`,
        2,
        300000
      ); // 2 per 5 minutes
      if (!rateLimit.allowed) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again in a few minutes.' },
          { status: 429 }
        );
      }
    }

    // Verify Turnstile token (if provided)
    if (body.turnstileToken) {
      const verification = await verifyTurnstileToken(body.turnstileToken);
      if (!verification.success) {
        return NextResponse.json(
          { error: verification.error || 'Verification failed' },
          { status: 400 }
        );
      }
    }

    // Validation
    if (!body.organizationName || !body.contactName || !body.contactEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!body.programsInterested || body.programsInterested.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one program' },
        { status: 400 }
      );
    }

    // Check for duplicate by email
    const { data: existing } = await supabase
      .from('program_holder_applications')
      .select('id, status')
      .eq('contact_email', body.contactEmail.toLowerCase())
      .eq('status', 'pending')
      .single();

    if (existing) {
      return NextResponse.json(
        {
          error:
            'An application with this email is already pending review. Please contact us if you need to update your application.',
        },
        { status: 400 }
      );
    }

    // Insert application
    const { data: application, error: insertError } = await supabase
      .from('program_holder_applications')
      .insert({
        organization_name: body.organizationName,
        organization_type: body.organizationType || 'other',
        contact_name: body.contactName,
        contact_email: body.contactEmail.toLowerCase(),
        contact_phone: body.contactPhone || null,
        address: body.address || null,
        city: body.city || null,
        state: body.state || 'IN',
        zip: body.zip || null,
        programs_interested: body.programsInterested,
        estimated_students: body.estimatedStudents
          ? parseInt(body.estimatedStudents)
          : null,
        how_heard_about_us: body.howHeardAboutUs || null,
        additional_info: body.additionalInfo || null,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to submit application. Please try again.' },
        { status: 500 }
      );
    }

    // Send confirmation email to applicant (non-blocking)
    sendProgramHolderApplicationConfirmation(
      body.contactEmail,
      body.organizationName
    ).catch((err) =>
    );

    // Send notification to admin (non-blocking)
    sendAdminProgramHolderNotification(
      body.organizationName,
      body.contactEmail,
      application.id
    ).catch((err) => console.error('[Email] Admin notification failed:', err));

    return NextResponse.json({
      success: true,
      applicationId: application.id,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
