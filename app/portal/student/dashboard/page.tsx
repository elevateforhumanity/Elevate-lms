'use client';

import Link from 'next/link';
import { BookOpen, Clock, Award, Calendar, TrendingUp, Bell, ChevronRight } from 'lucide-react';

const mockData = {
  student: { name: 'Marcus Johnson', program: 'CNA Certification', startDate: '2025-11-15' },
  progress: 75,
  hoursCompleted: 60,
  hoursTotal: 80,
  nextClass: { title: 'Clinical Skills Lab', date: '2026-01-21', time: '9:00 AM' },
  upcomingAssignments: [
    { id: 1, title: 'Patient Care Assessment', due: '2026-01-22', type: 'Quiz' },
    { id: 2, title: 'Vital Signs Practice Log', due: '2026-01-25', type: 'Assignment' },
  ],
  recentActivity: [
    { id: 1, action: 'Completed lesson', item: 'Infection Control', time: '2 hours ago' },
    { id: 2, action: 'Passed quiz', item: 'Patient Safety', time: 'Yesterday' },
    { id: 3, action: 'Attended class', item: 'Clinical Rotation', time: '2 days ago' },
  ],
};

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {mockData.student.name.split(' ')[0]}!</h1>
          <p className="text-gray-600">{mockData.student.program} • Started {mockData.student.startDate}</p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Progress</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{mockData.progress}%</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${mockData.progress}%` }} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Hours</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{mockData.hoursCompleted}/{mockData.hoursTotal}</p>
            <p className="text-sm text-gray-500 mt-1">{mockData.hoursTotal - mockData.hoursCompleted} hours remaining</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Badges</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-500 mt-1">2 more to unlock</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-gray-500">Next Class</span>
            </div>
            <p className="font-semibold text-gray-900">{mockData.nextClass.title}</p>
            <p className="text-sm text-gray-500 mt-1">{mockData.nextClass.date} at {mockData.nextClass.time}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Continue Learning</h2>
              <Link href="/lms/courses" className="text-blue-600 hover:text-blue-700 text-sm">View All →</Link>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Current Module</p>
                  <h3 className="text-xl font-bold mt-1">Clinical Skills & Patient Care</h3>
                  <p className="text-blue-100 mt-2">Lesson 8 of 12 • 45 min remaining</p>
                </div>
                <BookOpen className="w-12 h-12 text-blue-200" />
              </div>
              <Link href="/lms/courses" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50">
                Continue <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <h3 className="font-medium text-gray-900 mt-6 mb-3">Upcoming Assignments</h3>
            <div className="space-y-3">
              {mockData.upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{assignment.title}</p>
                    <p className="text-sm text-gray-500">Due {assignment.due}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{assignment.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {mockData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div>
                    <p className="text-gray-900">{activity.action}: <span className="font-medium">{activity.item}</span></p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-medium text-gray-900 mt-6 mb-3">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/lms/schedule" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">📅 View Schedule</Link>
              <Link href="/lms/grades" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">📊 Check Grades</Link>
              <Link href="/lms/resources" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">📚 Study Resources</Link>
              <Link href="/lms/help" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">💬 Get Help</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
