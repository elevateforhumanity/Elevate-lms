/**
 * Apprentice Onboarding Status API
 * 
 * Returns the current onboarding checklist status and triggers
 * the welcome email when all items are complete.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getBarberWelcomeStartEmail, calculateNextMonday } from '@/lib/email/templates/barber-welcome-start';

interface OnboardingStatus {
  milady_enrollment_complete: boolean;
  documents_uploaded: boolean;
  handbook_completed: boolean;
  mou_signed: boolean;
  all_complete: boolean;
  start_date?: string;
  welcome_email_sent?: boolean;
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get onboarding record
    const { data: onboarding } = await supabase
      .from('student_onboarding')
      .select('*')
      .eq('student_id', user.id)
      .single();

    // Get document uploads
    const { data: documents } = await supabase
      .from('student_documents')
      .select('document_type, status')
      .eq('student_id', user.id);

    // Required documents
    const requiredDocs = ['government_id', 'proof_of_eligibility'];
    const uploadedDocs = documents?.filter(d => d.status === 'approved' || d.status === 'pending') || [];
    const documentsComplete = requiredDocs.every(req => 
      uploadedDocs.some(d => d.document_type === req)
    );

    // Get MOU signature
    const { data: mou } = await supabase
      .from('mou_signatures')
      .select('signed_at')
      .eq('student_id', user.id)
      .eq('document_type', 'student_mou')
      .single();

    // Get handbook completion
    const { data: handbook } = await supabase
      .from('handbook_completions')
      .select('completed_at')
      .eq('student_id', user.id)
      .single();

    const status: OnboardingStatus = {
      milady_enrollment_complete: onboarding?.milady_enrollment_complete || false,
      documents_uploaded: documentsComplete,
      handbook_completed: !!handbook?.completed_at,
      mou_signed: !!mou?.signed_at,
      all_complete: false,
      welcome_email_sent: onboarding?.welcome_email_sent || false,
    };

    // Check if all complete
    status.all_complete = 
      status.milady_enrollment_complete &&
      status.documents_uploaded &&
      status.handbook_completed &&
      status.mou_signed;

    // If all complete and welcome email not sent, send it
    if (status.all_complete && !status.welcome_email_sent) {
      const { formatted: startDate } = calculateNextMonday();
      status.start_date = startDate;

      // Get student profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', user.id)
        .single();

      // Get shop assignment
      const { data: enrollment } = await supabase
        .from('student_enrollments')
        .select('*, shops(name, address, city, state)')
        .eq('student_id', user.id)
        .single();

      if (profile?.email) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';
        
        const emailData = getBarberWelcomeStartEmail({
          studentName: profile.full_name || 'Student',
          studentEmail: profile.email,
          startDate,
          shopName: enrollment?.shops?.name || 'To Be Assigned',
          shopAddress: enrollment?.shops ? 
            `${enrollment.shops.address}, ${enrollment.shops.city}, ${enrollment.shops.state}` : 
            'Address will be provided',
          dashboardUrl: `${siteUrl}/apprentice`,
          timeclockUrl: `${siteUrl}/apprentice/timeclock`,
          requiredHours: 1500,
        });

        // Send welcome email
        await fetch(`${siteUrl}/api/email/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: profile.email,
            subject: emailData.subject,
            html: emailData.html,
          }),
        });

        // Mark welcome email as sent
        await supabase
          .from('student_onboarding')
          .upsert({
            student_id: user.id,
            welcome_email_sent: true,
            welcome_email_sent_at: new Date().toISOString(),
            start_date: calculateNextMonday().date.toISOString(),
          }, { onConflict: 'student_id' });

        status.welcome_email_sent = true;
      }
    }

    return NextResponse.json(status);
  } catch (error: any) {
    console.error('[onboarding-status] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Mark a specific onboarding item as complete
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { item } = await request.json();

    const validItems = [
      'milady_enrollment_complete',
      'handbook_completed',
    ];

    if (!validItems.includes(item)) {
      return NextResponse.json({ error: 'Invalid item' }, { status: 400 });
    }

    // Update onboarding record
    const updateData: Record<string, any> = {
      student_id: user.id,
      [item]: true,
      [`${item}_at`]: new Date().toISOString(),
    };

    await supabase
      .from('student_onboarding')
      .upsert(updateData, { onConflict: 'student_id' });

    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    console.error('[onboarding-status] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
