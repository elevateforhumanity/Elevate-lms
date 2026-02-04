// app/admin/advanced-tools/page.tsx
import Link from "next/link";

type ToolLink = {
  title: string;
  href: string;
  desc?: string;
  badge?: "TEST" | "POWER" | "AI" | "SYSTEM";
};

type ToolCategory = {
  title: string;
  desc: string;
  items: ToolLink[];
};

const CATEGORIES: ToolCategory[] = [
  {
    title: "Automation & Workflows",
    desc: "Rule-driven tools that can trigger operational outcomes. Use with documented oversight.",
    items: [
      { title: "Automation", href: "/admin/automation", badge: "POWER" },
      { title: "Autopilot (Canonical)", href: "/admin/autopilot", badge: "POWER" },
      { title: "Autopilots (Legacy)", href: "/admin/autopilots", badge: "POWER", desc: "Keep temporarily if still referenced." },
      { title: "Workflows", href: "/admin/workflows", badge: "POWER" },
      { title: "Next Steps", href: "/admin/next-steps" },
      { title: "Operations", href: "/admin/operations" },
    ],
  },
  {
    title: "AI Tools",
    desc: "Assisted tooling. Any automated decisions must remain human-reviewed.",
    items: [
      { title: "AI Console", href: "/admin/ai-console", badge: "AI" },
      { title: "Copilot", href: "/admin/copilot", badge: "AI" },
      { title: "Course Studio AI", href: "/admin/course-studio-ai", badge: "AI" },
      { title: "Course Generator", href: "/admin/course-generator", badge: "AI" },
      { title: "Program Generator", href: "/admin/program-generator", badge: "AI" },
      { title: "Syllabus Generator", href: "/admin/syllabus-generator", badge: "AI" },
      { title: "Video Generator", href: "/admin/video-generator", badge: "AI" },
    ],
  },
  {
    title: "Authoring & Builders",
    desc: "Internal content-building surfaces. Active in production, but not daily operational workflows.",
    items: [
      { title: "Course Authoring", href: "/admin/course-authoring" },
      { title: "Course Builder", href: "/admin/course-builder" },
      { title: "Course Import", href: "/admin/course-import" },
      { title: "Course Studio", href: "/admin/course-studio" },
      { title: "Course Studio (Simple)", href: "/admin/course-studio-simple" },
      { title: "Course Templates", href: "/admin/course-templates" },
      { title: "Editor", href: "/admin/editor" },
      { title: "Quiz Builder", href: "/admin/quiz-builder" },
      { title: "Video Manager", href: "/admin/video-manager" },
      { title: "Media Studio", href: "/admin/media-studio" },
    ],
  },
  {
    title: "Data, Imports, Processing",
    desc: "High-impact tools that can change records at scale. Treat as governed operations.",
    items: [
      { title: "Data Import", href: "/admin/data-import", badge: "POWER" },
      { title: "Import", href: "/admin/import", badge: "POWER" },
      { title: "Data Processor", href: "/admin/data-processor", badge: "POWER" },
      { title: "Documents", href: "/admin/documents" },
      { title: "Files", href: "/admin/files" },
      { title: "Hours Export", href: "/admin/hours-export", badge: "POWER" },
    ],
  },
  {
    title: "System Health & Monitoring",
    desc: "Visibility into uptime and system state. Keep accessible, but not in primary nav.",
    items: [
      { title: "System Health", href: "/admin/system-health", badge: "SYSTEM" },
      { title: "System Monitor", href: "/admin/system-monitor", badge: "SYSTEM" },
      { title: "System Status", href: "/admin/system-status", badge: "SYSTEM" },
      { title: "Monitoring", href: "/admin/monitoring", badge: "SYSTEM" },
      { title: "Site Health", href: "/admin/site-health", badge: "SYSTEM" },
    ],
  },
  {
    title: "Test & Verification Tools",
    desc: "Operational test tools. Active, but should clearly indicate they are test surfaces.",
    items: [
      { title: "Test Webhook", href: "/admin/test-webhook", badge: "TEST" },
      { title: "Test Payments", href: "/admin/test-payments", badge: "TEST" },
      { title: "Test Funding", href: "/admin/test-funding", badge: "TEST" },
      { title: "Test Emails", href: "/admin/test-emails", badge: "TEST" },
      { title: "Dev Studio", href: "/admin/dev-studio", badge: "TEST" },
    ],
  },
];

function Badge({ kind }: { kind: NonNullable<ToolLink["badge"]> }) {
  const base =
    "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium";
  const byKind: Record<typeof kind, string> = {
    TEST: "border-red-200 text-red-700",
    POWER: "border-amber-200 text-amber-800",
    AI: "border-indigo-200 text-indigo-800",
    SYSTEM: "border-slate-200 text-slate-800",
  };
  return <span className={`${base} ${byKind[kind]}`}>{kind}</span>;
}

export default function AdvancedToolsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Advanced Tools</h1>
        <p className="text-base text-gray-800">
          This directory contains non-routine admin surfaces (automation, AI, builders, data tools, monitoring, and test tools).
          Everything here is active. Use intentionally.
        </p>
      </div>

      <div className="space-y-8">
        {CATEGORIES.map((cat) => (
          <section key={cat.title} className="space-y-3">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900">{cat.title}</h2>
              <p className="text-sm text-gray-800">{cat.desc}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {cat.items.map((item) => (
                <Link
                  key={item.href + item.title}
                  href={item.href}
                  className="rounded-xl border border-gray-200 bg-white p-4 hover:border-gray-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-base font-semibold text-gray-900">{item.title}</div>
                      {item.desc ? (
                        <div className="text-sm text-gray-800">{item.desc}</div>
                      ) : null}
                      <div className="text-xs text-gray-700">{item.href}</div>
                    </div>
                    {item.badge ? <Badge kind={item.badge} /> : null}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
