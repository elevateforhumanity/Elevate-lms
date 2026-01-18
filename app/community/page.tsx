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

  let memberCount = 1000;
  let events: any[] = [];

  if (supabase) {
    try {
      // Get member count from profiles
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      if (count) memberCount = count;

      // Get upcoming events
      const { data: eventData } = await supabase
        .from('events')
        .select('id, title, start_date, description')
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true })
        .limit(3);
      if (eventData) events = eventData;
    } catch (error) {
      console.error('[Community] Error:', error);
    }
  }

  const features = [
    { icon: Users, title: 'Networking', description: 'Connect with peers and mentors' },
    { icon: MessageSquare, title: 'Discussions', description: 'Share knowledge and ask questions' },
    { icon: Calendar, title: 'Events', description: 'Join workshops and meetups' },
    { icon: Award, title: 'Recognition', description: 'Earn badges and achievements' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-violet-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Community</h1>
          <p className="text-xl text-violet-100 max-w-2xl mb-8">
            Connect with {memberCount.toLocaleString()}+ members who share your passion for growth.
          </p>
          <Link href="/community/join" className="inline-flex items-center gap-2 bg-white text-violet-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Join the Community <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Discussion Forums</h2>
              <Link href="/community/discussions" className="text-violet-600 hover:underline text-sm">View All</Link>
            </div>
            <div className="space-y-4">
              <Link href="/community/discussions/general" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <h3 className="font-medium text-gray-900">General Discussion</h3>
                <p className="text-sm text-gray-500 mt-1">Chat about anything related to your learning journey</p>
              </Link>
              <Link href="/community/discussions/career" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <h3 className="font-medium text-gray-900">Career Advice</h3>
                <p className="text-sm text-gray-500 mt-1">Get tips and share experiences about job hunting</p>
              </Link>
              <Link href="/community/discussions/study-groups" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <h3 className="font-medium text-gray-900">Study Groups</h3>
                <p className="text-sm text-gray-500 mt-1">Find study partners and form groups</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
              <Link href="/events" className="text-violet-600 hover:underline text-sm">View All</Link>
            </div>
            {events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event: any) => (
                  <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No upcoming events scheduled.</p>
            )}
          </div>
        </div>

        <div className="mt-12 bg-violet-600 rounded-2xl p-8 text-center text-white">
          <Heart className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready to Connect?</h2>
          <p className="text-violet-100 mb-6 max-w-xl mx-auto">
            Join our community and start connecting with fellow learners and professionals.
          </p>
          <Link href="/community/join" className="inline-block bg-white text-violet-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
