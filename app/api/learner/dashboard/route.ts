import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all dashboard data in parallel
    const [
      profileResult,
      enrollmentResult,
      hoursResult,
      achievementsResult,
      streakResult,
      pointsResult,
      scheduleResult,
      trainingLogsResult
    ] = await Promise.all([
      // 1. User profile
      supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url, role')
        .eq('id', user.id)
        .single(),
      
      // 2. Active enrollment with program details
      supabase
        .from('student_enrollments')
        .select(`
          id,
          program_id,
          status,
          transfer_hours,
          required_hours,
          rapids_status,
          rapids_id,
          milady_enrolled,
          shop_id,
          created_at,
          programs (
            id,
            name,
            slug,
            total_hours,
            description
          )
        `)
        .eq('student_id', user.id)
        .eq('status', 'active')
        .maybeSingle(),
      
      // 3. Hours summary from apprentice_hours_log
      supabase
        .from('apprentice_hours_log')
        .select('id, minutes, hour_type, funding_phase, status, logged_date, description')
        .eq('student_id', user.id)
        .order('logged_date', { ascending: false }),
      
      // 4. Achievements
      supabase
        .from('achievements')
        .select('id, code, label, description, earned_at, icon')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false }),
      
      // 5. Streak data
      supabase
        .from('daily_streaks')
        .select('current_streak, longest_streak, last_active_date')
        .eq('user_id', user.id)
        .maybeSingle(),
      
      // 6. Points/gamification
      supabase
        .from('user_points')
        .select('total_points, level, level_name, points_to_next_level')
        .eq('user_id', user.id)
        .maybeSingle(),
      
      // 7. Upcoming schedule (next 7 days)
      supabase
        .from('calendar_events')
        .select('id, title, date, time, duration, description, color, event_type')
        .eq('user_id', user.id)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })
        .limit(10),
      
      // 8. Recent training logs (last 10)
      supabase
        .from('apprentice_hours_log')
        .select('id, minutes, hour_type, status, logged_date, description, verified_by')
        .eq('student_id', user.id)
        .order('logged_date', { ascending: false })
        .limit(10)
    ]);

    // Process hours data
    const hourLogs = hoursResult.data || [];
    const totalRtiMinutes = hourLogs
      .filter(l => l.hour_type === 'RTI')
      .reduce((sum, l) => sum + (l.minutes || 0), 0);
    const totalOjtMinutes = hourLogs
      .filter(l => l.hour_type === 'OJT')
      .reduce((sum, l) => sum + (l.minutes || 0), 0);
    const approvedMinutes = hourLogs
      .filter(l => l.status === 'APPROVED')
      .reduce((sum, l) => sum + (l.minutes || 0), 0);
    const pendingMinutes = hourLogs
      .filter(l => l.status === 'SUBMITTED' || l.status === 'DRAFT')
      .reduce((sum, l) => sum + (l.minutes || 0), 0);

    // Calculate progress
    const enrollment = enrollmentResult.data;
    const requiredHours = enrollment?.required_hours || 
      (enrollment?.programs as any)?.total_hours || 1500;
    const transferHours = enrollment?.transfer_hours || 0;
    const totalHours = (totalRtiMinutes + totalOjtMinutes) / 60;
    const effectiveTotal = totalHours + transferHours;
    const progressPercentage = Math.min((effectiveTotal / requiredHours) * 100, 100);

    // Get current module progress (from lesson_completions or course progress)
    const { data: moduleProgress } = await supabase
      .from('lesson_completions')
      .select('module_id, completed_at')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });

    // Get modules for current course
    const { data: modules } = await supabase
      .from('modules')
      .select(`
        id,
        title,
        description,
        order_index,
        lessons (
          id,
          title,
          order_index,
          duration_minutes,
          content_type
        )
      `)
      .order('order_index', { ascending: true })
      .limit(10);

    // Build dashboard response
    const dashboard = {
      learner: {
        id: user.id,
        name: profileResult.data?.full_name || user.email?.split('@')[0] || 'Student',
        email: profileResult.data?.email || user.email,
        avatar: profileResult.data?.avatar_url,
      },
      program: enrollment ? {
        id: enrollment.program_id,
        name: (enrollment.programs as any)?.name || 'Barber Apprenticeship',
        slug: (enrollment.programs as any)?.slug,
        enrollmentId: enrollment.id,
        rapidsStatus: enrollment.rapids_status,
        rapidsId: enrollment.rapids_id,
        miladyEnrolled: enrollment.milady_enrolled,
      } : null,
      progress: {
        theoryModules: Math.round((moduleProgress?.length || 0) / Math.max(modules?.length || 1, 1) * 100),
        practicalHours: Math.round(totalOjtMinutes / 60),
        rtiHours: Math.round(totalRtiMinutes / 60),
        totalHours: Math.round(effectiveTotal),
        requiredHours,
        transferHours,
        approvedHours: Math.round(approvedMinutes / 60),
        pendingHours: Math.round(pendingMinutes / 60),
        progressPercentage: Math.round(progressPercentage),
      },
      currentModule: modules?.[0] ? {
        id: modules[0].id,
        title: modules[0].title,
        description: modules[0].description,
        lessons: (modules[0].lessons as any[])?.map((l: any) => ({
          id: l.id,
          title: l.title,
          duration: l.duration_minutes,
          type: l.content_type,
          completed: moduleProgress?.some(mp => mp.module_id === l.id) || false,
        })) || [],
      } : null,
      trainingLog: (trainingLogsResult.data || []).map(log => ({
        id: log.id,
        date: log.logged_date,
        hours: Math.round((log.minutes || 0) / 60 * 10) / 10,
        type: log.hour_type,
        description: log.description,
        status: log.status,
        verified: log.status === 'APPROVED',
      })),
      schedule: (scheduleResult.data || []).map(event => ({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        duration: event.duration,
        type: event.event_type || 'class',
        color: event.color,
      })),
      achievements: (achievementsResult.data || []).map(a => ({
        id: a.id,
        code: a.code,
        label: a.label,
        description: a.description,
        earnedAt: a.earned_at,
        icon: a.icon,
      })),
      gamification: {
        points: pointsResult.data?.total_points || 0,
        level: pointsResult.data?.level || 1,
        levelName: pointsResult.data?.level_name || 'Beginner',
        pointsToNextLevel: pointsResult.data?.points_to_next_level || 100,
        currentStreak: streakResult.data?.current_streak || 0,
        longestStreak: streakResult.data?.longest_streak || 0,
      },
    };

    return NextResponse.json(dashboard);

  } catch (error) {
    logger.error('[Learner Dashboard] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
