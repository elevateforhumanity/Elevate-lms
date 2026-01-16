import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Users, MessageSquare, Calendar, Award, ArrowRight, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community | Elevate For Humanity',
  description: 'Join our vibrant community of learners, mentors, and professionals.',
};

export const dynamic = 'force-dynamic';

export default async function CommunityPage() {
  const supabase = await createClient();

  const { count: memberCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  const { data: discussions } = await supabase
    .from('discussions')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(5);

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('event_type', 'community')
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-violet-600 to-violet-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Community</h1>
          <p className="text-xl text-violet-100 max-w-2xl mb-8">
            Connect with {memberCount || 1000}+ members who share your passion for growth.
          </p>
          <Link href="/community/join" className="inline-flex items-center gap-2 bg-white text-violet-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Join the Community <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Users className="w-10 h-10 text-violet-600 mx-auto mb-3" />
            <div className="text-2xl font-bold">{memberCount || 1000}+</div>
            <div className="text-gray-600 text-sm">Community Members</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <MessageSquare className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold">500+</div>
            <div className="text-gray-600 text-sm">Discussions</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Calendar className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold">50+</div>
            <div className="text-gray-600 text-sm">Events Per Year</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Heart className="w-10 h-10 text-pink-600 mx-auto mb-3" />
            <div className="text-2xl font-bold">100%</div>
            <div className="text-gray-600 text-sm">Supportive</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Discussions</h2>
            <div className="space-y-4">
              {discussions && discussions.length > 0 ? discussions.map((disc: any) => (
                <div key={disc.id} className="bg-white rounded-lg shadow-sm border p-4">
                  <h3 className="font-semibold mb-1">{disc.title}</h3>
                  <p className="text-gray-600 text-sm">{disc.excerpt}</p>
                </div>
              )) : (
                <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-500">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <p>Start a discussion!</p>
                  <Link href="/community/discussions/new" className="text-violet-600 font-medium hover:underline">Create Post</Link>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {events && events.length > 0 ? events.map((event: any) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-center gap-2 text-violet-600 text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.start_date).toLocaleDateString()}
                  </div>
                  <h3 className="font-semibold">{event.title}</h3>
                </div>
              )) : (
                <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-500">
                  <Calendar className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <p>No upcoming events</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
