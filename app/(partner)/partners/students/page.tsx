import { createClient } from '@/lib/supabase/server';
import { getMyPartnerContext } from '@/lib/partner/access';

export default async function PartnerStudentsPage() {
  const supabase = await createClient();
  const ctx = await getMyPartnerContext();
  const shopIds = (ctx?.shops ?? []).map((s: unknown) => s.shop_id);

  const { data: placements } = await supabase
    .from('apprentice_placements')
    .select(
      'id, shop_id, student_id, program_slug, status, start_date, end_date, created_at'
    )
    .in(
      'shop_id',
      shopIds.length ? shopIds : ['00000000-0000-0000-0000-000000000000']
    )
    .order('created_at', { ascending: false });

  return (
    <div className="rounded-2xl border p-5">
      <div className="font-semibold">Students</div>
      <div className="text-sm text-gray-600 mt-1">
        Placements tied to your location(s).
      </div>

      <div className="mt-4 overflow-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Program</th>
              <th className="py-2">Student ID</th>
              <th className="py-2">Status</th>
              <th className="py-2">Start</th>
              <th className="py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {(placements ?? []).map((p: unknown) => (
              <tr key={p.id} className="border-b">
                <td className="py-2">{p.program_slug}</td>
                <td className="py-2">{p.student_id}</td>
                <td className="py-2">{p.status}</td>
                <td className="py-2">{p.start_date ?? '-'}</td>
                <td className="py-2">
                  {new Date(p.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {(placements ?? []).length === 0 && (
              <tr>
                <td className="py-3 text-gray-600" colSpan={5}>
                  No placements found for your shop(s) yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
