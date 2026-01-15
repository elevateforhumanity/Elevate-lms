// @ts-nocheck
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email/resend';

export async function POST(request: NextRequest) {
  try {
    const data = await parseBody<Record<string, any>>(request);
    const supabase = await createClient();

    // Store in database
    const { error: dbError } = await supabase.from('partner_inquiries').insert({
      full_name: data.fullName,
      organization: data.organization,
      email: data.email,
      phone: data.phone,
      relationship_type: data.relationshipType,
      resources: data.resources,
      seeking: data.seeking,
      written_agreement: data.writtenAgreement,
      additional_info: data.additionalInfo,
      ip_acknowledged: true,
      submitted_at: new Date().toISOString(),
    });

    if (dbError) {
      // Error: $1
      // Continue even if DB fails - we'll send email
    }

    // Send notification email
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@www.elevateforhumanity.org',
        to: process.env.NOTIFY_EMAIL_TO || 'admin@www.elevateforhumanity.org',
        subject: `New Partner Inquiry: ${data.fullName} (${data.relationshipType})`,
        text:
          `New Partner Inquiry\n\n` +
          `Name: ${data.fullName}\n` +
          `Org: ${data.organization || '-'}\n` +
          `Email: ${data.email}\n` +
          `Phone: ${data.phone || '-'}\n` +
          `Relationship: ${data.relationshipType}\n\n` +
          `Value:\n${data.resources}\n\n` +
          `Seeking: ${data.seeking}\n` +
          `Agreement Ack: ${data.writtenAgreement}\n\n` +
          `Additional Info:\n${data.additionalInfo || '-'}\n`,
      });

      // Send auto-reply to submitter
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@www.elevateforhumanity.org',
        to: data.email,
        subject: 'We received your partner inquiry | Elevate for Humanity',
        text:
          `Thank you for your inquiry.\n\n` +
          `We review requests through our structured process to protect participants and platform integrity.\n` +
          `If there is alignment, our team will follow up with next steps.\n\n` +
          `— Elevate for Humanity\n`,
      });
    } catch (emailError) {
      // Error: $1
      // Continue - inquiry is saved
    }

    return NextResponse.json({ success: true });
  } catch (error) { /* Error handled silently */ 
    // Error: $1
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
