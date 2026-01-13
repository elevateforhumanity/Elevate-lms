export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { onModuleComplete } from '@/lib/certificates/certificate-delivery';
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
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

    // Verify the enrollment exists and belongs to the authenticated user
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: enrollment } = await supabase
      .from('partner_course_enrollments')
      .select('student_id')
      .eq('id', enrollmentId)
      .single();

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    // Process module completion and issue certificate
    await onModuleComplete(enrollmentId, moduleId);

    return NextResponse.json({
      success: true,
      message: 'Module completed and certificate issued'
    });
  } catch (error: any) {
    logger.error('Error completing module:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to complete module' },
      { status: 500 }
    );
  }
}
