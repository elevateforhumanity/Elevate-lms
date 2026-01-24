'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, ShoppingBag, GraduationCap, BookOpen, Server, HelpCircle, MessageCircle, ChevronRight } from 'lucide-react';
import { storeGuideFlow, GuideChoice, GUIDE_STORAGE_KEYS, GUIDE_ANALYTICS } from '@/lib/guide/flows';

interface StoreGuideChatProps {
  onStartTour?: (tourId: string) => void;
  forceOpen?: boolean;
}

const iconMap = {
  'shopping-bag': ShoppingBag,
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
  'server': Server,
  'help-circle': HelpCircle,
};

export default function StoreGuideChat({ onStartTour, forceOpen = false }: StoreGuideChatProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState('main');
  const [selectedChoice, setSelectedChoice] = useState<GuideChoice | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  // Check if guide should auto-open on first visit
  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      return;
    }

    if (typeof window === 'undefined') return;

    const dismissed = localStorage.getItem(GUIDE_STORAGE_KEYS.DISMISSED);
    const completed = localStorage.getItem(GUIDE_STORAGE_KEYS.COMPLETED);

    if (!dismissed && !completed && !hasAutoOpened) {
      // Auto-open on first visit after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);
        console.log(GUIDE_ANALYTICS.GUIDE_OPENED, { auto: true });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [forceOpen, hasAutoOpened]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setCurrentQuestionId('main');
    setSelectedChoice(null);
    setShowConfirmation(false);
    console.log(GUIDE_ANALYTICS.GUIDE_OPENED, { auto: false });
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(GUIDE_STORAGE_KEYS.DISMISSED, 'true');
    }
    console.log(GUIDE_ANALYTICS.GUIDE_DISMISSED);
  }, []);

  const handleChoiceSelect = useCallback((choice: GuideChoice) => {
    console.log(GUIDE_ANALYTICS.ROUTE_SELECTED, { choice: choice.id, route: choice.route });

    if (choice.id === 'not-sure') {
      // Go to follow-up question
      const currentQuestion = storeGuideFlow.questions.find(q => q.id === currentQuestionId);
      if (currentQuestion?.followUp) {
        setCurrentQuestionId(currentQuestion.followUp);
      }
      return;
    }

    setSelectedChoice(choice);
    setShowConfirmation(true);
  }, [currentQuestionId]);

  const handleConfirm = useCallback((startTour: boolean) => {
    if (!selectedChoice) return;

    // Mark as completed
    if (typeof window !== 'undefined') {
      localStorage.setItem(GUIDE_STORAGE_KEYS.COMPLETED, 'true');
    }
    console.log(GUIDE_ANALYTICS.GUIDE_COMPLETED, { route: selectedChoice.route });

    setIsOpen(false);

    // Navigate to the selected route
    if (selectedChoice.route) {
      router.push(selectedChoice.route);
    }

    // Start tour if requested
    if (startTour && selectedChoice.startTour && selectedChoice.tourId && onStartTour) {
      setTimeout(() => {
        onStartTour(selectedChoice.tourId!);
      }, 500);
    }
  }, [selectedChoice, router, onStartTour]);

  const currentQuestion = storeGuideFlow.questions.find(q => q.id === currentQuestionId);

  // Floating "Need help?" button when closed
  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        aria-label="Open store guide"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">Need help?</span>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
      >
        {/* Modal - Center screen */}
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition"
              aria-label="Close guide"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-orange-500 flex-shrink-0">
                <Image
                  src="/images/team-hq/instructor-1.jpg"
                  alt="Store Guide"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 id="guide-title" className="text-xl font-bold">Store Guide</h2>
                <p className="text-slate-300 text-sm">{storeGuideFlow.welcomeMessage}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {!showConfirmation ? (
              <>
                <h3 className="text-lg font-bold text-black mb-4">
                  {currentQuestion?.question}
                </h3>
                
                <div className="space-y-3">
                  {currentQuestion?.choices.map((choice) => {
                    const Icon = iconMap[choice.icon];
                    return (
                      <button
                        key={choice.id}
                        onClick={() => handleChoiceSelect(choice)}
                        className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-500 rounded-xl transition-all text-left group"
                      >
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition">
                          <Icon className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-black">{choice.label}</p>
                          {choice.description && (
                            <p className="text-sm text-gray-600 truncate">{choice.description}</p>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition" />
                      </button>
                    );
                  })}
                </div>

                {currentQuestionId !== 'main' && (
                  <button
                    onClick={() => setCurrentQuestionId('main')}
                    className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                  >
                    ← Back to main question
                  </button>
                )}
              </>
            ) : (
              /* Confirmation screen */
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {selectedChoice && (() => {
                    const Icon = iconMap[selectedChoice.icon];
                    return <Icon className="w-8 h-8 text-green-600" />;
                  })()}
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Taking you to {selectedChoice?.label}
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedChoice?.description}
                </p>

                {selectedChoice?.startTour && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-orange-800 font-medium">
                      Would you like a quick tour when you arrive?
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  {selectedChoice?.startTour ? (
                    <>
                      <button
                        onClick={() => handleConfirm(false)}
                        className="flex-1 py-3 px-4 bg-gray-100 text-black rounded-lg font-medium hover:bg-gray-200 transition"
                      >
                        No thanks
                      </button>
                      <button
                        onClick={() => handleConfirm(true)}
                        className="flex-1 py-3 px-4 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition"
                      >
                        Yes, show me around
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleConfirm(false)}
                      className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition"
                    >
                      Let's go!
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    setSelectedChoice(null);
                  }}
                  className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Choose something else
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              You can reopen this guide anytime using the "Need help?" button
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
