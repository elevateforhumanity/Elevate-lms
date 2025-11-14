'use client';

import { useEffect, useRef, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

interface AttendanceTrackerProps {
  courseId?: number;
  activityType?: string;
}

export default function AttendanceTracker({ courseId, activityType = 'learning' }: AttendanceTrackerProps) {
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(true);
  const loginTimeRef = useRef<Date>(new Date());
  const lastActivityRef = useRef<Date>(new Date());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Start attendance session
  const startSession = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('attendance_log')
        .insert({
          student_id: user.id,
          course_id: courseId,
          login_time: new Date().toISOString(),
          activity_type: activityType,
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setSessionId(data.id);
        loginTimeRef.current = new Date();
        lastActivityRef.current = new Date();
      }
    } catch (error) {
      console.error('Failed to start attendance session:', error);
    }
  };

  // Update session duration
  const updateSession = async () => {
    if (!sessionId || !isActive) return;

    try {
      const now = new Date();
      const durationMinutes = Math.round((now.getTime() - loginTimeRef.current.getTime()) / 60000);

      await supabase
        .from('attendance_log')
        .update({
          logout_time: now.toISOString(),
          duration_minutes: durationMinutes,
        })
        .eq('id', sessionId);
    } catch (error) {
      console.error('Failed to update attendance session:', error);
    }
  };

  // End session
  const endSession = async () => {
    if (!sessionId) return;

    try {
      const now = new Date();
      const durationMinutes = Math.round((now.getTime() - loginTimeRef.current.getTime()) / 60000);

      await supabase
        .from('attendance_log')
        .update({
          logout_time: now.toISOString(),
          duration_minutes: durationMinutes,
        })
        .eq('id', sessionId);

      // Update weekly contact hours
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await updateWeeklyHours(user.id, durationMinutes);
      }
    } catch (error) {
      console.error('Failed to end attendance session:', error);
    }
  };

  // Update weekly contact hours aggregate
  const updateWeeklyHours = async (userId: string, minutesToAdd: number) => {
    try {
      // Get start of current week (Sunday)
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);

      // Check if record exists for this week
      const { data: existing } = await supabase
        .from('contact_hours')
        .select('*')
        .eq('student_id', userId)
        .eq('week_start', weekStart.toISOString().split('T')[0])
        .single();

      if (existing) {
        // Update existing record
        await supabase
          .from('contact_hours')
          .update({
            total_hours: existing.total_hours + Math.round(minutesToAdd / 60 * 10) / 10,
            sessions_count: existing.sessions_count + 1,
          })
          .eq('id', existing.id);
      } else {
        // Create new record
        await supabase
          .from('contact_hours')
          .insert({
            student_id: userId,
            week_start: weekStart.toISOString().split('T')[0],
            total_hours: Math.round(minutesToAdd / 60 * 10) / 10,
            sessions_count: 1,
          });
      }
    } catch (error) {
      console.error('Failed to update weekly hours:', error);
    }
  };

  // Track user activity
  const handleActivity = () => {
    lastActivityRef.current = new Date();
    if (!isActive) {
      setIsActive(true);
    }
  };

  // Check for inactivity (5 minutes)
  const checkInactivity = () => {
    const now = new Date();
    const inactiveMinutes = (now.getTime() - lastActivityRef.current.getTime()) / 60000;
    
    if (inactiveMinutes > 5 && isActive) {
      setIsActive(false);
      updateSession();
    }
  };

  useEffect(() => {
    // Start session on mount
    startSession();

    // Set up activity listeners
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Update session every 30 seconds
    intervalRef.current = setInterval(() => {
      checkInactivity();
      if (isActive) {
        updateSession();
      }
    }, 30000);

    // End session on unmount
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      endSession();
    };
  }, []);

  // Update session when active state changes
  useEffect(() => {
    if (isActive) {
      updateSession();
    }
  }, [isActive]);

  // This component doesn't render anything visible
  return null;
}
