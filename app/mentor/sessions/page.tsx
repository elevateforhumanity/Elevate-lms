import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, Video, MapPin, Plus } from 'lucide-react';

export const metadata: Metadata = { 
  title: 'Mentoring Sessions | Mentor Portal',
  description: 'Schedule and manage your mentoring sessions with mentees.',
};

export default function MentorSessionsPage() {
  const upcomingSessions = [
    { id: '1', mentee: 'John Smith', date: 'Jan 20, 2026', time: '2:00 PM', type: 'video', topic: 'Career Planning' },
    { id: '2', mentee: 'Maria Garcia', date: 'Jan 22, 2026', time: '10:00 AM', type: 'in-person', topic: 'Resume Review' },
  ];
  const pastSessions = [
    { id: '3', mentee: 'John Smith', date: 'Jan 13, 2026', duration: '45 min', topic: 'Goal Setting' },
    { id: '4', mentee: 'James Wilson', date: 'Jan 10, 2026', duration: '60 min', topic: 'Interview Prep' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/mentor/dashboard" className="hover:text-blue-600">Mentor Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Sessions</span>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mentoring Sessions</h1>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5" /> Schedule Session
          </button>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Sessions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{session.mentee}</p>
                    <p className="text-sm text-gray-600">{session.topic}</p>
                  </div>
                  {session.type === 'video' ? <Video className="w-5 h-5 text-blue-600" /> : <MapPin className="w-5 h-5 text-green-600" />}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {session.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {session.time}</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Join</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Reschedule</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Past Sessions</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Mentee</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Topic</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pastSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{session.mentee}</td>
                    <td className="px-6 py-4 text-gray-600">{session.date}</td>
                    <td className="px-6 py-4 text-gray-600">{session.topic}</td>
                    <td className="px-6 py-4 text-gray-600">{session.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
