/**
 * Sezzle Checkout API
 * 
 * Creates a Sezzle checkout session for BNPL payments.
 * Sezzle splits the purchase into 4 interest-free payments.
 */

import { NextRequest, NextResponse } from 'next/server';
import { sezzle } from '@/lib/sezzle/client';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    // Check if Sezzle is configured
    if (!sezzle.isConfigured()) {
      return NextResponse.json(
        { error: 'Sezzle is not configured. Please contact support.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      // Customer info
      firstName,
      lastName,
      email,
      phone,
      // Address (optional but recommended)
      address,
      city,
      state,
      zip,
      // Order info
      programSlug,
      programName,
      amount, // in dollars
      description,
      // Reference
      applicationId,
      enrollmentId,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email, amount' },
        { status: 400 }
      );
    }

    // Amount must be at least $35 for Sezzle
    if (amount < 35) {
      return NextResponse.json(
        { error: 'Sezzle requires a minimum purchase of $35' },
        { status: 400 }
      );
    }

    // Amount cannot exceed $2,500 for Sezzle
    if (amount > 2500) {
      return NextResponse.json(
        { error: 'Sezzle has a maximum purchase limit of $2,500' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Generate a unique reference ID
    const referenceId = `EFH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create Sezzle session
    const session = await sezzle.createSession({
      intent: 'CAPTURE', // Capture immediately when customer completes
      reference_id: referenceId,
      description: description || `${programName || 'Program'} Enrollment`,
      order_amount: {
        amount_in_cents: Math.round(amount * 100),
        currency: 'USD',
      },
      customer: {
        email,
        first_name: firstName,
        last_name: lastName,
        phone: phone || undefined,
        billing_address: address ? {
          street: address,
          city: city || '',
          state: state || '',
          postal_code: zip || '',
          country_code: 'US',
        } : undefined,
      },
      items: programName ? [
        {
          name: programName,
          sku: programSlug || 'PROGRAM',
          quantity: 1,
          price: {
            amount_in_cents: Math.round(amount * 100),
            currency: 'USD',
          },
        },
      ] : undefined,
      merchant_completes: false, // Sezzle handles completion
      complete_url: `${siteUrl}/enroll/success?provider=sezzle&reference=${referenceId}`,
      cancel_url: `${siteUrl}/apply?program=${programSlug || ''}&canceled=true`,
    });

    // Store the Sezzle order reference in database
    if (supabase && applicationId) {
      await supabase
        .from('applications')
        .update({
          sezzle_order_uuid: session.order.uuid,
          sezzle_reference_id: referenceId,
          payment_provider: 'sezzle',
        })
        .eq('id', applicationId);
    }

    // Log for tracking
    logger.info('Sezzle checkout session created', {
      referenceId,
      orderUuid: session.order.uuid,
      amount,
      email,
      programSlug,
    });

    return NextResponse.json({
      ok: true,
      checkoutUrl: session.checkout_url,
      orderUuid: session.order.uuid,
      referenceId,
    });
  } catch (error) {
    logger.error('Sezzle checkout error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create Sezzle checkout';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
