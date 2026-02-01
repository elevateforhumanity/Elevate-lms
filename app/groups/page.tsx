import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, Plus, Search, MessageSquare, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Study Groups | Elevate For Humanity',
  description: 'Join study groups to collaborate with fellow learners.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const sampleGroups = [
  { name: 'Healthcare Fundamentals', members: 24, category: 'Healthcare', active: true },
  { name: 'CDL Test Prep', members: 18, category: 'Transportation', active: true },
  { name: 'CNA Study Group', members: 32, category: 'Healthcare', active: true },
  { name: 'IT Certification Prep', members: 15, category: 'Technology', active: false },
];

export default async function GroupsPage() {
  const supabase = await createClient();
  if (!supabase) redirect('/login');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?redirect=/groups');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Study Groups' }]} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" /> Study Groups
          </h1>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search groups..." className="pl-10 pr-4 py-2 border rounded-lg" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-5 h-5" /> Create Group
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {sampleGroups.map((group, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{group.name}</h3>
                  <p className="text-gray-500 text-sm">{group.category}</p>
                </div>
                {group.active && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {group.members} members</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> Chat</span>
              </div>
              <button className="w-full py-2 border rounded-lg text-blue-600 hover:bg-blue-50">Join Group</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
