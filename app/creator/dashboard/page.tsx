import { Metadata } from 'next';
import Link from 'next/link';
import { Palette, BookOpen, Users, DollarSign, TrendingUp, Plus, Eye, Edit, BarChart3 } from 'lucide-react';

export const metadata: Metadata = { title: 'Creator Dashboard | Elevate LMS' };

export default function CreatorDashboardPage() {
  const stats = [
    { label: 'Total Courses', value: '12', icon: BookOpen },
    { label: 'Total Students', value: '3,456', icon: Users },
    { label: 'Revenue (MTD)', value: '$12,345', icon: DollarSign },
    { label: 'Avg Rating', value: '4.8', icon: TrendingUp },
  ];

  const courses = [
    { id: '1', title: 'Advanced HVAC Diagnostics', students: 456, revenue: 4567, rating: 4.9, status: 'published' },
    { id: '2', title: 'Electrical Safety Fundamentals', students: 312, revenue: 3234, rating: 4.7, status: 'published' },
    { id: '3', title: 'Refrigeration Systems', students: 234, revenue: 2345, rating: 4.8, status: 'published' },
    { id: '4', title: 'Heat Pump Installation', students: 0, revenue: 0, rating: 0, status: 'draft' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="w-8 h-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">Creator Studio</h1>
            </div>
            <Link href="/creator/courses/new" className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
              <Plus className="w-5 h-5" /> Create Course
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
            <Link href="/creator/courses" className="text-orange-600 hover:underline text-sm">View All</Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3">Course</th>
                <th className="pb-3 text-center">Students</th>
                <th className="pb-3 text-center">Rating</th>
                <th className="pb-3 text-right">Revenue</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="py-4 font-medium text-gray-900">{course.title}</td>
                  <td className="py-4 text-center text-gray-600">{course.students}</td>
                  <td className="py-4 text-center text-gray-600">{course.rating || '-'}</td>
                  <td className="py-4 text-right text-gray-900">${course.revenue.toLocaleString()}</td>
                  <td className="py-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-600 hover:text-orange-600"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-600 hover:text-purple-600"><BarChart3 className="w-4 h-4" /></button>
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
