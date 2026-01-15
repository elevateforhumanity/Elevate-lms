'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Info, Menu, Building2, Users, Briefcase, DollarSign, Award, Star, ChevronRight, Plus, CheckCircle, MapPin, Clock } from 'lucide-react';

const company = { name: 'Metro Healthcare Partners', industry: 'Healthcare', location: 'Indianapolis, IN' };
const stats = { roles: 5, candidates: 12, hired: 8, apprentices: 3 };
const candidates = [
  { name: 'Sarah Mitchell', program: 'CNA Training', progress: 95, status: 'Interview', match: 95, avatar: '/images/testimonials/student-sarah.jpg' },
  { name: 'James Thompson', program: 'CNA Training', progress: 88, status: 'Review', match: 88, avatar: '/images/testimonials/student-david.jpg' },
  { name: 'Lisa Rodriguez', program: 'Medical Assistant', progress: 67, status: 'Screening', match: 82, avatar: '/images/testimonials/testimonial-medical-assistant.png' },
  { name: 'Michael Chen', program: 'Phlebotomy', progress: 100, status: 'Offer', match: 91, avatar: '/images/testimonials/student-marcus.jpg' },
];
const roles = [
  { title: 'CNA - Day Shift', dept: 'Patient Care', loc: 'Downtown', apps: 8, status: 'Active' },
  { title: 'CNA - Night Shift', dept: 'Patient Care', loc: 'West Campus', apps: 5, status: 'Active' },
  { title: 'Medical Assistant', dept: 'Outpatient', loc: 'Main Office', apps: 3, status: 'Active' },
  { title: 'Phlebotomist', dept: 'Laboratory', loc: 'Downtown', apps: 12, status: 'Active' },
];
const apprentices = [
  { name: 'David Park', role: 'CNA Apprentice', hours: 847, level: 'Intermediate', wage: '$16.50/hr', avatar: '/images/testimonials/student-david.jpg' },
  { name: 'Jennifer Lee', role: 'MA Apprentice', hours: 456, level: 'Entry', wage: '$15.00/hr', avatar: '/images/testimonials/student-sarah.jpg' },
  { name: 'Robert Wilson', role: 'CNA Apprentice', hours: 1203, level: 'Advanced', wage: '$18.00/hr', avatar: '/images/testimonials/student-marcus.jpg' },
];

export default function EmployerDemo() {
  const [tab, setTab] = useState('pipeline');
  const [menuOpen, setMenuOpen] = useState(false);

  const statusColor = (s: string) => s === 'Interview' ? 'bg-green-100 text-green-700' : s === 'Offer' ? 'bg-purple-100 text-purple-700' : s === 'Review' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700';

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-xs sm:text-sm">
        <Info className="w-4 h-4 inline mr-2" />Demo Mode — Interactive employer portal
      </div>

      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link href="/demo" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Elevate" width={32} height={32} />
              <span className="font-bold text-slate-900 hidden sm:block">Employer Portal</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {['pipeline', 'roles', 'apprenticeship', 'incentives'].map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`px-3 py-2 rounded-lg text-sm font-medium capitalize ${tab === t ? 'bg-purple-100 text-purple-700' : 'text-slate-600 hover:bg-slate-100'}`}>{t}</button>
              ))}
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2"><Menu className="w-6 h-6" /></button>
          </div>
          {menuOpen && (
            <div className="md:hidden py-4 border-t">
              {['pipeline', 'roles', 'apprenticeship', 'incentives'].map((t) => (
                <button key={t} onClick={() => { setTab(t); setMenuOpen(false); }} className="block w-full text-left px-4 py-3 font-medium capitalize hover:bg-slate-50">{t}</button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="bg-white rounded-xl border p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center"><Building2 className="w-6 h-6 text-purple-600" /></div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900">{company.name}</h1>
                <p className="text-sm text-slate-500">{company.industry} • {company.location}</p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6">
              {[{ v: stats.roles, l: 'Open Roles' }, { v: stats.hired, l: 'Hired YTD', c: 'text-green-600' }, { v: stats.apprentices, l: 'Apprentices', c: 'text-purple-600' }].map((s, i) => (
                <div key={i} className="text-center">
                  <div className={`text-xl font-bold ${s.c || 'text-slate-900'}`}>{s.v}</div>
                  <div className="text-xs text-slate-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {tab === 'pipeline' && (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="p-4 border-b"><h2 className="font-bold text-slate-900">Candidate Pipeline</h2></div>
            <div className="divide-y">
              {candidates.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Image src={c.avatar} alt={c.name} width={40} height={40} className="rounded-full" />
                    <div>
                      <div className="font-medium text-slate-900">{c.name}</div>
                      <div className="text-sm text-slate-500">{c.program}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="hidden sm:flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /><span className="font-medium">{c.match}%</span></div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor(c.status)}`}>{c.status}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'roles' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium"><Plus className="w-4 h-4" />Post Role</button>
            </div>
            {roles.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{r.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{r.dept}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{r.loc}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center"><div className="text-xl font-bold text-slate-900">{r.apps}</div><div className="text-xs text-slate-500">Applicants</div></div>
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">{r.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'apprenticeship' && (
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900">Current Apprentices</h2>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">Registered with IN DOL</span>
              </div>
              <div className="space-y-3">
                {apprentices.map((a, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Image src={a.avatar} alt={a.name} width={40} height={40} className="rounded-full" />
                      <div>
                        <div className="font-medium text-slate-900">{a.name}</div>
                        <div className="text-sm text-slate-500">{a.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center hidden sm:block"><div className="font-bold text-slate-900">{a.hours}</div><div className="text-xs text-slate-500">Hours</div></div>
                      <div className="text-center"><div className="font-bold text-purple-600">{a.level}</div><div className="text-xs text-slate-500">Level</div></div>
                      <div className="text-center"><div className="font-bold text-green-600">{a.wage}</div><div className="text-xs text-slate-500">Wage</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 sm:p-6">
              <Award className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-purple-900 mb-2">Apprenticeship Benefits</h3>
              <ul className="space-y-2 text-sm text-purple-700">
                {['OJT hour tracking', 'Wage progression records', 'Competency tracking', 'Compliance documentation'].map((b, i) => (
                  <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4" />{b}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === 'incentives' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-4 sm:p-6 text-white">
              <DollarSign className="w-8 h-8 mb-2 opacity-80" />
              <h2 className="text-xl font-bold mb-2">Hiring Incentives Available</h2>
              <p className="opacity-90 mb-4 text-sm">You may be eligible for up to $50,000 in annual hiring incentives</p>
              <div className="grid grid-cols-3 gap-3">
                {[{ v: '$5,000', l: 'Per hire' }, { v: '50%', l: 'OJT reimburse' }, { v: '$2,000', l: 'Per apprentice' }].map((s, i) => (
                  <div key={i} className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-xl sm:text-2xl font-bold">{s.v}</div>
                    <div className="text-xs opacity-80">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: 'Work Opportunity Tax Credit', amt: 'Up to $9,600' },
                { name: 'OJT Reimbursement', amt: 'Up to 50% wages' },
                { name: 'Apprenticeship Credit', amt: 'Up to $2,000' },
              ].map((p, i) => (
                <div key={i} className="bg-white rounded-xl border p-4 sm:p-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3"><DollarSign className="w-5 h-5 text-green-600" /></div>
                  <h3 className="font-bold text-slate-900">{p.name}</h3>
                  <p className="text-green-600 font-semibold mt-1">{p.amt}</p>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-800"><Info className="w-4 h-4 inline mr-2" />Eligibility requirements apply. Contact your workforce representative for details.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
