// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { 
  BookOpen, 
  CheckCircle, 
  Circle,
  ChevronRight,
  ChevronDown,
  FileText,
  AlertTriangle,
  Loader2,
  Download,
  Pen,
} from 'lucide-react';
import { getHandbook, type HandbookSection } from '@/lib/apprenticeship/handbook-content';

export default function ApprenticeHandbookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [programSlug, setProgramSlug] = useState('barber-apprenticeship');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [acknowledgedSections, setAcknowledgedSections] = useState<Set<string>>(new Set());
  const [signature, setSignature] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [allSigned, setAllSigned] = useState(false);

  const handbook = getHandbook(programSlug);
  const sections = handbook?.sections || [];
  const currentSection = sections[currentSectionIndex];

  useEffect(() => {
    fetchProgress();
  }, [programSlug]);

  async function fetchProgress() {
    setLoading(true);
    try {
      const res = await fetch(`/api/apprentice/handbook?program=${programSlug}`);
      if (res.ok) {
        const data = await res.json();
        setAcknowledgedSections(new Set(data.acknowledgedSections || []));
        setAllSigned(data.agreementSigned || false);
        if (data.signature) setSignature(data.signature);
      }
    } catch (error) {
      console.error('Failed to fetch handbook progress:', error);
    } finally {
      setLoading(false);
    }
  }

  async function acknowledgeSection(sectionId: string) {
    setSaving(true);
    try {
      const res = await fetch('/api/apprentice/handbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programSlug,
          sectionId,
          sectionTitle: currentSection?.title,
          action: 'acknowledge',
        }),
      });

      if (res.ok) {
        setAcknowledgedSections(prev => new Set([...prev, sectionId]));
        // Auto-advance to next section
        if (currentSectionIndex < sections.length - 1) {
          setCurrentSectionIndex(currentSectionIndex + 1);
        }
      }
    } catch (error) {
      console.error('Failed to acknowledge section:', error);
    } finally {
      setSaving(false);
    }
  }

  async function signAgreement() {
    if (!signature.trim() || !agreedToTerms) return;

    setSaving(true);
    try {
      const res = await fetch('/api/apprentice/handbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programSlug,
          action: 'sign',
          signature: signature.trim(),
          acknowledgedSections: Array.from(acknowledgedSections),
        }),
      });

      if (res.ok) {
        setAllSigned(true);
        // Redirect to documents page
        router.push('/apprentice/documents');
      }
    } catch (error) {
      console.error('Failed to sign agreement:', error);
    } finally {
      setSaving(false);
    }
  }

  const allSectionsAcknowledged = sections
    .filter(s => s.requiresAcknowledgment)
    .every(s => acknowledgedSections.has(s.id));

  const progress = sections.length > 0 
    ? (acknowledgedSections.size / sections.filter(s => s.requiresAcknowledgment).length) * 100 
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (allSigned) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto text-center py-16">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-black mb-4">Handbook Completed!</h1>
          <p className="text-slate-600 mb-8">
            You have read and signed the apprenticeship handbook and agreement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apprentice/documents"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
            >
              Upload Required Documents →
            </Link>
            <Link
              href="/lms/dashboard"
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-purple-600" />
            Apprenticeship Handbook
          </h1>
          <p className="text-slate-600 mt-1">
            {handbook?.programName} • Version {handbook?.version}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">Reading Progress</span>
            <span className="text-sm text-slate-500">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 sticky top-6">
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-bold text-black">Table of Contents</h3>
              </div>
              <nav className="p-2">
                {sections.map((section, index) => {
                  const isAcknowledged = acknowledgedSections.has(section.id);
                  const isCurrent = index === currentSectionIndex;
                  const needsAck = section.requiresAcknowledgment;

                  return (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSectionIndex(index)}
                      className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                        isCurrent 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {needsAck ? (
                        isAcknowledged ? (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />
                        )
                      ) : (
                        <FileText className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      )}
                      <span className="text-sm font-medium truncate">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {/* Section Header */}
              <div className="p-6 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-black">{currentSection?.title}</h2>
                  <span className="text-sm text-slate-500">
                    Section {currentSectionIndex + 1} of {sections.length}
                  </span>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-6">
                <div className="prose prose-slate max-w-none">
                  <ReactMarkdown>{currentSection?.content || ''}</ReactMarkdown>
                </div>
              </div>

              {/* Acknowledgment Section */}
              {currentSection?.requiresAcknowledgment && (
                <div className="p-6 border-t border-slate-200 bg-amber-50">
                  {acknowledgedSections.has(currentSection.id) ? (
                    <div className="flex items-center gap-3 text-green-700">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-semibold">You have acknowledged this section</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-amber-800">
                          <strong>Acknowledgment Required:</strong> {currentSection.acknowledgmentText}
                        </p>
                      </div>
                      <button
                        onClick={() => acknowledgeSection(currentSection.id)}
                        disabled={saving}
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
                      >
                        {saving ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <CheckCircle className="w-5 h-5" />
                        )}
                        I Acknowledge & Understand
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="p-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
                  disabled={currentSectionIndex === 0}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50"
                >
                  ← Previous
                </button>
                
                {currentSectionIndex < sections.length - 1 ? (
                  <button
                    onClick={() => setCurrentSectionIndex(currentSectionIndex + 1)}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 flex items-center gap-2"
                  >
                    Next Section <ChevronRight className="w-4 h-4" />
                  </button>
                ) : allSectionsAcknowledged ? (
                  <span className="text-green-600 font-semibold">All sections complete!</span>
                ) : (
                  <span className="text-amber-600 font-semibold">Please acknowledge all sections</span>
                )}
              </div>
            </div>

            {/* Final Signature Section */}
            {currentSectionIndex === sections.length - 1 && allSectionsAcknowledged && (
              <div className="mt-6 bg-white rounded-xl border-2 border-purple-200 overflow-hidden">
                <div className="p-6 border-b border-purple-200 bg-purple-50">
                  <h3 className="text-xl font-bold text-purple-900 flex items-center gap-2">
                    <Pen className="w-6 h-6" />
                    Sign Agreement
                  </h3>
                  <p className="text-purple-700 mt-1">
                    Please sign below to complete your enrollment agreement.
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  {/* Signature Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Type Your Full Legal Name as Signature
                    </label>
                    <input
                      type="text"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="Enter your full legal name"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-purple-500 focus:ring-purple-500 text-lg"
                    />
                    {signature && (
                      <div className="mt-3 p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-500 mb-1">Signature Preview:</p>
                        <p className="text-2xl font-signature text-slate-800 italic">
                          {signature}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Final Agreement Checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-slate-700">
                      I have read and understand the entire Apprenticeship Handbook. I agree to all terms, 
                      conditions, and responsibilities outlined herein. I understand this is a legally 
                      binding agreement and my electronic signature has the same legal effect as a 
                      handwritten signature.
                    </span>
                  </label>

                  {/* Sign Button */}
                  <button
                    onClick={signAgreement}
                    disabled={!signature.trim() || !agreedToTerms || saving}
                    className="w-full px-6 py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Pen className="w-6 h-6" />
                        Sign & Complete Agreement
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    By clicking "Sign & Complete Agreement", you are electronically signing this document.
                    Date: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
