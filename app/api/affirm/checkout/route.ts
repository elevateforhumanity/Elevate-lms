export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { apiAuthGuard } from '@/lib/authGuards';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

const AFFIRM_API_URL = 'https://api.affirm.com';
const AFFIRM_PUBLIC_KEY =
  process.env.AFFIRM_PUBLIC_KEY || 'aGax1GLWFexjLyW7PCf23rfznLl6YGyI';
const AFFIRM_PRIVATE_KEY = process.env.AFFIRM_PRIVATE_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const authResult = await apiAuthGuard({ requireAuth: false });
    const user = authResult.user || { id: 'guest', email: '' };

    const body = await parseBody<Record<string, any>>(request);

    const {
      amount,
      courseId,
      courseName,
      userEmail,
      userName,
      userPhone,
      shippingAddress,
      billingAddress,
      metadata = {},
    } = body;

    if (!amount || !courseId || !courseName) {
      return NextResponse.json(
        { error: 'amount, courseId, and courseName are required' },
        { status: 400 }
      );
    }

    // Create Affirm checkout session
    const checkoutData = {
      merchant: {
        user_confirmation_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/affirm/confirm`,
        user_cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/affirm/cancel`,
        user_confirmation_url_action: 'POST',
        name: 'Elevate for Humanity',
      },
      items: [
        {
          display_name: courseName,
          sku: courseId,
          unit_price: Math.round(amount * 100), // Convert to cents
          qty: 1,
          item_image_url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/courses/${courseId}-cover.jpg`,
          item_url: `${process.env.NEXT_PUBLIC_SITE_URL}/programs/${courseId}`,
        },
      ],
      billing: billingAddress || {
        name: {
          first: userName?.split(' ')[0] || 'Student',
          last: userName?.split(' ').slice(1).join(' ') || 'User',
        },
        email: userEmail || user.email,
        phone_number: userPhone || '',
      },
      shipping: shippingAddress || {
        name: {
          first: userName?.split(' ')[0] || 'Student',
          last: userName?.split(' ').slice(1).join(' ') || 'User',
        },
        email: userEmail || user.email,
        phone_number: userPhone || '',
      },
      discounts: {},
      metadata: {
        user_id: user.id,
        course_id: courseId,
        platform: 'elevate-for-humanity',
        ...metadata,
      },
      order_id: `EFH-${Date.now()}-${courseId}`,
      shipping_amount: 0,
      tax_amount: 0,
      total: Math.round(amount * 100), // Convert to cents
    };

    // Make request to Affirm API
    const auth = Buffer.from(
      `${AFFIRM_PUBLIC_KEY}:${AFFIRM_PRIVATE_KEY}`
    ).toString('base64');

    const response = await fetch(`${AFFIRM_API_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      logger.error('Affirm checkout error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create Affirm checkout', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    logger.info('Affirm checkout created:', {
      checkout_token: data.checkout_token,
      user_id: user.id,
      course_id: courseId,
    });

    return NextResponse.json({
      checkout_token: data.checkout_token,
      redirect_url: data.redirect_url,
    });
  } catch (error) { /* Error handled silently */ 
    logger.error('Affirm checkout error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create Affirm checkout',
      },
      { status: 500 }
    );
  }
}
