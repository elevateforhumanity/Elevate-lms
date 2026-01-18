import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MessageSquare, Send, Inbox, Archive, Search, Plus } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/messages',
  },
  title: 'Messages | Elevate For Humanity',
  description: 'View and manage your messages.',
};

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  const supabase = await createClient();
  if (!supabase) { redirect("/login"); }
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/messages');
  }

  // Get user's messages
  const { data: messages } = await supabase
    .from('messages')
    .select(`
      id,
      subject,
      content,
      is_read,
      created_at,
      sender:sender_id(id, full_name, avatar_url)
    `)
    .eq('recipient_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20);

  // Get unread count
  const { count: unreadCount } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('recipient_id', user.id)
    .eq('is_read', false);

  // Get conversations
  const { data: conversations } = await supabase
    .from('conversations')
    .select(`
      id,
      updated_at,
      participants:conversation_participants(
        user:user_id(id, full_name, avatar_url)
      )
    `)
    .contains('participant_ids', [user.id])
    .order('updated_at', { ascending: false })
    .limit(10);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Messages</h1>
              {unreadCount && unreadCount > 0 && (
                <p className="text-gray-600">{unreadCount} unread messages</p>
              )}
            </div>
            <Link
              href="/messages/new"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              New Message
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <nav className="space-y-2">
                <Link
                  href="/messages"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium"
                >
                  <Inbox className="w-5 h-5" />
                  Inbox
                  {unreadCount && unreadCount > 0 && (
                    <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/messages/sent"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <Send className="w-5 h-5" />
                  Sent
                </Link>
                <Link
                  href="/messages/archived"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <Archive className="w-5 h-5" />
                  Archived
                </Link>
              </nav>
            </div>
          </div>

          {/* Messages List */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-xl shadow-sm border divide-y">
              {messages && messages.length > 0 ? (
                messages.map((message: any) => (
                  <Link
                    key={message.id}
                    href={`/messages/${message.id}`}
                    className={`block p-4 hover:bg-gray-50 transition ${
                      !message.is_read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        {message.sender?.avatar_url ? (
                          <img
                            src={message.sender.avatar_url}
                            alt={message.sender.full_name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <MessageSquare className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-medium ${!message.is_read ? 'text-black' : 'text-gray-700'}`}>
                            {message.sender?.full_name || 'Unknown'}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(message.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className={`font-medium mb-1 ${!message.is_read ? 'text-black' : 'text-gray-600'}`}>
                          {message.subject}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No messages yet</p>
                  <Link
                    href="/messages/new"
                    className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                  >
                    Send your first message
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
