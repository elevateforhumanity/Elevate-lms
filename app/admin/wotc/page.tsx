import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { DollarSign, Users, Clock, CheckCircle, AlertTriangle, Search, Filter, FileText, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WOTC Management | Admin',
  description: 'Manage Work Opportunity Tax Credit applications and certifications.',
  robots: { index: false, follow: false },
};

const stats = [
  { label: 'Total Credits', value: '$847,500', change: '+23%', icon: DollarSign, color: 'green' },
  { label: 'Active Applications', value: '156', change: '+12', icon: FileText, color: 'blue' },
  { label: 'Pending Review', value: '34', change: '-5', icon: Clock, color: 'yellow' },
  { label: 'Certified This Month', value: '28', change: '+8', icon: CheckCircle, color: 'purple' },
];

const applications = [
  {
    id: 1,
    employer: 'ABC Healthcare',
    employee: 'Marcus Johnson',
    category: 'Veteran',
    creditAmount: '$9,600',
    hireDate: 'Jan 5, 2025',
    status: 'certified',
    hoursWorked: 520,
  },
  {
    id: 2,
    employer: 'Tech Solutions Inc',
    employee: 'Sarah Williams',
    category: 'SNAP Recipient',
    creditAmount: '$2,400',
    hireDate: 'Jan 10, 2025',
    status: 'pending',
    hoursWorked: 180,
  },
  {
    id: 3,
    employer: 'Downtown Barbershop',
    employee: 'James Chen',
    category: 'Ex-Felon',
    creditAmount: '$2,400',
    hireDate: 'Jan 12, 2025',
    status: 'processing',
    hoursWorked: 240,
  },
  {
    id: 4,
    employer: 'City Medical Center',
    employee: 'Maria Garcia',
    category: 'Long-term Unemployed',
    creditAmount: '$2,400',
    hireDate: 'Dec 28, 2024',
    status: 'certified',
    hoursWorked: 400,
  },
];

export default function WOTCAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">WOTC Management</h1>
            <p className="text-gray-600">Work Opportunity Tax Credit applications and certifications</p>
          </div>
          <Link
            href="/admin/wotc/new"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            New Application
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
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
              <option>Veteran</option>
              <option>SNAP Recipient</option>
              <option>Ex-Felon</option>
              <option>Long-term Unemployed</option>
            </select>
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Certified</option>
              <option>Denied</option>
            </select>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{app.employer}</td>
                  <td className="px-6 py-4 text-gray-600">{app.employee}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                      {app.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-green-600">{app.creditAmount}</td>
                  <td className="px-6 py-4 text-gray-600">{app.hoursWorked}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === 'certified' ? 'bg-green-100 text-green-700' :
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {app.status === 'certified' && <CheckCircle className="w-4 h-4" />}
                      {app.status === 'pending' && <Clock className="w-4 h-4" />}
                      {app.status === 'processing' && <TrendingUp className="w-4 h-4" />}
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/wotc/${app.id}`}
                      className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
                    >
                      View
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
