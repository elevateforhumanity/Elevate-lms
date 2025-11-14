'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, RefreshCw, Users, TrendingUp, Clock, Award } from 'lucide-react';

type Row = {
  user_id: string;
  course_id: string;
  learner: string;
  email: string;
  course: string;
  start_date: string;
  minutes: number;
  percent: number;
  status: string;
  certificate_id: string | null;
};

type Totals = {
  learners: number;
  avgProgress: number;
  minutes: number;
  completed: number;
};

export default function ProgramDashboard({ params }: { params: { code: string } }) {
  const code = (params.code || 'WRG').toUpperCase();
  const [rows, setRows] = useState<Row[]>([]);
  const [totals, setTotals] = useState<Totals>({
    learners: 0,
    avgProgress: 0,
    minutes: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/funding/admin/report?code=${code}`);
      if (response.ok) {
        const data = await response.json();
        setRows(data.rows || []);
        setTotals(data.totals || { learners: 0, avgProgress: 0, minutes: 0, completed: 0 });
      }
    } catch (error) {
      console.error('Failed to load report:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [code]);

  const exportCSV = () => {
    const headers = ['Learner', 'Email', 'Course', 'Start Date', 'Minutes', 'Progress %', 'Status', 'Certificate'];
    const csvRows = [
      headers.join(','),
      ...rows.map((r) =>
        [
          `"${r.learner}"`,
          r.email,
          `"${r.course}"`,
          r.start_date,
          r.minutes,
          r.percent,
          r.status,
          r.certificate_id || '',
        ].join(',')
      ),
    ];
    const csv = csvRows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${code}_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <Badge className="bg-green-600">Completed</Badge>;
      case 'active':
        return <Badge className="bg-blue-600">Active</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">{code} Dashboard</h1>
              <p className="text-muted-foreground">Program performance and learner progress</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={exportCSV} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={load} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totals.learners}</div>
              <p className="text-xs text-muted-foreground">Enrolled in program</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totals.avgProgress.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Average completion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Minutes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totals.minutes.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round(totals.minutes / 60)} hours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completions</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totals.completed}</div>
              <p className="text-xs text-muted-foreground">
                {totals.learners > 0
                  ? `${Math.round((totals.completed / totals.learners) * 100)}% completion rate`
                  : 'No learners yet'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Learners Table */}
        <Card>
          <CardHeader>
            <CardTitle>Learner Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Learner</th>
                      <th className="text-left py-3 px-4 font-semibold">Course</th>
                      <th className="text-left py-3 px-4 font-semibold">Started</th>
                      <th className="text-right py-3 px-4 font-semibold">Minutes</th>
                      <th className="text-right py-3 px-4 font-semibold">Progress</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Certificate</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length > 0 ? (
                      rows.map((row, index) => (
                        <tr key={index} className="border-t hover:bg-secondary/50">
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">{row.learner}</div>
                              <div className="text-sm text-muted-foreground">{row.email}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{row.course}</td>
                          <td className="py-3 px-4">{row.start_date}</td>
                          <td className="py-3 px-4 text-right">{row.minutes}</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{ width: `${Math.min(row.percent, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{row.percent}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{getStatusBadge(row.status)}</td>
                          <td className="py-3 px-4">
                            {row.certificate_id ? (
                              <Link
                                href={`/cert/verify/${row.certificate_id}`}
                                className="text-primary hover:underline text-sm"
                              >
                                {row.certificate_id}
                              </Link>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {row.status?.toLowerCase() !== 'completed' ? (
                              <Button
                                size="sm"
                                onClick={async () => {
                                  const body = { user_id: row.user_id, course_id: row.course_id };
                                  const res = await fetch('/api/cert/issue', {
                                    method: 'POST',
                                    body: JSON.stringify(body),
                                    headers: { 'Content-Type': 'application/json' }
                                  });
                                  if (res.ok) {
                                    const j = await res.json();
                                    alert(`Certificate issued: ${j.serial}`);
                                    load();
                                  } else {
                                    alert('Failed to issue certificate');
                                  }
                                }}
                              >
                                Complete + Cert
                              </Button>
                            ) : row.certificate_id ? (
                              <a
                                className="text-primary hover:underline text-sm"
                                href={`/api/cert/pdf?serial=${row.certificate_id}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                PDF
                              </a>
                            ) : (
                              <span className="text-muted-foreground">Completed</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-muted-foreground">
                          {loading ? 'Loading...' : 'No learners enrolled yet'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
