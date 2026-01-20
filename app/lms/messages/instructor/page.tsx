import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ChevronRight,
  GraduationCap,
  MessageCircle,
  Send,
  Clock,
  User,
  BookOpen,
  Video,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instructor Messages | Elevate LMS',
  description: 'Messages from your course instructors.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface Message {
  id: string;
  subject: string;
  body: string;
  sender_name: string;
  course_name: string | null;
  created_at: string;
  read: boolean;
}

interface Instructor {
  id: string;
  name: string;
  course: string;
  avatar_url: string | null;
  last_active: string;
}

export default async function InstructorMessagesPage() {
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
  if (!user) redirect('/login?next=/lms/messages/instructor');

  // Fetch instructor messages
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .eq('recipient_id', user.id)
    .eq('category', 'instructor')
    .order('created_at', { ascending: false })
    .limit(20);

  // Sample messages
  const sampleMessages: Message[] = [
    {
      id: '1',
      subject: 'Assignment Feedback: Week 3 Practical',
      body: 'Great work on your practical assignment! I noticed your technique has improved significantly...',
      sender_name: 'Marcus Thompson',
      course_name: 'Barbering Fundamentals',
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '2',
      subject: 'Upcoming Live Session - Don\'t Miss It',
      body: 'Reminder: We have a live Q&A session scheduled for tomorrow at 2 PM EST...',
      sender_name: 'Dr. Angela Martinez',
      course_name: 'Medical Assistant Certification',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '3',
      subject: 'Course Update: New Module Available',
      body: 'A new module on advanced techniques has been added to your course. Please review...',
      sender_name: 'James Wilson',
      course_name: 'HVAC Technician Training',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ];

  const sampleInstructors: Instructor[] = [
    {
      id: '1',
      name: 'Marcus Thompson',
      course: 'Barbering Fundamentals',
      avatar_url: null,
      last_active: 'Online now',
    },
    {
      id: '2',
      name: 'Dr. Angela Martinez',
      course: 'Medical Assistant Certification',
      avatar_url: null,
      last_active: '2 hours ago',
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
            <span className="text-gray-900 font-medium">Instructors</span>
          </nav>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Instructor Messages</h1>
                <p className="text-gray-600">Communication with your course instructors</p>
              </div>
            </div>
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {unreadCount} unread
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Messages */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg">
                  <Send className="w-4 h-4" />
                  New Message
                </button>
              </div>

              {displayMessages.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {(displayMessages as Message[]).map((message) => (
                    <div
                      key={message.id}
                      className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${!message.read ? 'bg-green-50/50' : ''}`}
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
                                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(message.created_at)}
                            </span>
                          </div>
                          {message.course_name && (
                            <p className="text-xs text-green-600 mb-1">{message.course_name}</p>
                          )}
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
                  <p className="text-gray-500">No messages from instructors</p>
                </div>
              )}
            </div>
          </div>

          {/* Instructors Sidebar */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Your Instructors</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {sampleInstructors.map((instructor) => (
                  <div key={instructor.id} className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        {instructor.last_active === 'Online now' && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{instructor.name}</p>
                        <p className="text-xs text-gray-500">{instructor.course}</p>
                        <p className="text-xs text-green-600">{instructor.last_active}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 px-3 py-1.5 text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
                        Message
                      </button>
                      <button className="px-3 py-1.5 text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
                        <Video className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link href="/lms/courses" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <BookOpen className="w-4 h-4" />
                  My Courses
                </Link>
                <Link href="/lms/schedule" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <Clock className="w-4 h-4" />
                  Class Schedule
                </Link>
                <Link href="/lms/assignments" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <GraduationCap className="w-4 h-4" />
                  Assignments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
