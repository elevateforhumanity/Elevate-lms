import Link from 'next/link';
import { FileText, Users, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const intakes = [
  { id: 1, name: 'Marcus Johnson', status: 'pending', type: 'Individual', date: '2026-01-20', estimatedRefund: 2450 },
  { id: 2, name: 'Sarah Williams', status: 'in-progress', type: 'Family', date: '2026-01-19', estimatedRefund: 4200 },
  { id: 3, name: 'David Chen', status: 'completed', type: 'Individual', date: '2026-01-18', estimatedRefund: 1850 },
  { id: 4, name: 'Emily Rodriguez', status: 'completed', type: 'Family', date: '2026-01-17', estimatedRefund: 5100 },
  { id: 5, name: 'James Wilson', status: 'needs-docs', type: 'Individual', date: '2026-01-16', estimatedRefund: 1200 },
];

const stats = [
  { label: 'Total Intakes', value: '156', icon: Users, color: 'blue' },
  { label: 'Pending Review', value: '23', icon: Clock, color: 'yellow' },
  { label: 'Completed', value: '118', icon: CheckCircle, color: 'green' },
  { label: 'Total Refunds', value: '$245K', icon: DollarSign, color: 'purple' },
];

export default function TaxIntakePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tax Intake Dashboard</h1>
            <p className="text-gray-600">VITA tax preparation intake management</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ New Intake</button>
        </div>
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <div><p className="text-sm text-gray-500">{stat.label}</p><p className="text-2xl font-bold">{stat.value}</p></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Intakes</h2>
            <select className="px-3 py-1.5 border rounded-lg text-sm">
              <option>All Status</option><option>Pending</option><option>In Progress</option><option>Completed</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Client</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Est. Refund</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {intakes.map((intake) => (
                  <tr key={intake.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{intake.name}</td>
                    <td className="px-4 py-3 text-gray-600">{intake.type}</td>
                    <td className="px-4 py-3 text-gray-600">{intake.date}</td>
                    <td className="px-4 py-3 font-medium text-green-600">${intake.estimatedRefund.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        intake.status === 'completed' ? 'bg-green-100 text-green-700' :
                        intake.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        intake.status === 'needs-docs' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>{intake.status}</span>
                    </td>
                    <td className="px-4 py-3"><button className="text-blue-600 hover:text-blue-700 text-sm">View</button></td>
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
