
export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

// Using nodejs runtime for better compatibility with Supabase

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();
    const today = new Date().toISOString().split('T')[0];

    // Get all active apprenticeships with today's hours
    const { data: apprenticeships, error } = await supabase
      .from('apprenticeship_enrollments')
      .select(
        `
        id,
        student_id,
        employer_id,
        hours_completed,
        hours_required,
        student:profiles!apprenticeship_enrollments_student_id_fkey(
          id,
          email,
          full_name
        ),
        employer:profiles!apprenticeship_enrollments_employer_id_fkey(
          id,
          email,
          full_name
        ),
        program:programs(
          id,
          name
        )
      `
      )
      .eq('status', 'active');

    if (error) throw error;

    const results = [];

    for (const apprenticeship of apprenticeships || []) {
      // Get today's hours
      const { data: todayLog, error: logError } = await supabase
        .from('ojt_hours_log')
        .select('total_hours, check_in_time, check_out_time, approved')
        .eq('apprenticeship_id', apprenticeship.id)
        .eq('work_date', today)
        .maybeSingle();

      if (logError) {
        logger.error('Error fetching logs:', logError);
        continue;
      }

      // Only send summary if student checked in today
      if (todayLog && apprenticeship.student?.email) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/apprentice/email-alerts`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'daily_summary',
              apprenticeshipId: apprenticeship.id,
              data: {
                studentName: apprenticeship.student.full_name,
                studentEmail: apprenticeship.student.email,
                programName: apprenticeship.program?.name,
                todayHours: todayLog.total_hours || 0,
                totalHours: apprenticeship.hours_completed || 0,
                requiredHours: apprenticeship.hours_required || 1500,
                checkInTime: todayLog.check_in_time,
                checkOutTime: todayLog.check_out_time,
                approved: todayLog.approved,
                date: today,
              },
            }),
          }
        );

        results.push({
          student: apprenticeship.student.full_name,
          hours: todayLog.total_hours,
          status: response.ok ? 'sent' : 'failed',
        });
      }
    }

    return NextResponse.json({
      success: true,
      summaries_sent: results.length,
      results,
    });
  } catch (error) { /* Error handled silently */ 
    logger.error('End of day summary cron error:', error);
    return NextResponse.json(
      { error: 'Failed to send end of day summaries' },
      { status: 500 }
    );
  }
}
