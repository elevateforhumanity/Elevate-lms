import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Building2, Users, Clock, FileText, Settings, ChevronRight, Scissors, Heart, Wrench, Truck } from 'lucide-react';

export const metadata: Metadata = { title: 'Partner Dashboard | Elevate for Humanity' };

const PROGRAM_ICONS: Record<string, React.ElementType> = { barber: Scissors, cosmetology: Scissors, cna: Heart, hvac: Wrench, cdl: Truck };
const PROGRAM_COLORS: Record<string, string> = { barber: 'bg-purple-600', cosmetology: 'bg-pink-600', cna: 'bg-red-600', hvac: 'bg-blue-600', cdl: 'bg-amber-600' };
const PROGRAM_NAMES: Record<string, string> = { barber: 'Barber Apprenticeship', cosmetology: 'Cosmetology', cna: 'CNA/Healthcare', hvac: 'HVAC', cdl: 'CDL/Transportation' };

export default async function PartnerDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?redirect=/partner/dashboard');

  const { data: partnerUser } = await supabase.from('partner_users').select('*, partners(*)').eq('user_id', user.id).eq('status', 'active').single();
  if (!partnerUser?.partners) redirect('/unauthorized?reason=not_partner');

  // Check partner account status - redirect to documents if not active
  const partnerData = partnerUser.partners as { id: string; name: string; city: string; state: string; apprentice_capacity: number; account_status?: string };
  if (partnerData.account_status && partnerData.account_status !== 'active') {
    redirect('/partner/documents');
  }

  const partner = partnerData;
  const { data: programAccess } = await supabase.from('partner_program_access').select('*').eq('partner_id', partner.id).is('revoked_at', null);
  const programs = programAccess || [];

  const { data: apprenticeships } = await supabase.from('apprenticeships').select('program_id').eq('partner_id', partner.id).eq('status', 'active');
  const apprenticeCountByProgram: Record<string, number> = {};
  (apprenticeships || []).forEach((a: { program_id: string }) => { apprenticeCountByProgram[a.program_id] = (apprenticeCountByProgram[a.program_id] || 0) + 1; });

  const { data: recentProgress } = await supabase.from('progress_entries').select('*, profiles:apprentice_id(full_name)').eq('partner_id', partner.id).order('created_at', { ascending: false }).limit(5);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center"><Building2 className="w-7 h-7 text-purple-600" /></div>
            <div><h1 className="text-2xl font-bold text-slate-900">{partner.name}</h1><p className="text-slate-500">{partner.city}, {partner.state}</p></div>
          </div>
          <Link href="/partner/settings" className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"><Settings className="w-5 h-5" />Settings</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200"><div className="flex items-center gap-3 mb-2"><Users className="w-5 h-5 text-purple-600" /><span className="text-sm text-slate-500">Active Apprentices</span></div><p className="text-3xl font-bold text-slate-900">{Object.values(apprenticeCountByProgram).reduce((a, b) => a + b, 0)}</p></div>
          <div className="bg-white rounded-xl p-6 border border-slate-200"><div className="flex items-center gap-3 mb-2"><FileText className="w-5 h-5 text-blue-600" /><span className="text-sm text-slate-500">Programs</span></div><p className="text-3xl font-bold text-slate-900">{programs.length}</p></div>
          <div className="bg-white rounded-xl p-6 border border-slate-200"><div className="flex items-center gap-3 mb-2"><Clock className="w-5 h-5 text-green-600" /><span className="text-sm text-slate-500">Capacity</span></div><p className="text-3xl font-bold text-slate-900">{partner.apprentice_capacity}</p></div>
        </div>

        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Your Programs</h2>
          {programs.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200"><FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" /><p className="text-slate-500">No programs assigned yet.</p></div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {programs.map((program: { id: string; program_id: string; can_view_apprentices: boolean; can_enter_progress: boolean }) => {
                const Icon = PROGRAM_ICONS[program.program_id] || FileText;
                const color = PROGRAM_COLORS[program.program_id] || 'bg-slate-600';
                const name = PROGRAM_NAMES[program.program_id] || program.program_id;
                const count = apprenticeCountByProgram[program.program_id] || 0;
                return (
                  <Link key={program.id} href={`/partner/programs/${program.program_id}`} className="bg-white rounded-xl p-6 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between mb-4"><div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}><Icon className="w-6 h-6 text-white" /></div><ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600" /></div>
                    <h3 className="font-bold text-slate-900 mb-1">{name}</h3>
                    <p className="text-sm text-slate-500">{count} active apprentice{count !== 1 ? 's' : ''}</p>
                    <div className="mt-4 flex gap-2">{program.can_view_apprentices && <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">View</span>}{program.can_enter_progress && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Enter Progress</span>}</div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Progress Entries</h2>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {!recentProgress || recentProgress.length === 0 ? (
              <div className="p-8 text-center"><Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" /><p className="text-slate-500">No progress entries yet</p></div>
            ) : (
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200"><tr><th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">Apprentice</th><th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">Program</th><th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">Week</th><th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">Hours</th><th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">Status</th></tr></thead>
                <tbody className="divide-y divide-slate-200">
                  {recentProgress.map((entry: { id: string; profiles: { full_name?: string } | null; program_id: string; week_ending: string; hours_worked: number; status: string }) => (
                    <tr key={entry.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-900">{entry.profiles?.full_name || 'Unknown'}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{PROGRAM_NAMES[entry.program_id] || entry.program_id}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{new Date(entry.week_ending).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{entry.hours_worked}</td>
                      <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded-full ${entry.status === 'verified' ? 'bg-green-100 text-green-700' : entry.status === 'submitted' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>{entry.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
