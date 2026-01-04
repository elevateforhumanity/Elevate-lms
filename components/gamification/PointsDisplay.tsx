"use client";

import { Trophy, TrendingUp, Star } from "lucide-react";

interface PointsDisplayProps {
  totalPoints: number;
  level: number;
  levelName: string;
  pointsToNextLevel: number;
  recentTransactions?: Array<{
    points: number;
    description: string;
    created_at: string;
  }>;
}

export function PointsDisplay({
  totalPoints,
  level,
  levelName,
  pointsToNextLevel,
  recentTransactions = [],
}: PointsDisplayProps) {
  const progressPercentage = ((totalPoints % 1000) / 1000) * 100;

  return (
    <div className="   rounded-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-6 h-6" />
            <span className="text-2xl font-bold">{totalPoints.toLocaleString()}</span>
          </div>
          <p className="text-orange-100 text-sm">Total Points</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end mb-1">
            <Star className="w-5 h-5" />
            <span className="text-xl font-bold">Level {level}</span>
          </div>
          <p className="text-orange-100 text-sm">{levelName}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-orange-100">Progress to Level {level + 1}</span>
          <span className="font-semibold">{pointsToNextLevel} points to go</span>
        </div>
        <div className="w-full bg-orange-700 rounded-full h-3">
          <div
            className="bg-white rounded-full h-3 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Recent Activity */}
      {recentTransactions.length > 0 && (
        <div className="border-t border-orange-400 pt-4">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Recent Activity
          </h4>
          <div className="space-y-2">
            {recentTransactions.slice(0, 3).map((transaction, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-orange-100">{transaction.description}</span>
                <span className="font-semibold">+{transaction.points}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
