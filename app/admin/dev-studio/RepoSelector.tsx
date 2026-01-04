"use client";

import React from 'react';
import { useEffect, useState } from "react";

export default function RepoSelector({ onSelect }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((r) => r.json())
      .then(setRepos);
  }, []);

  return (
    <div className="space-y-1">
      <label className="text-xs text-slate-400">Repository</label>
      <select
        className="w-full bg-[#111] p-2 rounded"
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => onSelect(e.target.value)}
      >
        <option value="">Select Repository</option>
        {repos.map((r: Record<string, unknown>) => (
          <option key={r.full_name} value={r.full_name}>
            {r.full_name}
          </option>
        ))}
      </select>
    </div>
  );
}
