// lms-data/courses/program-hvac.ts

import type { Course } from "@/types/course";

export const hvacCourse: Course = {
  id: "hvac-001",
  slug: "hvac-technician",
  title: "HVAC Technician Training",
  shortTitle: "HVAC Technician",
  credentialPartner: "OTHER",
  externalCredentialName: "Entry-Level HVAC Technician Certification Prep",
  description:
    "This HVAC program helps you build real-world skills in heating, ventilation, and air conditioning. You'll learn safety, tools, troubleshooting, and basic installation so you can step into entry-level technician roles and apprenticeships.",
  hoursTotal: 300,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center & On-the-Job Practice",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "APPRENTICESHIP", "SELF_PAY"],
  targetAudience: [
    "Adults interested in skilled trades",
    "Justice-involved individuals seeking a career in construction trades",
    "People who like hands-on, technical work and problem-solving",
  ],
  outcomes: [
    "Understand basic HVAC systems, components, and operation.",
    "Use common HVAC tools safely and correctly.",
    "Follow safety and environmental guidelines, including refrigerant handling basics.",
    "Assist with installation, maintenance, and basic troubleshooting.",
    "Prepare for entry-level HVAC employment or apprenticeship pathways.",
  ],
  modules: [
    {
      id: "hvac-mod-1",
      title: "HVAC Safety & Tools",
      description: "Start with safety, PPE, tool use, and job site expectations.",
      lessons: [
        {
          id: "hvac-1-1",
          title: "Jobsite Safety & PPE",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "hvac-1-2",
          title: "Hand & Power Tools Overview",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "hvac-1-3",
          title: "Safety & Tools Practice Lab",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "hvac-1-4",
          title: "Safety Quiz",
          type: "quiz",
          durationMinutes: 15,
        },
      ],
    },
    {
      id: "hvac-mod-2",
      title: "HVAC Fundamentals",
      description:
        "Get familiar with how heating, cooling, and ventilation systems work in real buildings.",
      lessons: [
        {
          id: "hvac-2-1",
          title: "Basic HVAC Concepts",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "hvac-2-2",
          title: "Airflow, Ductwork & Filters",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "hvac-2-3",
          title: "System Components Overview",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "hvac-2-4",
          title: "Fundamentals Knowledge Check",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "hvac-mod-3",
      title: "Refrigeration Basics",
      description:
        "Learn refrigeration cycle, refrigerants, and environmental regulations.",
      lessons: [
        {
          id: "hvac-3-1",
          title: "Refrigeration Cycle Explained",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "hvac-3-2",
          title: "Types of Refrigerants",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "hvac-3-3",
          title: "EPA 608 Certification Overview",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "hvac-3-4",
          title: "Refrigeration Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "hvac-mod-4",
      title: "Electrical Basics for HVAC",
      description:
        "Understand electrical circuits, wiring, and safety for HVAC systems.",
      lessons: [
        {
          id: "hvac-4-1",
          title: "Basic Electricity and Circuits",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "hvac-4-2",
          title: "Reading Electrical Diagrams",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hvac-4-3",
          title: "Multimeter Use and Testing",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "hvac-4-4",
          title: "Electrical Safety Procedures",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "hvac-4-5",
          title: "Electrical Basics Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "hvac-mod-5",
      title: "Heating Systems",
      description:
        "Learn about furnaces, heat pumps, and heating system components.",
      lessons: [
        {
          id: "hvac-5-1",
          title: "Gas Furnace Operation",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "hvac-5-2",
          title: "Electric Heating Systems",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "hvac-5-3",
          title: "Heat Pump Basics",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "hvac-5-4",
          title: "Heating System Lab Practice",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "hvac-5-5",
          title: "Heating Systems Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "hvac-mod-6",
      title: "Cooling Systems",
      description:
        "Master air conditioning systems, components, and operation.",
      lessons: [
        {
          id: "hvac-6-1",
          title: "Air Conditioning Fundamentals",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "hvac-6-2",
          title: "Compressors and Condensers",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hvac-6-3",
          title: "Evaporators and Expansion Devices",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "hvac-6-4",
          title: "Cooling System Lab Practice",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "hvac-6-5",
          title: "Cooling Systems Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "hvac-mod-7",
      title: "Ductwork and Airflow",
      description:
        "Learn duct design, installation, and airflow measurement.",
      lessons: [
        {
          id: "hvac-7-1",
          title: "Duct Types and Materials",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "hvac-7-2",
          title: "Duct Installation Techniques",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "hvac-7-3",
          title: "Airflow Measurement and Balancing",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "hvac-7-4",
          title: "Ductwork Practice Lab",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "hvac-mod-8",
      title: "System Installation",
      description:
        "Practice HVAC system installation procedures and best practices.",
      lessons: [
        {
          id: "hvac-8-1",
          title: "Installation Planning and Preparation",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "hvac-8-2",
          title: "Equipment Mounting and Placement",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "hvac-8-3",
          title: "Refrigerant Line Installation",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "hvac-8-4",
          title: "System Startup Procedures",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hvac-8-5",
          title: "Installation Competency Check",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "hvac-mod-9",
      title: "Maintenance and Troubleshooting",
      description:
        "Develop skills in preventive maintenance and system troubleshooting.",
      lessons: [
        {
          id: "hvac-9-1",
          title: "Preventive Maintenance Procedures",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "hvac-9-2",
          title: "Common System Problems",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "hvac-9-3",
          title: "Diagnostic Tools and Techniques",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "hvac-9-4",
          title: "Troubleshooting Practice Scenarios",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "hvac-9-5",
          title: "Maintenance Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "hvac-mod-10",
      title: "Professional Skills and Certification Prep",
      description:
        "Build customer service skills and prepare for industry certifications.",
      lessons: [
        {
          id: "hvac-10-1",
          title: "Customer Service for Technicians",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hvac-10-2",
          title: "Professional Communication",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "hvac-10-3",
          title: "EPA 608 Certification Prep",
          type: "reading",
          durationMinutes: 90,
        },
        {
          id: "hvac-10-4",
          title: "Practice EPA 608 Exam",
          type: "quiz",
          durationMinutes: 60,
        },
        {
          id: "hvac-10-5",
          title: "Job Search and Career Planning",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "hvac-10-6",
          title: "Final Skills Assessment",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/hvac-technician",
  isPublished: true,
};
