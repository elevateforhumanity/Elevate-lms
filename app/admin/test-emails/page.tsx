'use client';

import React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function TestEmailsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const sendTestEmail = async (emailType: string) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_type: emailType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setResult({
        success: true,
        message: data.message,
      });
    } catch (err: unknown) {
      setResult({
        success: false,
        message:
          (err instanceof Error ? err.message : String(err)) ||
          'Failed to send test email',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="text-brand-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-8 h-8 text-brand-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Test Email System
            </h1>
          </div>
          <p className="text-gray-600">
            Verify that automated emails are working correctly
          </p>
        </div>

        {/* Result Message */}
        {result && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              result.success
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="font-medium">{result.message}</span>
            </div>
          </div>
        )}

        {/* Email System Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Email System Status
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-700">
                Email Provider
              </span>
              <span className="text-sm text-gray-900">Resend</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-700">
                Configuration
              </span>
              <span className="text-sm text-brand-green-600 font-medium">
                ✓ Configured
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-700">API Key</span>
              <span className="text-sm text-brand-green-600 font-medium">
                ✓ Set
              </span>
            </div>
          </div>
        </div>

        {/* Test Email Types */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Send Test Emails
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Click a button below to send a test email to your admin account.
            Check your inbox to verify delivery.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => sendTestEmail('welcome')}
              disabled={loading}
              className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-8 h-8 text-brand-blue-600" />
              <div className="text-center">
                <div className="font-semibold text-gray-900">Welcome Email</div>
                <div className="text-xs text-gray-700 mt-1">
                  New user onboarding
                </div>
              </div>
            </button>

            <button
              onClick={() => sendTestEmail('reminder')}
              disabled={loading}
              className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-8 h-8 text-brand-orange-600" />
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  Reminder Email
                </div>
                <div className="text-xs text-gray-700 mt-1">
                  Action required alerts
                </div>
              </div>
            </button>

            <button
              onClick={() => sendTestEmail('notification')}
              disabled={loading}
              className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-8 h-8 text-brand-green-600" />
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  Notification Email
                </div>
                <div className="text-xs text-gray-700 mt-1">
                  Activity updates
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Email Triggers */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Automated Email Triggers
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
              <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">
                  Student Application
                </div>
                <div className="text-gray-600">
                  Welcome email sent on successful enrollment
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
              <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">
                  Shop Partner Application
                </div>
                <div className="text-gray-600">
                  Confirmation email sent to new shop partners
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
              <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">Contact Form</div>
                <div className="text-gray-600">
                  Notification sent to admin on new inquiries
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
              <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">License Request</div>
                <div className="text-gray-600">
                  Confirmation and admin notification emails
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
              <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">Partner Inquiry</div>
                <div className="text-gray-600">
                  Confirmation and admin notification emails
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
