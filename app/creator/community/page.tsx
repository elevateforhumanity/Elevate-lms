export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';


export const metadata: Metadata = {
  title: 'Creator Community | Elevate for Humanity',
  description: 'Connect with other course creators',
};

export default async function CreatorCommunityPage() {
  let user = null;

  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    user = authData.user;
  } catch (error) { /* Error handled silently */ }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Creator Community</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-black mb-6">
          Connect with other course creators, share best practices, and collaborate.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Discussion Forums</h3>
            <p className="text-black text-sm mb-4">
              Join conversations about course design, student engagement, and more.
            </p>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-slate-500">Recent Topics:</div>
              <div className="text-sm">• Best practices for video content</div>
              <div className="text-sm">• Increasing student engagement</div>
              <div className="text-sm">• Course pricing strategies</div>
            </div>
            <a href="/creator/community/forums" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
              View Forums →
            </a>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Resource Library</h3>
            <p className="text-black text-sm mb-4">
              Access templates, guides, and best practices for course creation.
            </p>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-slate-500">Available Resources:</div>
              <div className="text-sm">• Course outline templates</div>
              <div className="text-sm">• Video production guides</div>
              <div className="text-sm">• Marketing materials</div>
            </div>
            <a href="/creator/community/resources" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
              Browse Resources →
            </a>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Events & Webinars</h3>
            <p className="text-black text-sm mb-4">
              Attend training sessions and networking events.
            </p>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-slate-500">Upcoming Events:</div>
              <div className="text-sm">• Monthly Creator Meetup</div>
              <div className="text-sm">• Course Design Workshop</div>
              <div className="text-sm">• Marketing Masterclass</div>
            </div>
            <a href="/creator/community/events" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
              View Events →
            </a>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
            <p className="text-black text-sm mb-4">
              Find partners for co-creating courses and content.
            </p>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-slate-500">Collaboration Opportunities:</div>
              <div className="text-sm">• Co-create courses</div>
              <div className="text-sm">• Guest instructor spots</div>
              <div className="text-sm">• Content partnerships</div>
            </div>
            <a href="/creator/community/collaborate" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
              Find Partners →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
