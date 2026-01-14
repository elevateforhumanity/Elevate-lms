export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { withRateLimit } from '@/lib/api/with-rate-limit';
import { contactRateLimit } from '@/lib/rate-limit';
import { applicationSchema } from '@/lib/api/validation-schemas';
import { sendEmail } from '@/lib/email/resend';

const ADMIN_EMAIL = 'elevate4humanityedu@gmail.com';

export const POST = withRateLimit(
  async (req: Request) => {
    try {
      const contentType = req.headers.get('content-type');
      let data;

      if (contentType?.includes('application/json')) {
        data = await req.json();
      } else {
        const formData = await req.formData();
        data = {
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          program: formData.get('program'),
          funding: formData.get('funding'),
        };
      }
      
      const validatedData = applicationSchema.parse(data);

      const { program, funding, name, email, phone } = validatedData;
      const eligible = funding !== 'Self Pay' && program !== 'Not Sure';

      // Split name into first and last
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const supabase = createAdminClient();
    
      const { error } = await supabase.from('applications').insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        program_id: program,
        status: 'pending',
        notes: `Funding: ${funding}. ${eligible ? 'Prescreen pass' : 'Manual review'}`,
      });

      if (error) {
        console.error('Supabase insert error:', error);
        return NextResponse.json(
          { error: 'Failed to submit application. Please call 317-314-3757 for assistance.' },
          { status: 500 }
        );
      }

      // Send confirmation email to applicant
      await sendEmail({
        to: email,
        subject: 'Application Received - Elevate for Humanity',
        html: `
          <h2>Thank you for your application, ${firstName}!</h2>
          <p>We have received your application for <strong>${program}</strong>.</p>
          <p>Our team will review your application and contact you within 2-3 business days.</p>
          <p><strong>What's next?</strong></p>
          <ul>
            <li>Our admissions team will review your application</li>
            <li>You'll receive a call or email to discuss next steps</li>
            <li>If approved, we'll help you get started right away</li>
          </ul>
          <p>Questions? Call us at <a href="tel:317-314-3757">317-314-3757</a></p>
          <p>Best regards,<br>Elevate for Humanity Team</p>
        `,
      });

      // Send notification email to admin
      await sendEmail({
        to: ADMIN_EMAIL,
        subject: `New Application: ${firstName} ${lastName} - ${program}`,
        html: `
          <h2>New Application Received</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Program</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${program}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Funding</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${funding}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Pre-screen</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${eligible ? '✅ Pass' : '⚠️ Manual Review'}</td></tr>
          </table>
          <p style="margin-top: 20px;"><a href="https://www.elevateforhumanity.org/admin/applications" style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Dashboard</a></p>
        `,
      });

      if (contentType?.includes('application/json')) {
        return NextResponse.json({ success: true });
      }

      return NextResponse.redirect(
        new URL('/apply/confirmation', req.url),
        { status: 303 }
      );
    } catch (err: any) {
      console.error('Apply route error:', err);
      
      // Handle validation errors specifically
      if (err?.name === 'ZodError' || err?.issues) {
        const issues = err.issues || err.errors || [];
        const fieldErrors = issues.map((e: any) => `${e.path?.join('.') || 'field'}: ${e.message}`).join(', ');
        return NextResponse.json(
          { error: `Please fix: ${fieldErrors}` },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: 'Submission failed. Please call 317-314-3757.' },
        { status: 500 }
      );
    }
  },
  { limiter: contactRateLimit, skipOnMissing: true }
);
