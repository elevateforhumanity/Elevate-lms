import { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Building2, MapPin, Clock, Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Job Postings | Admin | Elevate for Humanity',
  description: 'Manage job postings and employer partnerships',
};

export default function JobsPage() {
  const stats = [
    { label: 'Active Jobs', value: '34', icon: Briefcase },
    { label: 'Partner Employers', value: '18', icon: Building2 },
    { label: 'Applications', value: '156', icon: Clock },
    { label: 'Placements', value: '89', icon: MapPin },
  ];

  const jobs = [
    { 
      id: 1, 
      title: 'Medical Assistant', 
      company: 'Community Health Center', 
      location: 'Indianapolis, IN',
      type: 'Full-time',
      applications: 12,
      status: 'active',
      posted: '2024-01-10'
    },
    { 
      id: 2, 
      title: 'HVAC Technician', 
      company: 'Comfort Systems Inc', 
      location: 'Carmel, IN',
      type: 'Full-time',
      applications: 8,
      status: 'active',
      posted: '2024-01-08'
    },
    { 
      id: 3, 
      title: 'CDL Driver - Class A', 
      company: 'Midwest Logistics', 
      location: 'Fishers, IN',
      type: 'Full-time',
      applications: 15,
      status: 'active',
      posted: '2024-01-05'
    },
    { 
      id: 4, 
      title: 'Licensed Barber', 
      company: 'Elite Cuts Barbershop', 
      location: 'Noblesville, IN',
      type: 'Full-time',
      applications: 6,
      status: 'active',
      posted: '2024-01-12'
    },
    { 
      id: 5, 
      title: 'Phlebotomist', 
      company: 'LabCorp', 
      location: 'Indianapolis, IN',
      type: 'Part-time',
      applications: 9,
      status: 'paused',
      posted: '2024-01-03'
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
          <p className="text-gray-600 mt-1">Manage job listings and track applications</p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Post New Job
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="closed">Closed</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
            <option value="">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Job Title</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Company</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Location</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Applications</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{job.title}</p>
                    <p className="text-sm text-gray-500">{job.type} • Posted {job.posted}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{job.company}</td>
                <td className="px-6 py-4 text-gray-600">{job.location}</td>
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900">{job.applications}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    job.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="View">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="Delete">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
