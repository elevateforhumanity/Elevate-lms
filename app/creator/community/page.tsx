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
  } catch (error) {
    console.error('Error in CreatorCommunityPage:', error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Creator Community</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-slate-600 mb-6">
          Connect with other course creators, share best practices, and collaborate.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Discussion Forums</h3>
            <p className="text-slate-600 text-sm mb-4">
              Join conversations about course design, student engagement, and more.
            </p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Coming Soon →
            </button>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Resource Library</h3>
            <p className="text-slate-600 text-sm mb-4">
              Access templates, guides, and best practices for course creation.
            </p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Coming Soon →
            </button>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Events & Webinars</h3>
            <p className="text-slate-600 text-sm mb-4">
              Attend training sessions and networking events.
            </p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Coming Soon →
            </button>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
            <p className="text-slate-600 text-sm mb-4">
              Find partners for co-creating courses and content.
            </p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Coming Soon →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
