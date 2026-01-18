import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ChevronRight,
  HeadphonesIcon,
  MessageCircle,
  Send,
  Clock,
  User,
  HelpCircle,
  FileText,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support Messages | Elevate LMS',
  description: 'Messages from support team and help desk.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface SupportTicket {
  id: string;
  subject: string;
  body: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
  last_response: string | null;
}

export default async function SupportMessagesPage() {
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
  if (!user) redirect('/login?next=/lms/messages/support');

  // Fetch support tickets
  const { data: tickets } = await supabase
    .from('customer_service_tickets')
    .select('*')
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20);

  // Sample tickets
  const sampleTickets: SupportTicket[] = [
    {
      id: '1',
      subject: 'Unable to access course materials',
      body: 'I\'m having trouble accessing the video lectures in Module 3...',
      status: 'in_progress',
      priority: 'high',
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      last_response: 'Our team is looking into this issue. We\'ll update you shortly.',
    },
    {
      id: '2',
      subject: 'Payment confirmation not received',
      body: 'I made a payment yesterday but haven\'t received confirmation...',
      status: 'resolved',
      priority: 'normal',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      last_response: 'Your payment has been confirmed. Receipt sent to your email.',
    },
    {
      id: '3',
      subject: 'Question about certification exam',
      body: 'When can I schedule my certification exam?',
      status: 'closed',
      priority: 'low',
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      last_response: 'You can schedule your exam after completing all course modules.',
    },
  ];

  const displayTickets = tickets && tickets.length > 0 ? tickets : sampleTickets;
  const openCount = displayTickets.filter((t: SupportTicket) => t.status === 'open' || t.status === 'in_progress').length;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
      open: { label: 'Open', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
      in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700', icon: Clock },
      resolved: { label: 'Resolved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      closed: { label: 'Closed', color: 'bg-gray-100 text-gray-700', icon: CheckCircle },
    };
    const { label, color, icon: Icon } = config[status] || config.open;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${color}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
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
            <span className="text-gray-900 font-medium">Support</span>
          </nav>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
                <p className="text-gray-600">Get help with technical issues and questions</p>
              </div>
            </div>
            {openCount > 0 && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {openCount} active
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Help */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <Link href="/help" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-center">
            <HelpCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900 text-sm">Help Center</h3>
          </Link>
          <Link href="/help/tutorials" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-center">
            <FileText className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900 text-sm">Tutorials</h3>
          </Link>
          <a href="tel:+13175551234" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-center">
            <Phone className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900 text-sm">Call Us</h3>
          </a>
          <a href="mailto:support@elevateforhumanity.org" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-center">
            <Mail className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900 text-sm">Email</h3>
          </a>
        </div>

        {/* Support Tickets */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
            <Link
              href="/support/ticket"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Send className="w-4 h-4" />
              New Ticket
            </Link>
          </div>

          {displayTickets.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {(displayTickets as SupportTicket[]).map((ticket) => (
                <div key={ticket.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{ticket.subject}</h3>
                    {getStatusBadge(ticket.status)}
                  </div>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{ticket.body}</p>
                  {ticket.last_response && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-gray-500 mb-1">Latest Response:</p>
                      <p className="text-sm text-gray-700">{ticket.last_response}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Created: {formatDate(ticket.created_at)}</span>
                    <span>Updated: {formatDate(ticket.updated_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No support tickets</p>
              <Link
                href="/support/ticket"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-2 inline-block"
              >
                Create your first ticket
              </Link>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Support Hours</h3>
              <p className="text-sm text-gray-600">Monday - Friday: 8 AM - 8 PM EST</p>
              <p className="text-sm text-gray-600">Saturday: 9 AM - 5 PM EST</p>
              <p className="text-sm text-gray-600">Sunday: Closed</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Emergency Support</h3>
              <p className="text-sm text-gray-600">For urgent issues outside business hours:</p>
              <p className="text-sm text-purple-600 font-medium">emergency@elevateforhumanity.org</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
