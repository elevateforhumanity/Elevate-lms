"use client";

import React from 'react';
import { useState } from "react";

export default function TerminalPanel() {
  const [logs] = useState(["Terminal ready..."]);

  return (
    <div className="bg-black text-green-400 text-xs p-2 mt-2 h-[18vh] overflow-auto rounded">
      {logs.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}
