import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Users, Clock, Search, Plus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Courses | Staff Portal | Elevate For Humanity',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const courses = [
  { title: 'Healthcare Fundamentals', students: 45, status: 'Active', progress: 78 },
  { title: 'CNA Certification Prep', students: 32, status: 'Active', progress: 65 },
  { title: 'CDL Training', students: 28, status: 'Active', progress: 82 },
  { title: 'HVAC Basics', students: 19, status: 'Draft', progress: 0 },
];

export default async function StaffCoursesPage() {
  const supabase = await createClient();
  if (!supabase) redirect('/login');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?redirect=/staff-portal/courses');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Staff Portal', href: '/staff-portal' }, { label: 'Courses' }]} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search courses..." className="pl-10 pr-4 py-2 border rounded-lg" />
            </div>
            <Link href="/staff-portal/courses/create" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-5 h-5" /> New Course
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-900">Course</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Students</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Avg Progress</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {courses.map((course, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">{course.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{course.students}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>{course.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{course.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Link href={`/staff-portal/courses/${i}`} className="text-blue-600 hover:underline text-sm">Manage</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
