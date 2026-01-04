export interface ScormPackage {
  id: string;
  title: string;
  provider: string;
  launchUrl?: string;
  notes?: string;
}

/**
 * 🔴 ELIZABETH:
 * These are placeholder entries so the LMS knows WHERE JRI / SCORM fit.
 * - Once your SCORM 2004 packages are uploaded to your LMS or a SCORM host,
 *   you'll update launchUrl to the real launch path.
 */
export const scormPackages: ScormPackage[] = [
  {
    id: "jri-core-1",
    title: "Job Ready Indy: Core Module 1",
    provider: "Job Ready Indy (EmployIndy)",
    notes:
      "Map this to your first JRI SCORM 2004 package. Update launchUrl to the SCORM launch URL once hosted.",
  },
  {
    id: "jri-core-2",
    title: "Job Ready Indy: Core Module 2",
    provider: "Job Ready Indy (EmployIndy)",
    notes:
      "Map this to your second JRI SCORM 2004 package. Update launchUrl when configured.",
  },
  {
    id: "vita-link-learn-1",
    title: "IRS Link & Learn / VITA Training",
    provider: "IRS VITA / Link & Learn",
    notes:
      "This can represent the external IRS Link & Learn environment. You can keep this as an external link instead of SCORM if you prefer.",
  },
];

export function getScormPackageById(id: string): ScormPackage | undefined {
  return scormPackages.find((p) => p.id === id);
}
