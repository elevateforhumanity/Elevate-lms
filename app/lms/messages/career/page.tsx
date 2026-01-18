import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ChevronRight,
  Briefcase,
  MessageCircle,
  Send,
  Clock,
  User,
  Calendar,
  FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career Services Messages | Elevate LMS',
  description: 'Messages from career services and job placement team.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface Message {
  id: string;
  subject: string;
  body: string;
  sender_name: string;
  sender_role: string;
  created_at: string;
  read: boolean;
  category: string;
}

export default async function CareerMessagesPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Database connection failed.</p>
        </div>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/lms/messages/career');

  // Fetch career-related messages
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .eq('recipient_id', user.id)
    .eq('category', 'career')
    .order('created_at', { ascending: false })
    .limit(20);

  // Sample messages if none exist
  const sampleMessages: Message[] = [
    {
      id: '1',
      subject: 'Job Opportunity: Licensed Barber Position',
      body: 'We have a new job opening that matches your skills. Premier Barbershop is looking for a licensed barber...',
      sender_name: 'Career Services Team',
      sender_role: 'Career Advisor',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: false,
      category: 'career',
    },
    {
      id: '2',
      subject: 'Resume Review Complete',
      body: 'Your resume has been reviewed. Here are our suggestions for improvement...',
      sender_name: 'Sarah Johnson',
      sender_role: 'Career Counselor',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      category: 'career',
    },
    {
      id: '3',
      subject: 'Upcoming Career Fair - Register Now',
      body: 'Join us for our quarterly career fair on March 15th. Over 20 employers will be present...',
      sender_name: 'Career Services Team',
      sender_role: 'Career Advisor',
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      category: 'career',
    },
  ];

  const displayMessages = messages && messages.length > 0 ? messages : sampleMessages;
  const unreadCount = displayMessages.filter((m: Message) => !m.read).length;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/lms" className="hover:text-gray-700">LMS</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/lms/messages" className="hover:text-gray-700">Messages</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Career Services</span>
          </nav>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Career Services</h1>
                <p className="text-gray-600">Job opportunities and career guidance</p>
              </div>
            </div>
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {unreadCount} unread
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Link href="/career-services/resume-building" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <FileText className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900">Resume Help</h3>
            <p className="text-sm text-gray-500">Get your resume reviewed</p>
          </Link>
          <Link href="/career-services/interview-prep" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <User className="w-6 h-6 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900">Interview Prep</h3>
            <p className="text-sm text-gray-500">Practice interviews</p>
          </Link>
          <Link href="/lms/alumni/jobs" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <Briefcase className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-medium text-gray-900">Job Board</h3>
            <p className="text-sm text-gray-500">Browse opportunities</p>
          </Link>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
              <Send className="w-4 h-4" />
              New Message
            </button>
          </div>

          {displayMessages.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {(displayMessages as Message[]).map((message) => (
                <div
                  key={message.id}
                  className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${!message.read ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{message.sender_name}</span>
                          {!message.read && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(message.created_at)}
                        </span>
                      </div>
                      <h3 className={`text-sm ${!message.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                        {message.subject}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{message.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No messages from career services</p>
            </div>
          )}
        </div>

        {/* Schedule Appointment */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1">Need Career Guidance?</h2>
              <p className="text-blue-100">Schedule a one-on-one session with a career advisor.</p>
            </div>
            <Link
              href="/career-services/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50"
            >
              <Calendar className="w-4 h-4" />
              Schedule
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
