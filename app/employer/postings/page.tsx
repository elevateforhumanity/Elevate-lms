import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

import Link from 'next/link';
import { Plus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Job Postings | Elevate for Humanity',
  description: 'Manage your job postings',
};

export default async function EmployerPostingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: postings } = await supabase
    .from('job_postings')
    .select('*')
    .eq('employer_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Postings</h1>
        <Link
          href="/employer/postings/new"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          New Posting
        </Link>
      </div>

      {!postings || postings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-slate-600 mb-4">No job postings yet.</p>
          <Link
            href="/employer/postings/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Create Your First Posting
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {postings.map((posting) => (
            <div key={posting.id} className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold mb-2">{posting.title}</h3>
              <p className="text-slate-600 mb-4">{posting.description}</p>
              <div className="flex gap-4 text-sm text-slate-500">
                <span>Status: {posting.status}</span>
                <span>Applications: {posting.application_count || 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
