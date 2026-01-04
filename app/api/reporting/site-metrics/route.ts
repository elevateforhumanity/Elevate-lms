export const runtime = 'edge';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { calculateSiteMetrics } from '@/lib/reporting/enterprise-dashboard';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const metrics = await calculateSiteMetrics();
    return NextResponse.json(metrics);
  } catch (error: unknown) {
    logger.error('Error fetching site metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site metrics' },
      { status: 500 }
    );
  }
}
