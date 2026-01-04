// lms-data/courses/program-electrical.ts

import type { Course } from "@/types/course";

export const electricalCourse: Course = {
  id: "elec-001",
  slug: "electrical",
  title: "Electrical Technician Program",
  shortTitle: "Electrical Tech",
  credentialPartner: "NCCER",
  externalCredentialName: "NCCER Electrical Level 1 Certification",
  description:
    "This Electrical Technician program prepares you for entry-level electrical work in residential, commercial, and industrial settings. You'll learn electrical theory, wiring methods, code compliance, and safety practices.",
  hoursTotal: 280,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Job Site Practice",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "APPRENTICESHIP", "SELF_PAY"],
  targetAudience: [
    "Adults seeking skilled trades careers",
    "Construction workers wanting to specialize",
    "Individuals interested in electrical apprenticeships",
  ],
  outcomes: [
    "Understand electrical theory and principles.",
    "Install electrical wiring and components safely.",
    "Read and interpret electrical blueprints and diagrams.",
    "Follow National Electrical Code requirements.",
    "Prepare for electrical apprenticeship or entry-level positions.",
  ],
  modules: [
    {
      id: "elec-mod-1",
      title: "Electrical Safety and Tools",
      description:
        "Master electrical safety practices, PPE, and tool usage.",
      lessons: [
        {
          id: "elec-1-1",
          title: "Electrical Safety Fundamentals",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "elec-1-2",
          title: "Personal Protective Equipment",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "elec-1-3",
          title: "Lockout/Tagout Procedures",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "elec-1-4",
          title: "Hand and Power Tools for Electricians",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "elec-1-5",
          title: "Safety Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "elec-mod-2",
      title: "Electrical Theory Fundamentals",
      description:
        "Learn basic electrical theory, circuits, and calculations.",
      lessons: [
        {
          id: "elec-2-1",
          title: "Electricity Basics and Atomic Theory",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "elec-2-2",
          title: "Voltage, Current, and Resistance",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "elec-2-3",
          title: "Ohm's Law and Power Calculations",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "elec-2-4",
          title: "Series and Parallel Circuits",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "elec-2-5",
          title: "Electrical Theory Practice",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "elec-2-6",
          title: "Electrical Theory Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "elec-mod-3",
      title: "National Electrical Code",
      description:
        "Understand NEC requirements and code compliance.",
      lessons: [
        {
          id: "elec-3-1",
          title: "Introduction to the NEC",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "elec-3-2",
          title: "NEC Structure and Navigation",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "elec-3-3",
          title: "Wiring Methods and Materials",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "elec-3-4",
          title: "Grounding and Bonding Requirements",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "elec-3-5",
          title: "Code Application Practice",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "elec-3-6",
          title: "NEC Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "elec-mod-4",
      title: "Residential Wiring",
      description:
        "Learn residential electrical installation techniques.",
      lessons: [
        {
          id: "elec-4-1",
          title: "Residential Service and Panels",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "elec-4-2",
          title: "Branch Circuit Installation",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "elec-4-3",
          title: "Device Installation (Outlets and Switches)",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "elec-4-4",
          title: "Lighting Circuits and Fixtures",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "elec-4-5",
          title: "Residential Wiring Competency Check",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "elec-mod-5",
      title: "Commercial Wiring Basics",
      description:
        "Introduction to commercial electrical installations.",
      lessons: [
        {
          id: "elec-5-1",
          title: "Commercial Electrical Systems",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "elec-5-2",
          title: "Conduit Bending and Installation",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "elec-5-3",
          title: "Wire Pulling Techniques",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "elec-5-4",
          title: "Three-Phase Power Basics",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "elec-5-5",
          title: "Commercial Wiring Practice",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "elec-mod-6",
      title: "Electrical Testing and Troubleshooting",
      description:
        "Learn to test circuits and troubleshoot electrical problems.",
      lessons: [
        {
          id: "elec-6-1",
          title: "Electrical Testing Equipment",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "elec-6-2",
          title: "Multimeter Use and Testing",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "elec-6-3",
          title: "Circuit Troubleshooting Techniques",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "elec-6-4",
          title: "Troubleshooting Practice Scenarios",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "elec-6-5",
          title: "Testing and Troubleshooting Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "elec-mod-7",
      title: "Blueprint Reading and Electrical Plans",
      description:
        "Learn to read and interpret electrical blueprints and diagrams.",
      lessons: [
        {
          id: "elec-7-1",
          title: "Blueprint Basics and Symbols",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "elec-7-2",
          title: "Electrical Diagrams and Schematics",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "elec-7-3",
          title: "Reading Electrical Plans",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "elec-7-4",
          title: "Load Calculations",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "elec-7-5",
          title: "Blueprint Reading Practice",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "elec-mod-8",
      title: "Motor Controls and Transformers",
      description:
        "Introduction to motor controls and transformer basics.",
      lessons: [
        {
          id: "elec-8-1",
          title: "Electric Motors Fundamentals",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "elec-8-2",
          title: "Motor Control Circuits",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "elec-8-3",
          title: "Transformer Basics",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "elec-8-4",
          title: "Motor Controls Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "elec-8-5",
          title: "Motors and Transformers Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "elec-mod-9",
      title: "Specialty Systems",
      description:
        "Learn about fire alarm, security, and low-voltage systems.",
      lessons: [
        {
          id: "elec-9-1",
          title: "Fire Alarm Systems",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "elec-9-2",
          title: "Security and Access Control Systems",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "elec-9-3",
          title: "Low-Voltage Wiring",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "elec-9-4",
          title: "Data and Communication Cabling",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "elec-mod-10",
      title: "Certification Preparation and Job Readiness",
      description:
        "Prepare for NCCER certification and electrical career.",
      lessons: [
        {
          id: "elec-10-1",
          title: "NCCER Certification Overview",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "elec-10-2",
          title: "Practice Exam 1",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "elec-10-3",
          title: "Practice Exam 2",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "elec-10-4",
          title: "Apprenticeship Preparation",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "elec-10-5",
          title: "Final Skills Assessment",
          type: "lab",
          durationMinutes: 150,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/electrical",
  isPublished: true,
};
