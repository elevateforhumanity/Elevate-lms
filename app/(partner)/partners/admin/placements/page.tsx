import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partners Admin Placements | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminPlacementsPage() {
  let data: any[] = [];
  
  try {
    const supabase = await createClient();
    const result = await supabase
      .from('apprentice_placements')
      .select('*')
      .order('created_at', { ascending: false });
    
    data = result.data || [];
  } catch (error) {
    console.error('Failed to fetch placements:', error);
  }

  return (
    <div className="rounded-2xl border p-5">
      <div className="font-semibold">Admin: Placements</div>
      <div className="text-sm text-black mt-1">
        All students assigned to partner locations.
      </div>

      <div className="mt-4 overflow-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Shop</th>
              <th className="py-2">Student</th>
              <th className="py-2">Program</th>
              <th className="py-2">Status</th>
              <th className="py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No placements found
                </td>
              </tr>
            ) : (
              data.map((p: any) => (
                <tr key={p.id} className="border-b">
                  <td className="py-2">{p.shop_id}</td>
                  <td className="py-2">{p.student_id}</td>
                  <td className="py-2">{p.program_slug}</td>
                  <td className="py-2">{p.status}</td>
                  <td className="py-2">
                    {new Date(p.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
