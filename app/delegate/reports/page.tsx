'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus } from 'lucide-react';

type Row = {
  user_id: string;
  course_id: string;
  learner: string;
  email: string;
  course: string;
  status: string;
  last_status: string | null;
  last_note: string | null;
  last_note_at: string | null;
  follow_up_date: string | null;
  follow_up_done: boolean;
};

export default function DelegateReports() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [programHolderStatus, setProgramHolderStatus] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      // Check program holder status first
      const statusRes = await fetch('/api/program-holder/status');
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setProgramHolderStatus(statusData.status);
      }

      const r = await fetch('/api/reports/usage/delegate');
      const data = await r.json();
      setRows(data || []);
    } catch (error) {
      console.error('Failed to load:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const addNote = async (r: Row) => {
    const status = prompt('Status (On Track, Behind, Dropped, etc.):', r.last_status || '') || '';
    const note = prompt('Add a quick note:', r.last_note || '') || '';
    const follow_up_date = prompt('Follow-up date (YYYY-MM-DD) or leave blank:', r.follow_up_date || '') || '';
    
    if (!status && !note && !follow_up_date) return;
    
    setLoading(true);
    try {
      await fetch('/api/delegate/notes/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: r.user_id,
          course_id: r.course_id,
          status,
          note,
          follow_up_date: follow_up_date || null
        })
      });
      await load();
    } catch (error) {
      alert('Failed to add note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Training Provider Portal</h1>
        <p className="text-muted-foreground mb-8">
          View your participants, track training activity, and document case notes for compliance reporting.
        </p>

        {programHolderStatus === 'pending' && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">Application Under Review</h3>
            <p className="text-sm text-yellow-800">
              Your Training Provider application is currently under review by the Elevate team. 
              You'll receive an email notification once your application is approved and you can begin 
              receiving participant assignments.
            </p>
          </div>
        )}

        {programHolderStatus === 'inactive' && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">Account Inactive</h3>
            <p className="text-sm text-red-800">
              Your Training Provider account is currently inactive. Please contact the Elevate admin team 
              for more information.
            </p>
          </div>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Participants</CardTitle>
              <Button onClick={load} disabled={loading} variant="outline" size="sm">
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-3 px-4 font-semibold">Participant</th>
                    <th className="py-3 px-4 font-semibold">Training Track</th>
                    <th className="py-3 px-4 font-semibold">Training Status</th>
                    <th className="py-3 px-4 font-semibold">Case Status</th>
                    <th className="py-3 px-4 font-semibold">Most Recent Case Note</th>
                    <th className="py-3 px-4 font-semibold">Follow-Up Date</th>
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
                          {r.last_status ? (
                            <span className={`inline-block px-2 py-1 rounded text-xs ${
                              r.last_status === 'On Track' ? 'bg-green-100 text-green-800' :
                              r.last_status === 'Behind' ? 'bg-yellow-100 text-yellow-800' :
                              r.last_status === 'Dropped' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {r.last_status === 'Behind' ? 'At Risk' :
                               r.last_status === 'Dropped' ? 'Not Engaged' :
                               r.last_status}
                            </span>
                          ) : '—'}
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          {r.last_note ? (
                            <span className="text-xs" title={r.last_note}>
                              {r.last_note.slice(0, 80)}
                              {r.last_note.length > 80 ? '…' : ''}
                            </span>
                          ) : '—'}
                        </td>
                        <td className="py-3 px-4">
                          {r.follow_up_date ? (
                            <div className="text-xs">
                              <div className={`font-medium ${
                                r.follow_up_done ? 'text-green-600' :
                                new Date(r.follow_up_date) < new Date() ? 'text-red-600' :
                                'text-yellow-600'
                              }`}>
                                {r.follow_up_date}
                              </div>
                              {r.follow_up_done && <div className="text-green-600">✓ Done</div>}
                              {!r.follow_up_done && new Date(r.follow_up_date) < new Date() && (
                                <div className="text-red-600">Overdue</div>
                              )}
                            </div>
                          ) : '—'}
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            onClick={() => addNote(r)}
                            disabled={loading}
                            size="sm"
                            variant="outline"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            {r.last_note ? 'Update' : 'Add Note'}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-muted-foreground">
                        {loading ? 'Loading...' : 'No participants assigned yet'}
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
