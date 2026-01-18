import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Plus, Users, TrendingUp, MoreVertical, Edit, Eye, Trash2 } from 'lucide-react';

export const metadata: Metadata = { title: 'Manage Programs | Program Holder Portal' };

export default function ProgramHolderProgramsPage() {
  const programs = [
    { id: '1', name: 'HVAC Technician', status: 'active', students: 456, completion: 89, created: 'Jan 2024' },
    { id: '2', name: 'Medical Assistant', status: 'active', students: 312, completion: 92, created: 'Mar 2024' },
    { id: '3', name: 'Barber License', status: 'active', students: 234, completion: 85, created: 'Jun 2024' },
    { id: '4', name: 'CDL Training', status: 'active', students: 232, completion: 88, created: 'Sep 2024' },
    { id: '5', name: 'Welding Certification', status: 'draft', students: 0, completion: 0, created: 'Jan 2026' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/program-holder/dashboard" className="hover:text-purple-600">Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Programs</span>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Programs</h1>
          <Link href="/program-holder/programs/new" className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            <Plus className="w-5 h-5" /> Add Program
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Program</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Students</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Completion</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {programs.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-900">{program.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${program.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {program.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">{program.students}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${program.completion}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600">{program.completion}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{program.created}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
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
