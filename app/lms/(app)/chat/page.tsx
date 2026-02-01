import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.elevateforhumanity.org/lms/chat' },
  title: 'Chat | Elevate For Humanity',
  description: 'Connect with instructors and peers.',
};

export default async function ChatPage() {
  const supabase = await createClient();
  if (!supabase) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1></div></div>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <nav className="text-sm mb-4"><ol className="flex items-center space-x-2 text-gray-500"><li><Link href="/lms" className="hover:text-primary">LMS</Link></li><li>/</li><li className="text-gray-900 font-medium">Chat</li></ol></nav>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">Connect with instructors and classmates</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b"><input type="text" placeholder="Search conversations..." className="w-full border rounded-lg px-3 py-2 text-sm" /></div>
            <div className="divide-y">
              <div className="p-4 hover:bg-gray-50 cursor-pointer bg-blue-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><span className="text-blue-600 font-medium">JD</span></div>
                  <div className="flex-1 min-w-0"><p className="font-medium truncate">John Doe</p><p className="text-sm text-gray-500 truncate">Thanks for the help!</p></div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><span className="text-green-600 font-medium">SA</span></div>
                  <div className="flex-1 min-w-0"><p className="font-medium truncate">Sarah Adams</p><p className="text-sm text-gray-500 truncate">See you in class!</p></div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border flex flex-col h-[600px]">
            <div className="p-4 border-b"><p className="font-semibold">John Doe</p><p className="text-sm text-gray-500">Online</p></div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-start"><div className="bg-gray-100 rounded-lg p-3 max-w-xs"><p className="text-sm">Hey, can you help me with the assignment?</p></div></div>
                <div className="flex justify-end"><div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs"><p className="text-sm">Sure! What do you need help with?</p></div></div>
                <div className="flex justify-start"><div className="bg-gray-100 rounded-lg p-3 max-w-xs"><p className="text-sm">Thanks for the help!</p></div></div>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input type="text" placeholder="Type a message..." className="flex-1 border rounded-lg px-3 py-2" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
