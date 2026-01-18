'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Users, CheckCircle, Save } from 'lucide-react';

export default function RecordAttendancePage() {
  const router = useRouter();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [course, setCourse] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const students = [
    { id: '1', name: 'John Smith', present: true },
    { id: '2', name: 'Maria Garcia', present: true },
    { id: '3', name: 'James Wilson', present: false },
    { id: '4', name: 'Sarah Johnson', present: true },
  ];

  const [attendance, setAttendance] = useState(students.map(s => ({ ...s })));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setTimeout(() => router.push('/partner/attendance'), 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance Recorded!</h1>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/partner-portal" className="hover:text-blue-600">Partner Portal</Link>
            <span className="mx-2">/</span>
            <Link href="/partner/attendance" className="hover:text-blue-600">Attendance</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Record</span>
          </nav>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/partner/attendance" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />Back to Attendance
        </Link>
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Record Attendance</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select value={course} onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                  <option value="">Select course</option>
                  <option value="hvac">HVAC Fundamentals</option>
                  <option value="medical">Medical Assistant Training</option>
                  <option value="barber">Barber Apprenticeship</option>
                </select>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Students</h3>
              <div className="space-y-2">
                {attendance.map((student, i) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{student.name}</span>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input type="radio" name={`student-${student.id}`} checked={student.present}
                          onChange={() => { const newAtt = [...attendance]; newAtt[i].present = true; setAttendance(newAtt); }}
                          className="w-4 h-4 text-green-600" />
                        <span className="ml-2 text-green-600">Present</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name={`student-${student.id}`} checked={!student.present}
                          onChange={() => { const newAtt = [...attendance]; newAtt[i].present = false; setAttendance(newAtt); }}
                          className="w-4 h-4 text-red-600" />
                        <span className="ml-2 text-red-600">Absent</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center">
              <Save className="w-5 h-5 mr-2" />Save Attendance
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
