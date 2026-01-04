// lms-data/courses/program-forklift.ts

import type { Course } from "@/types/course";

export const forkliftCourse: Course = {
  id: "fork-001",
  slug: "forklift",
  title: "Forklift Operator Certification",
  shortTitle: "Forklift Operator",
  credentialPartner: "OSHA",
  externalCredentialName: "OSHA Forklift Operator Certification",
  description:
    "This Forklift Operator program provides OSHA-compliant training for powered industrial truck operation. You'll learn safe forklift operation, load handling, and workplace safety to meet OSHA 1910.178 requirements.",
  hoursTotal: 40,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Warehouse Practice",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Warehouse workers needing certification",
    "Adults seeking logistics careers",
    "Manufacturing employees requiring forklift skills",
  ],
  outcomes: [
    "Operate forklifts safely and efficiently.",
    "Perform pre-operational inspections.",
    "Handle loads properly and maintain stability.",
    "Follow OSHA safety regulations.",
    "Obtain OSHA forklift operator certification.",
  ],
  modules: [
    {
      id: "fork-mod-1",
      title: "Forklift Safety and OSHA Requirements",
      description:
        "Understand forklift safety principles and OSHA regulations.",
      lessons: [
        {
          id: "fork-1-1",
          title: "OSHA 1910.178 Requirements",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "fork-1-2",
          title: "Forklift Hazards and Safety",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "fork-1-3",
          title: "Personal Protective Equipment",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "fork-1-4",
          title: "Safety Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "fork-mod-2",
      title: "Forklift Types and Components",
      description:
        "Learn about different forklift types and their components.",
      lessons: [
        {
          id: "fork-2-1",
          title: "Forklift Types and Classifications",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "fork-2-2",
          title: "Forklift Components and Controls",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "fork-2-3",
          title: "Stability and Load Capacity",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "fork-2-4",
          title: "Components Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "fork-mod-3",
      title: "Pre-Operational Inspection",
      description:
        "Perform thorough pre-operational forklift inspections.",
      lessons: [
        {
          id: "fork-3-1",
          title: "Daily Inspection Procedures",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "fork-3-2",
          title: "Inspection Checklist Walkthrough",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "fork-3-3",
          title: "Inspection Practice Lab",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "fork-3-4",
          title: "Inspection Competency Check",
          type: "lab",
          durationMinutes: 45,
        },
      ],
    },
    {
      id: "fork-mod-4",
      title: "Forklift Operation and Skills",
      description:
        "Master forklift operation techniques and maneuvering.",
      lessons: [
        {
          id: "fork-4-1",
          title: "Basic Operation and Controls",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "fork-4-2",
          title: "Maneuvering and Steering Practice",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "fork-4-3",
          title: "Load Handling Techniques",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "fork-4-4",
          title: "Stacking and Racking Practice",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "fork-4-5",
          title: "Operation Skills Test",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "fork-4-6",
          title: "Written Certification Exam",
          type: "quiz",
          durationMinutes: 60,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/forklift",
  isPublished: true,
};
