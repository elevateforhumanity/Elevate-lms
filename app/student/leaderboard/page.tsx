import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Trophy, Medal, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Leaderboard | Elevate for Humanity',
  description: 'See top learners and your ranking.',
};

export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/student/leaderboard');
  }

  // Get top learners by points/progress
  const { data: topLearners } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, points')
    .order('points', { ascending: false })
    .limit(10);

  // Get current user's rank
  const { data: userProfile } = await supabase
    .from('profiles')
    .select('points')
    .eq('id', user.id)
    .single();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600 mb-8">
          Top learners this month. Keep learning to climb the ranks!
        </p>

        {/* User's current standing */}
        <div className="bg-blue-600 text-white p-4 rounded-xl mb-6">
          <p className="text-sm opacity-80">Your Points</p>
          <p className="text-3xl font-bold">{userProfile?.points || 0}</p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {topLearners && topLearners.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {topLearners.map((learner, index) => (
                <li
                  key={learner.id}
                  className={`flex items-center gap-4 p-4 ${
                    learner.id === user.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="w-8 flex justify-center">
                    {getRankIcon(index + 1)}
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {learner.avatar_url ? (
                      <img
                        src={learner.avatar_url}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 font-semibold">
                        {learner.full_name?.charAt(0) || '?'}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {learner.full_name || 'Anonymous'}
                      {learner.id === user.id && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                          You
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{learner.points || 0}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No learners yet. Be the first to earn points!</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600">
            <strong>How to earn points:</strong> Complete lessons (+10), finish courses (+100), 
            maintain streaks (+5/day), earn badges (+25).
          </p>
        </div>
      </div>
    </div>
  );
}
