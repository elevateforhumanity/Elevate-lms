export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  alternates: { canonical: 'https://elevateforhumanity.institute/lms/leaderboard' },
  title: 'Leaderboard | LMS | Elevate For Humanity',
  description: 'See top learners and track your progress.',
};

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/lms/leaderboard');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((rank) => (
                <div key={rank} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${rank <= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-600'}`}>{rank}</span>
                  <div className="flex-1">
                    <p className="font-medium">Learner {rank}</p>
                    <p className="text-sm text-gray-600">{100 - rank * 10} points</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-6">Complete courses and earn achievements to climb the leaderboard!</p>
          </div>
          <div className="mt-8 text-center">
            <Link href="/lms/community" className="text-brand-blue-600 hover:text-brand-blue-700">← Back to Community</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
