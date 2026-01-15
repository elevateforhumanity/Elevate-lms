'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, BookOpen, Clock, Trophy, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  learner: { name: string; initials: string; avatar: string; points: number; streak: number };
}

export function Sidebar({ activeTab, setActiveTab, learner }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'hours', label: 'Hours Log', icon: Clock },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen">
      <div className="p-4 border-b border-slate-700">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Elevate" width={32} height={32} />
          <div>
            <div className="font-bold text-sm">Elevate LMS</div>
            <div className="text-xs text-slate-400">Student Portal</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition ${
              activeTab === item.id
                ? 'bg-orange-600 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-center">
            <div className="text-lg font-bold text-orange-400">{learner.points.toLocaleString()}</div>
            <div className="text-xs text-slate-400">Points</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{learner.streak} days</div>
            <div className="text-xs text-slate-400">Streak</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {learner.avatar ? (
            <Image src={learner.avatar} alt={learner.name} width={40} height={40} className="rounded-full" />
          ) : (
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center font-bold">
              {learner.initials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{learner.name}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
