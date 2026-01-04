"use client";

import { Flame, Calendar } from "lucide-react";

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  lastActivityDate: string;
  recentDays?: Array<{
    date: string;
    active: boolean;
  }>;
}

export function StreakTracker({
  currentStreak,
  longestStreak,
  totalActiveDays,
  lastActivityDate,
  recentDays = [],
}: StreakTrackerProps) {
  const isStreakActive = () => {
    const lastActivity = new Date(lastActivityDate);
    const today = new Date();
    const diffDays = Math.floor(
      (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffDays <= 1;
  };

  const streakActive = isStreakActive();

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-full ${streakActive ? "bg-orange-500" : "bg-slate-700"}`}>
          <Flame className={`w-6 h-6 ${streakActive ? "text-white" : "text-slate-500"}`} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">{currentStreak} Days</h3>
          <p className="text-sm text-slate-400">Current Streak</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 rounded-lg p-4">
          <p className="text-2xl font-bold text-white">{longestStreak}</p>
          <p className="text-xs text-slate-400">Longest Streak</p>
        </div>
        <div className="bg-slate-900 rounded-lg p-4">
          <p className="text-2xl font-bold text-white">{totalActiveDays}</p>
          <p className="text-xs text-slate-400">Total Active Days</p>
        </div>
      </div>

      {/* Calendar View */}
      {recentDays.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last 7 Days
          </h4>
          <div className="flex gap-2">
            {recentDays.map((day, index) => (
              <div
                key={index}
                className={`flex-1 h-12 rounded-lg flex items-center justify-center ${
                  day.active
                    ? "bg-orange-500 text-white"
                    : "bg-slate-900 text-slate-600"
                }`}
              >
                <span className="text-xs font-semibold">
                  {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivation Message */}
      <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
        <p className="text-sm text-orange-400">
          {streakActive
            ? currentStreak >= 7
              ? "🔥 Amazing! Keep the momentum going!"
              : "Great start! Keep learning daily to build your streak."
            : "Your streak ended. Start learning today to begin a new one!"}
        </p>
      </div>
    </div>
  );
}
