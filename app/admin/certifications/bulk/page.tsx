'use client';
import { useState } from 'react';

export default function BulkCerts() {
  const [file, setFile] = useState<File|null>(null);
  const [msg, setMsg] = useState('');

  const run = async () => {
    if (!file) return;
    const raw = await file.text();
    const res = await fetch('/api/cert/bulk-issue', { method: 'POST', body: raw });
    if (!res.ok) { setMsg('Failed. Check CSV and try again.'); return; }
    const j = await res.json();
    setMsg(`Done: ${j.ok} | Issued: ${j.issued} | Errors: ${j.errors.length}`);
    if (j.errors.length) console.warn('Bulk cert errors:', j.errors);
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Bulk Complete + Issue Certificates</h1>
      <p className="mt-2 text-sm text-gray-600">
        Upload a CSV with headers: <code>email,course_id</code> or <code>email,course_slug</code>.<br/>
        Optional columns: <code>issued_at</code> (YYYY-MM-DD), <code>expires_at</code> (YYYY-MM-DD).
      </p>
      <div className="mt-4 flex gap-3">
        <input type="file" accept=".csv" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <button onClick={run} className="border rounded px-4 py-2">Process CSV</button>
      </div>
      <pre className="mt-4 bg-gray-50 p-3 rounded text-xs">
email,course_slug,issued_at,expires_at
jane@example.com,cna-cert,2025-11-12,
john@work.org,hvac-tech,,
      </pre>
      {msg && <p className="mt-4">{msg}</p>}
    </main>
  );
}
