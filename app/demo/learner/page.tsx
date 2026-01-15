'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Clock, 
  CheckCircle,
  Play,
  FileText,
  MessageSquare,
  Bell,
  ChevronRight,
  Target,
  Briefcase,
  Star,
  Flame,
  Trophy,
  BookOpen,
  Video,
  ClipboardCheck,
  BarChart3,
  HelpCircle,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import type { LearnerDashboardData } from '@/lib/data/learner-data';

export default function LearnerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [data, setData] = useState<LearnerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function fetchDashboard() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/learner/dashboard');
      if (!res.ok) throw new Error('Failed to fetch');
      const dashboardData = await res.json();
      setData(dashboardData);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  const currentLessonIndex = data?.currentModule?.lessons.findIndex(l => !l.completed) ?? 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="text-slate-600 font-medium">Loading dashboard data...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'No data available'}</p>
          <button 
            onClick={fetchDashboard}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                <span className="text-sm font-semibold text-yellow-700">{data.gamification.points.toLocaleString()}</span>
              </div>

              {/* Streak */}
              <div className="hidden sm:flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-orange-700">{data.gamification.currentStreak} days</span>
              </div>

              {/* Refresh */}
              <button 
                onClick={fetchDashboard}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                title="Refresh data"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

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
                  {data.learner.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Data Source Indicator */}
        {lastUpdated && (
          <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
            <span>Data loaded from database API</span>
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        )}

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Welcome back, {data.learner.name.split(' ')[0]}!</h1>
              <p className="text-blue-100">You&apos;re making great progress. Keep up the momentum!</p>
              <p className="text-blue-200 text-sm mt-2">RAPIDS ID: {data.program.rapidsId}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{data.progress.progressPercentage}%</p>
                <p className="text-xs text-blue-200">Overall Progress</p>
              </div>
              <div className="h-12 w-px bg-blue-400" />
              <div className="text-center">
                <p className="text-3xl font-bold">{data.progress.totalHours.toLocaleString()}</p>
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
                    <h2 className="text-lg font-bold text-slate-900">Module {data.currentModule.number}: {data.currentModule.title}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{data.currentModule.progress}%</p>
                    <p className="text-xs text-slate-500">Complete</p>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                    style={{ width: `${data.currentModule.progress}%` }} 
                  />
                </div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {data.currentModule.lessons.map((lesson, idx) => (
                  <div 
                    key={lesson.id}
                    className={`flex items-center gap-4 p-4 ${idx === currentLessonIndex ? 'bg-blue-50' : ''} ${lesson.completed ? 'opacity-60' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      lesson.completed ? 'bg-green-100 text-green-600' : 
                      idx === currentLessonIndex ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
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
                      <p className={`font-medium ${idx === currentLessonIndex ? 'text-blue-900' : 'text-slate-900'}`}>
                        {lesson.title}
                      </p>
                      <p className="text-sm text-slate-500">{lesson.duration} min &bull; {lesson.type === 'video' ? 'Video Lesson' : lesson.type === 'quiz' ? 'Quiz' : 'Assignment'}</p>
                    </div>
                    {idx === currentLessonIndex && (
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">
                        Resume
                      </button>
                    )}
                    {!lesson.completed && idx !== currentLessonIndex && (
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
                    <p className="text-sm text-slate-500">Theory Progress</p>
                    <p className="text-xl font-bold text-slate-900">{data.progress.theoryModules}%</p>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${data.progress.theoryModules}%` }} />
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
                      {data.progress.practicalHours.toLocaleString()}/{data.progress.requiredHours.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                    style={{ width: `${(data.progress.practicalHours / data.progress.requiredHours) * 100}%` }} 
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
                    <p className="text-xl font-bold text-slate-900">{data.progress.rtiHours}/144</p>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${(data.progress.rtiHours / 144) * 100}%` }} />
                </div>
              </div>
            </div>

            {/* Recent Training Log */}
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Recent Training Hours</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{data.progress.approvedHours} approved, {data.progress.pendingHours} pending</span>
                  <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {data.trainingLog.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${entry.type === 'OJT' ? 'bg-green-500' : 'bg-purple-500'}`} />
                      <div>
                        <p className="font-medium text-slate-900">{entry.location}</p>
                        <p className="text-sm text-slate-500">{entry.date} &bull; {entry.type} &bull; {entry.supervisor}</p>
                        <p className="text-xs text-slate-400 mt-1">{entry.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-900">{entry.hours} hrs</span>
                      {entry.verified ? (
                        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                          Pending
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
                  <p className="font-medium text-slate-900">{data.program.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    {data.program.status.charAt(0).toUpperCase() + data.program.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">RAPIDS ID</p>
                  <p className="font-medium text-slate-900 font-mono text-sm">{data.program.rapidsId}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Started</p>
                  <p className="font-medium text-slate-900">{data.program.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Expected Completion</p>
                  <p className="font-medium text-slate-900">{data.program.expectedCompletion}</p>
                </div>
                {data.program.miladyEnrolled && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Milady Theory Enrolled
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Schedule */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-4">Upcoming Schedule</h3>
              <div className="space-y-3">
                {data.schedule.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
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
                      <p className="font-medium text-slate-900 truncate">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.date} &bull; {item.time}</p>
                      <p className="text-xs text-slate-400">{item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Achievements</h3>
                <span className="text-sm text-slate-500">{data.achievements.length} earned</span>
              </div>
              <div className="space-y-3">
                {data.achievements.slice(0, 4).map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-medium text-slate-900">{achievement.label}</p>
                      <p className="text-xs text-slate-500">{achievement.description}</p>
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
