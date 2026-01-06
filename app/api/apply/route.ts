export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimitNew as rateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rateLimit';

// Advisor assignment logic
function assignAdvisor(program: string): string {
  const advisorMap: Record<string, string> = {
    barber: 'barber@elevateforhumanity.institute',
    cna: 'healthcare@elevateforhumanity.institute',
    hvac: 'trades@elevateforhumanity.institute',
    'direct-support-professional': 'healthcare@elevateforhumanity.institute',
  };

  return (
    advisorMap[program.toLowerCase()] || 'admissions@elevateforhumanity.institute'
  );
}

// Send confirmation email
async function sendConfirmationEmail(
  email: string,
  firstName: string
): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    return;
  }

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Elevate for Humanity <no-reply@elevateforhumanity.institute>',
        to: email,
        subject: 'We received your application – Elevate for Humanity',
        html: `
          <p>Hi ${firstName},</p>

          <p>Thank you for applying to <strong>Elevate for Humanity</strong>. Your application has been received.</p>

          <p><strong>What happens next:</strong></p>
          <ol>
            <li>Create an account at <a href="https://www.indianacareerconnect.com">indianacareerconnect.com</a></li>
            <li>Schedule a WorkOne appointment</li>
            <li>Tell them you are enrolling with <strong>Elevate for Humanity</strong></li>
            <li>Call us back once scheduled so we can track your progress</li>
          </ol>

          <p>An advisor will contact you within 1–2 business days.</p>

          <p>Need help right now? Call <strong>317-314-3757</strong>.</p>

          <p>— Elevate for Humanity Team</p>
        `,
      }),
    });
  } catch (err) {
  }
}

// Send staff notification
async function sendStaffNotification(
  advisorEmail: string,
  applicationData: unknown
): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    return;
  }

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Elevate for Humanity <no-reply@elevateforhumanity.institute>',
        to: advisorEmail,
        subject: `New Application: ${applicationData.first_name} ${applicationData.last_name}`,
        html: `
          <h2>New Application Received</h2>
          <p><strong>Name:</strong> ${applicationData.first_name} ${applicationData.last_name}</p>
          <p><strong>Email:</strong> ${applicationData.email}</p>
          <p><strong>Phone:</strong> ${applicationData.phone}</p>
          <p><strong>Program:</strong> ${applicationData.program_interest}</p>
          <p><strong>City:</strong> ${applicationData.city}, ${applicationData.zip}</p>
          <p><strong>Contact Preference:</strong> ${applicationData.contact_preference}</p>
          ${applicationData.has_case_manager ? `<p><strong>Case Manager Agency:</strong> ${applicationData.case_manager_agency}</p>` : ''}
          ${applicationData.support_notes ? `<p><strong>Support Notes:</strong> ${applicationData.support_notes}</p>` : ''}
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/applications">View in Dashboard</a></p>
        `,
      }),
    });
  } catch (err) {
  }
}

export async function POST(req: Request) {
  try {
    // Rate limiting: 3 requests per minute per IP
    const identifier = getClientIdentifier(req.headers);
    const rateLimitResult = rateLimit(`apply:${identifier}`, RATE_LIMITS.APPLICATION_FORM);

    if (!rateLimitResult.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    const {
      firstName,
      lastName,
      phone,
      email,
      city,
      zip,
      program,
      hasCaseManager,
      caseManagerAgency,
      supportNotes,
      contactPreference,
    } = body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !city ||
      !zip ||
      !program ||
      !contactPreference
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Assign advisor based on program
    const advisorEmail = assignAdvisor(program);

    // Insert application
    const { data, error }: any = await supabase
      .from('applications')
      .insert({
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        city,
        zip,
        program_interest: program,
        has_case_manager: hasCaseManager === 'yes',
        case_manager_agency: caseManagerAgency || null,
        support_notes: supportNotes || null,
        contact_preference: contactPreference,
        advisor_email: advisorEmail,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Create checklist for this application
    await supabase.from('application_checklist').insert({
      application_id: data.id,
      advisor_assigned: true,
    });

    // Send confirmation email to applicant (non-blocking)

    // Send notification to assigned advisor (non-blocking)

    return NextResponse.json({ success: true, id: data.id });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        error:
          'Submission failed. Please call 317-314-3757 for immediate assistance.',
      },
      { status: 500 }
    );
  }
}
