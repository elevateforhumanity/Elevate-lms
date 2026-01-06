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
    launchUrl: process.env.NEXT_PUBLIC_SCORM_CDN_URL 
      ? `${process.env.NEXT_PUBLIC_SCORM_CDN_URL}/jri-core/index.html`
      : "/scorm/jri-core/index.html",
    notes:
      "Served from Cloudflare R2 via worker (scorm.elevateforhumanity.institute) or fallback to local public/scorm/",
  },
];

export function getScormPackageById(id: string): ScormPackage | undefined {
  return scormPackages.find((pkg) => pkg.id === id);
}
