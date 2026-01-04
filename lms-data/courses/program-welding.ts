// lms-data/courses/program-welding.ts

import type { Course } from "@/types/course";

export const weldingCourse: Course = {
  id: "weld-001",
  slug: "welding",
  title: "Welding Technician Program",
  shortTitle: "Welding",
  credentialPartner: "AWS",
  externalCredentialName: "AWS Certified Welder",
  description:
    "This Welding Technician program prepares you for entry-level welding positions in manufacturing, construction, and fabrication. You'll learn MIG, TIG, and stick welding processes, blueprint reading, and welding safety.",
  hoursTotal: 240,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center Welding Lab",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "APPRENTICESHIP", "SELF_PAY"],
  targetAudience: [
    "Adults seeking skilled trades careers",
    "Manufacturing workers wanting to specialize",
    "Individuals interested in welding apprenticeships",
  ],
  outcomes: [
    "Perform MIG, TIG, and stick welding processes safely.",
    "Read and interpret welding blueprints and symbols.",
    "Understand metallurgy and welding procedures.",
    "Follow welding codes and quality standards.",
    "Prepare for AWS welding certification tests.",
  ],
  modules: [
    {
      id: "weld-mod-1",
      title: "Welding Safety and Equipment",
      description:
        "Master welding safety practices and equipment operation.",
      lessons: [
        {
          id: "weld-1-1",
          title: "Welding Safety Fundamentals",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "weld-1-2",
          title: "Personal Protective Equipment for Welding",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "weld-1-3",
          title: "Welding Equipment and Setup",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "weld-1-4",
          title: "Fire Safety and Ventilation",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "weld-1-5",
          title: "Safety Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "weld-mod-2",
      title: "Welding Theory and Metallurgy",
      description:
        "Understand welding principles, metallurgy, and joint design.",
      lessons: [
        {
          id: "weld-2-1",
          title: "Welding Processes Overview",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "weld-2-2",
          title: "Basic Metallurgy for Welders",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "weld-2-3",
          title: "Joint Design and Preparation",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "weld-2-4",
          title: "Welding Positions and Techniques",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "weld-2-5",
          title: "Welding Theory Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "weld-mod-3",
      title: "Shielded Metal Arc Welding (SMAW/Stick)",
      description:
        "Learn stick welding techniques and applications.",
      lessons: [
        {
          id: "weld-3-1",
          title: "SMAW Equipment and Electrodes",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "weld-3-2",
          title: "Flat Position Stick Welding",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "weld-3-3",
          title: "Horizontal and Vertical Stick Welding",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "weld-3-4",
          title: "Overhead Stick Welding",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "weld-3-5",
          title: "SMAW Competency Test",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "weld-mod-4",
      title: "Gas Metal Arc Welding (GMAW/MIG)",
      description:
        "Master MIG welding techniques for various materials.",
      lessons: [
        {
          id: "weld-4-1",
          title: "GMAW Equipment and Setup",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "weld-4-2",
          title: "MIG Welding Parameters",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "weld-4-3",
          title: "Flat and Horizontal MIG Welding",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "weld-4-4",
          title: "Vertical and Overhead MIG Welding",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "weld-4-5",
          title: "GMAW Competency Test",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "weld-mod-5",
      title: "Gas Tungsten Arc Welding (GTAW/TIG)",
      description:
        "Learn precision TIG welding for aluminum and stainless steel.",
      lessons: [
        {
          id: "weld-5-1",
          title: "GTAW Equipment and Tungsten Selection",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "weld-5-2",
          title: "TIG Welding Technique and Control",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "weld-5-3",
          title: "Steel TIG Welding Practice",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "weld-5-4",
          title: "Aluminum TIG Welding",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "weld-5-5",
          title: "GTAW Competency Test",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "weld-mod-6",
      title: "Flux-Cored Arc Welding (FCAW)",
      description:
        "Learn flux-cored welding for structural applications.",
      lessons: [
        {
          id: "weld-6-1",
          title: "FCAW Process and Applications",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "weld-6-2",
          title: "Flux-Cored Welding Setup",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "weld-6-3",
          title: "FCAW Practice in All Positions",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "weld-6-4",
          title: "FCAW Competency Test",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "weld-mod-7",
      title: "Blueprint Reading and Welding Symbols",
      description:
        "Read welding blueprints and interpret welding symbols.",
      lessons: [
        {
          id: "weld-7-1",
          title: "Blueprint Reading Basics",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "weld-7-2",
          title: "Welding Symbols and Specifications",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "weld-7-3",
          title: "Blueprint Reading Practice",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "weld-7-4",
          title: "Welding Procedure Specifications",
          type: "reading",
          durationMinutes: 40,
        },
      ],
    },
    {
      id: "weld-mod-8",
      title: "Welding Inspection and Quality Control",
      description:
        "Learn weld inspection techniques and quality standards.",
      lessons: [
        {
          id: "weld-8-1",
          title: "Visual Weld Inspection",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "weld-8-2",
          title: "Weld Defects and Causes",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "weld-8-3",
          title: "Inspection Practice and Testing",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "weld-8-4",
          title: "Welding Codes and Standards",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "weld-8-5",
          title: "Quality Control Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "weld-mod-9",
      title: "AWS Certification Preparation",
      description:
        "Prepare for AWS welding certification tests.",
      lessons: [
        {
          id: "weld-9-1",
          title: "AWS Certification Overview",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "weld-9-2",
          title: "Practice Weld Test 1",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "weld-9-3",
          title: "Practice Weld Test 2",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "weld-9-4",
          title: "Written Exam Preparation",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "weld-9-5",
          title: "Final Skills Assessment",
          type: "lab",
          durationMinutes: 150,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/welding",
  isPublished: true,
};
