export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

<<<<<<< HEAD
=======
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { SupabaseRequired } from '@/components/system/SupabaseRequired';

>>>>>>> ac589be (Fix redirect loop and replace all generic images)
export const metadata: Metadata = {
  title: 'Job Postings | Elevate for Humanity',
  description: 'Manage your job postings',
};

export default async function EmployerPostingsPage() {
<<<<<<< HEAD
  let user = null;
  let postings: any[] | null = null;
=======
  const supabase = await createClient();
  
  // Handle missing Supabase configuration
  if (!supabase) {
    return <SupabaseRequired />;
  }
  
  const { data: { user } } = await supabase.auth.getUser();
>>>>>>> ac589be (Fix redirect loop and replace all generic images)

  try {
    const supabase = await createClient();
    
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      
      if (!authError && authData.user) {
        user = authData.user;
        
        const { data, error: queryError } = await supabase
          .from('job_postings')
          .select('*')
          .eq('employer_id', user.id)
          .order('created_at', { ascending: false });
        
        if (!queryError) {
          postings = data;
        }
      }
    } catch (innerError) {
      console.error('Inner error in EmployerPostingsPage:', innerError);
    }
  } catch (outerError) {
    console.error('Outer error in EmployerPostingsPage:', outerError);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Postings</h1>
      </div>

      {!user ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-900 mb-4">
            Please log in to view and manage your job postings.
          </p>
          <a
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log In
          </a>
        </div>
      ) : !postings || postings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-slate-600 mb-4">No job postings yet.</p>
          <p className="text-slate-500 text-sm">Job posting feature coming soon.</p>
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
