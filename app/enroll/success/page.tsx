

'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Mail,
  PartyPopper,
  Phone,
  Smartphone,
} from 'lucide-react';

export default function EnrollSuccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-green-600 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            <PartyPopper className="w-5 h-5 inline-block" /> Enrollment
            Successful!
          </h1>
          <p className="text-base md:text-lg text-slate-700">
            Welcome to the Barber Apprenticeship Program
          </p>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            What Happens Next:
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-brand-blue-600" />
                  Check Your Email
                </h3>
                <p className="text-slate-600">
                  We've sent you an email to set your password. Check your inbox
                  and spam folder.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Set Your Password
                </h3>
                <p className="text-slate-600">
                  Click the link in the email to create your password and access
                  your dashboard.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Enroll in Milady RISE (FREE)
                </h3>
                <p className="text-slate-600 mb-3">
                  Get your FREE Client Well-Being & Safety Certification:
                </p>
                <a
                  href="https://www.miladytraining.com/bundles/client-well-being-safety-certification"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange-600 text-white rounded-lg hover:bg-brand-orange-700 font-semibold transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Enroll in Milady RISE
                </a>
                <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-900 font-semibold">
                    Use promo code:{' '}
                    <code className="bg-orange-100 px-2 py-1 rounded">
                      efhcti-rise295
                    </code>
                  </p>
                  <p className="text-xs text-orange-700 mt-1">
                    <AlertTriangle className="w-5 h-5 inline-block" /> No spaces
                    before or after the code
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-brand-blue-600" />
                  Download Mobile App (Optional)
                </h3>
                <p className="text-slate-600 mb-3">
                  Access your training on the go:
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://apps.apple.com/us/app/thinkific/id1471012001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-semibold text-center text-sm"
                  >
                    <Smartphone className="w-5 h-5 inline-block" /> Download for
                    iPhone
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.thinkific.mobile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-brand-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-center text-sm"
                  >
                    <Smartphone className="w-5 h-5 inline-block" /> Download for
                    Android
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-blue-900 mb-3">
            📋 Important Information:
          </h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>
              <CheckCircle className="w-5 h-5 inline-block" /> Your enrollment
              is <strong>100% FREE</strong>
            </li>
            <li>
              <CheckCircle className="w-5 h-5 inline-block" /> Milady RISE
              certification is <strong>FREE</strong> with promo code
            </li>
            <li>
              <CheckCircle className="w-5 h-5 inline-block" /> Elevate pays the
              $295 Milady fee on your behalf
            </li>
            <li>
              <CheckCircle className="w-5 h-5 inline-block" /> You'll receive
              login instructions via email within 5 minutes
            </li>
            <li>
              <CheckCircle className="w-5 h-5 inline-block" /> Check spam folder
              if you don't see the email
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/student/dashboard"
            className="flex-1 px-6 py-4 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 font-bold text-center transition-all shadow-lg"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/contact"
            className="flex-1 px-6 py-4 bg-white text-brand-blue-600 border-2 border-brand-blue-600 rounded-lg hover:bg-blue-50 font-bold text-center transition-all"
          >
            Contact Support
          </Link>
        </div>

        {/* Support Info */}
        <div className="text-center mt-8 text-slate-600">
          <p className="mb-2">Need help? We're here for you!</p>
          <p className="font-semibold">
            <Phone className="w-5 h-5 inline-block" />{' '}
            <a
              href="tel:317-314-3757"
              className="text-brand-blue-600 hover:underline"
            >
              317-314-3757
            </a>
            {' | '}
            <Mail className="w-5 h-5 inline-block" />{' '}
            <a
              href="mailto:elevate4humanityedu@gmail.com"
              className="text-brand-blue-600 hover:underline"
            >
              elevate4humanityedu@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
