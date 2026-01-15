'use client';

import Image from 'next/image';
import { Play, CheckCircle, Video, ClipboardCheck, Clock, Calendar, ChevronRight } from 'lucide-react';

interface DashboardTabProps {
  learner: { name: string };
  progress: { overall: number; theoryModules: { completed: number; total: number }; practicalHours: { completed: number; total: number }; rtiHours: { completed: number; total: number } };
  currentModule: { title: string; progress: number; lessons: Array<{ id: number; title: string; duration: string; type: string; completed: boolean; current?: boolean }> };
  trainingHours: Array<{ id: number; date: string; location: string; type: string; hours: number; mentor: string; verified: boolean }>;
  schedule: Array<{ id: number; title: string; date: string; time: string; type: string }>;
  achievements: Array<{ id: number; title: string; date: string; icon: string; unlocked: boolean }>;
  program: { name: string; status: string; startDate: string; expectedCompletion: string };
  onStartLesson: (lessonId: number) => void;
}

export function DashboardTab({ learner, progress, currentModule, trainingHours, schedule, achievements, program, onStartLesson }: DashboardTabProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {learner.name.split(' ')[0]}!</h1>
        <p className="opacity-90">You&apos;re making great progress. Keep up the momentum!</p>
        <div className="flex gap-6 mt-4">
          <div>
            <div className="text-3xl font-bold">{progress.overall}%</div>
            <div className="text-sm opacity-80">Overall Progress</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{progress.practicalHours.completed}</div>
            <div className="text-sm opacity-80">Hours Logged</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Continue Learning</h2>
            <h3 className="text-slate-600 mb-4">{currentModule.title}</h3>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${currentModule.progress}%` }} />
              </div>
              <span className="text-sm font-medium text-slate-600">{currentModule.progress}%</span>
              <span className="text-sm text-slate-400">Complete</span>
            </div>

            <div className="space-y-2">
              {currentModule.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition ${
                    lesson.current ? 'bg-orange-50 border border-orange-200' : 'hover:bg-slate-50'
                  }`}
                >
                  {lesson.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : lesson.type === 'video' ? (
                    <Video className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ClipboardCheck className="w-5 h-5 text-slate-400" />
                  )}
                  <div className="flex-1">
                    <div className={`font-medium ${lesson.completed ? 'text-slate-500' : 'text-slate-900'}`}>
                      {lesson.title}
                    </div>
                    <div className="text-sm text-slate-400">{lesson.duration} • {lesson.type === 'video' ? 'Video Lesson' : 'Quiz'}</div>
                  </div>
                  {lesson.current && (
                    <button
                      onClick={() => onStartLesson(lesson.id)}
                      className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition"
                    >
                      <Play className="w-4 h-4" /> Resume
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">{progress.theoryModules.completed}/{progress.theoryModules.total}</div>
              <div className="text-sm text-slate-500">Theory Modules</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">{progress.practicalHours.completed.toLocaleString()}/{progress.practicalHours.total.toLocaleString()}</div>
              <div className="text-sm text-slate-500">Practical Hours</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">{progress.rtiHours.completed}/{progress.rtiHours.total}</div>
              <div className="text-sm text-slate-500">RTI Hours</div>
            </div>
          </div>

          {/* Recent Training Hours */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Recent Training Hours</h3>
              <button className="text-sm text-orange-600 font-medium hover:text-orange-700">View All</button>
            </div>
            <div className="space-y-3">
              {trainingHours.slice(0, 4).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="font-medium text-slate-900">{entry.location}</div>
                      <div className="text-sm text-slate-500">{entry.date} • {entry.type} • {entry.mentor}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{entry.hours} hrs</span>
                    {entry.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Verified</span>
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
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Your Program</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Program</span>
                <span className="font-medium text-slate-900 text-right max-w-[180px]">{program.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="font-medium text-green-600">{program.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Started</span>
                <span className="font-medium text-slate-900">{program.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Expected Completion</span>
                <span className="font-medium text-slate-900">{program.expectedCompletion}</span>
              </div>
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Upcoming Schedule</h3>
            <div className="space-y-3">
              {schedule.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-900">{item.title}</div>
                    <div className="text-sm text-slate-500">{item.date} • {item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Achievements</h3>
              <span className="text-sm text-slate-500">{achievements.filter(a => a.unlocked).length} earned</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {achievements.slice(0, 4).map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg text-center ${
                    achievement.unlocked ? 'bg-orange-50' : 'bg-slate-100 opacity-50'
                  }`}
                >
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden bg-slate-200">
                    <Image
                      src={achievement.icon}
                      alt={achievement.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs font-medium text-slate-900">{achievement.title}</div>
                  <div className="text-xs text-slate-500">{achievement.date}</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-orange-600 font-medium hover:text-orange-700 flex items-center justify-center gap-1">
              View All Achievements <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 bg-orange-50 text-orange-700 rounded-lg font-medium hover:bg-orange-100 transition">
                Log Training Hours
              </button>
              <button className="w-full text-left px-4 py-3 bg-slate-50 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition">
                Message Mentor
              </button>
              <button className="w-full text-left px-4 py-3 bg-slate-50 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition">
                View Documents
              </button>
              <button className="w-full text-left px-4 py-3 bg-slate-50 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition">
                Get Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
