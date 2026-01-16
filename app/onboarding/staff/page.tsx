import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  FileText,
  Users,
  BookOpen,
  Clock,
  ArrowRight,
  ClipboardList,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Staff Onboarding | Elevate For Humanity',
  description: 'Complete your staff onboarding process.',
};

export const dynamic = 'force-dynamic';

export default async function StaffOnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/onboarding/staff');
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get onboarding progress
  const { data: onboardingProgress } = await supabase
    .from('onboarding_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('type', 'staff')
    .single();

  // Get onboarding tasks
  const { data: tasks } = await supabase
    .from('onboarding_tasks')
    .select('*')
    .eq('role', 'staff')
    .order('order', { ascending: true });

  // Get completed tasks
  const { data: completedTasks } = await supabase
    .from('completed_tasks')
    .select('task_id')
    .eq('user_id', user.id);

  const completedTaskIds = completedTasks?.map(t => t.task_id) || [];

  const defaultTasks = [
    { id: '1', title: 'Complete Personal Information', description: 'Fill out your profile and contact details', href: '/onboarding/staff/profile' },
    { id: '2', title: 'Review Employee Handbook', description: 'Read and acknowledge the employee handbook', href: '/onboarding/staff/handbook' },
    { id: '3', title: 'Complete Orientation Training', description: 'Watch orientation videos and complete quiz', href: '/onboarding/staff/orientation' },
    { id: '4', title: 'Set Up Direct Deposit', description: 'Enter your banking information for payroll', href: '/onboarding/staff/payroll' },
    { id: '5', title: 'Submit Required Documents', description: 'Upload ID, W-4, and other required forms', href: '/onboarding/staff/documents' },
    { id: '6', title: 'Complete Background Check', description: 'Authorize and complete background verification', href: '/onboarding/staff/background-check' },
  ];

  const displayTasks = tasks && tasks.length > 0 ? tasks : defaultTasks;
  const completedCount = completedTaskIds.length;
  const totalTasks = displayTasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Staff Onboarding</h1>
          <p className="text-indigo-100">Welcome, {profile?.full_name || 'Team Member'}! Complete the steps below to get started.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Progress</h2>
            <span className="text-indigo-600 font-bold">{progressPercent}% Complete</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {completedCount} of {totalTasks} tasks completed
          </p>
        </div>

        {/* Tasks */}
        <div className="space-y-4">
          {displayTasks.map((task: any, index: number) => {
            const isCompleted = completedTaskIds.includes(task.id);
            const isNext = !isCompleted && completedTaskIds.length === index;

            return (
              <div 
                key={task.id}
                className={`bg-white rounded-xl shadow-sm border p-6 ${isNext ? 'ring-2 ring-indigo-500' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCompleted ? 'bg-green-100' : isNext ? 'bg-indigo-100' : 'bg-gray-100'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <span className={`font-bold ${isNext ? 'text-indigo-600' : 'text-gray-400'}`}>
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${isCompleted ? 'text-gray-500' : ''}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                  </div>
                  {isCompleted ? (
                    <span className="text-green-600 text-sm font-medium">Completed</span>
                  ) : (
                    <Link
                      href={task.href || '#'}
                      className={`flex items-center gap-1 text-sm font-medium ${
                        isNext ? 'text-indigo-600 hover:underline' : 'text-gray-400'
                      }`}
                    >
                      {isNext ? 'Start' : 'Locked'} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Help */}
        <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            If you have questions about the onboarding process, contact HR.
          </p>
          <Link href="/support" className="text-indigo-600 text-sm font-medium hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
