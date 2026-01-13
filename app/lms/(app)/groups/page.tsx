export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  alternates: { canonical: 'https://elevateforhumanity.institute/lms/groups' },
  title: 'Study Groups | LMS | Elevate For Humanity',
  description: 'Join study groups and collaborate with fellow learners.',
};

export default async function GroupsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/lms/groups');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Study Groups</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['General Discussion', 'Study Partners', 'Career Support', 'Technical Help'].map((group) => (
              <div key={group} className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-2">{group}</h2>
                <p className="text-gray-600 text-sm mb-4">Connect with learners interested in {group.toLowerCase()}</p>
                <button className="text-brand-blue-600 hover:text-brand-blue-700 font-medium text-sm">Join Group →</button>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/lms/community" className="text-brand-blue-600 hover:text-brand-blue-700">← Back to Community</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
