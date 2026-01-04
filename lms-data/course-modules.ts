export type ModuleType = "video" | "pdf" | "scorm" | "quiz" | "live";

export interface CourseModule {
  id: string;
  programId: string;          // e.g. "prog-cna"
  order: number;
  title: string;
  type: ModuleType;
  description?: string;
  scormPackageId?: string;    // link to SCORM if type === "scorm"
}

/**
 * Core learning modules for each Elevate program.
 * This gives you a standard structure to hang content on (video, PDF, SCORM, etc.).
 * Later, we can wire this into Supabase for tracking completion.
 */
export const courseModules: CourseModule[] = [
  // CNA – tuition / employer supported
  {
    id: "cna-1-intro",
    programId: "prog-cna",
    order: 1,
    title: "Program Orientation & Expectations",
    type: "video",
    description: "Welcome, overview of CNA pathway, expectations, schedule, and support.",
  },
  {
    id: "cna-2-readiness-jri",
    programId: "prog-cna",
    order: 2,
    title: "Job Readiness: JRI Foundations",
    type: "scorm",
    scormPackageId: "jri-module-1",
    description: "Core employability skills before entering clinical environments.",
  },

  // Barber Apprenticeship
  {
    id: "barber-1-orientation",
    programId: "prog-barber",
    order: 1,
    title: "Barber Apprenticeship Orientation",
    type: "video",
    description: "Program overview, shop expectations, hours, and apprenticeship structure.",
  },
  {
    id: "barber-2-jri-readiness",
    programId: "prog-barber",
    order: 2,
    title: "Job Readiness: Communication & Professionalism",
    type: "scorm",
    scormPackageId: "jri-module-2",
    description: "Focus on client communication, appearance, and professional conduct.",
  },

  // Nails Apprenticeship
  {
    id: "nails-1-orientation",
    programId: "prog-nail-technician-apprenticeship",
    order: 1,
    title: "Nail Technician Apprenticeship Orientation",
    type: "video",
    description: "Overview of nail apprenticeship expectations, safety, and shop culture.",
  },
  {
    id: "nails-2-jri-teamwork",
    programId: "prog-nail-technician-apprenticeship",
    order: 2,
    title: "Teamwork & Customer Experience",
    type: "scorm",
    scormPackageId: "jri-module-3",
    description: "How to work with co-workers and create a great client experience.",
  },

  // Esthetician Apprenticeship
  {
    id: "esth-1-orientation",
    programId: "prog-esthetician-apprenticeship",
    order: 1,
    title: "Esthetician Apprenticeship Orientation",
    type: "video",
    description: "Program overview, licensure path, and spa standards.",
  },
  {
    id: "esth-2-jri-professionalism",
    programId: "prog-esthetician-apprenticeship",
    order: 2,
    title: "Professionalism in Client-Facing Roles",
    type: "scorm",
    scormPackageId: "jri-module-2",
    description: "Professional behavior in spa and wellness settings.",
  },

  // Culinary Apprenticeship
  {
    id: "culinary-1-orientation",
    programId: "prog-culinary-apprenticeship",
    order: 1,
    title: "Culinary Apprenticeship Orientation",
    type: "video",
    description: "Kitchen culture, safety, expectations, and growth opportunities.",
  },
  {
    id: "culinary-2-jri-teamwork",
    programId: "prog-culinary-apprenticeship",
    order: 2,
    title: "Teamwork in Fast-Paced Kitchens",
    type: "scorm",
    scormPackageId: "jri-module-3",
    description: "Working as part of a line, communication, and problem solving.",
  },

  // Business EMS Apprenticeship
  {
    id: "bems-1-orientation",
    programId: "prog-business-ems-apprenticeship",
    order: 1,
    title: "Business EMS Apprenticeship Orientation",
    type: "video",
    description: "Program overview, roles, and employer expectations.",
  },
  {
    id: "bems-2-rights-responsibilities",
    programId: "prog-business-ems-apprenticeship",
    order: 2,
    title: "Workplace Rights & Responsibilities",
    type: "scorm",
    scormPackageId: "jri-module-7",
    description: "Understanding policies, boundaries, and professional responsibilities.",
  },

  // Business Technician Apprenticeship
  {
    id: "btech-1-orientation",
    programId: "prog-business-technician-apprenticeship",
    order: 1,
    title: "Business Technician Apprenticeship Orientation",
    type: "video",
    description: "Welcome, tools overview, and office expectations.",
  },
  {
    id: "btech-2-teamwork",
    programId: "prog-business-technician-apprenticeship",
    order: 2,
    title: "Problem Solving & Teamwork",
    type: "scorm",
    scormPackageId: "jri-module-3",
    description: "Collaboration on tasks, communication, and resolving issues.",
  },

  // Tax / VITA Program
  {
    id: "tax-1-orientation",
    programId: "prog-tax-vita",
    order: 1,
    title: "Tax & VITA Orientation",
    type: "video",
    description: "Program overview, IRS partnership, and volunteer expectations.",
  },
  {
    id: "tax-2-financial-literacy",
    programId: "prog-tax-vita",
    order: 2,
    title: "Financial Literacy Foundations",
    type: "scorm",
    scormPackageId: "jri-module-4",
    description: "Budgeting and paychecks to support tax and financial education.",
  },

  // HVAC
  {
    id: "hvac-1-orientation",
    programId: "prog-hvac-technician",
    order: 1,
    title: "HVAC Technician Orientation",
    type: "video",
    description: "Safety, PPE, field culture, and expectations.",
  },
  {
    id: "hvac-2-jri-safety",
    programId: "prog-hvac-technician",
    order: 2,
    title: "Digital & Safety Readiness",
    type: "scorm",
    scormPackageId: "jri-module-5",
    description: "Digital tools and safety basics for field work.",
  },

  // Building Technician
  {
    id: "bldg-1-orientation",
    programId: "prog-building-technician-apprenticeship",
    order: 1,
    title: "Building Technician Apprenticeship Orientation",
    type: "video",
    description: "Overview of building systems, maintenance roles, and apprenticeship structure.",
  },
  {
    id: "bldg-2-jri-teamwork",
    programId: "prog-building-technician-apprenticeship",
    order: 2,
    title: "Teamwork in Facilities & Maintenance",
    type: "scorm",
    scormPackageId: "jri-module-3",
    description: "Communication with tenants, supervisors, and vendors.",
  },

  // CDL / Transportation
  {
    id: "cdl-1-orientation",
    programId: "prog-cdl-transportation",
    order: 1,
    title: "CDL & Transportation Orientation",
    type: "video",
    description: "Program overview, safety expectations, and career pathways.",
  },
  {
    id: "cdl-2-jri-rights",
    programId: "prog-cdl-transportation",
    order: 2,
    title: "Rights, Safety & Responsibilities on the Road",
    type: "scorm",
    scormPackageId: "jri-module-7",
    description: "Legal and safety responsibilities tied to driving roles.",
  },

  // IT Support
  {
    id: "it-1-orientation",
    programId: "prog-it-support-helpdesk",
    order: 1,
    title: "IT Support & Helpdesk Orientation",
    type: "video",
    description: "Intro to IT support roles, tools, and expectations.",
  },
  {
    id: "it-2-digital-skills",
    programId: "prog-it-support-helpdesk",
    order: 2,
    title: "Digital Skills & Safety",
    type: "scorm",
    scormPackageId: "jri-module-5",
    description: "Digital professionalism and cyber basics.",
  },

  // Customer Service & Contact Center
  {
    id: "cs-1-orientation",
    programId: "prog-customer-service-contact-center",
    order: 1,
    title: "Customer Service & Contact Center Orientation",
    type: "video",
    description: "Program overview and expectations for customer-facing roles.",
  },
  {
    id: "cs-2-jri-communications",
    programId: "prog-customer-service-contact-center",
    order: 2,
    title: "Communication & Professionalism",
    type: "scorm",
    scormPackageId: "jri-module-2",
    description: "Core communication and professionalism for phone and in-person roles.",
  },
];

export function getModulesForProgram(programId: string): CourseModule[] {
  return courseModules
    .filter((m) => m.programId === programId)
    .sort((a, b) => a.order - b.order);
}

export function getModuleById(id: string): CourseModule | undefined {
  return courseModules.find((m) => m.id === id);
}
