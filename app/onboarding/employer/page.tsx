import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Building2, CheckCircle, ArrowRight, Users, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Employer Onboarding | Elevate For Humanity',
  description: 'Complete your employer onboarding process.',
};

export const dynamic = 'force-dynamic';

export default async function EmployerOnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/onboarding/employer');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('owner_id', user.id)
    .single();

  const { data: completedTasks } = await supabase
    .from('completed_tasks')
    .select('task_id')
    .eq('user_id', user.id);

  const completedTaskIds = completedTasks?.map(t => t.task_id) || [];

  const tasks = [
    { id: '1', title: 'Create Company Profile', description: 'Add your company details and branding', href: '/onboarding/employer/company' },
    { id: '2', title: 'Review Partnership Terms', description: 'Read and accept the partnership agreement', href: '/onboarding/employer/agreement' },
    { id: '3', title: 'Set Hiring Preferences', description: 'Define your ideal candidate requirements', href: '/onboarding/employer/preferences' },
    { id: '4', title: 'Complete Orientation', description: 'Learn how to use the employer portal', href: '/onboarding/employer/orientation' },
    { id: '5', title: 'Post Your First Job', description: 'Create a job listing to start hiring', href: '/employer-portal/jobs/new' },
  ];

  const completedCount = completedTaskIds.length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Employer Onboarding</h1>
          </div>
          <p className="text-blue-100">
            Welcome, {company?.name || profile?.full_name}! Complete these steps to start hiring.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Progress</h2>
            <span className="text-blue-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map((task, index) => {
            const isCompleted = completedTaskIds.includes(task.id);
            const isNext = !isCompleted && completedTaskIds.length === index;

            return (
              <div key={task.id} className={`bg-white rounded-xl shadow-sm border p-6 ${isNext ? 'ring-2 ring-blue-500' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-100' : isNext ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <span className={`font-bold ${isNext ? 'text-blue-600' : 'text-gray-400'}`}>{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${isCompleted ? 'text-gray-500' : ''}`}>{task.title}</h3>
                    <p className="text-sm text-gray-500">{task.description}</p>
                  </div>
                  {isCompleted ? (
                    <span className="text-green-600 text-sm font-medium">Done</span>
                  ) : (
                    <Link href={task.href} className={`flex items-center gap-1 text-sm font-medium ${isNext ? 'text-blue-600' : 'text-gray-400'}`}>
                      {isNext ? 'Start' : 'Locked'} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Why Partner With Us?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Trained Candidates</p>
                <p className="text-sm text-gray-600">Access job-ready graduates</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">No Fees</p>
                <p className="text-sm text-gray-600">Free recruitment services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
