"use client";

import React from 'react';

import { useState } from "react";
import type { CourseModule } from "@/lms-data/course-modules";
import { scormPackages } from "@/lms-data/scorm";

interface Props {
  programId: string;
  modules: CourseModule[];
}

type PublishMap = Record<string, boolean>;

export function ModuleListForProgram({ programId, modules }: Props) {
  const [published, setPublished] = useState<PublishMap>(() => {
    const map: PublishMap = {};
    for (const m of modules) {
      map[m.id] = true;
    }
    return map;
  });

  function togglePublish(id: string) {
    setPublished((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="space-y-3">
      {modules.length === 0 ? (
        <p className="text-xs text-slate-300">
          No modules are defined for this program yet. You can add new modules
          later by updating <code className="font-mono text-[10px]">lms-data/course-modules.ts</code> or
          connecting this screen to Supabase.
        </p>
      ) : (
        <ol className="space-y-2 text-xs">
          {modules.map((m) => {
            const scorm =
              m.type === "scorm"
                ? scormPackages.find((p) => p.id === m.scormPackageId)
                : undefined;

            return (
              <li
                key={m.id}
                className="rounded-lg border border-slate-800 bg-slate-950/80 p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-100">
                      {m.order}. {m.title}
                    </p>
                    {m.description && (
                      <p className="mt-0.5 text-[11px] text-slate-300">
                        {m.description}
                      </p>
                    )}
                    <p className="mt-1 text-[10px] text-slate-400">
                      Type:{" "}
                      <span className="uppercase">
                        {m.type === "video" && "VIDEO (upload coming)"}
                        {m.type === "pdf" && "PDF/HANDOUT"}
                        {m.type === "scorm" && "PARTNER / SCORM"}
                        {m.type === "quiz" && "QUIZ"}
                        {m.type === "live" && "LIVE SESSION"}
                      </span>
                      {scorm && (
                        <>
                          {" "}
                          • SCORM: <span>{scorm.title}</span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => togglePublish(m.id)}
                      className={`rounded-md px-3 py-1.5 font-semibold ${
                        published[m.id]
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-slate-800 text-slate-100 hover:bg-slate-700"
                      }`}
                    >
                      {published[m.id] ? "Published" : "Hidden (Draft)"}
                    </button>
                    {m.type === "scorm" && scorm && (
                      <a
                        href={`/student/scorm/${scorm.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-300 underline"
                      >
                        Preview SCORM in new tab
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-2 grid gap-2 text-[11px] md:grid-cols-3">
                  <div className="rounded-md bg-slate-900/80 p-2">
                    <p className="font-semibold text-slate-100">
                      Teaching Notes
                    </p>
                    <p className="mt-1 text-slate-300">
                      Use this space in training with instructors to talk about
                      how to introduce this topic, how long it usually takes,
                      and common learner questions.
                    </p>
                  </div>
                  <div className="rounded-md bg-slate-900/80 p-2">
                    <p className="font-semibold text-slate-100">
                      Attachments (Future)
                    </p>
                    <p className="mt-1 text-slate-300">
                      Later, we&apos;ll connect this to file uploads (videos,
                      slides, PDFs) and Supabase storage so you can attach
                      materials directly from this screen.
                    </p>
                  </div>
                  <div className="rounded-md bg-slate-900/80 p-2">
                    <p className="font-semibold text-slate-100">
                      Alignment & Funding
                    </p>
                    <p className="mt-1 text-slate-300">
                      Note where this module connects to JRI, WEX/OJT, or
                      credential partner outcomes so program holders can speak
                      the same language with workforce boards and employers.
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      <p className="mt-2 text-[11px] text-slate-400">
        This view is{" "}
        <span className="font-semibold">read-only for structure</span> right now
        and uses <code className="font-mono text-[10px]">lms-data/course-modules.ts</code>. Next step is
        connecting publish states and module edits to Supabase so changes are
        saved to the database instead of just in the browser.
      </p>
    </div>
  );
}
