'use client';

import { useState } from 'react';
import { Database, RefreshCw, Circle, XCircle, Loader2 } from 'lucide-react';

interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}

export function DemoQAClient() {
  const [seedResult, setSeedResult] = useState<ActionResult | null>(null);
  const [resetResult, setResetResult] = useState<ActionResult | null>(null);
  const [loading, setLoading] = useState<'seed' | 'reset' | null>(null);

  const handleSeed = async () => {
    setLoading('seed');
    setSeedResult(null);
    try {
      const res = await fetch('/api/demo/seed', { method: 'POST' });
      const data = await res.json();
      setSeedResult({
        success: res.ok,
        message: res.ok ? 'Demo data seeded successfully' : (data.error || 'Failed to seed'),
        data: data.results,
      });
    } catch (err) {
      setSeedResult({
        success: false,
        message: 'Network error while seeding',
      });
    } finally {
      setLoading(null);
    }
  };

  const handleReset = async () => {
    if (!confirm('This will delete all demo data and re-seed. Continue?')) return;
    
    setLoading('reset');
    setResetResult(null);
    try {
      const res = await fetch('/api/demo/reset', { method: 'POST' });
      const data = await res.json();
      setResetResult({
        success: res.ok,
        message: res.ok ? 'Demo data reset successfully' : (data.error || 'Failed to reset'),
        data: { deleted: data.deleted, seeded: data.seeded },
      });
    } catch (err) {
      setResetResult({
        success: false,
        message: 'Network error while resetting',
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSeed}
          disabled={loading !== null}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading === 'seed' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Database className="w-4 h-4" />
          )}
          Seed Demo Data
        </button>
        
        <button
          onClick={handleReset}
          disabled={loading !== null}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading === 'reset' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Reset Demo
        </button>
      </div>

      {/* Seed Result */}
      {seedResult && (
        <div className={`p-4 rounded-xl border ${
          seedResult.success 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {seedResult.success ? (
              <Circle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className={`font-semibold ${seedResult.success ? 'text-green-900' : 'text-red-900'}`}>
              {seedResult.message}
            </span>
          </div>
          {seedResult.data && (
            <pre className="text-xs bg-white/50 p-2 rounded-lg overflow-auto">
              {JSON.stringify(seedResult.data, null, 2)}
            </pre>
          )}
        </div>
      )}

      {/* Reset Result */}
      {resetResult && (
        <div className={`p-4 rounded-xl border ${
          resetResult.success 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {resetResult.success ? (
              <Circle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className={`font-semibold ${resetResult.success ? 'text-green-900' : 'text-red-900'}`}>
              {resetResult.message}
            </span>
          </div>
          {resetResult.data && (
            <pre className="text-xs bg-white/50 p-2 rounded-lg overflow-auto">
              {JSON.stringify(resetResult.data, null, 2)}
            </pre>
          )}
        </div>
      )}

      {/* Environment Info */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <h3 className="font-semibold text-slate-900 mb-2">Environment</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-slate-600">Demo Tenant Slug:</div>
          <div className="font-mono text-slate-900">demo</div>
          <div className="text-slate-600">Demo Admin Email:</div>
          <div className="font-mono text-slate-900 text-xs">demo-admin@elevateforhumanity.org</div>
          <div className="text-slate-600">Demo Password:</div>
          <div className="font-mono text-slate-900">demo123</div>
        </div>
      </div>
    </div>
  );
}
