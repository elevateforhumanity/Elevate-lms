'use client';

import { CheckCircle, Lock, ChevronRight } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  completed: boolean;
  score?: number;
  progress?: number;
  locked?: boolean;
}

interface CoursesTabProps {
  modules: Module[];
  onSelectModule: (moduleId: number) => void;
}

export function CoursesTab({ modules, onSelectModule }: CoursesTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Courses</h1>
        <p className="text-slate-600">Track your progress through all program modules</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">USDOL Registered Barber Apprenticeship</h2>
          <p className="text-sm text-slate-500">12 modules • 2,000 practical hours required</p>
        </div>

        <div className="divide-y divide-slate-100">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => !module.locked && onSelectModule(module.id)}
              disabled={module.locked}
              className={`w-full flex items-center gap-4 p-4 text-left transition ${
                module.locked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                module.completed
                  ? 'bg-green-100 text-green-600'
                  : module.locked
                  ? 'bg-slate-100 text-slate-400'
                  : 'bg-orange-100 text-orange-600'
              }`}>
                {module.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : module.locked ? (
                  <Lock className="w-5 h-5" />
                ) : (
                  <span className="font-bold">{module.id}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-900">Module {module.id}: {module.title}</div>
                {module.completed && module.score && (
                  <div className="text-sm text-green-600">Completed • Score: {module.score}%</div>
                )}
                {!module.completed && module.progress !== undefined && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[200px]">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-500">{module.progress}%</span>
                  </div>
                )}
                {module.locked && (
                  <div className="text-sm text-slate-400">Complete previous modules to unlock</div>
                )}
              </div>

              {!module.locked && (
                <ChevronRight className="w-5 h-5 text-slate-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
