"use client";

import React from 'react';

import { BadgeCheck, GraduationCap, Briefcase, Landmark, Users } from "lucide-react";

type Item = { icon: React.ReactNode; label: string; sub?: string };

const items: Item[] = [
  { icon: <Landmark className="h-4 w-4" />, label: "WIOA-aligned", sub: "Workforce-ready pathways" },
  { icon: <BadgeCheck className="h-4 w-4" />, label: "Registered Apprenticeship", sub: "RAPIDS partners" },
  { icon: <GraduationCap className="h-4 w-4" />, label: "ETPL-friendly", sub: "Clear outcomes & credentials" },
  { icon: <Briefcase className="h-4 w-4" />, label: "Career services", sub: "Coaching & job search" },
  { icon: <Users className="h-4 w-4" />, label: "Employer partnerships", sub: "OJT & reimbursement" },
];

export default function HighlightStrip() {
  return (
    <section className="border-y border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-stretch gap-3 px-4 py-3 md:gap-4 md:py-4">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200 md:text-sm"
          >
            <span className="text-orange-600">{it.icon}</span>
            <span>{it.label}</span>
            {it.sub && <span className="hidden text-slate-500 md:inline">· {it.sub}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
