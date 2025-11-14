'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { Award, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function IssueCertificatePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [completedEnrollments, setCompletedEnrollments] = useState<any[]>([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState('');
  const [certificateData, setCertificateData] = useState({
    certificateNumber: '',
    verificationCode: '',
  });
  const [supabase] = useState(() => 
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  // Load students on mount
  useEffect(() => {
    loadStudents();
  }, []);

  // Load enrollments when student is selected
  useEffect(() => {
    if (selectedStudent) {
      loadCompletedEnrollments(selectedStudent);
    }
  }, [selectedStudent]);

  const loadStudents = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, email, role')
      .eq('role', 'student')
      .order('full_name');

    setStudents(data || []);
  };

  const loadCompletedEnrollments = async (studentId: string) => {
    const { data } = await supabase
      .from('enrollments')
      .select(`
        id,
        completed_at,
        courses (
          id,
          title,
          programs (
            id,
            name
          )
        )
      `)
      .eq('student_id', studentId)
      .eq('status', 'completed')
      .not('completed_at', 'is', null);

    setCompletedEnrollments(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/certificates/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrollmentId: selectedEnrollment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate certificate');
      }

      setCertificateData({
        certificateNumber: data.certificateNumber,
        verificationCode: data.verificationCode,
      });
      setSuccess(true);
      setSelectedStudent('');
      setSelectedEnrollment('');
      setCompletedEnrollments([]);
    } catch (err: any) {
      setError(err.message || 'Failed to issue certificate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <Link href="/admin/certificates" className="text-gray-700 hover:text-red-600 font-medium flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Certificates
        </Link>
      </header>

      <main className="elevate-container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Issue Certificate</h1>
            <p className="text-gray-600">
              Generate a certificate for a student who has completed a course
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-green-900 mb-2">Certificate Issued Successfully!</h3>
                  <div className="text-sm text-green-800 space-y-1">
                    <p><strong>Certificate Number:</strong> {certificateData.certificateNumber}</p>
                    <p><strong>Verification Code:</strong> {certificateData.verificationCode}</p>
                    <p className="mt-3">
                      <Link 
                        href={`/cert/verify/${certificateData.verificationCode}`}
                        target="_blank"
                        className="text-green-600 hover:text-green-700 underline"
                      >
                        View Certificate →
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="elevate-card">
            <div className="space-y-6">
              {/* Student Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Student *</label>
                <select
                  value={selectedStudent}
                  onChange={(e) => {
                    setSelectedStudent(e.target.value);
                    setSelectedEnrollment('');
                  }}
                  className="elevate-select w-full"
                  required
                >
                  <option value="">Choose a student...</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.full_name || student.email}
                    </option>
                  ))}
                </select>
              </div>

              {/* Enrollment Selection */}
              {selectedStudent && (
                <div>
                  <label className="block text-sm font-medium mb-2">Select Completed Course *</label>
                  {completedEnrollments.length > 0 ? (
                    <select
                      value={selectedEnrollment}
                      onChange={(e) => setSelectedEnrollment(e.target.value)}
                      className="elevate-select w-full"
                      required
                    >
                      <option value="">Choose a completed course...</option>
                      {completedEnrollments.map((enrollment) => (
                        <option key={enrollment.id} value={enrollment.id}>
                          {Array.isArray(enrollment.courses) ? enrollment.courses[0]?.title : enrollment.courses?.title} - Completed {new Date(enrollment.completed_at).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
                      This student has no completed courses eligible for certification.
                    </div>
                  )}
                </div>
              )}

              {/* Info Box */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-2">Certificate Generation</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Certificate number will be auto-generated (format: ELEV-YYYY-XXXXXX)</li>
                  <li>• Verification code will be created for public verification</li>
                  <li>• Hours completed will be calculated from attendance logs</li>
                  <li>• Student will receive email notification (if configured)</li>
                </ul>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3">
                <Link href="/admin/certificates" className="elevate-btn-secondary">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="elevate-btn-primary flex items-center gap-2"
                  disabled={loading || !selectedEnrollment}
                >
                  <Award className="h-4 w-4" />
                  {loading ? 'Generating...' : 'Issue Certificate'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
