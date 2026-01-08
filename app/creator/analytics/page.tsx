export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Analytics | Elevate for Humanity',
  description: 'Course analytics and insights',
};

export default async function CreatorAnalyticsPage() {
  let user = null;
  let totalEnrollments = 0;
  let activeEnrollments = 0;
  let completionRate = 0;

  try {
    const supabase = await createClient();
    
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      
      if (!authError && authData.user) {
        user = authData.user;
        
        const { data: courses, error: coursesError } = await supabase
          .from('courses')
          .select('id')
          .eq('creator_id', user.id);

        if (!coursesError && courses) {
          const courseIds = courses.map(c => c.id);

          if (courseIds.length > 0) {
            const { count: total } = await supabase
              .from('enrollments')
              .select('*', { count: 'exact', head: true })
              .in('course_id', courseIds);
            totalEnrollments = total || 0;

            const { count: active } = await supabase
              .from('enrollments')
              .select('*', { count: 'exact', head: true })
              .in('course_id', courseIds)
              .eq('status', 'active');
            activeEnrollments = active || 0;

            const { count: completed } = await supabase
              .from('enrollments')
              .select('*', { count: 'exact', head: true })
              .in('course_id', courseIds)
              .eq('status', 'completed');
            
            if (totalEnrollments > 0) {
              completionRate = Math.round(((completed || 0) / totalEnrollments) * 100);
            }
          }
        }
      }
    } catch (innerError) {
      console.error('Inner error in CreatorAnalyticsPage:', innerError);
    }
  } catch (outerError) {
    console.error('Outer error in CreatorAnalyticsPage:', outerError);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!user ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Analytics & Insights</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900 mb-4">
              Please log in to view your analytics.
            </p>
            <a
              href="/login"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Log In
            </a>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Analytics & Insights</h1>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-sm text-slate-600 mb-2">Total Courses</div>
              <div className="text-3xl font-bold text-blue-600">0</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-sm text-slate-600 mb-2">Total Enrollments</div>
              <div className="text-3xl font-bold text-green-600">{totalEnrollments}</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-sm text-slate-600 mb-2">Active Students</div>
              <div className="text-3xl font-bold text-purple-600">{activeEnrollments}</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-sm text-slate-600 mb-2">Completion Rate</div>
              <div className="text-3xl font-bold text-orange-600">{completionRate}%</div>
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
        </>
      )}
    </div>
  );
}
