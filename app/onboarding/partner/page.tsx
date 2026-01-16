import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  Building2,
  FileText,
  Users,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Partner Onboarding | Elevate For Humanity',
  description: 'Complete your partner onboarding process.',
};

export const dynamic = 'force-dynamic';

export default async function PartnerOnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/onboarding/partner');
  }

  // Get partner profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get company info
  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('owner_id', user.id)
    .single();

  // Get onboarding tasks
  const { data: tasks } = await supabase
    .from('onboarding_tasks')
    .select('*')
    .eq('role', 'partner')
    .order('order', { ascending: true });

  // Get completed tasks
  const { data: completedTasks } = await supabase
    .from('completed_tasks')
    .select('task_id')
    .eq('user_id', user.id);

  const completedTaskIds = completedTasks?.map(t => t.task_id) || [];

  const defaultTasks = [
    { id: '1', title: 'Complete Company Profile', description: 'Add your company information and logo', href: '/onboarding/partner/company' },
    { id: '2', title: 'Review Partnership Agreement', description: 'Read and sign the partnership MOU', href: '/onboarding/partner/agreement' },
    { id: '3', title: 'Set Up Hiring Preferences', description: 'Define your hiring needs and requirements', href: '/onboarding/partner/hiring' },
    { id: '4', title: 'Complete Orientation', description: 'Learn how to use the partner portal', href: '/onboarding/partner/orientation' },
    { id: '5', title: 'Post Your First Job', description: 'Create a job listing for our graduates', href: '/employer-portal/jobs/new' },
  ];

  const displayTasks = tasks && tasks.length > 0 ? tasks : defaultTasks;
  const completedCount = completedTaskIds.length;
  const totalTasks = displayTasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Partner Onboarding</h1>
          </div>
          <p className="text-blue-100">
            Welcome, {company?.name || profile?.full_name || 'Partner'}! Complete the steps below to start hiring.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Progress</h2>
            <span className="text-blue-600 font-bold">{progressPercent}% Complete</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
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
                className={`bg-white rounded-xl shadow-sm border p-6 ${isNext ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCompleted ? 'bg-green-100' : isNext ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <span className={`font-bold ${isNext ? 'text-blue-600' : 'text-gray-400'}`}>
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
                        isNext ? 'text-blue-600 hover:underline' : 'text-gray-400'
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

        {/* Benefits */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Partner Benefits</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Pre-screened Candidates</p>
                <p className="text-sm text-gray-600">Access trained, job-ready graduates</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">No Recruitment Fees</p>
                <p className="text-sm text-gray-600">Hire our graduates at no cost</p>
              </div>
            </div>
          </div>
        </div>

        {/* Help */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Need help? <Link href="/support" className="text-blue-600 hover:underline">Contact our partner team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
