import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Calendar, MessageSquare, Award, ChevronRight } from 'lucide-react';

export const metadata: Metadata = { 
  title: 'Mentor Dashboard | Elevate for Humanity',
  description: 'Manage your mentees, schedule sessions, and track your mentoring progress.',
};

export default function MentorDashboardPage() {
  const stats = [
    { label: 'Active Mentees', value: '8', icon: Users },
    { label: 'Sessions This Month', value: '24', icon: Calendar },
    { label: 'Messages', value: '12', icon: MessageSquare },
    { label: 'Avg Rating', value: '4.9', icon: Award },
  ];

  const upcomingSessions = [
    { id: '1', mentee: 'John Smith', date: 'Today', time: '2:00 PM', topic: 'Career Planning' },
    { id: '2', mentee: 'Maria Garcia', date: 'Tomorrow', time: '10:00 AM', topic: 'Resume Review' },
  ];

  const recentMentees = [
    { id: '1', name: 'John Smith', program: 'HVAC', progress: 75, lastSession: '2 days ago' },
    { id: '2', name: 'Maria Garcia', program: 'Medical Assistant', progress: 45, lastSession: '1 week ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Mentor Dashboard</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Sessions</h2>
              <Link href="/mentor/sessions" className="text-teal-600 hover:underline text-sm">View All</Link>
            </div>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{session.mentee}</p>
                    <p className="text-sm text-gray-500">{session.topic}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{session.date}</p>
                    <p className="text-sm text-gray-500">{session.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">My Mentees</h2>
              <Link href="/mentor/mentees" className="text-teal-600 hover:underline text-sm">View All</Link>
            </div>
            <div className="space-y-4">
              {recentMentees.map((mentee) => (
                <div key={mentee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-teal-600 font-medium">{mentee.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{mentee.name}</p>
                      <p className="text-sm text-gray-500">{mentee.program}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${mentee.progress}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600">{mentee.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Link href="/mentor/mentees" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-teal-600" />
                <span className="font-semibold text-gray-900">Manage Mentees</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
          <Link href="/mentor/sessions" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-teal-600" />
                <span className="font-semibold text-gray-900">Schedule Sessions</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
          <Link href="/mentor/resources" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-teal-600" />
                <span className="font-semibold text-gray-900">Resources</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
