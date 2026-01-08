import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';

export const metadata: Metadata = {
  title: 'Analytics | Elevate for Humanity',
  description: 'Course analytics and insights',
};

export default async function CreatorAnalyticsPage() {
  const { user } = await requireRole(['creator', 'admin']);
  const supabase = await createClient();

  // Get creator's courses
  const { data: courses } = await supabase
    .from('courses')
    .select('id')
    .eq('creator_id', user.id);

  const courseIds = courses?.map(c => c.id) || [];

  // Get enrollment stats
  const { count: totalEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .in('course_id', courseIds);

  const { count: activeEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .in('course_id', courseIds)
    .eq('status', 'active');

  const { count: completedEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .in('course_id', courseIds)
    .eq('status', 'completed');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics & Insights</h1>
      
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-sm text-slate-600 mb-2">Total Courses</div>
          <div className="text-3xl font-bold text-blue-600">{courses?.length || 0}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-sm text-slate-600 mb-2">Total Enrollments</div>
          <div className="text-3xl font-bold text-green-600">{totalEnrollments || 0}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-sm text-slate-600 mb-2">Active Students</div>
          <div className="text-3xl font-bold text-purple-600">{activeEnrollments || 0}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-sm text-slate-600 mb-2">Completions</div>
          <div className="text-3xl font-bold text-orange-600">{completedEnrollments || 0}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">Course Performance</h2>
        <p className="text-slate-600 mb-4">
          Detailed analytics and insights coming soon.
        </p>
        <div className="text-sm text-slate-500">
          Features in development:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Enrollment trends over time</li>
            <li>Completion rates by course</li>
            <li>Student engagement metrics</li>
            <li>Revenue analytics</li>
            <li>Student feedback and ratings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
