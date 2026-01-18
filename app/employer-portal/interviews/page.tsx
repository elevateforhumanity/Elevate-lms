import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, Clock, Video, MapPin, User, Plus,
  ChevronLeft, ChevronRight, MoreVertical
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interviews | Employer Portal | Elevate For Humanity',
  description: 'Schedule and manage candidate interviews.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function InterviewsPage() {
  const supabase = await createClient();

  if (!supabase) {
    redirect('/login?redirect=/employer-portal/interviews');
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/employer-portal/interviews');
  }

  const upcomingInterviews = [
    {
      id: 1,
      candidate: { name: 'Sarah Johnson', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
      position: 'Certified Nursing Assistant',
      date: 'Today',
      time: '2:00 PM',
      type: 'Video Call',
      status: 'Confirmed',
    },
    {
      id: 2,
      candidate: { name: 'Marcus Williams', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' },
      position: 'Licensed Barber',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'In-Person',
      status: 'Pending',
    },
    {
      id: 3,
      candidate: { name: 'Emily Chen', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
      position: 'HVAC Technician',
      date: 'Jan 22',
      time: '3:30 PM',
      type: 'Video Call',
      status: 'Confirmed',
    },
  ];

  const pastInterviews = [
    {
      id: 4,
      candidate: { name: 'David Thompson', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
      position: 'CDL Driver',
      date: 'Jan 15',
      outcome: 'Offered',
    },
    {
      id: 5,
      candidate: { name: 'Jessica Martinez', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg' },
      position: 'Medical Assistant',
      date: 'Jan 12',
      outcome: 'Declined',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-8 h-8 text-purple-600" />
                <h1 className="text-3xl font-bold text-gray-900">Interviews</h1>
              </div>
              <p className="text-gray-600">Schedule and manage candidate interviews</p>
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
              <Plus className="w-5 h-5" />
              Schedule Interview
            </button>
          </div>
        </div>
      </section>

      {/* Calendar Navigation */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold">January 2025</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-purple-100 text-purple-700 font-medium rounded-lg">Day</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded-lg">Week</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded-lg">Month</button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Interviews */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h3>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={interview.candidate.image}
                          alt={interview.candidate.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{interview.candidate.name}</h4>
                        <p className="text-gray-600 text-sm">{interview.position}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {interview.date}
                          </span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <Clock className="w-4 h-4" />
                            {interview.time}
                          </span>
                          <span className="flex items-center gap-1 text-gray-500">
                            {interview.type === 'Video Call' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                            {interview.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        interview.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {interview.status}
                      </span>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    {interview.type === 'Video Call' && (
                      <button className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Join Call
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Interviews */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Interviews</h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {pastInterviews.map((interview, index) => (
                <div key={interview.id} className={`p-4 ${index !== pastInterviews.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={interview.candidate.image}
                        alt={interview.candidate.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{interview.candidate.name}</p>
                      <p className="text-gray-500 text-sm">{interview.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      interview.outcome === 'Offered' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {interview.outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
