"use client";

import React from 'react';
import { useEffect, useState } from "react";

export default function FileTreeSimple({ repo, branch, onSelect }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`/api/github/tree?repo=${repo}&ref=${branch}`)
      .then((r) => r.json())
      .then((d) => setFiles(d.files));
  }, [repo, branch]);

  async function openFile(path: string) {
    const r = await fetch(
      `/api/github/file?repo=${repo}&path=${path}&ref=${branch}`
    );
    const d = await r.json();
    onSelect(path, d.content, d.sha);
  }

  return (
    <div className="mt-4 text-xs h-[70vh] overflow-auto space-y-1">
      {files.map((f: string) => (
        <button
          key={f}
          onClick={() => openFile(f)}
          className="block text-left w-full hover:text-blue-400 px-1"
        >
          {f}
        </button>
      ))}
    </div>
  );
}
