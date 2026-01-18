import { Metadata } from 'next';
import Link from 'next/link';
import { Search, MessageSquare, Calendar } from 'lucide-react';

export const metadata: Metadata = { 
  title: 'My Mentees | Mentor Portal',
  description: 'View and manage your mentees, track their progress, and schedule sessions.',
};

export default function MenteesPage() {
  const mentees = [
    { id: '1', name: 'John Smith', program: 'HVAC', startDate: 'Nov 2025', sessions: 8, status: 'active' },
    { id: '2', name: 'Maria Garcia', program: 'Medical Assistant', startDate: 'Dec 2025', sessions: 4, status: 'active' },
    { id: '3', name: 'James Wilson', program: 'Barber', startDate: 'Sep 2025', sessions: 12, status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/mentor/dashboard" className="hover:text-blue-600">Mentor Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Mentees</span>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Mentees</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search mentees..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Program</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Started</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Sessions</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mentees.map((mentee) => (
                <tr key={mentee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{mentee.name}</td>
                  <td className="px-6 py-4 text-gray-600">{mentee.program}</td>
                  <td className="px-6 py-4 text-gray-600">{mentee.startDate}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{mentee.sessions}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${mentee.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {mentee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded"><MessageSquare className="w-4 h-4" /></button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded"><Calendar className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
