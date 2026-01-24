'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Phone, 
  MapPin,
  Users,
  ArrowLeft,
  Loader2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PartnerApplication {
  id: string;
  shop_name: string;
  dba: string | null;
  owner_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  programs_requested: string[];
  apprentice_capacity: number;
  status: 'pending' | 'approved' | 'denied';
  created_at: string;
  schedule_notes: string | null;
  additional_notes: string | null;
  license_number: string | null;
}

const PROGRAM_NAMES: Record<string, string> = {
  barber: 'Barber Apprenticeship',
  cosmetology: 'Cosmetology',
  cna: 'CNA/Healthcare',
  hvac: 'HVAC',
  cdl: 'CDL/Transportation',
};

export default function AdminPartnersPage() {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'denied'>('pending');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);
  const [denyReason, setDenyReason] = useState('');
  const [showDenyModal, setShowDenyModal] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/partner/applications?status=${filter}`);
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (applicationId: string) => {
    setProcessing(applicationId);
    try {
      const res = await fetch(`/api/partner/applications/${applicationId}/approve`, {
        method: 'POST',
      });
      
      if (res.ok) {
        fetchApplications();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to approve application');
      }
    } catch (error) {
      console.error('Failed to approve:', error);
      alert('Failed to approve application');
    } finally {
      setProcessing(null);
    }
  };

  const handleDeny = async (applicationId: string) => {
    if (!denyReason.trim()) {
      alert('Please provide a reason for denial');
      return;
    }

    setProcessing(applicationId);
    try {
      const res = await fetch(`/api/partner/applications/${applicationId}/deny`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: denyReason }),
      });
      
      if (res.ok) {
        setShowDenyModal(null);
        setDenyReason('');
        fetchApplications();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to deny application');
      }
    } catch (error) {
      console.error('Failed to deny:', error);
      alert('Failed to deny application');
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-purple-600" />
            Partner Shop Applications
          </h1>
        </div>

        <div className="flex gap-2 mb-6">
          {(['pending', 'approved', 'denied'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === status
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status === 'pending' && <Clock className="w-4 h-4 inline mr-2" />}
              {status === 'approved' && <CheckCircle className="w-4 h-4 inline mr-2" />}
              {status === 'denied' && <XCircle className="w-4 h-4 inline mr-2" />}
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No {filter} applications</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div 
                  className="p-6 cursor-pointer hover:bg-slate-50"
                  onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{app.shop_name}</h3>
                        <p className="text-sm text-slate-500">{app.owner_name} • {app.city}, {app.state}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-wrap gap-1">
                        {app.programs_requested.map(p => (
                          <span key={p} className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">
                            {PROGRAM_NAMES[p] || p}
                          </span>
                        ))}
                      </div>
                      {expandedId === app.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </div>
                  </div>
                </div>

                {expandedId === app.id && (
                  <div className="border-t border-slate-200 p-6 bg-slate-50">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Contact</h4>
                        <p className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-slate-400" />{app.email}</p>
                        <p className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-slate-400" />{app.phone}</p>
                        <p className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-slate-400" />{app.city}, {app.state}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Capacity</h4>
                        <p className="flex items-center gap-2 text-sm"><Users className="w-4 h-4 text-slate-400" />{app.apprentice_capacity} apprentice(s)</p>
                        {app.license_number && <p className="text-sm">License: {app.license_number}</p>}
                      </div>
                    </div>

                    {filter === 'pending' && (
                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={() => handleApprove(app.id)}
                          disabled={processing === app.id}
                          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                        >
                          {processing === app.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                          Approve
                        </button>
                        <button
                          onClick={() => setShowDenyModal(app.id)}
                          className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                        >
                          <XCircle className="w-4 h-4" />
                          Deny
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {showDenyModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Deny Application</h3>
              <textarea
                value={denyReason}
                onChange={(e) => setDenyReason(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                rows={4}
                placeholder="Reason for denial..."
              />
              <div className="flex gap-3 mt-4">
                <button onClick={() => { setShowDenyModal(null); setDenyReason(''); }} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>
                <button onClick={() => handleDeny(showDenyModal)} disabled={processing === showDenyModal} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50">
                  {processing === showDenyModal ? 'Processing...' : 'Confirm Deny'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
