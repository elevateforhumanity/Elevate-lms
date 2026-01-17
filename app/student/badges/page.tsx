import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Award, Lock, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Badges | Elevate for Humanity',
  description: 'View your earned badges and achievements.',
};

export const dynamic = 'force-dynamic';

const allBadges = [
  { id: 'first-login', name: 'First Steps', description: 'Logged in for the first time', icon: '🎯' },
  { id: 'profile-complete', name: 'Profile Pro', description: 'Completed your profile', icon: '👤' },
  { id: 'first-course', name: 'Learner', description: 'Started your first course', icon: '📚' },
  { id: 'first-completion', name: 'Achiever', description: 'Completed your first course', icon: '🏆' },
  { id: 'week-streak', name: 'Consistent', description: '7-day learning streak', icon: '🔥' },
  { id: 'month-streak', name: 'Dedicated', description: '30-day learning streak', icon: '⭐' },
  { id: 'certification', name: 'Certified', description: 'Earned a certification', icon: '📜' },
  { id: 'job-ready', name: 'Job Ready', description: 'Completed career services', icon: '💼' },
];

export default async function BadgesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/student/badges');
  }

  // Get user's earned badges
  const { data: earnedBadges } = await supabase
    .from('user_badges')
    .select('badge_id, earned_at')
    .eq('user_id', user.id);

  const earnedIds = new Set(earnedBadges?.map(b => b.badge_id) || []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Badges</h1>
        <p className="text-gray-600 mb-8">
          Earn badges by completing milestones in your learning journey.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allBadges.map((badge) => {
            const earned = earnedIds.has(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl text-center ${
                  earned ? 'bg-white shadow-md' : 'bg-gray-100 opacity-60'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className={`font-semibold ${earned ? 'text-gray-900' : 'text-gray-500'}`}>
                  {badge.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                {earned ? (
                  <div className="mt-2 flex items-center justify-center gap-1 text-green-600 text-xs">
                    <CheckCircle className="w-3 h-3" />
                    Earned
                  </div>
                ) : (
                  <div className="mt-2 flex items-center justify-center gap-1 text-gray-400 text-xs">
                    <Lock className="w-3 h-3" />
                    Locked
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Complete courses and maintain your learning streak to unlock more badges!
          </p>
        </div>
      </div>
    </div>
  );
}
