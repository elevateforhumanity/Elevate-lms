import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, CheckCircle, ArrowRight, BookOpen, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'School Onboarding | Elevate For Humanity',
  description: 'Complete your school partner onboarding.',
};

export const dynamic = 'force-dynamic';

export default async function SchoolOnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/onboarding/school');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: completedTasks } = await supabase
    .from('completed_tasks')
    .select('task_id')
    .eq('user_id', user.id);

  const completedTaskIds = completedTasks?.map(t => t.task_id) || [];

  const tasks = [
    { id: '1', title: 'School Profile', description: 'Add your institution details', href: '/onboarding/school/profile' },
    { id: '2', title: 'Partnership Agreement', description: 'Review and sign the MOU', href: '/onboarding/school/agreement' },
    { id: '3', title: 'Program Setup', description: 'Configure your training programs', href: '/onboarding/school/programs' },
    { id: '4', title: 'Orientation', description: 'Learn the platform features', href: '/onboarding/school/orientation' },
  ];

  const completedCount = completedTaskIds.length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8" />
            <h1 className="text-3xl font-bold">School Onboarding</h1>
          </div>
          <p className="text-purple-100">Welcome! Complete these steps to start your partnership.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Progress</h2>
            <span className="text-purple-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map((task, index) => {
            const isCompleted = completedTaskIds.includes(task.id);
            const isNext = !isCompleted && completedTaskIds.length === index;

            return (
              <div key={task.id} className={`bg-white rounded-xl shadow-sm border p-6 ${isNext ? 'ring-2 ring-purple-500' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-100' : isNext ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <span className={`font-bold ${isNext ? 'text-purple-600' : 'text-gray-400'}`}>{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-500">{task.description}</p>
                  </div>
                  <Link href={task.href} className={`flex items-center gap-1 text-sm font-medium ${isNext ? 'text-purple-600' : 'text-gray-400'}`}>
                    {isCompleted ? 'Review' : isNext ? 'Start' : 'Locked'} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
