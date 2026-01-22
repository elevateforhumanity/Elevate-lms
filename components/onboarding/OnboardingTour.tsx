"use client";

import React from 'react';

import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

type TourStep = {
  target: string;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

type OnboardingTourProps = {
  steps: TourStep[];
  tourKey: string; // Unique key to track if user has seen this tour
  onComplete?: () => void;
};

export function OnboardingTour({ steps, tourKey, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen this tour
    const hasSeenTour = localStorage.getItem(`tour_${tourKey}_completed`);
    if (!hasSeenTour) {
      // Small delay before showing tour
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, [tourKey]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = () => {
    localStorage.setItem(`tour_${tourKey}_completed`, 'true');
    setIsVisible(false);
    onComplete?.();
  };

  const skipTour = () => {
    localStorage.setItem(`tour_${tourKey}_completed`, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const step = steps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-300" />

      {/* Tour Card */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md animate-in zoom-in duration-300">
        <div className="bg-white rounded-2xl shadow-2xl p-6 mx-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? 'w-8 bg-blue-600'
                          : index < currentStep
                          ? 'w-1.5 bg-blue-400'
                          : 'w-1.5 bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {currentStep + 1} of {steps.length}
                </span>
              </div>
              <h3 className="text-xl font-bold text-black">{step.title}</h3>
            </div>
            <button
              onClick={skipTour}
              className="p-1 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Content */}
          <p className="text-black leading-relaxed mb-6">{step.description}</p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={skipTour}
              className="text-sm text-slate-500 hover:text-black font-medium transition"
            >
              Skip Tour
            </button>
            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 border border-slate-300 text-black rounded-lg font-semibold hover:bg-slate-50 transition flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-1"
              >
                {currentStep < steps.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  'Get Started'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Predefined tours for different pages
export const dashboardTour: TourStep[] = [
  {
    target: 'welcome',
    title: 'Welcome to Your Dashboard!',
    description: 'This is your learning hub. Here you can see your progress, continue courses, and access all learning resources.',
  },
  {
    target: 'progress',
    title: 'Track Your Progress',
    description: 'View your active courses, certificates earned, and average scores at a glance.',
  },
  {
    target: 'continue-learning',
    title: 'Continue Where You Left Off',
    description: 'Quickly resume your courses right where you stopped. Click the play button to jump back in.',
  },
  {
    target: 'quick-access',
    title: 'Quick Access Tools',
    description: 'Access forums, study groups, AI tutor, and analytics with one click.',
  },
];

export const coursesTour: TourStep[] = [
  {
    target: 'search',
    title: 'Find Your Perfect Course',
    description: 'Use the search bar to find courses by name, topic, or instructor.',
  },
  {
    target: 'filters',
    title: 'Filter and Sort',
    description: 'Narrow down courses by category, level, duration, and more.',
  },
  {
    target: 'enroll',
    title: 'Enroll in Courses',
    description: 'Click on any course to see details and enroll. Some courses may require prerequisites.',
  },
];

export const forumsTour: TourStep[] = [
  {
    target: 'forums',
    title: 'Join the Discussion',
    description: 'Connect with fellow learners, ask questions, and share knowledge in course-specific forums.',
  },
  {
    target: 'create-thread',
    title: 'Start a Conversation',
    description: 'Create new discussion threads to ask questions or share insights.',
  },
  {
    target: 'notifications',
    title: 'Stay Updated',
    description: 'Get notified when someone replies to your posts or mentions you.',
  },
];
