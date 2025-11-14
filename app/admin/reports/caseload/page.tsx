'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type Row = {
  user_id: string;
  learner: string;
  email: string;
  course: string;
  program_code: string;
  enroll_status: string;
  case_status: string | null;
  case_note: string | null;
  last_note_at: string | null;
  program_holder: string | null;
};

export default function CaseloadPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [program, setProgram] = useState('WRG');
  const [status, setStatus] = useState('Behind');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (program) params.set('program', program);
      if (status) params.set('status', status);
      if (from) params.set('from', from);
      if (to) params.set('to', to);
      const r = await fetch(`/api/reports/caseload?${params.toString()}`);
      const data = await r.json();
      setRows(data || []);
    } catch (error) {
      console.error('Failed to load:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const csvUrl = () => {
    const params = new URLSearchParams();
    if (program) params.set('program', program);
    if (status) params.set('status', status);
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    params.set('format', 'csv');
    return `/api/reports/caseload?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin/reports">
              ← Back to Reports
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Caseload Management Report</h1>
          <p className="text-muted-foreground">
            Filter participants by case status and funding program for targeted intervention and outreach
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <select
                value={program}
                onChange={e => setProgram(e.target.value)}
                className="border rounded px-3 py-2"
                disabled={loading}
              >
                <option value="">All Programs</option>
                <option>WRG</option>
                <option>WIOA</option>
                <option>JRI</option>
                <option>EMPLOYINDY</option>
                <option>DOL</option>
              </select>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="border rounded px-3 py-2"
                disabled={loading}
              >
                <option value="">All Case Status</option>
                <option>On Track</option>
                <option>Behind</option>
                <option>Dropped</option>
              </select>
              <input
                type="date"
                value={from}
                onChange={e => setFrom(e.target.value)}
                className="border rounded px-3 py-2"
                placeholder="From date"
                disabled={loading}
              />
              <input
                type="date"
                value={to}
                onChange={e => setTo(e.target.value)}
                className="border rounded px-3 py-2"
                placeholder="To date"
                disabled={loading}
              />
              <Button onClick={load} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" asChild>
                <a href={csvUrl()} download>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>
              {rows.length} Participant{rows.length !== 1 ? 's' : ''} Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-3 px-4 font-semibold">Participant</th>
                    <th className="py-3 px-4 font-semibold">Training Track</th>
                    <th className="py-3 px-4 font-semibold">Funding Program</th>
                    <th className="py-3 px-4 font-semibold">Training Status</th>
                    <th className="py-3 px-4 font-semibold">Case Status</th>
                    <th className="py-3 px-4 font-semibold">Most Recent Case Note</th>
                    <th className="py-3 px-4 font-semibold">Training Provider</th>
                    <th className="py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length > 0 ? (
                    rows.map((r, i) => (
                      <tr key={i} className="border-b hover:bg-secondary/50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{r.learner}</div>
                            <div className="text-xs text-muted-foreground">{r.email}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{r.course}</td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                            {r.program_code}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            r.enroll_status === 'completed' ? 'bg-green-100 text-green-800' :
                            r.enroll_status === 'active' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {r.enroll_status === 'completed' ? 'Completed' :
                             r.enroll_status === 'active' ? 'Active' :
                             r.enroll_status === 'dropped' ? 'Withdrawn' : r.enroll_status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {r.case_status ? (
                            <span className={`inline-block px-2 py-1 rounded text-xs ${
                              r.case_status === 'On Track' ? 'bg-green-100 text-green-800' :
                              r.case_status === 'Behind' ? 'bg-yellow-100 text-yellow-800' :
                              r.case_status === 'Dropped' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {r.case_status === 'Behind' ? 'At Risk' :
                               r.case_status === 'Dropped' ? 'Not Engaged' :
                               r.case_status}
                            </span>
                          ) : '—'}
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          {r.case_note ? (
                            <span className="text-xs" title={r.case_note}>
                              {r.case_note.slice(0, 80)}
                              {r.case_note.length > 80 ? '…' : ''}
                            </span>
                          ) : '—'}
                        </td>
                        <td className="py-3 px-4">{r.program_holder || '—'}</td>
                        <td className="py-3 px-4">
                          <Link
                            href={`/admin/learner/${r.user_id}`}
                            className="text-primary hover:underline text-xs flex items-center gap-1"
                          >
                            Timeline
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-muted-foreground">
                        {loading ? 'Loading...' : 'No participants found matching filters'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
