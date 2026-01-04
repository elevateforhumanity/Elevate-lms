export interface ScormPackage {
  id: string;
  label: string;
  description: string;
  launchPath: string;
  jriModule?: boolean;
  estimatedMinutes?: number;
}

export const scormPackages: ScormPackage[] = [
  {
    id: "jri-module-1",
    label: "JRI Module 1 – Foundations of Workplace Readiness",
    description:
      "Intro JRI module covering attendance, communication, and basic professionalism expectations.",
    launchPath: "/scorm/jri/module-1/index.html",
    jriModule: true,
    estimatedMinutes: 45,
  },
  {
    id: "jri-module-2",
    label: "JRI Module 2 – Communication & Teamwork",
    description:
      "JRI module focused on communication, teamwork, and conflict resolution.",
    launchPath: "/scorm/jri/module-2/index.html",
    jriModule: true,
    estimatedMinutes: 45,
  },
  {
    id: "jri-module-3",
    label: "JRI Module 3 – Problem Solving & Critical Thinking",
    description:
      "JRI module covering how to solve problems at work, ask for help, and think through options.",
    launchPath: "/scorm/jri/module-3/index.html",
    jriModule: true,
    estimatedMinutes: 45,
  },
  {
    id: "jri-module-4",
    label: "JRI Module 4 – Career Planning & Next Steps",
    description:
      "JRI capstone module focused on next steps, long-term planning, and advancement.",
    launchPath: "/scorm/jri/module-4/index.html",
    jriModule: true,
    estimatedMinutes: 45,
  },
];
