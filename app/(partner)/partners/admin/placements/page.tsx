import { createClient } from '@/lib/supabase/server';

export default async function AdminPlacementsPage() {
  const supabase = await createClient();
  const { data }: any = await supabase
    .from('apprentice_placements')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="rounded-2xl border p-5">
      <div className="font-semibold">Admin: Placements</div>
      <div className="text-sm text-gray-600 mt-1">
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
            {(data ?? []).map((p: unknown) => (
              <tr key={p.id} className="border-b">
                <td className="py-2">{p.shop_id}</td>
                <td className="py-2">{p.student_id}</td>
                <td className="py-2">{p.program_slug}</td>
                <td className="py-2">{p.status}</td>
                <td className="py-2">
                  {new Date(p.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
