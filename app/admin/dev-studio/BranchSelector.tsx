"use client";

import React from 'react';
import { useEffect, useState } from "react";

export default function BranchSelector({ repo, onSelect }) {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetch(`/api/github/branches?repo=${repo}`)
      .then((r) => r.json())
      .then(setBranches);
  }, [repo]);

  return (
    <div className="mt-3 space-y-1">
      <label className="text-xs text-slate-400">Branch</label>
      <select
        className="w-full bg-[#111] p-2 rounded"
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => onSelect(e.target.value)}
      >
        {branches.map((b: Record<string, unknown>) => (
          <option key={b.name} value={b.name}>{b.name}</option>
        ))}
      </select>
    </div>
  );
}
