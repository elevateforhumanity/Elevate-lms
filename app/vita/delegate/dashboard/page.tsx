import { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, Users, FileText, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'VITA Delegate Dashboard | Elevate For Humanity',
  description: 'Dashboard for VITA program delegates and coordinators.',
};

export default function VITADelegateDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">VITA Delegate Dashboard</h1>
          <p className="text-gray-600">Manage your VITA site and volunteer activities.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold mb-1">Returns Filed</h3>
            <p className="text-3xl font-bold text-blue-600">--</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Users className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold mb-1">Volunteers</h3>
            <p className="text-3xl font-bold text-green-600">--</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <FileText className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold mb-1">Pending Reviews</h3>
            <p className="text-3xl font-bold text-purple-600">--</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Calendar className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-semibold mb-1">Appointments</h3>
            <p className="text-3xl font-bold text-orange-600">--</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/login"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Sign In to Access Dashboard
            </Link>
            <Link
              href="/vita"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
            >
              Back to VITA Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
