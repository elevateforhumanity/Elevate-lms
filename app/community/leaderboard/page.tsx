import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Medal, Star, TrendingUp, Award, Crown, Flame, Target, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Leaderboard | Community | Elevate For Humanity',
  description: 'See top contributors and track your progress on the community leaderboard.',
};

export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() {
  const topMembers = [
    { rank: 1, name: 'Sarah Johnson', points: 12450, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', streak: 45, badge: 'Champion' },
    { rank: 2, name: 'Marcus Williams', points: 11200, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', streak: 38, badge: 'Elite' },
    { rank: 3, name: 'Emily Chen', points: 10890, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', streak: 52, badge: 'Mentor' },
    { rank: 4, name: 'David Thompson', points: 9750, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', streak: 28, badge: 'Expert' },
    { rank: 5, name: 'Jessica Martinez', points: 8900, avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg', streak: 33, badge: 'Rising Star' },
    { rank: 6, name: 'Robert Brown', points: 8450, avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg', streak: 21, badge: 'Contributor' },
    { rank: 7, name: 'Amanda Lee', points: 7800, avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg', streak: 19, badge: 'Helper' },
    { rank: 8, name: 'Michael Davis', points: 7200, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', streak: 25, badge: 'Active' },
    { rank: 9, name: 'Lisa Wilson', points: 6900, avatar: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg', streak: 17, badge: 'Learner' },
    { rank: 10, name: 'James Taylor', points: 6500, avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', streak: 14, badge: 'Member' },
  ];

  const badges = [
    { name: 'First Post', icon: '✍️', description: 'Made your first community post', earned: true },
    { name: 'Helpful', icon: '🤝', description: 'Received 10 helpful votes', earned: true },
    { name: 'Streak Master', icon: '🔥', description: '30-day activity streak', earned: false },
    { name: 'Top Contributor', icon: '⭐', description: 'Top 10 monthly contributor', earned: false },
    { name: 'Mentor', icon: '🎓', description: 'Helped 50+ members', earned: false },
    { name: 'Champion', icon: '🏆', description: 'Reached #1 on leaderboard', earned: false },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center font-bold text-gray-500">#{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600 text-white py-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg"
            alt="Competition"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-8 h-8 text-yellow-200" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Community Leaderboard
            </h1>
            <p className="text-xl text-yellow-100 mb-8">
              Earn points by contributing to the community. Help others, share knowledge, and climb the ranks!
            </p>
            
            {/* Your Stats */}
            <div className="inline-flex items-center gap-8 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
              <div className="text-center">
                <p className="text-3xl font-bold">--</p>
                <p className="text-yellow-200 text-sm">Your Rank</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-3xl font-bold">0</p>
                <p className="text-yellow-200 text-sm">Points</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-3xl font-bold flex items-center gap-1">
                  <Flame className="w-6 h-6 text-orange-300" /> 0
                </p>
                <p className="text-yellow-200 text-sm">Day Streak</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 3 Podium */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-center gap-4">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={topMembers[1].avatar}
                  alt={topMembers[1].name}
                  fill
                  className="object-cover rounded-full border-4 border-gray-300"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="font-bold text-gray-700">2</span>
                </div>
              </div>
              <p className="font-bold text-gray-900">{topMembers[1].name}</p>
              <p className="text-gray-500 text-sm">{topMembers[1].points.toLocaleString()} pts</p>
              <div className="mt-4 w-24 h-32 bg-gray-200 rounded-t-lg mx-auto flex items-center justify-center">
                <Medal className="w-10 h-10 text-gray-400" />
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center -mt-8">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src={topMembers[0].avatar}
                  alt={topMembers[0].name}
                  fill
                  className="object-cover rounded-full border-4 border-yellow-400"
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-yellow-800" />
                </div>
              </div>
              <p className="font-bold text-gray-900 text-lg">{topMembers[0].name}</p>
              <p className="text-gray-500">{topMembers[0].points.toLocaleString()} pts</p>
              <div className="mt-4 w-28 h-44 bg-yellow-400 rounded-t-lg mx-auto flex items-center justify-center">
                <Trophy className="w-12 h-12 text-yellow-700" />
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={topMembers[2].avatar}
                  alt={topMembers[2].name}
                  fill
                  className="object-cover rounded-full border-4 border-amber-500"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="font-bold text-white">3</span>
                </div>
              </div>
              <p className="font-bold text-gray-900">{topMembers[2].name}</p>
              <p className="text-gray-500 text-sm">{topMembers[2].points.toLocaleString()} pts</p>
              <div className="mt-4 w-24 h-24 bg-amber-500 rounded-t-lg mx-auto flex items-center justify-center">
                <Medal className="w-10 h-10 text-amber-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Leaderboard */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Top Contributors This Month</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {topMembers.map((member, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 ${
                  index !== topMembers.length - 1 ? 'border-b border-gray-100' : ''
                } ${member.rank <= 3 ? 'bg-yellow-50/50' : ''}`}
              >
                <div className="w-10 flex justify-center">
                  {getRankIcon(member.rank)}
                </div>
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{member.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
                      {member.badge}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-500" />
                      {member.streak} day streak
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{member.points.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Earn Badges</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 ${
                  badge.earned
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <span className="text-4xl mb-4 block">{badge.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{badge.name}</h3>
                <p className="text-gray-600 text-sm">{badge.description}</p>
                {badge.earned && (
                  <p className="text-green-600 text-sm mt-2 font-medium">✓ Earned</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Climb the Ranks?</h2>
          <p className="text-yellow-100 mb-8 max-w-2xl mx-auto">
            Start contributing to the community and earn points for every helpful action.
          </p>
          <Link
            href="/community/discussions"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-colors"
          >
            Start Contributing
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
