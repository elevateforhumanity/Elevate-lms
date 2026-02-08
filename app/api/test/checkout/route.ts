// LIVE $1 Test Checkout - Creates real charge (refundable)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';

export async function GET(req: Request) {
  if (!stripe) {
    return NextResponse.json({ 
      error: 'Stripe not configured',
      message: 'Add STRIPE_SECRET_KEY to .env.local'
    }, { status: 503 });
  }

  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://3000--019c1902-9ad8-7a48-8f1b-4fe4de9a7512.us-east-1-01.gitpod.dev';
    
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: '[TEST] Enrollment Verification - $1',
            description: 'Test payment to verify enrollment flow. Refund after verification.',
          },
          unit_amount: 100, // $1.00
        },
        quantity: 1,
      }],
      success_url: `${siteUrl}/enroll/success?session_id={CHECKOUT_SESSION_ID}&test=true`,
      cancel_url: `${siteUrl}/programs`,
      metadata: {
        kind: 'program_enrollment',
        student_id: 'test-verification',
        program_id: 'test-program',
        program_slug: 'test-enrollment-verification',
        funding_source: 'self_pay',
        test_payment: 'true',
        refund_after_test: 'true',
      },
    });

    return NextResponse.redirect(session.url!);
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ 
      error: error.message,
      type: error.type,
    }, { status: 500 });
  }
}
