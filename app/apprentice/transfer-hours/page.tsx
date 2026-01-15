"use client";

import React, { useState, useEffect } from 'react';
import { Clock, Upload, FileText, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface TransferRequest {
  id: string;
  hours_requested: number;
  previous_school_name: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  reviewed_at?: string;
  hours_approved?: number;
  reviewer_notes?: string;
}

export default function TransferHoursPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [requests, setRequests] = useState<TransferRequest[]>([]);

  // Form state
  const [hoursRequested, setHoursRequested] = useState('');
  const [previousSchoolName, setPreviousSchoolName] = useState('');
  const [previousSchoolAddress, setPreviousSchoolAddress] = useState('');
  const [previousSchoolPhone, setPreviousSchoolPhone] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
    try {
      const res = await fetch('/api/apprentice/transfer-hours');
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      }
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // First get enrollment ID
      const summaryRes = await fetch('/api/apprentice/hours-summary');
      const summaryData = await summaryRes.json();
      const enrollmentId = summaryData.summary?.enrollment_id;

      if (!enrollmentId) {
        setError('No active apprenticeship enrollment found. Please contact support.');
        setSubmitting(false);
        return;
      }

      const res = await fetch('/api/apprentice/transfer-hours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrollment_id: enrollmentId,
          hours_requested: parseFloat(hoursRequested),
          previous_school_name: previousSchoolName,
          previous_school_address: previousSchoolAddress || null,
          previous_school_phone: previousSchoolPhone || null,
          completion_date: completionDate || null,
          notes: notes || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setSuccess('Transfer hour request submitted successfully! You will be notified once reviewed.');
      // Reset form
      setHoursRequested('');
      setPreviousSchoolName('');
      setPreviousSchoolAddress('');
      setPreviousSchoolPhone('');
      setCompletionDate('');
      setNotes('');
      // Refresh requests
      fetchRequests();
    } catch (err: any) {
      setError(err.message || 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  }

  const hasPendingRequest = requests.some(r => r.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/apprentice/hours"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hour Logging
          </Link>
          <h1 className="text-2xl font-bold text-black">Transfer Hours Request</h1>
          <p className="text-slate-600 mt-1">
            If you have prior barbering training from another school, you may request to transfer those hours.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">How Transfer Hours Work</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Submit documentation from your previous school (transcript, completion letter)</li>
            <li>• Our team will verify your hours with the previous institution</li>
            <li>• Approved hours will be credited toward your 1,500 hour requirement</li>
            <li>• You may only need to complete the remaining hours (e.g., 500 hours if 1,000 transfer)</li>
            <li>• Processing typically takes 5-7 business days</li>
          </ul>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800">{success}</p>
          </div>
        )}

        {/* Existing Requests */}
        {requests.length > 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-black mb-4">Your Transfer Requests</h2>
            <div className="space-y-3">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className={`p-4 rounded-lg border ${
                    request.status === 'approved'
                      ? 'bg-green-50 border-green-200'
                      : request.status === 'rejected'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-black">
                      {request.previous_school_name}
                    </span>
                    <span
                      className={`px-2 py-2 rounded text-xs font-semibold ${
                        request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : request.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    <span>Requested: {request.hours_requested} hours</span>
                    {request.hours_approved && (
                      <span className="ml-4 text-green-700">
                        Approved: {request.hours_approved} hours
                      </span>
                    )}
                  </div>
                  {request.reviewer_notes && (
                    <p className="text-sm text-slate-600 mt-2 italic">
                      Note: {request.reviewer_notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Request Form */}
        {!hasPendingRequest ? (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Submit New Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  Hours to Transfer *
                </label>
                <input
                  type="number"
                  min="1"
                  max="1500"
                  step="0.5"
                  required
                  value={hoursRequested}
                  onChange={(e) => setHoursRequested(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2"
                  placeholder="e.g., 500"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Enter the number of hours you completed at your previous school
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  Previous School Name *
                </label>
                <input
                  type="text"
                  required
                  value={previousSchoolName}
                  onChange={(e) => setPreviousSchoolName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2"
                  placeholder="e.g., ABC Barber College"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  School Address
                </label>
                <input
                  type="text"
                  value={previousSchoolAddress}
                  onChange={(e) => setPreviousSchoolAddress(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2"
                  placeholder="123 Main St, Indianapolis, IN 46201"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  School Phone Number
                </label>
                <input
                  type="tel"
                  value={previousSchoolPhone}
                  onChange={(e) => setPreviousSchoolPhone(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2"
                  placeholder="(317) 555-1234"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  Date of Last Attendance
                </label>
                <input
                  type="date"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2"
                  rows={3}
                  placeholder="Any additional information about your previous training..."
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Required Documentation:</strong> Please email your transcript or 
                  completion letter from your previous school to{' '}
                  <a href="mailto:elevate4humanityedu@gmail.com" className="text-blue-600 underline">
                    elevate4humanityedu@gmail.com
                  </a>{' '}
                  with subject line "Transfer Hours - [Your Name]"
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Transfer Request'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <Clock className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
            <h3 className="font-semibold text-yellow-900 mb-2">Request Pending</h3>
            <p className="text-yellow-800">
              You have a pending transfer request. Please wait for it to be reviewed before submitting another.
            </p>
          </div>
        )}

        {/* Contact Info */}
        <div className="mt-6 text-center text-sm text-slate-600">
          <p>
            Questions? Call{' '}
            <a href="tel:317-314-3757" className="text-blue-600 hover:underline">
              317-314-3757
            </a>{' '}
            or email{' '}
            <a href="mailto:elevate4humanityedu@gmail.com" className="text-blue-600 hover:underline">
              elevate4humanityedu@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
