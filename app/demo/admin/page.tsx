import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Info, Home, Users, GraduationCap, FileText, Building2, Bell, CheckCircle, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import AdminDemoClient from './AdminDemoClient';

export const metadata: Metadata = {
  title: 'Admin Demo | Elevate for Humanity',
  description: 'Interactive demo of the admin dashboard for workforce training management.',
};

export default async function AdminDemoPage() {
  const supabase = await createClient();

  // Fetch real data from database
  const [
    { data: students, count: studentCount },
    { data: programs },
    { data: enrollments },
    { data: partners },
  ] = await Promise.all([
    supabase.from('students').select('*', { count: 'exact' }).limit(10),
    supabase.from('programs').select('*').eq('is_active', true).limit(10),
    supabase.from('enrollments').select('*, students(*), programs(*)').limit(20),
    supabase.from('partners').select('*').limit(10),
  ]);

  // Calculate stats
  const totalStudents = studentCount || 0;
  const totalPrograms = programs?.length || 0;
  const activeEnrollments = enrollments?.filter(e => e.status === 'active')?.length || 0;
  const totalPartners = partners?.length || 0;

  // Format students for display
  const formattedStudents = students?.map(s => ({
    id: s.id,
    name: `${s.first_name || ''} ${s.last_name || ''}`.trim() || 'Unknown',
    email: s.email || '',
    program: enrollments?.find(e => e.student_id === s.id)?.programs?.title || 'Not enrolled',
    progress: Math.floor(Math.random() * 100), // Would come from progress tracking
    status: 'active',
    avatar: s.avatar_url || '/images/testimonials/student-marcus.jpg',
  })) || [];

  // Format programs for display
  const formattedPrograms = programs?.map(p => ({
    id: p.id,
    name: p.title || p.name,
    category: p.category || 'General',
    enrolled: enrollments?.filter(e => e.program_id === p.id)?.length || 0,
    completed: Math.floor(Math.random() * 50), // Would come from completion tracking
  })) || [];

  // Recent activity (would come from activity log table)
  const recentActivity = [
    { msg: 'New student enrolled in Barber Program', time: '15m ago', type: 'enroll' },
    { msg: 'CNA cohort completed training', time: '1h ago', type: 'complete' },
    { msg: '24 OJT hours verified', time: '2h ago', type: 'verify' },
    { msg: 'New employer partner onboarded', time: '4h ago', type: 'partner' },
  ];

  return (
    <AdminDemoClient
      stats={{
        students: totalStudents,
        programs: totalPrograms,
        activeEnrollments,
        partners: totalPartners,
      }}
      students={formattedStudents}
      programs={formattedPrograms}
      activity={recentActivity}
    />
  );
}
