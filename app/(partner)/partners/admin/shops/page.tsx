import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminShopsPage() {
  let shops: any[] = [];
  
  try {
    const supabase = await createClient();
    const result = await supabase
      .from('shops')
      .select('*')
      .order('created_at', { ascending: false });
    
    shops = result.data || [];
  } catch (error) {
    console.error('Failed to fetch shops:', error);
  }

  return (
    <div className="rounded-2xl border p-5">
      <div className="font-semibold">Admin: Shops</div>
      <div className="text-sm text-gray-600 mt-1">
        Approve and manage partner locations.
      </div>

      <div className="mt-4 overflow-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Status</th>
              <th className="py-2">City</th>
              <th className="py-2">Created</th>
              <th className="py-2">ID</th>
            </tr>
          </thead>
          <tbody>
            {shops.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No shops found
                </td>
              </tr>
            ) : (
              shops.map((s: any) => (
                <tr key={s.id} className="border-b">
                  <td className="py-2">{s.name}</td>
                  <td className="py-2">{s.active ? 'Active' : 'Inactive'}</td>
                  <td className="py-2">{s.city ?? '-'}</td>
                  <td className="py-2">
                    {new Date(s.created_at).toLocaleString()}
                  </td>
                  <td className="py-2">{s.id}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
