"use client";

import React from 'react';

import { useEffect, useState } from "react";

type Achievement = {
  code: string;
  label: string;
  description: string | null;
  earned_at: string;
};

type ApiResponse = {
  achievements: Achievement[];
};

const niceEmojiForCode: Record<string, string> = {
  STREAK_3: "🔥",
  STREAK_7: "⚡",
  STREAK_30: "🏆",
  BIG_DAY_30: "⏱️",
  BIG_DAY_60: "💪",
};

export function StudentAchievementsWidget() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/student/achievements", {
          cache: "no-store",
        });
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const json: ApiResponse = await res.json();
        setAchievements(json.achievements || []);
      } catch (e) {
        // Error: $1
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-4 text-xs text-slate-500 shadow-sm">
        Loading achievements…
      </div>
    );
  }

  if (!achievements.length) {
    return (
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Achievements
        </p>
        <p className="mt-1 text-xs text-slate-600">
          Start learning to unlock your first badge.
        </p>
      </div>
    );
  }

  const recent = achievements.slice(0, 6);

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Achievements
        </p>
        <p className="text-[11px] text-slate-500">
          {achievements.length} unlocked
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {recent.map((a) => {
          const emoji = niceEmojiForCode[a.code] ?? "⭐";
          const date = new Date(a.earned_at);
          const dateLabel = date.toLocaleDateString();

          return (
            <div
              key={a.code}
              className="flex flex-col gap-1 rounded-lg border bg-slate-50 p-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{emoji}</span>
                <div className="flex-1">
                  <p className="line-clamp-1 text-[11px] font-semibold text-slate-900">
                    {a.label}
                  </p>
                  <p className="text-[10px] text-slate-500">{dateLabel}</p>
                </div>
              </div>
              {a.description && (
                <p className="line-clamp-2 text-[10px] text-slate-600">
                  {a.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
