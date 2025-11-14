'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';

type Row = {
  learner: string;
  email: string;
  course: string;
  start_date: string;
  minutes: number;
  percent: number;
  status: string;
  last_login: string | null;
  ph_name: string | null;
  case_status: string | null;
  case_note: string | null;
};

export default function AdminReports() {
  const [rows, setRows] = useState<Row[]>([]);
  const [program, setProgram] = useState('ALL');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (program !== 'ALL') params.set('code', program);
      if (from) params.set('from', from);
      if (to) params.set('to', to);
      const r = await fetch(`/api/reports/usage?${params.toString()}`);
      const data = await r.json();
      setRows(data || []);
    } catch (error) {
      console.error('Failed to load:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const exportUrl = () => {
    const params = new URLSearchParams({
      code: program === 'ALL' ? '' : program,
      from: from || '',
      to: to || '',
      format: 'csv'
    });
    return `/api/reports/usage?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Workforce Training Reports</h1>
        <p className="text-muted-foreground mb-8">
          View participant activity, training progress, and case notes across all funding programs
        </p>

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
                <option value="ALL">All Programs</option>
                <option>WRG</option>
                <option>WIOA</option>
                <option>JRI</option>
                <option>EMPLOYINDY</option>
                <option>DOL</option>
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
                <a href={exportUrl()} download>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Participant Training Activity Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-3 px-4 font-semibold">Participant</th>
                    <th className="py-3 px-4 font-semibold">Training Track</th>
                    <th className="py-3 px-4 font-semibold">Start Date</th>
                    <th className="py-3 px-4 font-semibold">Training Minutes</th>
                    <th className="py-3 px-4 font-semibold">Progress %</th>
                    <th className="py-3 px-4 font-semibold">Training Status</th>
                    <th className="py-3 px-4 font-semibold">Last LMS Login</th>
                    <th className="py-3 px-4 font-semibold">Training Provider</th>
                    <th className="py-3 px-4 font-semibold">Case Status</th>
                    <th className="py-3 px-4 font-semibold">Most Recent Case Note</th>
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
                        <td className="py-3 px-4">{r.start_date}</td>
                        <td className="py-3 px-4">{r.minutes}</td>
                        <td className="py-3 px-4">{r.percent}%</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            r.status === 'completed' ? 'bg-green-100 text-green-800' :
                            r.status === 'active' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {r.status === 'completed' ? 'Completed' :
                             r.status === 'active' ? 'Active' :
                             r.status === 'dropped' ? 'Withdrawn' : r.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {r.last_login ? new Date(r.last_login).toLocaleDateString() : '—'}
                        </td>
                        <td className="py-3 px-4">{r.ph_name || '—'}</td>
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="py-12 text-center text-muted-foreground">
                        {loading ? 'Loading...' : 'No data found'}
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
