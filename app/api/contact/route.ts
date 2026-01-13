export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimitNew as rateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rateLimit';
import { logger } from '@/lib/logger';

// Validation schema for contact form
const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  email: z.string().email('Invalid email address').max(200),
  phone: z.string().max(50).optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(4000),
  program: z.string().max(120).optional().or(z.literal('')),
  role: z.string().max(120).optional().or(z.literal('')),
  interest: z.string().max(120).optional().or(z.literal('')),
});

export async function POST(req: Request) {
  try {
    // Rate limiting: 5 requests per minute per IP
    const identifier = getClientIdentifier(req.headers);
    const rateLimitResult = rateLimit(identifier, RATE_LIMITS.CONTACT_FORM);

    if (!rateLimitResult.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Too many requests. Please try again in a minute.'
        },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          }
        }
      );
    }

    // Parse and validate request body
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { ok: false, error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid form submission',
          details: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Save to database using admin client (bypasses RLS for public form)
    const supabase = createAdminClient();

    // Split name into first/last for marketing_contacts table
    const nameParts = data.name.trim().split(' ');
    const firstName = nameParts[0] || data.name;
    const lastName = nameParts.slice(1).join(' ') || '';

    const { error: dbError } = await supabase
      .from('marketing_contacts')
      .insert({
        email: data.email,
        first_name: firstName,
        last_name: lastName,
        tags: [data.role || 'contact-form', data.program || data.interest || 'general'].filter(Boolean),
      });

    if (dbError) {
      logger.error('Error inserting contact request:', dbError);
      return NextResponse.json(
        { ok: false, error: 'Could not submit request. Please try again.' },
        { status: 500 }
      );
    }

    // Send email notification (non-blocking)
    sendEmailNotification(data).catch((err) => {
      logger.error('Error sending email notification:', err);
      // Don't fail the request if email fails
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error('Contact API error:', err);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// Send email notification (async, non-blocking)
async function sendEmailNotification(data: z.infer<typeof ContactSchema>) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    logger.warn('RESEND_API_KEY not configured, skipping email notification');
    return;
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: 'Elevate for Humanity <noreply@elevateforhumanity.institute>',
      to: 'elevate4humanityedu@gmail.com',
      subject: `New Inquiry from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.program ? `<p><strong>Program Interest:</strong> ${data.program}</p>` : ''}
        ${data.role ? `<p><strong>Role:</strong> ${data.role}</p>` : ''}
        <p><strong>Message:</strong><br>${data.message}</p>
        <hr>
        <p><em>Submitted from elevateforhumanity.institute</em></p>
      `,
    });
  } catch (error: unknown) {
    logger.error('Failed to send email notification:', error);
    throw error;
  }
}
