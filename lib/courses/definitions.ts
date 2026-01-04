// lib/courses/definitions.ts

export type CredentialingPartner =
  | "Choice Medical Institute"
  | "Milady"
  | "Certiport / IT"
  | "CDL Partner"
  | "HVAC / Trades Partner"
  | "Elevate For Humanity (Workforce)";

export interface CourseLesson {
  id: string;
  title: string;
  type: "video" | "reading" | "quiz" | "assignment" | "lab";
  durationMinutes?: number;
  description?: string;
  // URL you will fill later with InVideo, Milady, etc.
  contentUrl?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
}

export interface CourseDefinition {
  slug: string;
  title: string;
  subtitle: string;
  category:
    | "Healthcare"
    | "Skilled Trades"
    | "Transportation"
    | "Facilities"
    | "Workforce Readiness"
    | "Technology"
    | "Business";
  partner: CredentialingPartner;
  estimatedDurationWeeks: number;
  modality: "In-Person" | "Hybrid" | "Online";
  workforceTags: string[]; // e.g. ["WIOA", "Re-Entry", "Apprenticeship"]
  secondChanceFriendly: boolean;
  outcomes: string[];
  modules: CourseModule[];
}

// ✅ MASTER LIST OF COURSES
export const COURSE_DEFINITIONS: CourseDefinition[] = [
  {
    slug: "medical-assistant",
    title: "Medical Assistant",
    subtitle:
      "Hands-on clinical training that prepares you for entry-level MA roles in clinics, hospitals, and specialty practices.",
    category: "Healthcare",
    partner: "Choice Medical Institute",
    estimatedDurationWeeks: 24,
    modality: "In-Person",
    workforceTags: ["WIOA", "Workforce Ready Grant", "OJT Eligible"],
    secondChanceFriendly: true,
    outcomes: [
      "Prepare for entry-level Medical Assistant roles",
      "Demonstrate vital signs, injections, and basic clinical procedures",
      "Understand front office, scheduling, and patient communication",
    ],
    modules: [
      {
        id: "ma-01",
        title: "Program Orientation & Workforce Readiness",
        description:
          "Welcome to the MA program, expectations, professionalism, and workforce funding orientation.",
        lessons: [
          {
            id: "ma-01-01",
            title: "Welcome & What to Expect",
            type: "video",
            durationMinutes: 15,
            description: "Introduction to the Medical Assistant program, schedule, and expectations",
          },
          {
            id: "ma-01-02",
            title: "Attendance, Funding, and Case Management",
            type: "reading",
            description: "Understanding WIOA funding, attendance requirements, and support services",
          },
          {
            id: "ma-01-03",
            title: "Professionalism & Soft Skills in Healthcare",
            type: "quiz",
            durationMinutes: 10,
            description: "Assessment of workplace professionalism and communication skills",
          },
        ],
      },
      {
        id: "ma-02",
        title: "Medical Terminology & Anatomy Basics",
        description: "Core terminology, body systems, and common conditions.",
        lessons: [
          {
            id: "ma-02-01",
            title: "Intro to Medical Terminology",
            type: "video",
            durationMinutes: 30,
            description: "Common medical prefixes, suffixes, and root words",
          },
          {
            id: "ma-02-02",
            title: "Body Systems Overview",
            type: "reading",
            description: "Introduction to major body systems and their functions",
          },
          {
            id: "ma-02-03",
            title: "Terminology Practice Quiz",
            type: "quiz",
            durationMinutes: 15,
            description: "Test your knowledge of medical terminology",
          },
        ],
      },
      {
        id: "ma-03",
        title: "Clinical Skills I",
        description:
          "Vital signs, infection control, and working with patients in a clinical setting.",
        lessons: [
          {
            id: "ma-03-01",
            title: "Vital Signs: Theory",
            type: "video",
            durationMinutes: 45,
            description: "How to measure blood pressure, pulse, temperature, and respiration",
          },
          {
            id: "ma-03-02",
            title: "Vital Signs: Lab Practice",
            type: "lab",
            durationMinutes: 120,
            description: "Hands-on practice measuring vital signs on classmates",
          },
          {
            id: "ma-03-03",
            title: "Infection Control & PPE",
            type: "reading",
            description: "Proper use of personal protective equipment and infection control protocols",
          },
        ],
      },
      {
        id: "ma-04",
        title: "Front Office & Electronic Health Records",
        description:
          "Scheduling, patient intake, basic billing and working with EHR systems.",
        lessons: [
          {
            id: "ma-04-01",
            title: "Front Desk Workflow",
            type: "video",
            durationMinutes: 30,
            description: "Patient check-in, scheduling, and front office procedures",
          },
          {
            id: "ma-04-02",
            title: "Patient Intake Forms Practice",
            type: "assignment",
            description: "Complete sample patient intake forms and insurance verification",
          },
          {
            id: "ma-04-03",
            title: "EHR Basics Quiz",
            type: "quiz",
            durationMinutes: 15,
            description: "Test your knowledge of electronic health record systems",
          },
        ],
      },
    ],
  },
  {
    slug: "barber-apprenticeship",
    title: "Barber Apprenticeship",
    subtitle:
      "State-approved apprenticeship where you train in a real barbershop while earning hours toward licensure.",
    category: "Skilled Trades",
    partner: "Milady",
    estimatedDurationWeeks: 52,
    modality: "In-Person",
    workforceTags: ["Apprenticeship", "WIOA", "Re-Entry Friendly"],
    secondChanceFriendly: true,
    outcomes: [
      "Complete required apprenticeship hours toward barber license",
      "Perform core barber services safely and professionally",
      "Understand shop etiquette, sanitation, and client care",
    ],
    modules: [
      {
        id: "ba-01",
        title: "Orientation & Apprenticeship Basics",
        description:
          "Program overview, state requirements, and what to expect day to day in the shop.",
        lessons: [
          {
            id: "ba-01-01",
            title: "Welcome to Your Apprenticeship",
            type: "video",
            durationMinutes: 20,
            description: "Introduction to the barber apprenticeship program and state requirements",
          },
          {
            id: "ba-01-02",
            title: "Apprenticeship Agreement & Hours Tracking",
            type: "reading",
            description: "Understanding your apprenticeship agreement and how to log hours",
          },
          {
            id: "ba-01-03",
            title: "Professional Expectations Quiz",
            type: "quiz",
            durationMinutes: 10,
            description: "Assessment of professional standards and shop etiquette",
          },
        ],
      },
      {
        id: "ba-02",
        title: "Sanitation & Safety",
        description:
          "Sanitation, disinfection, and safety requirements per state and Milady standards.",
        lessons: [
          {
            id: "ba-02-01",
            title: "Sanitation Standards",
            type: "video",
            durationMinutes: 30,
            description: "State board sanitation requirements and best practices",
          },
          {
            id: "ba-02-02",
            title: "Disinfection Procedures",
            type: "lab",
            durationMinutes: 60,
            description: "Hands-on practice with proper tool disinfection and sterilization",
          },
          {
            id: "ba-02-03",
            title: "Sanitation Quiz",
            type: "quiz",
            durationMinutes: 15,
            description: "Test your knowledge of sanitation and safety protocols",
          },
        ],
      },
      {
        id: "ba-03",
        title: "Cutting & Fades I",
        description: "Foundations of cutting, blending, and clipper control.",
        lessons: [
          {
            id: "ba-03-01",
            title: "Tools & Sectioning",
            type: "video",
            durationMinutes: 25,
            description: "Introduction to clippers, shears, and proper sectioning techniques",
          },
          {
            id: "ba-03-02",
            title: "Basic Cut Demo",
            type: "video",
            durationMinutes: 40,
            description: "Step-by-step demonstration of a basic men's haircut",
          },
          {
            id: "ba-03-03",
            title: "Practice Log Assignment",
            type: "assignment",
            description: "Document your practice cuts with photos and mentor feedback",
          },
        ],
      },
    ],
  },
  {
    slug: "hvac-technician",
    title: "HVAC Technician",
    subtitle:
      "Training in heating, cooling, and refrigeration systems aligned with industry certifications.",
    category: "Skilled Trades",
    partner: "HVAC / Trades Partner",
    estimatedDurationWeeks: 24,
    modality: "In-Person",
    workforceTags: ["WIOA", "Workforce Ready Grant", "OJT Eligible"],
    secondChanceFriendly: true,
    outcomes: [
      "Understand basic HVAC theory and safety",
      "Perform entry-level installation and maintenance tasks",
      "Prepare for industry-recognized HVAC exams",
    ],
    modules: [
      {
        id: "hvac-01",
        title: "HVAC Foundations & Safety",
        description: "Intro to the trade, tools, and safety protocols.",
        lessons: [
          {
            id: "hvac-01-01",
            title: "Intro to HVAC Systems",
            type: "video",
            durationMinutes: 35,
            description: "Overview of heating, ventilation, and air conditioning systems",
          },
          {
            id: "hvac-01-02",
            title: "Shop & PPE Safety",
            type: "reading",
            description: "Personal protective equipment and shop safety procedures",
          },
          {
            id: "hvac-01-03",
            title: "Safety Quiz",
            type: "quiz",
            durationMinutes: 10,
            description: "Assessment of HVAC safety knowledge",
          },
        ],
      },
      {
        id: "hvac-02",
        title: "Electrical Basics for HVAC",
        description:
          "Ohm's law, basic wiring, and electrical safety for HVAC technicians.",
        lessons: [
          {
            id: "hvac-02-01",
            title: "Electrical Fundamentals",
            type: "video",
            durationMinutes: 45,
            description: "Understanding voltage, current, resistance, and Ohm's law",
          },
          {
            id: "hvac-02-02",
            title: "Meter Use Lab",
            type: "lab",
            durationMinutes: 90,
            description: "Hands-on practice using multimeters and electrical testing equipment",
          },
          {
            id: "hvac-02-03",
            title: "Electrical Quiz",
            type: "quiz",
            durationMinutes: 15,
            description: "Test your knowledge of electrical fundamentals",
          },
        ],
      },
    ],
  },
  {
    slug: "cdl-truck-driving",
    title: "CDL / Truck Driving",
    subtitle:
      "Commercial Driver's License training with a focus on safety, regulations, and real-world driving.",
    category: "Transportation",
    partner: "CDL Partner",
    estimatedDurationWeeks: 6,
    modality: "In-Person",
    workforceTags: ["WIOA", "Workforce Ready Grant", "OJT Eligible"],
    secondChanceFriendly: true,
    outcomes: [
      "Prepare to pass the CDL knowledge and skills exams",
      "Demonstrate safe vehicle operation",
      "Understand DOT regulations and log requirements",
    ],
    modules: [
      {
        id: "cdl-01",
        title: "CDL Foundations",
        description:
          "Intro to CDL classes, career options, and exam overview.",
        lessons: [
          {
            id: "cdl-01-01",
            title: "Intro to the CDL World",
            type: "video",
            durationMinutes: 25,
            description: "Overview of CDL classes, career paths, and industry opportunities",
          },
          {
            id: "cdl-01-02",
            title: "CDL Requirements & Pathways",
            type: "reading",
            description: "Understanding CDL requirements, endorsements, and career progression",
          },
        ],
      },
      {
        id: "cdl-02",
        title: "Safety & Regulations",
        description:
          "Road safety, hours-of-service, and compliance basics.",
        lessons: [
          {
            id: "cdl-02-01",
            title: "Hours of Service",
            type: "video",
            durationMinutes: 30,
            description: "Understanding DOT hours-of-service regulations and logbook requirements",
          },
          {
            id: "cdl-02-02",
            title: "Safety Scenarios Quiz",
            type: "quiz",
            durationMinutes: 20,
            description: "Test your knowledge of CDL safety regulations",
          },
        ],
      },
    ],
  },
  {
    slug: "workforce-readiness-reentry",
    title: "Workforce Readiness & Re-Entry",
    subtitle:
      "Coaching, skills training, and real employment connections for justice-impacted and underemployed learners.",
    category: "Workforce Readiness",
    partner: "Elevate For Humanity (Workforce)",
    estimatedDurationWeeks: 8,
    modality: "Hybrid",
    workforceTags: ["Re-Entry", "WIOA"],
    secondChanceFriendly: true,
    outcomes: [
      "Build a job-ready resume and practice interviewing",
      "Understand workplace expectations and communication",
      "Connect to training and job opportunities",
    ],
    modules: [
      {
        id: "wr-01",
        title: "Reset & Rebuild",
        description:
          "Orientation focused on mindset, goals, and support systems.",
        lessons: [
          {
            id: "wr-01-01",
            title: "Your Why & Your Goals",
            type: "assignment",
            description: "Reflect on your goals and create a personal action plan",
          },
          {
            id: "wr-01-02",
            title: "Program Overview",
            type: "video",
            durationMinutes: 20,
            description: "Introduction to the workforce readiness program and available resources",
          },
        ],
      },
      {
        id: "wr-02",
        title: "Workplace Skills",
        description: "Soft skills, conflict resolution, and communication.",
        lessons: [
          {
            id: "wr-02-01",
            title: "Workplace Communication Basics",
            type: "video",
            durationMinutes: 30,
            description: "Effective communication strategies for the workplace",
          },
          {
            id: "wr-02-02",
            title: "Roleplay Assignment",
            type: "assignment",
            description: "Practice workplace scenarios through roleplay exercises",
          },
        ],
      },
    ],
  },
];

// Helper function to get course by slug
export function getCourseBySlug(slug: string): CourseDefinition | undefined {
  return COURSE_DEFINITIONS.find((course) => course.slug === slug);
}

// Helper function to get courses by category
export function getCoursesByCategory(category: CourseDefinition["category"]): CourseDefinition[] {
  return COURSE_DEFINITIONS.filter((course) => course.category === category);
}

// Helper function to get courses by partner
export function getCoursesByPartner(partner: CredentialingPartner): CourseDefinition[] {
  return COURSE_DEFINITIONS.filter((course) => course.partner === partner);
}

// Helper function to get second-chance friendly courses
export function getSecondChanceCourses(): CourseDefinition[] {
  return COURSE_DEFINITIONS.filter((course) => course.secondChanceFriendly);
}
