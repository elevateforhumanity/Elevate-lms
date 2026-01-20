import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Activity, User, FileText, Settings, Shield, Clock,
  Search, Filter, Download, ChevronRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Activity Log | Admin | Elevate For Humanity',
  description: 'View system activity and audit logs.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function ActivityLogPage() {
  const supabase = await createClient();

  if (!supabase) {
    redirect('/login?redirect=/admin/activity');
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/admin/activity');
  }

  const activities = [
    {
      id: 1,
      user: { name: 'Admin User', email: 'admin@elevate.org', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
      action: 'Updated user role',
      target: 'Sarah Johnson',
      category: 'User Management',
      timestamp: '2 minutes ago',
      ip: '192.168.1.1',
    },
    {
      id: 2,
      user: { name: 'System', email: 'system@elevate.org', avatar: null },
      action: 'Enrollment completed',
      target: 'Barber Apprenticeship Program',
      category: 'Enrollment',
      timestamp: '15 minutes ago',
      ip: 'System',
    },
    {
      id: 3,
      user: { name: 'Staff Member', email: 'staff@elevate.org', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
      action: 'Created new course',
      target: 'HVAC Fundamentals',
      category: 'Course Management',
      timestamp: '1 hour ago',
      ip: '192.168.1.45',
    },
    {
      id: 4,
      user: { name: 'Admin User', email: 'admin@elevate.org', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
      action: 'Approved WIOA application',
      target: 'Marcus Williams',
      category: 'WIOA',
      timestamp: '2 hours ago',
      ip: '192.168.1.1',
    },
    {
      id: 5,
      user: { name: 'System', email: 'system@elevate.org', avatar: null },
      action: 'Certificate generated',
      target: 'CNA Certification - Emily Chen',
      category: 'Certificates',
      timestamp: '3 hours ago',
      ip: 'System',
    },
    {
      id: 6,
      user: { name: 'Staff Member', email: 'staff@elevate.org', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
      action: 'Updated program settings',
      target: 'CDL Training Program',
      category: 'Program Management',
      timestamp: '5 hours ago',
      ip: '192.168.1.45',
    },
  ];

  const categories = ['All Activity', 'User Management', 'Enrollment', 'Course Management', 'WIOA', 'Certificates', 'System'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'User Management': return User;
      case 'Enrollment': return FileText;
      case 'Course Management': return FileText;
      case 'WIOA': return Shield;
      case 'Certificates': return FileText;
      default: return Activity;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'User Management': return 'bg-blue-100 text-blue-700';
      case 'Enrollment': return 'bg-green-100 text-green-700';
      case 'Course Management': return 'bg-purple-100 text-purple-700';
      case 'WIOA': return 'bg-orange-100 text-orange-700';
      case 'Certificates': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-8 h-8 text-indigo-600" />
                <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
              </div>
              <p className="text-gray-600">Monitor system activity and audit trail</p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export Log
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search activity..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>All Categories</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>All time</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Activity List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {activities.map((activity, index) => {
              const Icon = getCategoryIcon(activity.category);
              return (
                <div key={activity.id} className={`p-4 hover:bg-gray-50 ${index !== activities.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {activity.user.avatar ? (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={activity.user.avatar}
                            alt={activity.user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Settings className="w-5 h-5 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-900">{activity.user.name}</span>
                        <span className="text-gray-500">{activity.action}</span>
                        <span className="font-medium text-indigo-600">{activity.target}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                          {activity.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.timestamp}
                        </span>
                        <span>IP: {activity.ip}</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-gray-600 text-sm">Showing 1-6 of 1,234 activities</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
