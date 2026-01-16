import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Play,
  CheckCircle,
  Clock,
  ArrowLeft,
  ArrowRight,
  FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Staff Orientation | Elevate For Humanity',
  description: 'Complete your staff orientation training.',
};

export const dynamic = 'force-dynamic';

export default async function StaffOrientationPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/onboarding/staff/orientation');
  }

  // Get orientation modules
  const { data: modules } = await supabase
    .from('orientation_modules')
    .select('*')
    .eq('type', 'staff')
    .eq('is_active', true)
    .order('order', { ascending: true });

  // Get user's completed modules
  const { data: completedModules } = await supabase
    .from('module_completions')
    .select('module_id')
    .eq('user_id', user.id);

  const completedIds = completedModules?.map(m => m.module_id) || [];

  const defaultModules = [
    { id: '1', title: 'Welcome to Elevate', description: 'Introduction to our mission and values', duration: '10 min', video_url: '#' },
    { id: '2', title: 'Organization Overview', description: 'Learn about our programs and services', duration: '15 min', video_url: '#' },
    { id: '3', title: 'Policies & Procedures', description: 'Important workplace policies', duration: '20 min', video_url: '#' },
    { id: '4', title: 'Safety & Compliance', description: 'Workplace safety and compliance training', duration: '15 min', video_url: '#' },
    { id: '5', title: 'Systems & Tools', description: 'Introduction to our technology platforms', duration: '20 min', video_url: '#' },
    { id: '6', title: 'Your Role & Responsibilities', description: 'Understanding your position', duration: '10 min', video_url: '#' },
  ];

  const displayModules = modules && modules.length > 0 ? modules : defaultModules;
  const completedCount = completedIds.length;
  const totalModules = displayModules.length;
  const allCompleted = completedCount >= totalModules;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/onboarding/staff" className="inline-flex items-center gap-2 text-indigo-200 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Onboarding
          </Link>
          <h1 className="text-3xl font-bold mb-2">Orientation Training</h1>
          <p className="text-indigo-100">Complete all modules to finish your orientation.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Progress</span>
            <span className="text-indigo-600 font-bold">{completedCount}/{totalModules} modules</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full"
              style={{ width: `${(completedCount / totalModules) * 100}%` }}
            />
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-4">
          {displayModules.map((module: any, index: number) => {
            const isCompleted = completedIds.includes(module.id);
            const isAvailable = index === 0 || completedIds.includes(displayModules[index - 1]?.id);

            return (
              <div 
                key={module.id}
                className={`bg-white rounded-xl shadow-sm border p-6 ${!isAvailable && !isCompleted ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isCompleted ? 'bg-green-100' : 'bg-indigo-100'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Play className="w-6 h-6 text-indigo-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{module.title}</h3>
                      {isCompleted && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{module.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {module.duration}
                      </span>
                    </div>
                  </div>
                  {isAvailable && !isCompleted ? (
                    <Link
                      href={`/onboarding/staff/orientation/${module.id}`}
                      className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
                    >
                      Start <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : isCompleted ? (
                    <Link
                      href={`/onboarding/staff/orientation/${module.id}`}
                      className="text-indigo-600 text-sm font-medium hover:underline"
                    >
                      Review
                    </Link>
                  ) : (
                    <span className="text-gray-400 text-sm">Locked</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion */}
        {allCompleted && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Orientation Complete!</h3>
            <p className="text-green-700 mb-4">You've completed all orientation modules.</p>
            <Link
              href="/onboarding/staff"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
            >
              Continue Onboarding <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
