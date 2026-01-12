import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'AI Course Generator | Admin',
};

export default async function CourseGeneratorPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin' && profile?.role !== 'super_admin')
    redirect('/unauthorized');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Course Generator</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-black mb-4">
            Generate complete courses using AI
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Course Topic
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g., HVAC Fundamentals"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Duration (weeks)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="8"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Skill Level
              </label>
              <select className="w-full px-4 py-2 border rounded-lg">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
