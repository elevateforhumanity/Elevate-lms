/**
 * DEPRECATED: Use /api/webhooks/stripe instead
 * 
 * This endpoint forwards to the canonical webhook handler.
 * Configure Stripe to use /api/webhooks/stripe directly.
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  logger.warn('Deprecated webhook endpoint called', { 
    path: '/api/stripe/webhook',
    canonical: '/api/webhooks/stripe'
  });

  // Forward the raw request to canonical handler
  const body = await request.text();
  
  const response = await fetch(new URL('/api/webhooks/stripe', request.url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'stripe-signature': request.headers.get('stripe-signature') || '',
    },
    body,
  });

  const data = await response.text();
  return new NextResponse(data, { 
    status: response.status,
    headers: { 'Content-Type': 'application/json' }
  });
}
