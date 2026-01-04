"use client";

import React from 'react';
import { useState } from 'react';

export default function AutopilotButton({
  label,
  endpoint,
}: {
  label: string;
  endpoint: string;
}) {
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      const res = await fetch(endpoint, { method: 'POST' });
      const data = await res.json();
      alert(data.message || label + ' Complete!');
    } catch (error: unknown) {
      alert('Failed to run autopilot');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={run}
      disabled={loading}
      className="p-4 bg-brand-blue-600 text-white rounded hover:bg-brand-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? 'Running...' : label}
    </button>
  );
}
