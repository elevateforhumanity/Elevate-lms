'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Download, CheckCircle2, XCircle, Clock } from 'lucide-react';

type ProgramHolder = {
  id: string;
  name: string;
  owner_email: string;
  status: string;
  payout_share: number;
  mou_status: string;
  mou_signed_at: string | null;
  mou_holder_signed_at: string | null;
  mou_final_pdf_url: string | null;
  created_at: string;
  contact_name: string | null;
  contact_email: string | null;
  phone: string | null;
  training_focus: string | null;
};

export default function AdminProgramHolders() {
  const [holders, setHolders] = useState<ProgramHolder[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/program-holders');
      const data = await res.json();
      setHolders(data || []);
    } catch (error) {
      console.error('Failed to load:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/admin/program-holders/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      await load();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const updateMouStatus = async (id: string, mouStatus: string) => {
    try {
      await fetch('/api/admin/program-holders/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, mou_status: mouStatus })
      });
      await load();
    } catch (error) {
      alert('Failed to update MOU status');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string; icon: any }> = {
      pending: { className: 'elevate-pill elevate-pill--warning', icon: Clock },
      approved: { className: 'elevate-pill elevate-pill--success', icon: CheckCircle2 },
      inactive: { className: 'elevate-pill', icon: XCircle },
    };
    const variant = variants[status] || variants.pending;
    const Icon = variant.icon;
    return (
      <span className={variant.className}>
        <Icon className="h-3 w-3" />
        {status}
      </span>
    );
  };

  const getMouBadge = (mouStatus: string) => {
    const classNames: Record<string, string> = {
      not_sent: 'elevate-pill',
      pending: 'elevate-pill elevate-pill--warning',
      sent: 'elevate-pill elevate-pill--info',
      signed_by_holder: 'elevate-pill elevate-pill--warning',
      fully_executed: 'elevate-pill elevate-pill--success',
    };
    return (
      <span className={classNames[mouStatus] || classNames.not_sent}>
        {mouStatus.replace(/_/g, ' ')}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6 items-center">
          <a href="/admin/dashboard" className="text-gray-700 hover:text-red-600 font-medium">Dashboard</a>
          <a href="/admin/program-holders" className="text-red-600 font-semibold">Program Holders</a>
          <a href="/admin/students" className="text-gray-700 hover:text-red-600 font-medium">Students</a>
          <a href="/admin/reports" className="text-gray-700 hover:text-red-600 font-medium">Reports</a>
        </nav>
        <div className="flex gap-3 items-center">
          <button onClick={load} disabled={loading} className="elevate-btn-secondary">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
            A
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="elevate-hero">
        <div className="elevate-hero-content">
          <div className="elevate-hero-kicker">Admin Portal</div>
          <h1 className="elevate-hero-title">Program Holders Management</h1>
          <p className="elevate-hero-subtitle">
            Review applications, approve training providers, and manage MOUs
          </p>
        </div>
      </section>

      <main className="elevate-container py-8">

        <div className="elevate-card">
          <div className="elevate-card-header mb-4">
            <h2 className="elevate-card-title">{holders.length} Training Providers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="elevate-table">
              <thead>
                <tr>
                  <th>Organization</th>
                  <th>Contact</th>
                  <th>Training Focus</th>
                  <th>Status</th>
                  <th>Payout Share</th>
                  <th>MOU Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
                <tbody>
                  {holders.length > 0 ? (
                    holders.map(h => (
                      <tr key={h.id}>
                        <td>
                          <div>
                            <div className="font-medium">{h.name}</div>
                            <div className="text-xs text-slate-400">
                              Applied: {new Date(h.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="text-xs">
                            <div>{h.contact_name || h.owner_email}</div>
                            <div className="text-slate-400">{h.contact_email || h.owner_email}</div>
                            {h.phone && <div className="text-slate-400">{h.phone}</div>}
                          </div>
                        </td>
                        <td>
                          <div className="text-xs max-w-xs">
                            {h.training_focus || '—'}
                          </div>
                        </td>
                        <td>
                          {getStatusBadge(h.status)}
                        </td>
                        <td>
                          <div className="text-xs">
                            {(h.payout_share * 100).toFixed(1)}%
                          </div>
                        </td>
                        <td>
                          {getMouBadge(h.mou_status)}
                          {h.mou_holder_signed_at && (
                            <div className="text-xs text-slate-400 mt-1">
                              Holder signed: {new Date(h.mou_holder_signed_at).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-col gap-1">
                            {h.status === 'pending' && (
                              <button
                                onClick={() => updateStatus(h.id, 'approved')}
                                className="elevate-btn-primary text-xs py-1 px-2"
                              >
                                Approve
                              </button>
                            )}
                            {h.status === 'approved' && (
                              <button
                                onClick={() => updateStatus(h.id, 'inactive')}
                                className="elevate-btn-secondary text-xs py-1 px-2"
                              >
                                Deactivate
                              </button>
                            )}
                            {h.mou_status === 'not_sent' && (
                              <a 
                                href={`/api/admin/program-holders/mou?id=${h.id}`} 
                                target="_blank"
                                className="elevate-btn-secondary text-xs py-1 px-2 flex items-center gap-1"
                              >
                                <Download className="h-3 w-3" />
                                MOU
                              </a>
                            )}
                            {h.mou_status === 'signed_by_holder' && (
                              <a 
                                href={`/admin/program-holders/${h.id}/countersign-mou`}
                                className="elevate-btn-primary text-xs py-1 px-2"
                              >
                                Countersign MOU
                              </a>
                            )}
                            {h.mou_status === 'fully_executed' && h.mou_final_pdf_url && (
                              <a 
                                href={`/api/admin/storage/signature?path=${h.mou_final_pdf_url}`} 
                                target="_blank"
                                className="elevate-btn-secondary text-xs py-1 px-2 flex items-center gap-1"
                              >
                                <Download className="h-3 w-3" />
                                Final MOU
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        {loading ? 'Loading...' : 'No program holders yet'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
  );
}
