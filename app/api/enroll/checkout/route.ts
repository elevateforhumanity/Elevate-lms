import { NextRequest } from 'next/server';
import { createDeprecatedCheckoutHandler } from '@/lib/checkout/deprecated';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * DEPRECATED: Use /api/checkout/learner with type: 'program'
 */
export const POST = createDeprecatedCheckoutHandler(
  '/api/enroll/checkout',
  'learner',
  { type: 'program' }
);
