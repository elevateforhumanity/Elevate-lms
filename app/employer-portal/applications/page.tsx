import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FileText, Search, Filter, Clock, CheckCircle, XCircle,
  Eye, MessageSquare, Calendar, Star, MapPin, ChevronRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Applications | Employer Portal | Elevate For Humanity',
  description: 'Review and manage job applications from candidates.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function ApplicationsPage() {
  const supabase = await createClient();

  if (!supabase) {
    redirect('/login?redirect=/employer-portal/applications');
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/employer-portal/applications');
  }

  const applications = [
    {
      id: 1,
      candidate: { name: 'Sarah Johnson', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
      position: 'Certified Nursing Assistant',
      status: 'New',
      appliedDate: '2 hours ago',
      rating: 4.8,
      location: 'Indianapolis, IN',
    },
    {
      id: 2,
      candidate: { name: 'Marcus Williams', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' },
      position: 'Licensed Barber',
      status: 'Reviewed',
      appliedDate: '1 day ago',
      rating: 4.9,
      location: 'Chicago, IL',
    },
    {
      id: 3,
      candidate: { name: 'Emily Chen', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
      position: 'HVAC Technician',
      status: 'Interview',
      appliedDate: '3 days ago',
      rating: 4.7,
      location: 'Detroit, MI',
    },
    {
      id: 4,
      candidate: { name: 'David Thompson', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
      position: 'CDL Driver',
      status: 'Offered',
      appliedDate: '1 week ago',
      rating: 4.6,
      location: 'Columbus, OH',
    },
    {
      id: 5,
      candidate: { name: 'Jessica Martinez', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg' },
      position: 'Medical Assistant',
      status: 'Rejected',
      appliedDate: '2 weeks ago',
      rating: 4.2,
      location: 'Louisville, KY',
    },
  ];

  const statusColors: Record<string, string> = {
    'New': 'bg-blue-100 text-blue-700',
    'Reviewed': 'bg-yellow-100 text-yellow-700',
    'Interview': 'bg-purple-100 text-purple-700',
    'Offered': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-100 text-red-700',
  };

  const stats = [
    { label: 'Total', count: 47, color: 'text-gray-900' },
    { label: 'New', count: 12, color: 'text-blue-600' },
    { label: 'In Review', count: 18, color: 'text-yellow-600' },
    { label: 'Interview', count: 8, color: 'text-purple-600' },
    { label: 'Offered', count: 5, color: 'text-green-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          </div>
          <p className="text-gray-600">Review and manage applications from candidates</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-8 overflow-x-auto">
            {stats.map((stat, index) => (
              <button key={index} className="flex items-center gap-2 whitespace-nowrap">
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.count}</span>
                <span className="text-gray-500">{stat.label}</span>
              </button>
            ))}
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
                placeholder="Search applications..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>All Status</option>
                <option>New</option>
                <option>Reviewed</option>
                <option>Interview</option>
                <option>Offered</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>All Positions</option>
                <option>CNA</option>
                <option>Barber</option>
                <option>HVAC Tech</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Applications List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {applications.map((app, index) => (
              <div key={app.id} className={`flex items-center gap-4 p-4 hover:bg-gray-50 ${index !== applications.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={app.candidate.image}
                    alt={app.candidate.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{app.candidate.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{app.position}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {app.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      {app.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {app.appliedDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg" title="View">
                    <Eye className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg" title="Message">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg" title="Schedule">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </button>
                  <Link
                    href={`/employer-portal/applications/${app.id}`}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
