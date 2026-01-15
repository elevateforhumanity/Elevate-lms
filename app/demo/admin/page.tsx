'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Info, Menu, X, Users, GraduationCap, BarChart3, Building2, Settings, FileText, Bell, Search, ChevronRight, Clock, AlertCircle, CheckCircle, Download, Plus } from 'lucide-react';

const stats = { students: 312, programs: 12, completion: 78, partners: 24 };
const pipeline = [
  { stage: 'Intake', count: 45, color: 'bg-slate-500' },
  { stage: 'Review', count: 32, color: 'bg-yellow-500' },
  { stage: 'Enrolled', count: 28, color: 'bg-blue-500' },
  { stage: 'Active', count: 312, color: 'bg-green-500' },
  { stage: 'Complete', count: 214, color: 'bg-purple-500' },
];
const programs = [
  { name: 'Barber Apprenticeship', cat: 'Trades', enrolled: 48, done: 12 },
  { name: 'CNA Training', cat: 'Healthcare', enrolled: 124, done: 89 },
  { name: 'HVAC Technician', cat: 'Trades', enrolled: 36, done: 8 },
  { name: 'Medical Assistant', cat: 'Healthcare', enrolled: 67, done: 45 },
];
const activity = [
  { msg: 'Marcus J. enrolled in Barber Apprenticeship', time: '15 min ago' },
  { msg: 'Sarah M. completed CNA Training', time: '1 hour ago' },
  { msg: '24 OJT hours verified for HVAC cohort', time: '2 hours ago' },
  { msg: 'Metro Healthcare Partners onboarded', time: '4 hours ago' },
];
const students = [
  { name: 'Darius Williams', program: 'Barber', progress: 42, avatar: '/images/testimonials/student-marcus.jpg' },
  { name: 'Sarah Mitchell', program: 'CNA', progress: 95, avatar: '/images/testimonials/student-sarah.jpg' },
  { name: 'Marcus Johnson', program: 'HVAC', progress: 28, avatar: '/images/testimonials/student-david.jpg' },
];

export default function AdminDemo() {
  const [tab, setTab] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-xs sm:text-sm">
        <Info className="w-4 h-4 inline mr-2" />Demo Mode — Interactive admin dashboard
      </div>

      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-4">
              <Link href="/demo" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Elevate" width={32} height={32} />
                <span className="font-bold text-slate-900 hidden sm:block">Admin Portal</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {['overview', 'students', 'programs', 'reports'].map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`px-3 py-2 rounded-lg text-sm font-medium capitalize ${tab === t ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100'}`}>{t}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg relative"><Bell className="w-5 h-5 text-slate-600" /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /></button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2"><Menu className="w-6 h-6" /></button>
            </div>
          </div>
          {menuOpen && (
            <div className="md:hidden py-4 border-t">
              {['overview', 'students', 'programs', 'reports'].map((t) => (
                <button key={t} onClick={() => { setTab(t); setMenuOpen(false); }} className="block w-full text-left px-4 py-3 font-medium capitalize hover:bg-slate-50">{t}</button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {tab === 'overview' && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              {[
                { icon: Users, label: 'Active Students', value: stats.students, color: 'text-blue-600' },
                { icon: GraduationCap, label: 'Programs', value: stats.programs, color: 'text-green-600' },
                { icon: BarChart3, label: 'Completion', value: `${stats.completion}%`, color: 'text-purple-600' },
                { icon: Building2, label: 'Partners', value: stats.partners, color: 'text-orange-600' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl border p-4">
                  <div className="flex items-center gap-2 mb-2"><s.icon className={`w-5 h-5 ${s.color}`} /><span className="text-xs text-slate-500">{s.label}</span></div>
                  <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border p-4 sm:p-6 mb-6">
              <h2 className="font-bold text-slate-900 mb-4">Enrollment Pipeline</h2>
              <div className="flex flex-wrap gap-2">
                {pipeline.map((p, i) => (
                  <div key={i} className={`${p.color} text-white px-3 sm:px-4 py-2 rounded-lg text-center min-w-[70px] sm:min-w-[90px]`}>
                    <div className="font-bold text-lg">{p.count}</div>
                    <div className="text-xs opacity-90">{p.stage}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border p-4 sm:p-6">
                <h3 className="font-bold text-slate-900 mb-4">Programs</h3>
                <div className="space-y-3">
                  {programs.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm text-slate-900">{p.name}</div>
                        <div className="text-xs text-slate-500">{p.cat}</div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center"><div className="font-bold text-slate-900">{p.enrolled}</div><div className="text-xs text-slate-500">Enrolled</div></div>
                        <div className="text-center"><div className="font-bold text-green-600">{p.done}</div><div className="text-xs text-slate-500">Done</div></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border p-4 sm:p-6">
                <h3 className="font-bold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {activity.map((a, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-slate-900">{a.msg}</div>
                        <div className="text-xs text-slate-400">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'students' && (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="p-4 border-b flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search students..." className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm" />
              </div>
              <button className="flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"><Plus className="w-4 h-4" />Add Student</button>
            </div>
            <div className="divide-y">
              {students.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Image src={s.avatar} alt={s.name} width={40} height={40} className="rounded-full" />
                    <div>
                      <div className="font-medium text-slate-900">{s.name}</div>
                      <div className="text-sm text-slate-500">{s.program}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-100 rounded-full"><div className="h-full bg-orange-500 rounded-full" style={{width:`${s.progress}%`}} /></div>
                      <span className="text-sm text-slate-600">{s.progress}%</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'programs' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((p, i) => (
              <div key={i} className="bg-white rounded-xl border p-4 sm:p-6 hover:shadow-lg transition">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.cat === 'Healthcare' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>{p.cat}</span>
                <h3 className="font-bold text-slate-900 mt-3 mb-2">{p.name}</h3>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div><div className="text-xl font-bold text-slate-900">{p.enrolled}</div><div className="text-xs text-slate-500">Enrolled</div></div>
                  <div><div className="text-xl font-bold text-green-600">{p.done}</div><div className="text-xs text-slate-500">Completed</div></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'reports' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Enrollment Report', 'Completion Report', 'Attendance Records', 'WIOA Compliance', 'Partner Activity', 'Financial Summary'].map((r, i) => (
              <button key={i} className="bg-white rounded-xl border p-4 sm:p-6 text-left hover:shadow-lg transition">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3"><FileText className="w-5 h-5 text-orange-600" /></div>
                <h3 className="font-bold text-slate-900">{r}</h3>
                <p className="text-sm text-slate-500 mt-1">Generate and export</p>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
