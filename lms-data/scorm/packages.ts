export interface ScormPackage {
  id: string;
  title: string;
  partner: string;
  launchUrl: string;
  notes?: string;
}

export const scormPackages: ScormPackage[] = [
  {
    id: "jri-core",
    title: "Job Ready Indy – Core Work Readiness (SCORM 2004)",
    partner: "JRI / EmployIndy",
    launchUrl: "/scorm/jri-core/index.html",
    notes:
      "Upload and unzip the JRI SCORM 2004 package into public/scorm/jri-core so index.html is the launch file.",
  },
];

export function getScormPackageById(id: string): ScormPackage | undefined {
  return scormPackages.find((pkg) => pkg.id === id);
}
