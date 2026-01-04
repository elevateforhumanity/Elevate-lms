// lms-data/courses/program-plumbing.ts

import type { Course } from "@/types/course";

export const plumbingCourse: Course = {
  id: "plumb-001",
  slug: "plumbing",
  title: "Plumbing Technician Program",
  shortTitle: "Plumbing",
  credentialPartner: "NCCER",
  externalCredentialName: "NCCER Plumbing Level 1 Certification",
  description:
    "This Plumbing Technician program prepares you for entry-level plumbing work in residential and commercial settings. You'll learn pipe fitting, fixture installation, drainage systems, and plumbing code compliance.",
  hoursTotal: 260,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Job Site Practice",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "APPRENTICESHIP", "SELF_PAY"],
  targetAudience: [
    "Adults seeking skilled trades careers",
    "Construction workers wanting to specialize in plumbing",
    "Individuals interested in plumbing apprenticeships",
  ],
  outcomes: [
    "Install and repair plumbing fixtures and systems.",
    "Work with various pipe materials and fittings.",
    "Understand drainage, waste, and vent systems.",
    "Follow plumbing codes and safety regulations.",
    "Prepare for plumbing apprenticeship or entry-level positions.",
  ],
  modules: [
    {
      id: "plumb-mod-1",
      title: "Plumbing Safety and Tools",
      description:
        "Master plumbing safety practices and tool usage.",
      lessons: [
        {
          id: "plumb-1-1",
          title: "Plumbing Safety Fundamentals",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "plumb-1-2",
          title: "Personal Protective Equipment",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "plumb-1-3",
          title: "Plumbing Hand Tools",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "plumb-1-4",
          title: "Power Tools and Equipment",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "plumb-1-5",
          title: "Safety Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "plumb-mod-2",
      title: "Plumbing Systems and Codes",
      description:
        "Understand plumbing systems, codes, and regulations.",
      lessons: [
        {
          id: "plumb-2-1",
          title: "Plumbing System Overview",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "plumb-2-2",
          title: "Plumbing Codes and Standards",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "plumb-2-3",
          title: "Water Supply Systems",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "plumb-2-4",
          title: "Drainage, Waste, and Vent Systems",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "plumb-2-5",
          title: "Plumbing Systems Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "plumb-mod-3",
      title: "Pipe Materials and Fittings",
      description:
        "Learn about different pipe materials and fitting methods.",
      lessons: [
        {
          id: "plumb-3-1",
          title: "Copper Pipe and Fittings",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "plumb-3-2",
          title: "Soldering and Brazing Techniques",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "plumb-3-3",
          title: "PVC and CPVC Pipe",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "plumb-3-4",
          title: "PVC Solvent Welding Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "plumb-3-5",
          title: "PEX and Other Materials",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "plumb-3-6",
          title: "Pipe Materials Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "plumb-mod-4",
      title: "Fixture Installation",
      description:
        "Install and repair plumbing fixtures.",
      lessons: [
        {
          id: "plumb-4-1",
          title: "Faucet Installation and Repair",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "plumb-4-2",
          title: "Toilet Installation and Repair",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "plumb-4-3",
          title: "Sink and Lavatory Installation",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "plumb-4-4",
          title: "Bathtub and Shower Installation",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "plumb-4-5",
          title: "Fixture Installation Competency Check",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "plumb-mod-5",
      title: "Water Heaters",
      description:
        "Install and service water heating systems.",
      lessons: [
        {
          id: "plumb-5-1",
          title: "Water Heater Types and Operation",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "plumb-5-2",
          title: "Gas Water Heater Installation",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "plumb-5-3",
          title: "Electric Water Heater Installation",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "plumb-5-4",
          title: "Tankless Water Heaters",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "plumb-5-5",
          title: "Water Heater Troubleshooting",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "plumb-mod-6",
      title: "Drainage Systems",
      description:
        "Install and maintain drainage and waste systems.",
      lessons: [
        {
          id: "plumb-6-1",
          title: "Drainage System Design",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "plumb-6-2",
          title: "Drain Pipe Installation",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "plumb-6-3",
          title: "Vent System Installation",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "plumb-6-4",
          title: "Drain Cleaning and Maintenance",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "plumb-6-5",
          title: "Drainage Systems Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "plumb-mod-7",
      title: "Water Supply Systems",
      description:
        "Install and maintain water supply piping and systems.",
      lessons: [
        {
          id: "plumb-7-1",
          title: "Water Supply Design and Layout",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "plumb-7-2",
          title: "Water Service Installation",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "plumb-7-3",
          title: "Branch Line Installation",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "plumb-7-4",
          title: "Backflow Prevention",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "plumb-7-5",
          title: "Water Supply Practice",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "plumb-mod-8",
      title: "Gas Piping",
      description:
        "Install and test natural gas and propane piping systems.",
      lessons: [
        {
          id: "plumb-8-1",
          title: "Gas Piping Safety and Codes",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "plumb-8-2",
          title: "Gas Pipe Sizing and Installation",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "plumb-8-3",
          title: "Gas Piping Installation Lab",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "plumb-8-4",
          title: "Pressure Testing and Leak Detection",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "plumb-8-5",
          title: "Gas Piping Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "plumb-mod-9",
      title: "Blueprint Reading and Estimating",
      description:
        "Read plumbing blueprints and estimate materials.",
      lessons: [
        {
          id: "plumb-9-1",
          title: "Plumbing Blueprint Symbols",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "plumb-9-2",
          title: "Reading Plumbing Plans",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "plumb-9-3",
          title: "Material Takeoffs and Estimating",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "plumb-9-4",
          title: "Estimating Practice",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "plumb-mod-10",
      title: "Certification Preparation and Job Readiness",
      description:
        "Prepare for NCCER certification and plumbing career.",
      lessons: [
        {
          id: "plumb-10-1",
          title: "NCCER Certification Overview",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "plumb-10-2",
          title: "Practice Exam 1",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "plumb-10-3",
          title: "Practice Exam 2",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "plumb-10-4",
          title: "Apprenticeship Preparation",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "plumb-10-5",
          title: "Final Skills Assessment",
          type: "lab",
          durationMinutes: 150,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/plumbing",
  isPublished: true,
};
