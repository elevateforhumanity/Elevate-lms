import { Metadata } from 'next';
import Link from 'next/link';
import { LayoutDashboard, Users, BookOpen, DollarSign, TrendingUp, Settings, Bell, BarChart3, Shield } from 'lucide-react';

export const metadata: Metadata = { title: 'Admin Dashboard | Elevate LMS' };

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Users', value: '12,456', change: '+8%', icon: Users },
    { label: 'Active Courses', value: '156', change: '+12', icon: BookOpen },
    { label: 'Revenue (MTD)', value: '$234,567', change: '+15%', icon: DollarSign },
    { label: 'Completion Rate', value: '87%', change: '+3%', icon: TrendingUp },
  ];

  const quickLinks = [
    { title: 'User Management', icon: Users, href: '/admin/users', description: 'Manage users and permissions' },
    { title: 'Course Management', icon: BookOpen, href: '/admin/courses', description: 'Manage courses and content' },
    { title: 'Analytics', icon: BarChart3, href: '/admin/analytics', description: 'View detailed reports' },
    { title: 'Settings', icon: Settings, href: '/admin/settings', description: 'System configuration' },
  ];

  const recentActivity = [
    { action: 'New user registered', user: 'John Smith', time: '5 min ago' },
    { action: 'Course completed', user: 'Maria Garcia', time: '15 min ago' },
    { action: 'Payment received', user: 'James Wilson', time: '1 hour ago' },
    { action: 'Support ticket opened', user: 'Sarah Johnson', time: '2 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-red-500" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-white">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link href="/admin/settings" className="p-2 text-gray-400 hover:text-white">
                <Settings className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <Link key={index} href={link.href} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <link.icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{link.title}</p>
                      <p className="text-sm text-gray-500">{link.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">System Overview</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-16 h-16 text-gray-300" />
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/admin/activity" className="block text-center text-blue-600 hover:underline text-sm mt-4">
                View All Activity
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
