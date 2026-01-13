import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apprentice Hours | Elevate For Humanity',
  description: 'Elevate For Humanity - Apprentice Hours page',
  alternates: { canonical: 'https://elevateforhumanity.institute/apprentice/hours' },
};



"use client";

import React from 'react';

import { useEffect, useMemo, useState } from 'react';


type Entry = {
  id: string;
  log_date: string;
  start_at: string;
  end_at: string;
  minutes: number;
  hour_type: 'RTI' | 'OJT';
  funding_phase: 'PRE_WIOA' | 'WIOA' | 'POST_CERT';
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'LOCKED';
  milady_module_ref?: string | null;
  activity_note?: string | null;
};

function minutesToHrsMin(m: number) {
  const hrs = Math.floor(m / 60);
  const min = m % 60;
  if (hrs <= 0) return `${min}m`;
  if (min === 0) return `${hrs}h`;
  return `${hrs}h ${min}m`;
}

export default function ApprenticeHoursPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [entry_date, setEntryDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [start_at, setStartAt] = useState(() =>
    new Date().toISOString().slice(0, 16)
  );
  const [end_at, setEndAt] = useState(() => {
    const d = new Date();
    d.setHours(d.getHours() + 1);
    return d.toISOString().slice(0, 16);
  });

  const [hour_type, setHourType] = useState<'RTI' | 'OJT'>('OJT');
  const [funding_phase, setFundingPhase] = useState<
    'PRE_WIOA' | 'WIOA' | 'POST_CERT'
  >('PRE_WIOA');
  const [milady_module_ref, setMiladyRef] = useState('');
  const [activity_note, setActivityNote] = useState('');
  const [attest, setAttest] = useState(false);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/time/entries', { cache: 'no-store' });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setEntries(json.entries ?? json.data ?? []);
    } catch (err: unknown) {
      setError(e?.message ?? 'Failed to load entries');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const weeklyTotal = useMemo(() => {
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(now.getDate() - 7);
    const mins = entries
      .filter((e) => new Date(e.log_date) >= cutoff)
      .reduce((s, e) => s + (e.minutes ?? 0), 0);
    return minutesToHrsMin(mins);
  }, [entries]);

  async function submit() {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        entry_date,
        start_at: new Date(start_at).toISOString(),
        end_at: new Date(end_at).toISOString(),
        hour_type,
        funding_phase,
        milady_module_ref: milady_module_ref || null,
        activity_note: activity_note || null,
        apprentice_attest: attest,
      };

      const res = await fetch('/api/time/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());

      setAttest(false);
      setMiladyRef('');
      setActivityNote('');
      await refresh();
    } catch (err: unknown) {
      setError(e?.message ?? 'Failed to submit');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 space-y-4 max-w-7xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-black">Log Hours</h1>
        <p className="text-sm text-black">
          Log weekly. WIOA hours can't be backdated. RTI/OJT caps are enforced
          automatically.
        </p>
        <div className="text-xs text-slate-500">
          Last 7 days total:{' '}
          <span className="font-semibold">{weeklyTotal}</span>
        </div>
      </div>

      {error ? (
        <div className="border border-red-300 bg-red-50 rounded p-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <div className="border border-slate-200 rounded-lg p-6 space-y-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold text-black">New Entry</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1 text-black">
              Entry date
            </label>
            <input
              type="date"
              className="border border-slate-300 rounded px-3 py-2 text-sm"
              value={entry_date}
              onChange={(e) => setEntryDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1 text-black">
              Start time
            </label>
            <input
              type="datetime-local"
              className="border border-slate-300 rounded px-3 py-2 text-sm"
              value={start_at}
              onChange={(e) => setStartAt(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1 text-black">
              End time
            </label>
            <input
              type="datetime-local"
              className="border border-slate-300 rounded px-3 py-2 text-sm"
              value={end_at}
              onChange={(e) => setEndAt(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1 text-black">
              Hour type
            </label>
            <select
              className="border border-slate-300 rounded px-3 py-2 text-sm"
              value={hour_type}
              onChange={(e) => setHourType(e.target.value as unknown)}
            >
              <option value="RTI">RTI (Milady / theory)</option>
              <option value="OJT">OJT (hands-on)</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1 text-black">
              Funding phase
            </label>
            <select
              className="border border-slate-300 rounded px-3 py-2 text-sm"
              value={funding_phase}
              onChange={(e) => setFundingPhase(e.target.value as unknown)}
            >
              <option value="PRE_WIOA">PRE_WIOA</option>
              <option value="WIOA">WIOA</option>
              <option value="POST_CERT">POST_CERT</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1 text-black">
              Milady module (optional)
            </label>
            <input
              className="border border-slate-300 rounded px-3 py-2 text-sm"
              value={milady_module_ref}
              onChange={(e) => setMiladyRef(e.target.value)}
              placeholder="Example: Ch 3 / Lesson 2"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1 text-black">
            Activity note (optional)
          </label>
          <input
            className="border border-slate-300 rounded px-3 py-2 text-sm"
            value={activity_note}
            onChange={(e) => setActivityNote(e.target.value)}
            placeholder="What you worked on today…"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={attest}
            onChange={(e) => setAttest(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-black">
            I attest these hours are accurate and were completed as logged.
          </span>
        </label>

        <button
          className="border border-slate-300 rounded px-6 py-2 text-sm font-semibold bg-brand-blue-600 text-white hover:bg-brand-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={submit}
          disabled={saving || !attest}
        >
          {saving ? 'Submitting…' : 'Submit Hours'}
        </button>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="px-4 py-3 text-sm font-bold bg-slate-100 text-black border-b border-slate-200">
          Recent Entries
        </div>
        {loading ? (
          <div className="px-4 py-8 text-sm text-slate-500 text-center">
            Loading…
          </div>
        ) : entries.length === 0 ? (
          <div className="px-4 py-8 text-sm text-slate-500 text-center">
            No entries yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {entries.slice(0, 25).map((e) => (
              <div
                key={e.id}
                className="px-4 py-3 text-sm flex flex-wrap gap-3 items-center justify-between hover:bg-slate-50 transition"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-black">
                    {e.log_date} • {e.hour_type} • {e.funding_phase}
                  </div>
                  <div className="text-xs text-black">
                    {new Date(e.start_at).toLocaleString()} →{' '}
                    {new Date(e.end_at).toLocaleString()} •{' '}
                    {minutesToHrsMin(e.minutes)} •{' '}
                    <span
                      className={`inline-block px-2 py-0.5 rounded ${
                        e.status === 'SUBMITTED'
                          ? 'bg-yellow-100 text-yellow-800'
                          : e.status === 'APPROVED'
                            ? 'bg-brand-green-100 text-green-800'
                            : e.status === 'REJECTED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-slate-100 text-black'
                      }`}
                    >
                      {e.status}
                    </span>
                  </div>
                  {e.milady_module_ref ? (
                    <div className="text-xs text-black">
                      <span className="font-semibold">Milady:</span>{' '}
                      {e.milady_module_ref}
                    </div>
                  ) : null}
                  {e.activity_note ? (
                    <div className="text-xs text-black">
                      {e.activity_note}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
