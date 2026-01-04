import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;
import { createClient } from '@/lib/supabase/server';
import { sendEnrollmentEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { checkout_token, program, user_id, user_email } = await request.json();

    // Call Affirm API to authorize the charge
    const affirmResponse = await fetch('https://api.affirm.com/api/v2/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${process.env.AFFIRM_PUBLIC_KEY}:${process.env.AFFIRM_PRIVATE_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify({
        checkout_token,
      }),
    });

    const chargeData = await affirmResponse.json();

    if (!affirmResponse.ok) {
      throw new Error(chargeData.message || 'Affirm charge failed');
    }

    // Save enrollment to database
    const supabase = await createClient();

    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .insert({
        user_id,
        program_id: program,
        payment_method: 'affirm',
        payment_status: 'completed',
        payment_reference: chargeData.id,
        amount_paid: chargeData.amount / 100, // Convert cents to dollars
        status: 'active',
        enrolled_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (enrollmentError) {
      console.error('Failed to save enrollment:', enrollmentError);
      // Don't fail the request - payment succeeded
      // Log for manual reconciliation
    }

    // Send enrollment confirmation email
    if (enrollment && user_email) {
      try {
        // Get program name
        const { data: programData } = await supabase
          .from('programs')
          .select('title')
          .eq('id', program)
          .single();

        await sendEnrollmentEmail({
          to: user_email,
          programName: programData?.title || 'Your Program',
          enrollmentId: enrollment.id,
        });
      } catch (emailError) {
        console.error('Failed to send enrollment email:', emailError);
        // Don't fail the request - enrollment succeeded
      }
    }

    return NextResponse.json({
      success: true,
      charge_id: chargeData.id,
      enrollment_id: enrollment?.id,
    });
  } catch (error: any) {
    console.error('Affirm charge error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process Affirm payment' },
      { status: 500 }
    );
  }
}
