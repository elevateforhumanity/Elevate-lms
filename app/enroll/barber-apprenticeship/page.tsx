'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, UserPlus, LogIn } from 'lucide-react';

const ENROLLMENT_PATH = '/lms/student/enroll/barber-apprenticeship';

export default function BarberEnrollEntryPage() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Brief delay to show the explainer
    const timer = setTimeout(() => {
      setChecking(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Barber Apprenticeship Enrollment
        </h1>
        
        {checking ? (
          <div className="py-8">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600">Preparing your enrollment...</p>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-blue-800 text-sm">
                <strong>What happens next:</strong>
              </p>
              <ul className="text-blue-700 text-sm mt-2 space-y-1">
                <li>• Create an account or log in (30 seconds)</li>
                <li>• Review program details and payment options</li>
                <li>• Speak with an enrollment advisor</li>
                <li>• Complete enrollment when you're ready</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link
                href={`/login?next=${encodeURIComponent(ENROLLMENT_PATH)}`}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all"
              >
                <LogIn className="w-5 h-5" />
                Log In & Continue
              </Link>
              
              <Link
                href={`/signup?next=${encodeURIComponent(ENROLLMENT_PATH)}`}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-purple-600 text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-all"
              >
                <UserPlus className="w-5 h-5" />
                Create Account & Enroll
              </Link>
            </div>

            <p className="mt-6 text-gray-500 text-sm">
              Have questions first?{' '}
              <Link href="/forms/barber-apprenticeship-inquiry" className="text-purple-600 underline">
                Talk to us
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
