"use client";

import React from 'react';

import { useState } from "react";
import { AIInstructorCard } from "@/components/student/AIInstructorCard";
import { AIChatPanel } from "@/components/student/AIChatPanel";

export function StudentDashboardAISection(props: {
  programSlug: string;
  programName: string;
}) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <AIInstructorCard
        instructorName="Elizabeth Greene"
        roleTitle="Program Instructor (AI)"
        programName={props.programName}
        onOpenChat={() => setChatOpen(true)}
      />

      {chatOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 p-4 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <div className="mb-2 flex justify-end">
              <button
                className="rounded-xl bg-white px-4 py-2 font-bold border border-zinc-200 hover:bg-zinc-50 transition"
                onClick={() => setChatOpen(false)}
              >
                Close
              </button>
            </div>
            <AIChatPanel programSlug={props.programSlug} />
          </div>
        </div>
      )}
    </>
  );
}
