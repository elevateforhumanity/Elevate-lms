'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Info, Menu, X, BookOpen, LayoutDashboard, Award, Clock, CheckCircle, Play, Calendar } from 'lucide-react';

const demoUser = { name: 'Darius Williams', initials: 'DW', avatar: '/images/testimonials/student-marcus.jpg' };
const demoProgram = { name: 'USDOL Registered Barber Apprenticeship', status: 'Active', start: 'Sep 15, 2024', end: 'Dec 2025' };
const demoProgress = { overall: 42, modules: { done: 7, total: 12 }, hours: { done: 847, total: 2000 }, rti: { done: 58, total: 144 } };

const lessons = [
  { id: 1, title: "Introduction to Men's Cutting", time: '15 min', done: true },
  { id: 2, title: 'Tools & Equipment Setup', time: '12 min', done: true },
  { id: 3, title: 'Classic Taper Technique', time: '25 min', done: true },
  { id: 4, title: 'Low Fade Fundamentals', time: '30 min', done: false, current: true },
  { id: 5, title: 'Mid & High Fades', time: '28 min', done: false },
  { id: 6, title: 'Skin Fade Mastery', time: '35 min', done: false },
  { id: 7, title: 'Module Quiz', time: '20 min', done: false, quiz: true },
];

const hours = [
  { date: 'Jan 14', loc: 'Elite Cuts Barbershop', type: 'OJT', hrs: 8, verified: true },
  { date: 'Jan 13', loc: 'Elite Cuts Barbershop', type: 'OJT', hrs: 8, verified: true },
  { date: 'Jan 12', loc: 'Elite Cuts Barbershop', type: 'OJT', hrs: 6, verified: true },
  { date: 'Jan 11', loc: 'Online - Milady', type: 'RTI', hrs: 2, verified: true },
];

const schedule = [
  { title: 'Practical Training', date: 'Today', time: '9:00 AM - 5:00 PM' },
  { title: 'Theory Quiz: Module 8', date: 'Thu, Jan 16', time: '7:00 PM' },
  { title: 'Skills Assessment', date: 'Sat, Jan 18', time: '10:00 AM' },
];

export default function LearnerDemo() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-xs sm:text-sm">
        <Info className="w-4 h-4 inline mr-2" />Demo Mode — Interactive student portal demo
      </div>

      <nav className="bg-gradient-to-r from-green-600 to-blue-600 border-b-4 border-green-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link href="/demo" className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl p-1">
                <Image src="/logo.png" alt="Elevate" width={36} height={36} className="w-full h-full object-contain" />
              </div>
              <span className="font-black text-white text-sm sm:text-xl hidden sm:block">Learning Portal</span>
            </Link>
            <div className="hidden md:flex items-center gap-2">
              {[{ icon: LayoutDashboard, label: 'Dashboard', active: true }, { icon: BookOpen, label: 'Courses' }, { icon: Clock, label: 'Hours' }, { icon: Award, label: 'Certificates' }].map((item, i) => (
                <button key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm ${item.active ? 'bg-white text-green-600' : 'text-white hover:bg-white/20'}`}>
                  <item.icon className="w-4 h-4" />{item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2">
                <Image src={demoUser.avatar} alt={demoUser.name} width={32} height={32} className="rounded-full" />
                <span className="text-white text-sm font-medium">{demoUser.name}</span>
              </div>
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-white">
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              {['Dashboard', 'Courses', 'Hours', 'Certificates'].map((item, i) => (
                <button key={i} className="block w-full text-left px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg">{item}</button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white mb-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, {demoUser.name.split(' ')[0]}!</h1>
          <p className="text-sm opacity-90 mb-4">Keep up the great progress!</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <div><div className="text-2xl sm:text-3xl font-bold">{demoProgress.overall}%</div><div className="text-xs opacity-80">Overall</div></div>
            <div><div className="text-2xl sm:text-3xl font-bold">{demoProgress.hours.done}</div><div className="text-xs opacity-80">Hours</div></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl border p-4 sm:p-6">
              <h2 className="font-bold text-slate-900 mb-1">Continue Learning</h2>
              <p className="text-sm text-slate-500 mb-4">Module 8: Men&apos;s Haircutting Techniques</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-2 bg-slate-100 rounded-full"><div className="h-full bg-orange-500 rounded-full" style={{width:'43%'}} /></div>
                <span className="text-sm text-slate-600">43%</span>
              </div>
              <div className="space-y-2">
                {lessons.map((l) => (
                  <div key={l.id} className={`flex items-center gap-3 p-2 sm:p-3 rounded-lg ${l.current ? 'bg-orange-50 border border-orange-200' : ''}`}>
                    {l.done ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm truncate ${l.done ? 'text-slate-400' : 'text-slate-900'}`}>{l.title}</div>
                      <div className="text-xs text-slate-400">{l.time}</div>
                    </div>
                    {l.current && <button className="flex items-center gap-1 bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium"><Play className="w-3 h-3" />Resume</button>}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="bg-white rounded-xl border p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-bold text-slate-900">{demoProgress.modules.done}/{demoProgress.modules.total}</div>
                <div className="text-xs text-slate-500">Modules</div>
              </div>
              <div className="bg-white rounded-xl border p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-bold text-slate-900">{demoProgress.hours.done}</div>
                <div className="text-xs text-slate-500">OJT Hours</div>
              </div>
              <div className="bg-white rounded-xl border p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-bold text-slate-900">{demoProgress.rti.done}</div>
                <div className="text-xs text-slate-500">RTI Hours</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border p-4 sm:p-6">
              <h3 className="font-bold text-slate-900 mb-4">Recent Training Hours</h3>
              <div className="space-y-2">
                {hours.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-2 sm:p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm text-slate-900">{h.loc}</div>
                      <div className="text-xs text-slate-500">{h.date} • {h.type}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{h.hrs}h</span>
                      {h.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl border p-4 sm:p-6">
              <h3 className="font-bold text-slate-900 mb-4">Your Program</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Program</span><span className="font-medium text-slate-900 text-right text-xs">{demoProgram.name}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Status</span><span className="font-medium text-green-600">{demoProgram.status}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Started</span><span className="font-medium text-slate-900">{demoProgram.start}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Expected</span><span className="font-medium text-slate-900">{demoProgram.end}</span></div>
              </div>
            </div>

            <div className="bg-white rounded-xl border p-4 sm:p-6">
              <h3 className="font-bold text-slate-900 mb-4">Upcoming</h3>
              <div className="space-y-3">
                {schedule.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm text-slate-900">{s.title}</div>
                      <div className="text-xs text-slate-500">{s.date} • {s.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border p-4 sm:p-6">
              <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium">Log Training Hours</button>
                <button className="w-full text-left px-3 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium">Message Mentor</button>
                <button className="w-full text-left px-3 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium">View Documents</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
