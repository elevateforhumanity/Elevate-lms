import Link from "next/link";
import { employers } from "@/lms-data/employers";
import { getProgramsWithTuitionMeta } from "@/lms-data/tuition";

const programsWithTuition = getProgramsWithTuitionMeta();

export function EmployerList() {
  if (!employers.length) {
    return (
      <p className="text-xs text-slate-300">
        No employers have been added yet. In the future, this can connect to a
        Supabase table or CRM.
      </p>
    );
  }

  return (
    <div className="space-y-3 text-xs">
      {employers.map((emp) => {
        const taggedPrograms = programsWithTuition.filter((p) =>
          emp.interestedPrograms.includes(p.program.id)
        );

        return (
          <article
            key={emp.id}
            className="rounded-xl border border-slate-800 bg-slate-900/90 p-3"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-[11px] font-semibold text-slate-100">
                  {emp.name}
                </p>
                {emp.city && emp.state && (
                  <p className="text-[10px] text-slate-400">
                    {emp.city}, {emp.state}
                  </p>
                )}
                {emp.contactName && (
                  <p className="mt-1 text-[10px] text-slate-300">
                    Contact: {emp.contactName}
                    {emp.contactEmail ? ` (${emp.contactEmail})` : ""}
                  </p>
                )}
                {emp.notes && (
                  <p className="mt-1 text-[10px] text-slate-400">
                    Notes: {emp.notes}
                  </p>
                )}
                {emp.tags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {emp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-2 space-y-1">
                  <p className="text-[10px] font-semibold text-slate-200">
                    Interested Programs:
                  </p>
                  {taggedPrograms.length ? (
                    <ul className="list-disc space-y-1 pl-4 text-[10px] text-slate-300">
                      {taggedPrograms.map(({ program, tuition }) => (
                        <li key={program.id}>
                          {program.title}
                          {tuition?.baseTuition && (
                            <span className="text-slate-400">
                              {" "}
                              – {tuition.baseTuition}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[10px] text-slate-400">
                      Not yet mapped to specific programs.
                    </p>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-slate-400">
                  {emp.wantsWex && <span>WEX ✔</span>}
                  {emp.wantsOjt && <span>OJT ✔</span>}
                  {emp.wantsApprenticeship && <span>Apprenticeship ✔</span>}
                </div>
              </div>
              <div className="flex flex-col gap-2 text-[11px] md:items-end">
                <Link
                  href={`/admin/employers/${emp.id}/proposal`}
                  className="rounded-md bg-orange-400 text-white px-3 py-1 font-semibold text-white hover:bg-orange-500"
                >
                  View Proposal Preview
                </Link>
                <Link
                  href="/admin/funding-playbook"
                  className="rounded-md border border-slate-700 px-3 py-1 font-semibold text-slate-100 hover:bg-slate-800"
                >
                  Open Funding Playbook
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
