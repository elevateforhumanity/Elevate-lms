'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { Sidebar, DashboardTab, CoursesTab, HoursTab, AchievementsTab } from './components';
import { learnerProfile, programInfo, progressData, currentModuleData, trainingHours as initialHours, scheduleItems, achievements, allModules } from './data';

export default function LearnerDemoPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [trainingHours, setTrainingHours] = useState(initialHours);
  const [progress, setProgress] = useState(progressData);

  const handleStartLesson = (lessonId: number) => {
    alert(`Starting lesson ${lessonId}. In a real app, this would open the video player.`);
  };

  const handleSelectModule = (moduleId: number) => {
    alert(`Opening Module ${moduleId}. In a real app, this would navigate to the module content.`);
  };

  const handleLogHours = (entry: { date: string; location: string; type: string; hours: number; mentor: string }) => {
    const newEntry = {
      id: trainingHours.length + 1,
      ...entry,
      verified: false,
    };
    setTrainingHours([newEntry, ...trainingHours]);
    
    if (entry.type === 'OJT') {
      setProgress(prev => ({
        ...prev,
        practicalHours: {
          ...prev.practicalHours,
          completed: prev.practicalHours.completed + entry.hours,
        },
      }));
    } else {
      setProgress(prev => ({
        ...prev,
        rtiHours: {
          ...prev.rtiHours,
          completed: prev.rtiHours.completed + entry.hours,
        },
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm">
        <Info className="w-4 h-4 inline mr-2" />
        Demo Mode — This is a fully interactive demo with sample data
      </div>

      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          learner={learnerProfile}
        />

        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'dashboard' && (
            <DashboardTab
              learner={learnerProfile}
              progress={progress}
              currentModule={currentModuleData}
              trainingHours={trainingHours}
              schedule={scheduleItems}
              achievements={achievements}
              program={programInfo}
              onStartLesson={handleStartLesson}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesTab
              modules={allModules}
              onSelectModule={handleSelectModule}
            />
          )}

          {activeTab === 'hours' && (
            <HoursTab
              hours={trainingHours}
              progress={progress}
              onLogHours={handleLogHours}
            />
          )}

          {activeTab === 'achievements' && (
            <AchievementsTab
              achievements={achievements}
              points={learnerProfile.points}
              streak={learnerProfile.streak}
            />
          )}
        </main>
      </div>
    </div>
  );
}
