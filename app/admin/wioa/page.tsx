import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Users, CheckCircle, Clock, AlertTriangle, Download, Filter, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WIOA Compliance | Admin | Elevate for Humanity',
  description: 'Manage WIOA compliance, eligibility verification, and reporting',
};

export default function WIOAPage() {
  const stats = [
    { label: 'Total WIOA Participants', value: '156', icon: Users, color: 'blue' },
    { label: 'Pending Verification', value: '23', icon: Clock, color: 'yellow' },
    { label: 'Verified Eligible', value: '128', icon: CheckCircle, color: 'green' },
    { label: 'Needs Attention', value: '5', icon: AlertTriangle, color: 'red' },
  ];

  const participants = [
    { id: 1, name: 'Maria Garcia', program: 'Healthcare', status: 'verified', eligibility: 'Low Income', date: '2024-01-10' },
    { id: 2, name: 'James Wilson', program: 'HVAC', status: 'pending', eligibility: 'Veteran', date: '2024-01-12' },
    { id: 3, name: 'Lisa Chen', program: 'CDL', status: 'verified', eligibility: 'Public Assistance', date: '2024-01-08' },
    { id: 4, name: 'Robert Taylor', program: 'Barber', status: 'needs_docs', eligibility: 'Low Income', date: '2024-01-11' },
    { id: 5, name: 'Amanda Johnson', program: 'Medical Assistant', status: 'verified', eligibility: 'Dislocated Worker', date: '2024-01-09' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Verified</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pending</span>;
      case 'needs_docs':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Needs Docs</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">WIOA Compliance</h1>
          <p className="text-gray-600 mt-1">Manage WIOA eligibility verification and compliance reporting</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Report
          </button>
          <Link
            href="/admin/wioa/verify"
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            New Verification
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border p-6">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              stat.color === 'blue' ? 'bg-blue-100' :
              stat.color === 'yellow' ? 'bg-yellow-100' :
              stat.color === 'green' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <stat.icon className={`w-6 h-6 ${
                stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'yellow' ? 'text-yellow-600' :
                stat.color === 'green' ? 'text-green-600' : 'text-red-600'
              }`} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/admin/wioa/eligibility" className="bg-white rounded-xl shadow-sm border p-4 hover:border-orange-300 transition">
          <h3 className="font-semibold text-gray-900">Eligibility Criteria</h3>
          <p className="text-sm text-gray-600 mt-1">View and manage WIOA eligibility requirements</p>
        </Link>
        <Link href="/admin/wioa/reports" className="bg-white rounded-xl shadow-sm border p-4 hover:border-orange-300 transition">
          <h3 className="font-semibold text-gray-900">Compliance Reports</h3>
          <p className="text-sm text-gray-600 mt-1">Generate quarterly and annual reports</p>
        </Link>
        <Link href="/admin/wioa/documents" className="bg-white rounded-xl shadow-sm border p-4 hover:border-orange-300 transition">
          <h3 className="font-semibold text-gray-900">Document Templates</h3>
          <p className="text-sm text-gray-600 mt-1">Access required forms and templates</p>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search participants..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
            <option value="">All Statuses</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="needs_docs">Needs Documents</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
            <option value="">All Programs</option>
            <option value="healthcare">Healthcare</option>
            <option value="hvac">HVAC</option>
            <option value="cdl">CDL</option>
            <option value="barber">Barber</option>
          </select>
        </div>
      </div>

      {/* Participants Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Participant</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Program</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Eligibility Type</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {participants.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                <td className="px-6 py-4 text-gray-600">{p.program}</td>
                <td className="px-6 py-4 text-gray-600">{p.eligibility}</td>
                <td className="px-6 py-4">{getStatusBadge(p.status)}</td>
                <td className="px-6 py-4 text-gray-600">{p.date}</td>
                <td className="px-6 py-4">
                  <Link href={`/admin/wioa/${p.id}`} className="text-orange-600 hover:text-orange-700 font-medium">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
