'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Book, 
  Award, 
  Clock, 
  Calendar,
  CheckCircle,
  Play,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  Target,
  Users,
  Briefcase,
  GraduationCap,
  Star,
  Flame,
  Trophy,
  BookOpen,
  Video,
  ClipboardCheck,
  BarChart3,
  HelpCircle,
} from 'lucide-react';

// Realistic learner data
const learnerData = {
  name: 'Darius Williams',
  email: 'd.williams@email.com',
  avatar: null,
  program: {
    name: 'USDOL Registered Barber Apprenticeship',
    slug: 'barber-apprenticeship',
    status: 'active',
    startDate: 'September 15, 2024',
    expectedCompletion: 'December 2025',
  },
  progress: {
    overall: 42,
    theoryModules: { completed: 7, total: 12 },
    practicalHours: { completed: 847, total: 2000 },
    rtiHours: { completed: 58, total: 144 },
  },
  streak: 12,
  points: 2450,
  rank: 'Apprentice II',
  nextMilestone: '1,000 Hours',
  milestonesCompleted: 3,
};

const currentModule = {
  id: 8,
  title: "Men's Haircutting Techniques",
  description: 'Master classic and modern men\'s haircuts including fades, tapers, and textured styles.',
  lessons: [
    { id: 1, title: 'Introduction to Men\'s Cutting', duration: '15 min', completed: true, type: 'video' },
    { id: 2, title: 'Tools & Equipment Setup', duration: '12 min', completed: true, type: 'video' },
    { id: 3, title: 'Classic Taper Technique', duration: '25 min', completed: true, type: 'video' },
    { id: 4, title: 'Low Fade Fundamentals', duration: '30 min', completed: false, type: 'video', current: true },
    { id: 5, title: 'Mid & High Fades', duration: '28 min', completed: false, type: 'video' },
    { id: 6, title: 'Skin Fade Mastery', duration: '35 min', completed: false, type: 'video' },
    { id: 7, title: 'Module Quiz', duration: '20 min', completed: false, type: 'quiz' },
  ],
  progress: 43,
};

const upcomingSchedule = [
  { date: 'Today', time: '9:00 AM - 5:00 PM', event: 'Practical Training', location: 'Elite Cuts Barbershop', type: 'training' },
  { date: 'Thu, Jan 16', time: '7:00 PM', event: 'Theory Quiz: Module 8', location: 'Online', type: 'quiz' },
  { date: 'Sat, Jan 18', time: '10:00 AM', event: 'Skills Assessment: Fades', location: 'Training Center', type: 'assessment' },
  { date: 'Mon, Jan 20', time: '6:00 PM', event: 'Live Q&A with Mentor', location: 'Google Meet', type: 'live' },
];

const achievements = [
  { name: 'First 500 Hours', icon: '🎯', date: 'Dec 2024', description: 'Completed 500 practical training hours' },
  { name: 'Theory Master', icon: '📚', date: 'Nov 2024', description: 'Completed modules 1-6 with 90%+ scores' },
  { name: 'Safety Certified', icon: '✅', date: 'Oct 2024', description: 'Passed sanitation & safety certification' },
  { name: 'Quick Learner', icon: '⚡', date: 'Oct 2024', description: 'Completed 5 lessons in one day' },
];

const trainingLog = [
  { date: 'Jan 14', hours: 8, type: 'OJT', location: 'Elite Cuts Barbershop', supervisor: 'James Carter', verified: true, skills: ['Fades', 'Tapers'] },
  { date: 'Jan 13', hours: 8, type: 'OJT', location: 'Elite Cuts Barbershop', supervisor: 'James Carter', verified: true, skills: ['Beard Trim', 'Line Up'] },
  { date: 'Jan 12', hours: 6, type: 'OJT', location: 'Elite Cuts Barbershop', supervisor: 'James Carter', verified: true, skills: ['Clipper Work'] },
  { date: 'Jan 11', hours: 2, type: 'RTI', location: 'Online - Milady', supervisor: 'System', verified: true, skills: ['Theory Module 7'] },
  { date: 'Jan 10', hours: 8, type: 'OJT', location: 'Elite Cuts Barbershop', supervisor: 'James Carter', verified: true, skills: ['Customer Service'] },
];

export default function LearnerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Elevate" width={36} height={36} className="rounded-lg" />
              <div className="hidden sm:block">
                <p className="font-bold text-slate-900">Elevate LMS</p>
                <p className="text-xs text-slate-500">Student Portal</p>
              </div>
            </div>

            {/* Center Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'courses', label: 'My Courses', icon: BookOpen },
                { id: 'hours', label: 'Hours Log', icon: Clock },
                { id: 'achievements', label: 'Achievements', icon: Trophy },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Points */}
              <div className="hidden sm:flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-700">{learnerData.points.toLocaleString()}</span>
              </div>

              {/* Streak */}
              <div className="hidden sm:flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-orange-700">{learnerData.streak} days</span>
              </div>

              {/* Notifications */}
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Profile */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  DW
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Welcome back, {learnerData.name.split(' ')[0]}!</h1>
              <p className="text-blue-100">You're making great progress. Keep up the momentum!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{learnerData.progress.overall}%</p>
                <p className="text-xs text-blue-200">Overall Progress</p>
              </div>
              <div className="h-12 w-px bg-blue-400" />
              <div className="text-center">
                <p className="text-3xl font-bold">{learnerData.progress.practicalHours.completed}</p>
                <p className="text-xs text-blue-200">Hours Logged</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Continue Learning</p>
                    <h2 className="text-lg font-bold text-slate-900">Module {currentModule.id}: {currentModule.title}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{currentModule.progress}%</p>
                    <p className="text-xs text-slate-500">Complete</p>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${currentModule.progress}%` }} />
                </div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {currentModule.lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    className={`flex items-center gap-4 p-4 ${lesson.current ? 'bg-blue-50' : ''} ${lesson.completed ? 'opacity-60' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      lesson.completed ? 'bg-green-100 text-green-600' : 
                      lesson.current ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {lesson.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : lesson.type === 'video' ? (
                        <Play className="w-5 h-5" />
                      ) : (
                        <ClipboardCheck className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${lesson.current ? 'text-blue-900' : 'text-slate-900'}`}>
                        {lesson.title}
                      </p>
                      <p className="text-sm text-slate-500">{lesson.duration} • {lesson.type === 'video' ? 'Video Lesson' : 'Quiz'}</p>
                    </div>
                    {lesson.current && (
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">
                        Resume
                      </button>
                    )}
                    {!lesson.completed && !lesson.current && (
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Theory Modules</p>
                    <p className="text-xl font-bold text-slate-900">
                      {learnerData.progress.theoryModules.completed}/{learnerData.progress.theoryModules.total}
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${(learnerData.progress.theoryModules.completed / learnerData.progress.theoryModules.total) * 100}%` }} 
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Practical Hours</p>
                    <p className="text-xl font-bold text-slate-900">
                      {learnerData.progress.practicalHours.completed.toLocaleString()}/{learnerData.progress.practicalHours.total.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${(learnerData.progress.practicalHours.completed / learnerData.progress.practicalHours.total) * 100}%` }} 
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">RTI Hours</p>
                    <p className="text-xl font-bold text-slate-900">
                      {learnerData.progress.rtiHours.completed}/{learnerData.progress.rtiHours.total}
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full" 
                    style={{ width: `${(learnerData.progress.rtiHours.completed / learnerData.progress.rtiHours.total) * 100}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Recent Training Log */}
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Recent Training Hours</h3>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
              </div>
              <div className="divide-y divide-slate-100">
                {trainingLog.slice(0, 4).map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${entry.type === 'OJT' ? 'bg-green-500' : 'bg-purple-500'}`} />
                      <div>
                        <p className="font-medium text-slate-900">{entry.location}</p>
                        <p className="text-sm text-slate-500">{entry.date} • {entry.type} • {entry.supervisor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-900">{entry.hours} hrs</span>
                      {entry.verified && (
                        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Program Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-4">Your Program</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-500">Program</p>
                  <p className="font-medium text-slate-900">{learnerData.program.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Active
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Started</p>
                  <p className="font-medium text-slate-900">{learnerData.program.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Expected Completion</p>
                  <p className="font-medium text-slate-900">{learnerData.program.expectedCompletion}</p>
                </div>
              </div>
            </div>

            {/* Upcoming Schedule */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-4">Upcoming Schedule</h3>
              <div className="space-y-3">
                {upcomingSchedule.map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.type === 'training' ? 'bg-green-100 text-green-600' :
                      item.type === 'quiz' ? 'bg-blue-100 text-blue-600' :
                      item.type === 'assessment' ? 'bg-orange-100 text-orange-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {item.type === 'training' ? <Briefcase className="w-5 h-5" /> :
                       item.type === 'quiz' ? <ClipboardCheck className="w-5 h-5" /> :
                       item.type === 'assessment' ? <Target className="w-5 h-5" /> :
                       <Video className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{item.event}</p>
                      <p className="text-sm text-slate-500">{item.date} • {item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Achievements</h3>
                <span className="text-sm text-slate-500">{achievements.length} earned</span>
              </div>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-medium text-slate-900">{achievement.name}</p>
                      <p className="text-xs text-slate-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                View All Achievements
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-50 rounded-lg transition">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-slate-900">Log Training Hours</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-50 rounded-lg transition">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-slate-900">Message Mentor</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-50 rounded-lg transition">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-slate-900">View Documents</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-50 rounded-lg transition">
                  <HelpCircle className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-slate-900">Get Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
