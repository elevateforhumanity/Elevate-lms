'use client';

import Image from 'next/image';
import { Lock, Trophy } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  date: string;
  icon: string;
  unlocked: boolean;
  description?: string;
}

interface AchievementsTabProps {
  achievements: Achievement[];
  points: number;
  streak: number;
}

const allAchievements: Achievement[] = [
  { id: 1, title: 'First 500 Hours', date: 'Dec 2024', icon: '/images/barber-professional.jpg', unlocked: true, description: 'Complete 500 practical training hours' },
  { id: 2, title: 'Theory Master', date: 'Nov 2024', icon: '/images/healthcare/healthcare-highlight.jpg', unlocked: true, description: 'Complete 6 theory modules with 90%+ scores' },
  { id: 3, title: 'Safety Certified', date: 'Oct 2024', icon: '/images/team/instructors/instructor-safety.jpg', unlocked: true, description: 'Pass sanitation & safety certification' },
  { id: 4, title: 'Perfect Attendance', date: 'Oct 2024', icon: '/images/learners/coaching-session.jpg', unlocked: true, description: '30 consecutive days of training' },
  { id: 5, title: '1000 Hours', date: 'Locked', icon: '/images/trades/hvac-highlight.jpg', unlocked: false, description: 'Complete 1,000 practical training hours' },
  { id: 6, title: 'Module Master', date: 'Locked', icon: '/images/business-highlight.jpg', unlocked: false, description: 'Complete all 12 theory modules' },
  { id: 7, title: 'Fade Expert', date: 'Locked', icon: '/images/barber-hero.jpg', unlocked: false, description: 'Pass advanced fading skills assessment' },
  { id: 8, title: 'Client Ready', date: 'Locked', icon: '/images/testimonials/student-sarah.jpg', unlocked: false, description: 'Complete 50 supervised client services' },
  { id: 9, title: 'State Board Ready', date: 'Locked', icon: '/images/certificates-hero.jpg', unlocked: false, description: 'Complete all program requirements' },
  { id: 10, title: 'Graduate', date: 'Locked', icon: '/images/stories/success-banner.jpg', unlocked: false, description: 'Successfully complete the apprenticeship' },
];

export function AchievementsTab({ points, streak }: AchievementsTabProps) {
  const unlockedCount = allAchievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Achievements</h1>
        <p className="text-slate-600">Track your milestones and earn rewards</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <Trophy className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-3xl font-bold">{unlockedCount}/{allAchievements.length}</div>
          <div className="text-sm opacity-80">Achievements Unlocked</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="text-3xl font-bold">{points.toLocaleString()}</div>
          <div className="text-sm opacity-80">Total Points Earned</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="text-3xl font-bold">{streak} days</div>
          <div className="text-sm opacity-80">Current Streak</div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-6">All Achievements</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative rounded-xl overflow-hidden border-2 transition ${
                achievement.unlocked
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-slate-200 bg-slate-50 opacity-60'
              }`}
            >
              <div className="aspect-video relative">
                <Image
                  src={achievement.icon}
                  alt={achievement.title}
                  fill
                  className={`object-cover ${!achievement.unlocked ? 'grayscale' : ''}`}
                />
                {!achievement.unlocked && (
                  <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                )}
                {achievement.unlocked && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Unlocked
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900">{achievement.title}</h3>
                <p className="text-sm text-slate-500 mb-2">{achievement.description}</p>
                <div className="text-xs text-slate-400">
                  {achievement.unlocked ? `Earned: ${achievement.date}` : 'Not yet unlocked'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
