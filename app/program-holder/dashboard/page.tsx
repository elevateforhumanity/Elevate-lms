'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, FileText, Download, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MOUStatusBadge, MOUStatusAlert } from '@/components/MOUStatusBadge';

type ProgramHolderData = {
  program_holder_id: string;
  program_holder_name: string;
  status: string;
  payout_share: number;
  mou_status: string;
  mou_signed_at: string | null;
  contact_name: string | null;
  contact_email: string | null;
};

export default function ProgramHolderDashboard() {
  const [data, setData] = useState<ProgramHolderData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/program-holder/mou-data');
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string; icon: any }> = {
      pending: { className: 'elevate-pill elevate-pill--warning', icon: Clock },
      approved: { className: 'elevate-pill elevate-pill--success', icon: CheckCircle2 },
      inactive: { className: 'elevate-pill', icon: AlertCircle },
    };
    const variant = variants[status] || variants.pending;
    const Icon = variant.icon;
    return (
      <span className={variant.className}>
        <Icon className="h-4 w-4" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getMouStatusBadge = (mouStatus: string) => {
    const colors: Record<string, string> = {
      not_sent: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      signed: 'bg-green-100 text-green-800',
    };
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${colors[mouStatus] || colors.not_sent}`}>
        <FileText className="h-4 w-4" />
        {mouStatus.replace('_', ' ').charAt(0).toUpperCase() + mouStatus.replace('_', ' ').slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Program Holder Profile</CardTitle>
            <CardDescription>
              You don't have a program holder profile yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/program-holder/apply')}>
              Apply to Become a Training Provider
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6 items-center">
          <a href="/program-holder/dashboard" className="text-red-600 font-semibold">Dashboard</a>
          <a href="/program-holder/cases" className="text-gray-700 hover:text-red-600 font-medium">Cases</a>
          <a href="/program-holder/mou" className="text-gray-700 hover:text-red-600 font-medium">MOU</a>
          <a href="/program-holder/reports" className="text-gray-700 hover:text-red-600 font-medium">Reports</a>
        </nav>
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
            {data.contact_name?.charAt(0) || 'P'}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="elevate-hero">
        <div className="elevate-hero-content">
          <div className="elevate-hero-kicker">Training Provider Portal</div>
          <h1 className="elevate-hero-title">Welcome back, {data.contact_name || 'Training Provider'}</h1>
          <p className="elevate-hero-subtitle">
            Manage your training programs and track your partnership with Elevate for Humanity
          </p>
        </div>
      </section>

      <main className="elevate-container py-8">

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-5">
          {/* Status Card */}
          <div className="elevate-card">
            <div className="elevate-card-header">
              <h2 className="elevate-card-title">Provider Status</h2>
            </div>
            <div className="space-y-3 mt-3">
              <div>
                <p className="text-xs text-slate-400 mb-1">Current Status</p>
                {getStatusBadge(data.status)}
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Organization</p>
                <p className="font-medium">{data.program_holder_name}</p>
              </div>
            </div>
          </div>

          {/* Revenue Share Card */}
          <div className="elevate-card">
            <div className="elevate-card-header">
              <h2 className="elevate-card-title">Revenue Share</h2>
            </div>
            <div className="space-y-3 mt-3">
              <div>
                <p className="text-xs text-slate-400 mb-1">Your Share</p>
                <p className="text-3xl font-bold text-orange-500">
                  {(data.payout_share * 100).toFixed(1)}%
                </p>
              </div>
              <p className="text-xs text-slate-400">
                Of net program revenue from participants you train
              </p>
            </div>
          </div>

          {/* MOU Status Card */}
          <div className="elevate-card">
            <div className="elevate-card-header">
              <h2 className="elevate-card-title">MOU Status</h2>
            </div>
            <div className="space-y-3 mt-3">
              <div>
                <p className="text-xs text-slate-400 mb-1">Agreement Status</p>
                <MOUStatusBadge status={data.mou_status} />
              </div>
              {data.mou_signed_at && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">Signed On</p>
                  <p className="text-sm font-medium">
                    {new Date(data.mou_signed_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MOU Action Card */}
        <div className="elevate-card">
          <div className="elevate-card-header mb-3">
            <div>
              <h2 className="elevate-card-title">Memorandum of Understanding (MOU)</h2>
              <p className="elevate-card-subtitle mt-1">
                Your legal agreement with Elevate for Humanity
              </p>
            </div>
          </div>
          <div>
            {data.mou_status === 'fully_executed' ? (
              <div className="space-y-4">
                <MOUStatusAlert status={data.mou_status} programHolderName={data.program_holder_name} />
                <div className="flex gap-3">
                  <a href="/api/program-holder/mou/download" target="_blank" className="elevate-btn-secondary">
                    <Download className="h-4 w-4" />
                    Download Signed MOU
                  </a>
                  <button onClick={() => router.push('/program-holder/cases')} className="elevate-btn-primary">
                    View Participant Cases
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <MOUStatusAlert status={data.mou_status} programHolderName={data.program_holder_name} />
                <div className="flex gap-3">
                  <a href="/api/program-holder/mou-pdf" target="_blank" className="elevate-btn-secondary">
                    <Download className="h-4 w-4" />
                    Download MOU (Preview)
                  </a>
                  <button onClick={() => router.push('/program-holder/mou')} className="elevate-btn-primary">
                    <FileText className="h-4 w-4" />
                    Sign MOU Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="elevate-card hover:border-orange-500/50 transition-all cursor-pointer" onClick={() => router.push('/program-holder/cases')}>
            <div className="text-center">
              <FileText className="h-7 w-7 mx-auto mb-2 text-orange-500" />
              <p className="font-medium">Participant Cases</p>
              <p className="text-xs text-slate-400 mt-1">Manage training cases</p>
            </div>
          </div>

          <div className="elevate-card hover:border-green-500/50 transition-all cursor-pointer" onClick={() => router.push('/program-holder/certificates')}>
            <div className="text-center">
              <CheckCircle2 className="h-7 w-7 mx-auto mb-2 text-green-500" />
              <p className="font-medium">Certificates</p>
              <p className="text-xs text-slate-400 mt-1">Issue completion certificates</p>
            </div>
          </div>

          <div className="elevate-card hover:border-blue-500/50 transition-all cursor-pointer" onClick={() => router.push('/program-holder/reports')}>
            <div className="text-center">
              <FileText className="h-7 w-7 mx-auto mb-2 text-blue-500" />
              <p className="font-medium">Reports</p>
                <p className="text-xs text-slate-400 mt-1">View performance reports</p>
            </div>
          </div>

          <div className="elevate-card hover:border-purple-500/50 transition-all cursor-pointer" onClick={() => router.push('/program-holder/settings')}>
            <div className="text-center">
              <AlertCircle className="h-7 w-7 mx-auto mb-2 text-purple-500" />
              <p className="font-medium">Settings</p>
              <p className="text-xs text-slate-400 mt-1">Update your profile</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
