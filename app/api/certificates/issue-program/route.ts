export const runtime = 'edge';
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { issueProgramCertificate } from '@/lib/certificates/certificate-generator';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(request: NextRequest) {
  try {
    const { studentId, programId } = await request.json();

    if (!studentId || !programId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const certificateNumber = await issueProgramCertificate(studentId, programId);

    return NextResponse.json({
      success: true,
      certificateNumber
    });
  } catch (error) { /* Error handled silently */ 
    logger.error('Error issuing program certificate:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to issue certificate' },
      { status: 500 }
    );
  }
}
