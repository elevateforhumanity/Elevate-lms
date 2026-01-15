'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Info, Menu, X, Home, BookOpen, Clock, Award, Play, CheckCircle, Calendar, Plus, ChevronRight, FileText, MessageCircle, HelpCircle } from 'lucide-react';

export default function LearnerDemo() {
  const [tab, setTab] = useState('home');
  const [nav, setNav] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [hours, setHours] = useState([
    { id: 1, date: '2025-01-14', loc: 'Elite Cuts Barbershop', type: 'OJT', hrs: 8, mentor: 'James Carter', status: 'verified' },
    { id: 2, date: '2025-01-13', loc: 'Elite Cuts Barbershop', type: 'OJT', hrs: 8, mentor: 'James Carter', status: 'verified' },
    { id: 3, date: '2025-01-12', loc: 'Elite Cuts Barbershop', type: 'OJT', hrs: 6, mentor: 'James Carter', status: 'verified' },
    { id: 4, date: '2025-01-11', loc: 'Online - Milady', type: 'RTI', hrs: 2, mentor: 'System', status: 'verified' },
  ]);
  const [form, setForm] = useState({ date: '', loc: '', type: 'OJT', hrs: 8, mentor: '' });
  const totalOJT = hours.filter(h => h.type === 'OJT').reduce((a, b) => a + b.hrs, 0);
  const totalRTI = hours.filter(h => h.type === 'RTI').reduce((a, b) => a + b.hrs, 0);

  const submitHours = () => {
    if (!form.date || !form.loc || !form.mentor) return alert('Please fill all fields');
    setHours([{ id: Date.now(), ...form, status: 'pending' }, ...hours]);
    setForm({ date: '', loc: '', type: 'OJT', hrs: 8, mentor: '' });
    setLogModal(false);
  };

  const lessons = [
    { id: 1, title: "Intro to Men's Cutting", mins: 15, done: true },
    { id: 2, title: 'Tools & Equipment', mins: 12, done: true },
    { id: 3, title: 'Classic Taper', mins: 25, done: true },
    { id: 4, title: 'Low Fade Fundamentals', mins: 30, done: false, current: true },
    { id: 5, title: 'Mid & High Fades', mins: 28, done: false },
    { id: 6, title: 'Skin Fade Mastery', mins: 35, done: false },
    { id: 7, title: 'Module Quiz', mins: 20, done: false, quiz: true },
  ];

  const modules = [
    { id: 1, name: 'Intro to Barbering', done: true, score: 95 },
    { id: 2, name: 'Sanitation & Safety', done: true, score: 100 },
    { id: 3, name: 'Tools & Equipment', done: true, score: 88 },
    { id: 4, name: 'Hair Science', done: true, score: 92 },
    { id: 5, name: 'Shampooing', done: true, score: 90 },
    { id: 6, name: 'Basic Cutting', done: true, score: 87 },
    { id: 7, name: 'Clipper Fundamentals', done: true, score: 94 },
    { id: 8, name: "Men's Haircutting", done: false, progress: 43 },
    { id: 9, name: 'Beard & Facial Hair', done: false },
    { id: 10, name: 'Chemical Services', done: false, locked: true },
    { id: 11, name: 'Business Skills', done: false, locked: true },
    { id: 12, name: 'State Board Prep', done: false, locked: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white text-center py-1.5 px-2 text-xs"><Info className="w-3 h-3 inline mr-1" />Live Demo - Student Portal</div>
      
      {/* Top Nav */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-3 py-2">
          <Link href="/demo" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={28} height={28} />
            <span className="font-bold text-sm hidden sm:inline">Student Portal</span>
          </Link>
          <div className="flex items-center gap-2">
            <Image src="/images/testimonials/student-marcus.jpg" alt="User" width={28} height={28} className="rounded-full" />
            <span className="text-sm font-medium hidden sm:inline">Darius W.</span>
          </div>
        </div>
      </header>

      {/* Bottom Nav - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 sm:hidden">
        <div className="flex justify-around py-2">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'courses', icon: BookOpen, label: 'Courses' },
            { id: 'hours', icon: Clock, label: 'Hours' },
            { id: 'certs', icon: Award, label: 'Certs' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex flex-col items-center px-3 py-1 ${tab === t.id ? 'text-orange-600' : 'text-gray-500'}`}>
              <t.icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{t.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Tabs */}
      <div className="hidden sm:flex justify-center gap-1 py-2 bg-white border-b">
        {[
          { id: 'home', icon: Home, label: 'Dashboard' },
          { id: 'courses', icon: BookOpen, label: 'Courses' },
          { id: 'hours', icon: Clock, label: 'Hours Log' },
          { id: 'certs', icon: Award, label: 'Certificates' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${tab === t.id ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <t.icon className="w-4 h-4" />{t.label}
          </button>
        ))}
      </div>

      <main className="p-3 pb-20 sm:pb-6 max-w-4xl mx-auto">
        {/* HOME TAB */}
        {tab === 'home' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
              <p className="text-sm opacity-90">Welcome back,</p>
              <h1 className="text-xl font-bold">Darius Williams</h1>
              <div className="flex gap-6 mt-3">
                <div><div className="text-2xl font-bold">42%</div><div className="text-xs opacity-80">Progress</div></div>
                <div><div className="text-2xl font-bold">{totalOJT + 817}</div><div className="text-xs opacity-80">Hours</div></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-gray-900">Continue Learning</h2>
                <span className="text-xs text-gray-500">Module 8</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Men&apos;s Haircutting Techniques</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-2 bg-gray-100 rounded-full"><div className="h-full bg-orange-500 rounded-full" style={{width:'43%'}}/></div>
                <span className="text-xs text-gray-500">43%</span>
              </div>
              {lessons.slice(0, 4).map(l => (
                <div key={l.id} className={`flex items-center gap-2 p-2 rounded-lg mb-1 ${l.current ? 'bg-orange-50 border border-orange-200' : ''}`}>
                  {l.done ? <CheckCircle className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                  <span className={`flex-1 text-sm ${l.done ? 'text-gray-400' : 'text-gray-900'}`}>{l.title}</span>
                  {l.current && <button className="bg-orange-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1"><Play className="w-3 h-3"/>Play</button>}
                </div>
              ))}
              <button className="w-full text-center text-sm text-orange-600 font-medium mt-2">View All Lessons</button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded-xl p-3 border text-center">
                <div className="text-xl font-bold text-gray-900">7/12</div>
                <div className="text-xs text-gray-500">Modules</div>
              </div>
              <div className="bg-white rounded-xl p-3 border text-center">
                <div className="text-xl font-bold text-gray-900">{totalOJT + 817}</div>
                <div className="text-xs text-gray-500">OJT Hrs</div>
              </div>
              <div className="bg-white rounded-xl p-3 border text-center">
                <div className="text-xl font-bold text-gray-900">{totalRTI + 56}</div>
                <div className="text-xs text-gray-500">RTI Hrs</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border">
              <h3 className="font-bold text-gray-900 mb-3">Upcoming</h3>
              {[
                { t: 'Practical Training', d: 'Today', tm: '9AM-5PM' },
                { t: 'Theory Quiz', d: 'Thu', tm: '7PM' },
                { t: 'Skills Assessment', d: 'Sat', tm: '10AM' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 py-2 border-b last:border-0">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <div className="flex-1"><div className="text-sm font-medium text-gray-900">{s.t}</div><div className="text-xs text-gray-500">{s.d} • {s.tm}</div></div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-4 border">
              <h3 className="font-bold text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => { setTab('hours'); setLogModal(true); }} className="flex items-center gap-2 p-3 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium"><Plus className="w-4 h-4"/>Log Hours</button>
                <button className="flex items-center gap-2 p-3 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium"><MessageCircle className="w-4 h-4"/>Mentor</button>
                <button className="flex items-center gap-2 p-3 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium"><FileText className="w-4 h-4"/>Documents</button>
                <button className="flex items-center gap-2 p-3 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium"><HelpCircle className="w-4 h-4"/>Help</button>
              </div>
            </div>
          </div>
        )}

        {/* COURSES TAB */}
        {tab === 'courses' && (
          <div className="space-y-3">
            <h1 className="text-lg font-bold text-gray-900">My Courses</h1>
            <div className="bg-white rounded-xl border overflow-hidden">
              <div className="p-3 bg-gray-50 border-b">
                <h2 className="font-bold text-sm text-gray-900">Barber Apprenticeship</h2>
                <p className="text-xs text-gray-500">12 modules • 2,000 hours</p>
              </div>
              {modules.map(m => (
                <button key={m.id} disabled={m.locked} className={`w-full flex items-center gap-3 p-3 border-b last:border-0 text-left ${m.locked ? 'opacity-50' : 'hover:bg-gray-50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${m.done ? 'bg-green-100 text-green-600' : m.locked ? 'bg-gray-100 text-gray-400' : 'bg-orange-100 text-orange-600'}`}>
                    {m.done ? <CheckCircle className="w-4 h-4" /> : m.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{m.name}</div>
                    {m.done && <div className="text-xs text-green-600">Score: {m.score}%</div>}
                    {m.progress && <div className="flex items-center gap-2 mt-1"><div className="flex-1 h-1 bg-gray-100 rounded-full max-w-[100px]"><div className="h-full bg-orange-500 rounded-full" style={{width:`${m.progress}%`}}/></div><span className="text-xs text-gray-500">{m.progress}%</span></div>}
                    {m.locked && <div className="text-xs text-gray-400">Locked</div>}
                  </div>
                  {!m.locked && <ChevronRight className="w-4 h-4 text-gray-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* HOURS TAB */}
        {tab === 'hours' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold text-gray-900">Hours Log</h1>
              <button onClick={() => setLogModal(true)} className="flex items-center gap-1 bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"><Plus className="w-4 h-4"/>Log</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 border">
                <div className="text-2xl font-bold text-gray-900">{totalOJT + 817}/2000</div>
                <div className="text-xs text-gray-500 mb-2">OJT Hours</div>
                <div className="h-2 bg-gray-100 rounded-full"><div className="h-full bg-orange-500 rounded-full" style={{width:`${((totalOJT + 817)/2000)*100}%`}}/></div>
              </div>
              <div className="bg-white rounded-xl p-4 border">
                <div className="text-2xl font-bold text-gray-900">{totalRTI + 56}/144</div>
                <div className="text-xs text-gray-500 mb-2">RTI Hours</div>
                <div className="h-2 bg-gray-100 rounded-full"><div className="h-full bg-blue-500 rounded-full" style={{width:`${((totalRTI + 56)/144)*100}%`}}/></div>
              </div>
            </div>

            <div className="bg-white rounded-xl border overflow-hidden">
              <div className="p-3 bg-gray-50 border-b font-bold text-sm text-gray-900">History</div>
              {hours.map(h => (
                <div key={h.id} className="flex items-center justify-between p-3 border-b last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{h.loc}</div>
                    <div className="text-xs text-gray-500">{h.date} • {h.type} • {h.mentor}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{h.hrs}h</div>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${h.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{h.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTS TAB */}
        {tab === 'certs' && (
          <div className="space-y-4">
            <h1 className="text-lg font-bold text-gray-900">Certificates</h1>
            <div className="bg-white rounded-xl p-4 border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><CheckCircle className="w-6 h-6 text-green-600" /></div>
                <div>
                  <div className="font-bold text-gray-900">Sanitation & Safety</div>
                  <div className="text-xs text-gray-500">Issued Oct 15, 2024</div>
                </div>
              </div>
              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium">Download PDF</button>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 border border-dashed border-gray-300 text-center">
              <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-gray-500">Complete your program to earn your Barber License certificate</div>
            </div>
          </div>
        )}
      </main>

      {/* Log Hours Modal */}
      {logModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md sm:rounded-xl rounded-t-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Log Training Hours</h2>
              <button onClick={() => setLogModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="space-y-3">
              <div><label className="text-sm font-medium text-gray-700">Date</label><input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg" /></div>
              <div><label className="text-sm font-medium text-gray-700">Type</label><select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg"><option value="OJT">OJT</option><option value="RTI">RTI</option></select></div>
              <div><label className="text-sm font-medium text-gray-700">Location</label><input type="text" value={form.loc} onChange={e => setForm({...form, loc: e.target.value})} placeholder="Elite Cuts Barbershop" className="w-full mt-1 px-3 py-2 border rounded-lg" /></div>
              <div><label className="text-sm font-medium text-gray-700">Hours</label><input type="number" value={form.hrs} onChange={e => setForm({...form, hrs: +e.target.value})} min="0.5" max="12" step="0.5" className="w-full mt-1 px-3 py-2 border rounded-lg" /></div>
              <div><label className="text-sm font-medium text-gray-700">Supervisor</label><input type="text" value={form.mentor} onChange={e => setForm({...form, mentor: e.target.value})} placeholder="James Carter" className="w-full mt-1 px-3 py-2 border rounded-lg" /></div>
              <button onClick={submitHours} className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium">Submit for Verification</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
