'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type PH = { id:string; name:string };
type Delegate = {
  id:string;
  email:string;
  ph_name:string;
  can_view_reports:boolean;
  can_view_learners:boolean;
  can_edit_courses:boolean;
  can_view_financials:boolean;
};

export default function DelegatesPage() {
  const [holders, setHolders] = useState<PH[]>([]);
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [phId, setPhId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [h, d] = await Promise.all([
        fetch('/api/delegates/holders').then(r=>r.json()),
        fetch('/api/delegates/list').then(r=>r.json())
      ]);
      setHolders(h || []);
      setDelegates(d || []);
      if (h?.length && !phId) setPhId(h[0].id);
    } catch (error) {
      console.error('Failed to load:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ load(); }, []);

  const add = async () => {
    if (!phId || !email) return;
    setLoading(true);
    try {
      const res = await fetch('/api/delegates/add', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ program_holder_id: phId, email })
      });
      if (res.ok) {
        setEmail('');
        await load();
      } else {
        const text = await res.text();
        alert(`Failed to add delegate: ${text}`);
      }
    } catch (error) {
      alert('Failed to add delegate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Delegates & Program Holders</h1>
        <p className="text-muted-foreground mb-8">
          Manage program holder delegates and their access permissions
        </p>

        {/* Add Delegate Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add Delegate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={phId}
                onChange={e=>setPhId(e.target.value)}
                className="border rounded px-3 py-2 flex-1"
                disabled={loading}
              >
                <option value="">Select Program Holder</option>
                {holders.map(h=> <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <input
                placeholder="Delegate email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                className="border rounded px-3 py-2 flex-1"
                disabled={loading}
              />
              <Button onClick={add} disabled={loading || !phId || !email}>
                Add Delegate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Delegates Table */}
        <Card>
          <CardHeader>
            <CardTitle>Current Delegates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-3 px-4 font-semibold">Program Holder</th>
                    <th className="py-3 px-4 font-semibold">Email</th>
                    <th className="py-3 px-4 font-semibold text-center">View Reports</th>
                    <th className="py-3 px-4 font-semibold text-center">View Learners</th>
                    <th className="py-3 px-4 font-semibold text-center">Edit Courses</th>
                    <th className="py-3 px-4 font-semibold text-center">View Financials</th>
                  </tr>
                </thead>
                <tbody>
                  {delegates.length > 0 ? (
                    delegates.map(d=>(
                      <tr key={d.id} className="border-b hover:bg-secondary/50">
                        <td className="py-3 px-4">{d.ph_name}</td>
                        <td className="py-3 px-4">{d.email}</td>
                        <td className="py-3 px-4 text-center">
                          <Toggle id={d.id} field="can_view_reports" value={d.can_view_reports} onUpdate={load}/>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Toggle id={d.id} field="can_view_learners" value={d.can_view_learners} onUpdate={load}/>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Toggle id={d.id} field="can_edit_courses" value={d.can_edit_courses} onUpdate={load}/>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Toggle id={d.id} field="can_view_financials" value={d.can_view_financials} onUpdate={load}/>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-muted-foreground">
                        {loading ? 'Loading...' : 'No delegates yet'}
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

function Toggle({id, field, value, onUpdate}:{id:string; field:string; value:boolean; onUpdate:()=>void}) {
  const [updating, setUpdating] = useState(false);
  
  const onChange = async () => {
    setUpdating(true);
    try {
      await fetch('/api/delegates/update', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, field, value: !value })
      });
      onUpdate();
    } catch (error) {
      console.error('Failed to update:', error);
    } finally {
      setUpdating(false);
    }
  };
  
  return (
    <input
      type="checkbox"
      checked={value}
      onChange={onChange}
      disabled={updating}
      className="w-4 h-4 cursor-pointer"
    />
  );
}
