export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { issueModuleCertificate } from '@/lib/certificates/certificate-generator';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const { enrollmentId, moduleId } = await request.json();

    if (!enrollmentId || !moduleId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const certificateNumber = await issueModuleCertificate(enrollmentId, moduleId);

    return NextResponse.json({
      success: true,
      certificateNumber
    });
  } catch { /* Error handled silently */ 
    logger.error('Error issuing module certificate:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to issue certificate' },
      { status: 500 }
    );
  }
}
