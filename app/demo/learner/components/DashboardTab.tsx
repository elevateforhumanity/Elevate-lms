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
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Welcome back, {learner.name.split(' ')[0]}!</h1>
        <p className="text-sm sm:text-base opacity-90">You&apos;re making great progress!</p>
        <div className="flex gap-4 sm:gap-6 mt-3 sm:mt-4">
          <div>
            <div className="text-2xl sm:text-3xl font-bold">{progress.overall}%</div>
            <div className="text-xs sm:text-sm opacity-80">Overall Progress</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold">{progress.practicalHours.completed}</div>
            <div className="text-xs sm:text-sm opacity-80">Hours Logged</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Continue Learning */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Continue Learning</h2>
            <h3 className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">{currentModule.title}</h3>
            
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${currentModule.progress}%` }} />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-600">{currentModule.progress}%</span>
            </div>

            <div className="space-y-2">
              {currentModule.lessons.slice(0, 5).map((lesson) => (
                <div
                  key={lesson.id}
                  className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition ${
                    lesson.current ? 'bg-orange-50 border border-orange-200' : 'hover:bg-slate-50'
                  }`}
                >
                  {lesson.completed ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  ) : lesson.type === 'video' ? (
                    <Video className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm sm:text-base font-medium truncate ${lesson.completed ? 'text-slate-500' : 'text-slate-900'}`}>
                      {lesson.title}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400">{lesson.duration}</div>
                  </div>
                  {lesson.current && (
                    <button
                      onClick={() => onStartLesson(lesson.id)}
                      className="flex items-center gap-1 sm:gap-2 bg-orange-600 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-orange-700 transition flex-shrink-0"
                    >
                      <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Resume</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-slate-900">{progress.theoryModules.completed}/{progress.theoryModules.total}</div>
              <div className="text-[10px] sm:text-sm text-slate-500">Theory</div>
            </div>
            <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-slate-900">{progress.practicalHours.completed.toLocaleString()}</div>
              <div className="text-[10px] sm:text-sm text-slate-500">OJT Hours</div>
            </div>
            <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-slate-900">{progress.rtiHours.completed}</div>
              <div className="text-[10px] sm:text-sm text-slate-500">RTI Hours</div>
            </div>
          </div>

          {/* Recent Training Hours */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Recent Training Hours</h3>
              <button className="text-xs sm:text-sm text-orange-600 font-medium hover:text-orange-700">View All</button>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {trainingHours.slice(0, 3).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-2 sm:p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium text-slate-900 text-sm sm:text-base truncate">{entry.location}</div>
                      <div className="text-xs sm:text-sm text-slate-500">{entry.date} • {entry.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{entry.hours}h</span>
                    {entry.verified && (
                      <span className="text-[10px] sm:text-xs bg-green-100 text-green-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Program Info */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 p-4 sm:p-6">
            <h3 className="font-bold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">Your Program</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Program</span>
                <span className="font-medium text-slate-900 text-right">{program.name}</span>
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
                <span className="text-slate-500">Expected</span>
                <span className="font-medium text-slate-900">{program.expectedCompletion}</span>
              </div>
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 p-4 sm:p-6">
            <h3 className="font-bold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">Upcoming</h3>
            <div className="space-y-2 sm:space-y-3">
              {schedule.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-start gap-2 sm:gap-3">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-slate-900 text-sm sm:text-base truncate">{item.title}</div>
                    <div className="text-xs sm:text-sm text-slate-500">{item.date} • {item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Achievements</h3>
              <span className="text-xs sm:text-sm text-slate-500">{achievements.filter(a => a.unlocked).length} earned</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {achievements.slice(0, 4).map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-2 sm:p-3 rounded-lg text-center ${
                    achievement.unlocked ? 'bg-orange-50' : 'bg-slate-100 opacity-50'
                  }`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-2 rounded-full overflow-hidden bg-slate-200">
                    <Image
                      src={achievement.icon}
                      alt={achievement.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium text-slate-900 truncate">{achievement.title}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500">{achievement.date}</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 sm:mt-4 text-xs sm:text-sm text-orange-600 font-medium hover:text-orange-700 flex items-center justify-center gap-1">
              View All <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 p-4 sm:p-6">
            <h3 className="font-bold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100 transition">
                Log Training Hours
              </button>
              <button className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 transition">
                Message Mentor
              </button>
              <button className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 transition">
                Get Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
