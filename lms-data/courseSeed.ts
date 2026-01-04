// High-level course structure for Elevate programs, tied to credential partners.
// This feeds the /api/dev/seed-courses endpoint.

export type SeedContentType =
  | "video"
  | "pdf"
  | "scorm"
  | "quiz"
  | "reflection"
  | "link"
  | "other";

export interface LessonSeed {
  title: string;
  contentType: SeedContentType;
  // For now we leave URLs null; once you have real links (HSI, Milady, etc.),
  // you can paste them here and re-run the seed.
  contentUrl?: string | null;
  durationMinutes?: number | null;
  partnerTag?: string; // "HSI", "Milady", "CareerSafe", "Certiport", "NationalDrug", "IRS-VITA", etc.
}

export interface ModuleSeed {
  title: string;
  description?: string;
  orderIndex?: number;
  lessons: LessonSeed[];
}

export interface ProgramSeed {
  code: string; // maps to programs.code
  name: string;
  category: string;
  description?: string;
  modules: ModuleSeed[];
}

export const programSeeds: ProgramSeed[] = [
  {
    code: "CNA-TRAINING",
    name: "CNA Training",
    category: "healthcare",
    description:
      "Hands-on Certified Nursing Assistant training focused on real-world care settings, soft skills, and job placement.",
    modules: [
      {
        title: "Orientation & Job Ready Indy Soft Skills",
        orderIndex: 1,
        description:
          "Welcome to Elevate, expectations, and JRI-style workplace readiness.",
        lessons: [
          {
            title: "Welcome to Elevate & CNA Pathway",
            contentType: "video",
            partnerTag: "Elevate",
            durationMinutes: 10,
          },
          {
            title: "Workplace Readiness – Attendance, Communication, Attitude",
            contentType: "scorm",
            partnerTag: "JRI",
            durationMinutes: 45,
          },
        ],
      },
      {
        title: "Core CNA Theory (HSI / Choice Medical)",
        orderIndex: 2,
        description:
          "Credential-aligned CNA theory content delivered through your partner curriculum.",
        lessons: [
          {
            title: "CNA Role, Scope of Practice & Ethics",
            contentType: "link",
            partnerTag: "HSI",
            durationMinutes: 30,
          },
          {
            title: "Infection Control & Standard Precautions",
            contentType: "link",
            partnerTag: "HSI",
            durationMinutes: 30,
          },
          {
            title: "Vital Signs & Basic Procedures",
            contentType: "link",
            partnerTag: "HSI",
            durationMinutes: 30,
          },
        ],
      },
      {
        title: "Skills Lab & Clinical Prep",
        orderIndex: 3,
        lessons: [
          {
            title: "Skills Lab Orientation & Safety",
            contentType: "pdf",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "Clinical Checklists & Competency Sign-off",
            contentType: "pdf",
            partnerTag: "Elevate",
            durationMinutes: 20,
          },
        ],
      },
      {
        title: "State Exam Prep & Job Placement",
        orderIndex: 4,
        lessons: [
          {
            title: "CNA State Exam Overview & Registration",
            contentType: "video",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "Resume, Interview & Employer Matching",
            contentType: "reflection",
            partnerTag: "Elevate",
            durationMinutes: 20,
          },
        ],
      },
    ],
  },
  {
    code: "BARBER-APP",
    name: "Barber Apprenticeship",
    category: "beauty",
    description:
      "Milady-style barber theory plus in-shop apprenticeship hours and business skills.",
    modules: [
      {
        title: "Barber Shop Orientation & JRI Prep",
        orderIndex: 1,
        lessons: [
          {
            title: "Welcome to Your Barber Apprenticeship",
            contentType: "video",
            partnerTag: "Elevate",
            durationMinutes: 10,
          },
          {
            title: "Professionalism in the Shop (JRI-style)",
            contentType: "scorm",
            partnerTag: "JRI",
            durationMinutes: 45,
          },
        ],
      },
      {
        title: "Core Barber Theory (Milady RISE)",
        orderIndex: 2,
        lessons: [
          {
            title: "Sanitation, Disinfection & Safety",
            contentType: "link",
            partnerTag: "Milady",
            durationMinutes: 30,
          },
          {
            title: "Hair & Scalp Structure Basics",
            contentType: "link",
            partnerTag: "Milady",
            durationMinutes: 30,
          },
          {
            title: "Cutting Fundamentals & Tools",
            contentType: "link",
            partnerTag: "Milady",
            durationMinutes: 30,
          },
        ],
      },
      {
        title: "On-the-Job Apprenticeship Hours",
        orderIndex: 3,
        lessons: [
          {
            title: "Shop Expectations & Tracking Hours",
            contentType: "pdf",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "Client Communication & Chair Etiquette",
            contentType: "reflection",
            partnerTag: "Elevate",
            durationMinutes: 20,
          },
        ],
      },
      {
        title: "Business & Branding for Barbers",
        orderIndex: 4,
        lessons: [
          {
            title: "Building Your Client Base",
            contentType: "video",
            partnerTag: "Elevate",
            durationMinutes: 20,
          },
          {
            title: "Basic Bookkeeping & Taxes for Barbers",
            contentType: "link",
            partnerTag: "TAX-VITA",
            durationMinutes: 20,
          },
        ],
      },
    ],
  },
  {
    code: "HVAC-TECH",
    name: "HVAC Technician Pathway",
    category: "skilled-trades",
    description:
      "HVAC theory plus hands-on experience with employer partners.",
    modules: [
      {
        title: "HVAC Orientation & Safety",
        orderIndex: 1,
        lessons: [
          {
            title: "Intro to HVAC Careers & Pathways",
            contentType: "video",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "Jobsite Safety (OSHA-style via CareerSafe)",
            contentType: "link",
            partnerTag: "CareerSafe",
            durationMinutes: 40,
          },
        ],
      },
      {
        title: "Core HVAC Theory",
        orderIndex: 2,
        lessons: [
          {
            title: "HVAC Fundamentals & Systems Overview",
            contentType: "link",
            partnerTag: "HSI",
            durationMinutes: 30,
          },
          {
            title: "Electrical Basics for HVAC",
            contentType: "link",
            partnerTag: "HSI",
            durationMinutes: 30,
          },
        ],
      },
      {
        title: "Lab & Ride-Along Experience",
        orderIndex: 3,
        lessons: [
          {
            title: "Lab Orientation & Safety Checklist",
            contentType: "pdf",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "Ride-Along Reflection",
            contentType: "reflection",
            partnerTag: "Elevate",
            durationMinutes: 20,
          },
        ],
      },
    ],
  },
  {
    code: "CDL-TRAIN",
    name: "CDL Training Pathway",
    category: "transportation",
    description:
      "Preparation for CDL licensure plus employer connections for drivers.",
    modules: [
      {
        title: "CDL Overview & Eligibility",
        orderIndex: 1,
        lessons: [
          {
            title: "Intro to CDL Licenses & Endorsements",
            contentType: "video",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "Drug & Alcohol Requirements (National Drug)",
            contentType: "link",
            partnerTag: "NationalDrug",
            durationMinutes: 25,
          },
        ],
      },
      {
        title: "Theory Content",
        orderIndex: 2,
        lessons: [
          {
            title: "Vehicle Inspection Basics",
            contentType: "link",
            partnerTag: "PartnerSchool",
            durationMinutes: 30,
          },
          {
            title: "Driving Safety & Hours of Service",
            contentType: "link",
            partnerTag: "PartnerSchool",
            durationMinutes: 30,
          },
        ],
      },
      {
        title: "Behind-the-Wheel & Placement",
        orderIndex: 3,
        lessons: [
          {
            title: "Behind-the-Wheel Checklist",
            contentType: "pdf",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "Employer Matching & Career Planning",
            contentType: "reflection",
            partnerTag: "Elevate",
            durationMinutes: 20,
          },
        ],
      },
    ],
  },
  {
    code: "BUILDING-TECH-APP",
    name: "Building Maintenance & Technician Apprenticeship",
    category: "skilled-trades",
    description:
      "Facilities and building tech apprenticeship combining coursework and on-site experience.",
    modules: [
      {
        title: "Building Maintenance Orientation",
        orderIndex: 1,
        lessons: [
          {
            title: "Intro to Building Maintenance Roles",
            contentType: "video",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "Safety & OSHA Basics (CareerSafe)",
            contentType: "link",
            partnerTag: "CareerSafe",
            durationMinutes: 40,
          },
        ],
      },
      {
        title: "Core Building Systems",
        orderIndex: 2,
        lessons: [
          {
            title: "Plumbing & Electrical Basics",
            contentType: "link",
            partnerTag: "HSI",
            durationMinutes: 30,
          },
          {
            title: "Preventive Maintenance",
            contentType: "link",
            partnerTag: "HSI",
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    code: "BUSINESS-APP",
    name: "Business Support Apprenticeship",
    category: "business",
    description:
      "Business admin, office support, and customer service with real employer placements.",
    modules: [
      {
        title: "Professionalism & Office Culture",
        orderIndex: 1,
        lessons: [
          {
            title: "Orientation to Business Support Roles",
            contentType: "video",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "JRI-Style Soft Skills for Office Settings",
            contentType: "scorm",
            partnerTag: "JRI",
            durationMinutes: 45,
          },
        ],
      },
      {
        title: "Digital Skills & Certifications",
        orderIndex: 2,
        lessons: [
          {
            title: "Computer Basics & Productivity Tools",
            contentType: "link",
            partnerTag: "Certiport",
            durationMinutes: 30,
          },
          {
            title: "Customer Service & Communication",
            contentType: "link",
            partnerTag: "HSI",
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    code: "EMS-APP",
    name: "EMS & Healthcare Support Apprenticeship",
    category: "healthcare",
    description:
      "Apprenticeship-style healthcare support roles with EMS exposure.",
    modules: [
      {
        title: "Healthcare & EMS Overview",
        orderIndex: 1,
        lessons: [
          {
            title: "Intro to EMS & Support Roles",
            contentType: "video",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "Basic Patient Interaction & Safety",
            contentType: "link",
            partnerTag: "HSI",
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    code: "TAX-VITA",
    name: "Tax & VITA Track",
    category: "tax-vita",
    description:
      "IRS Link & Learn, VITA training, and seasonal tax prep opportunities.",
    modules: [
      {
        title: "VITA Orientation & Service Model",
        orderIndex: 1,
        lessons: [
          {
            title: "Welcome to IRS VITA & Community Impact",
            contentType: "video",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "Volunteer Standards of Conduct",
            contentType: "link",
            partnerTag: "IRS-VITA",
            durationMinutes: 30,
          },
        ],
      },
      {
        title: "IRS Link & Learn Certification",
        orderIndex: 2,
        lessons: [
          {
            title: "Creating Your IRS Link & Learn Account",
            contentType: "link",
            partnerTag: "IRS-VITA",
            durationMinutes: 20,
          },
          {
            title: "Basic & Advanced Tax Topics",
            contentType: "link",
            partnerTag: "IRS-VITA",
            durationMinutes: 60,
          },
        ],
      },
      {
        title: "Intuit Academy & Practice Labs",
        orderIndex: 3,
        lessons: [
          {
            title: "Intro to Intuit Tax Academy",
            contentType: "link",
            partnerTag: "Intuit",
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    code: "ESTHETICS-APP",
    name: "Esthetics Apprenticeship",
    category: "beauty",
    description:
      "Spa-based apprenticeship focused on skincare, sanitation, and client experience.",
    modules: [
      {
        title: "Esthetics Orientation & Spa Standards",
        orderIndex: 1,
        lessons: [
          {
            title: "What to Expect as an Esthetics Apprentice",
            contentType: "video",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "Sanitation, Disinfection & Safety (Milady)",
            contentType: "link",
            partnerTag: "Milady",
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    code: "NAIL-APP",
    name: "Nail Technician Apprenticeship",
    category: "beauty",
    description:
      "Nail tech apprenticeship focused on salon-ready skills and sanitation.",
    modules: [
      {
        title: "Nail Tech Orientation & Safety",
        orderIndex: 1,
        lessons: [
          {
            title: "Intro to Nail Tech Careers",
            contentType: "video",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "Sanitation & Safety (Milady)",
            contentType: "link",
            partnerTag: "Milady",
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    code: "CULINARY-APP",
    name: "Culinary & Kitchen Apprenticeship",
    category: "culinary",
    description:
      "Kitchen-based apprenticeship focused on food safety, prep, and career pathways.",
    modules: [
      {
        title: "Kitchen Orientation & Safety",
        orderIndex: 1,
        lessons: [
          {
            title: "Intro to Culinary Careers",
            contentType: "video",
            partnerTag: "Elevate",
            durationMinutes: 15,
          },
          {
            title: "Food Safety Basics",
            contentType: "link",
            partnerTag: "CareerSafe",
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
];
