'use client';

import { useState, useEffect } from 'react';
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
  Loader2,
} from 'lucide-react';

// Types for dashboard data
interface DashboardData {
  learner: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
  program: {
    id: string;
    name: string;
    slug: string;
    enrollmentId: string;
    rapidsStatus: string;
    rapidsId: string | null;
    miladyEnrolled: boolean;
  } | null;
  progress: {
    theoryModules: number;
    practicalHours: number;
    rtiHours: number;
    totalHours: number;
    requiredHours: number;
    transferHours: number;
    approvedHours: number;
    pendingHours: number;
    progressPercentage: number;
  };
  currentModule: {
    id: string;
    title: string;
    description: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: number;
      type: string;
      completed: boolean;
    }>;
  } | null;
  trainingLog: Array<{
    id: string;
    date: string;
    hours: number;
    type: string;
    description: string;
    status: string;
    verified: boolean;
  }>;
  schedule: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    duration: number;
    type: string;
    color: string;
  }>;
  achievements: Array<{
    id: string;
    code: string;
    label: string;
    description: string;
    earnedAt: string;
    icon: string;
  }>;
  gamification: {
    points: number;
    level: number;
    levelName: string;
    pointsToNextLevel: number;
    currentStreak: number;
    longestStreak: number;
  };
}

// Default fallback data when not authenticated or no data
const defaultData: DashboardData = {
  learner: {
    id: 'demo',
    name: 'Darius Williams',
    email: 'd.williams@email.com',
    avatar: null,
  },
  program: {
    id: 'barber-apprenticeship',
    name: 'USDOL Registered Barber Apprenticeship',
    slug: 'barber-apprenticeship',
    enrollmentId: 'demo-enrollment',
    rapidsStatus: 'active',
    rapidsId: '2025-IN-132301',
    miladyEnrolled: true,
  },
  progress: {
    theoryModules: 58,
    practicalHours: 847,
    rtiHours: 58,
    totalHours: 905,
    requiredHours: 2000,
    transferHours: 0,
    approvedHours: 847,
    pendingHours: 8,
    progressPercentage: 45,
  },
  currentModule: {
    id: 'module-8',
    title: "Men's Haircutting Techniques",
    description: 'Master classic and modern men\'s haircuts including fades, tapers, and textured styles.',
    lessons: [
      { id: '1', title: 'Introduction to Men\'s Cutting', duration: 15, type: 'video', completed: true },
      { id: '2', title: 'Tools & Equipment Setup', duration: 12, type: 'video', completed: true },
      { id: '3', title: 'Classic Taper Technique', duration: 25, type: 'video', completed: true },
      { id: '4', title: 'Low Fade Fundamentals', duration: 30, type: 'video', completed: false },
      { id: '5', title: 'Mid & High Fades', duration: 28, type: 'video', completed: false },
      { id: '6', title: 'Skin Fade Mastery', duration: 35, type: 'video', completed: false },
      { id: '7', title: 'Module Quiz', duration: 20, type: 'quiz', completed: false },
    ],
  },
  trainingLog: [
    { id: '1', date: '2025-01-14', hours: 8, type: 'OJT', description: 'Elite Cuts Barbershop', status: 'APPROVED', verified: true },
    { id: '2', date: '2025-01-13', hours: 8, type: 'OJT', description: 'Elite Cuts Barbershop', status: 'APPROVED', verified: true },
    { id: '3', date: '2025-01-12', hours: 6, type: 'OJT', description: 'Elite Cuts Barbershop', status: 'APPROVED', verified: true },
    { id: '4', date: '2025-01-11', hours: 2, type: 'RTI', description: 'Online - Milady Theory', status: 'APPROVED', verified: true },
    { id: '5', date: '2025-01-10', hours: 8, type: 'OJT', description: 'Elite Cuts Barbershop', status: 'SUBMITTED', verified: false },
  ],
  schedule: [
    { id: '1', title: 'Practical Training', date: 'Today', time: '9:00 AM - 5:00 PM', duration: 480, type: 'training', color: '#22c55e' },
    { id: '2', title: 'Theory Quiz: Module 8', date: 'Thu, Jan 16', time: '7:00 PM', duration: 60, type: 'quiz', color: '#3b82f6' },
    { id: '3', title: 'Skills Assessment: Fades', date: 'Sat, Jan 18', time: '10:00 AM', duration: 120, type: 'assessment', color: '#f97316' },
    { id: '4', title: 'Live Q&A with Mentor', date: 'Mon, Jan 20', time: '6:00 PM', duration: 60, type: 'live', color: '#8b5cf6' },
  ],
  achievements: [
    { id: '1', code: 'first_500_hours', label: 'First 500 Hours', description: 'Completed 500 practical training hours', earnedAt: '2024-12-15', icon: '🎯' },
    { id: '2', code: 'theory_master', label: 'Theory Master', description: 'Completed modules 1-6 with 90%+ scores', earnedAt: '2024-11-20', icon: '📚' },
    { id: '3', code: 'safety_certified', label: 'Safety Certified', description: 'Passed sanitation & safety certification', earnedAt: '2024-10-10', icon: '✅' },
    { id: '4', code: 'quick_learner', label: 'Quick Learner', description: 'Completed 5 lessons in one day', earnedAt: '2024-10-05', icon: '⚡' },
  ],
  gamification: {
    points: 2450,
    level: 3,
    levelName: 'Apprentice II',
    pointsToNextLevel: 550,
    currentStreak: 12,
    longestStreak: 28,
  },
};

export default function LearnerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [data, setData] = useState<DashboardData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch('/api/learner/dashboard');
        if (res.ok) {
          const dashboardData = await res.json();
          // Merge with defaults for any missing fields
          setData({
            ...defaultData,
            ...dashboardData,
            learner: { ...defaultData.learner, ...dashboardData.learner },
            program: dashboardData.program || defaultData.program,
            progress: { ...defaultData.progress, ...dashboardData.progress },
            gamification: { ...defaultData.gamification, ...dashboardData.gamification },
          });
        }
        // If unauthorized or error, use default data (demo mode)
      } catch (err) {
        // Use default data on error
        console.log('Using demo data');
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  const currentLessonIndex = data.currentModule?.lessons.findIndex(l => !l.completed) ?? 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-slate-600">Loading dashboard...</span>
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
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Welcome back, {data.learner.name.split(' ')[0]}!</h1>
              <p className="text-blue-100">You&apos;re making great progress. Keep up the momentum!</p>
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
            {data.currentModule && (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Continue Learning</p>
                      <h2 className="text-lg font-bold text-slate-900">{data.currentModule.title}</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.round((data.currentModule.lessons.filter(l => l.completed).length / data.currentModule.lessons.length) * 100)}%
                      </p>
                      <p className="text-xs text-slate-500">Complete</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${(data.currentModule.lessons.filter(l => l.completed).length / data.currentModule.lessons.length) * 100}%` }} 
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
                        <p className="text-sm text-slate-500">{lesson.duration} min &bull; {lesson.type === 'video' ? 'Video Lesson' : 'Quiz'}</p>
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
            )}

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
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${data.progress.theoryModules}%` }} />
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
                    className="h-full bg-blue-500 rounded-full" 
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
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(data.progress.rtiHours / 144) * 100}%` }} />
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
                {data.trainingLog.slice(0, 4).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${entry.type === 'OJT' ? 'bg-green-500' : 'bg-purple-500'}`} />
                      <div>
                        <p className="font-medium text-slate-900">{entry.description}</p>
                        <p className="text-sm text-slate-500">{entry.date} &bull; {entry.type}</p>
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
            {data.program && (
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
                      Active
                    </span>
                  </div>
                  {data.program.rapidsId && (
                    <div>
                      <p className="text-sm text-slate-500">RAPIDS ID</p>
                      <p className="font-medium text-slate-900">{data.program.rapidsId}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

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
                {data.achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-medium text-slate-900">{achievement.label}</p>
                      <p className="text-xs text-slate-500">{new Date(achievement.earnedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
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
