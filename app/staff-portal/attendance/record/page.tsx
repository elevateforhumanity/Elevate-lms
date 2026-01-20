'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Users, Check, X, Save } from 'lucide-react';

const mockStudents = [
  { id: 1, name: 'Marcus Johnson', program: 'CNA Certification', status: null },
  { id: 2, name: 'Sarah Williams', program: 'CNA Certification', status: null },
  { id: 3, name: 'David Chen', program: 'CNA Certification', status: null },
  { id: 4, name: 'Emily Rodriguez', program: 'CNA Certification', status: null },
  { id: 5, name: 'James Wilson', program: 'CNA Certification', status: null },
  { id: 6, name: 'Ashley Brown', program: 'CNA Certification', status: null },
];

export default function RecordAttendancePage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [program, setProgram] = useState('cna');
  const [attendance, setAttendance] = useState<Record<number, 'present' | 'absent' | 'late' | null>>({});
  const [saved, setSaved] = useState(false);

  const markAll = (status: 'present' | 'absent') => {
    const newAttendance: Record<number, 'present' | 'absent' | 'late' | null> = {};
    mockStudents.forEach(s => newAttendance[s.id] = status);
    setAttendance(newAttendance);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/staff-portal/attendance" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Attendance
        </Link>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Record Attendance</h1>
                <p className="text-gray-600">Mark student attendance for a class session</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                <select value={program} onChange={(e) => setProgram(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                  <option value="cna">CNA Certification</option>
                  <option value="phlebotomy">Phlebotomy</option>
                  <option value="hvac">HVAC Technician</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
                <select className="w-full px-4 py-2 border rounded-lg">
                  <option>Morning (8:00 AM - 12:00 PM)</option>
                  <option>Afternoon (1:00 PM - 5:00 PM)</option>
                  <option>Evening (6:00 PM - 9:00 PM)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{mockStudents.length} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => markAll('present')} className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                  Mark All Present
                </button>
                <button onClick={() => markAll('absent')} className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                  Mark All Absent
                </button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Student</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Present</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Absent</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Late</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{student.name}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setAttendance({ ...attendance, [student.id]: 'present' })}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${attendance[student.id] === 'present' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-green-100'}`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setAttendance({ ...attendance, [student.id]: 'absent' })}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${attendance[student.id] === 'absent' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-red-100'}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setAttendance({ ...attendance, [student.id]: 'late' })}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${attendance[student.id] === 'late' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-yellow-100'}`}
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {saved && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                Attendance saved successfully!
              </div>
            )}

            <div className="flex justify-end gap-4 mt-6">
              <Link href="/staff-portal/attendance" className="px-6 py-2 text-gray-700 hover:text-gray-900">Cancel</Link>
              <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Save className="w-4 h-4" /> Save Attendance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
