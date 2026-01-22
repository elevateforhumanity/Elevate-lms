import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, XCircle, Clock, Search, Filter, ArrowLeft, User, FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WIOA Eligibility | Admin',
  description: 'Review and manage WIOA eligibility determinations.',
  robots: { index: false, follow: false },
};

// Applications will be fetched from database - empty until real data exists
const applications: any[] = [];

const stats = [
  { label: 'Pending Review', value: 0, color: 'yellow' },
  { label: 'Approved', value: 0, color: 'green' },
  { label: 'Denied', value: 0, color: 'red' },
  { label: 'Incomplete', value: 0, color: 'gray' },
];

export default function WIOAEligibilityPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/admin/wioa" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to WIOA Management
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Eligibility Determinations</h1>
            <p className="text-gray-600">Review and process WIOA eligibility applications</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className={`w-3 h-3 rounded-full bg-${stat.color}-500 mb-3`} />
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
              <option>All Categories</option>
              <option>Adult</option>
              <option>Dislocated Worker</option>
              <option>Youth</option>
            </select>
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Denied</option>
            </select>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{app.name}</p>
                        <p className="text-sm text-gray-500">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                      {app.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{app.submitted}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <FileCheck className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{app.documents}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === 'approved' ? 'bg-green-100 text-green-700' :
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {app.status === 'approved' && <CheckCircle className="w-4 h-4" />}
                      {app.status === 'pending' && <Clock className="w-4 h-4" />}
                      {app.status === 'denied' && <XCircle className="w-4 h-4" />}
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/wioa/verify?id=${app.id}`}
                      className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
                    >
                      Review
                    </Link>
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
