import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, Clock, FileText, Award, BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apprentice Portal | Elevate For Humanity',
  description: 'Track your apprenticeship progress, hours, and certifications.',
};

export const dynamic = 'force-dynamic';

export default async function ApprenticePortalPage() {
  const supabase = await createClient();
  
  if (!supabase) {
    redirect('/login?redirect=/apprentice');
  }

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login?redirect=/apprentice');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single();

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('id, status, progress, course_id')
    .eq('user_id', user.id)
    .limit(5);

  const totalHours = 0; // Would come from hours tracking table
  const requiredHours = 2000;

  const quickLinks = [
    { name: 'Log Hours', href: '/apprentice/hours', icon: Clock, description: 'Record your work hours' },
    { name: 'Documents', href: '/apprentice/documents', icon: FileText, description: 'View required documents' },
    { name: 'Skills Checklist', href: '/apprentice/skills', icon: Award, description: 'Track skill competencies' },
    { name: 'Handbook', href: '/apprentice/handbook', icon: BookOpen, description: 'Apprenticeship guidelines' },
    { name: 'Transfer Hours', href: '/apprentice/transfer-hours', icon: ArrowRight, description: 'Request hour transfers' },
    { name: 'State Board', href: '/apprentice/state-board', icon: GraduationCap, description: 'Exam preparation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {profile?.full_name || 'Apprentice'}
          </h1>
          <p className="text-gray-600 mt-2">
            Track your apprenticeship journey and progress
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Hours Progress</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${Math.min((totalHours / requiredHours) * 100, 100)}%` }}
                />
              </div>
            </div>
            <span className="text-lg font-medium text-gray-900">
              {totalHours.toLocaleString()} / {requiredHours.toLocaleString()} hours
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <link.icon className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">{link.name}</h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </Link>
          ))}
        </div>

        {/* Active Enrollments */}
        {enrollments && enrollments.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Programs</h2>
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Program #{enrollment.course_id}</p>
                    <p className="text-sm text-gray-600">Status: {enrollment.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-blue-600">{enrollment.progress || 0}%</p>
                    <p className="text-sm text-gray-600">Complete</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
