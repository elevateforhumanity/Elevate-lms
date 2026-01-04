// lms-data/courses/program-medical-assistant.ts

import type { Course } from "@/types/course";

export const medicalAssistantCourse: Course = {
  id: "ma-001",
  slug: "medical-assistant",
  title: "Medical Assistant Program",
  shortTitle: "Medical Assistant",
  credentialPartner: "NHA",
  externalCredentialName: "Certified Medical Assistant (CMA)",
  description:
    "This Medical Assistant program prepares you for both clinical and administrative roles in healthcare settings. You'll learn patient care, medical procedures, office management, and prepare for national certification.",
  hoursTotal: 240,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Clinical Sites",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults seeking healthcare careers",
    "CNAs looking to advance their skills",
    "High school graduates interested in medical field",
  ],
  outcomes: [
    "Perform clinical procedures including vital signs, injections, and EKGs.",
    "Manage medical office tasks including scheduling and billing.",
    "Maintain patient records and ensure HIPAA compliance.",
    "Assist physicians with examinations and procedures.",
    "Prepare for national Medical Assistant certification exam.",
  ],
  modules: [
    {
      id: "ma-mod-1",
      title: "Introduction to Medical Assisting",
      description:
        "Understand the medical assistant role, healthcare settings, and professional expectations.",
      lessons: [
        {
          id: "ma-1-1",
          title: "Medical Assistant Role and Responsibilities",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ma-1-2",
          title: "Healthcare Settings and Team Dynamics",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "ma-1-3",
          title: "Professional Ethics and Legal Responsibilities",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ma-1-4",
          title: "Introduction to Medical Assisting Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "ma-mod-2",
      title: "Medical Terminology and Anatomy",
      description:
        "Learn essential medical terminology and basic human anatomy and physiology.",
      lessons: [
        {
          id: "ma-2-1",
          title: "Medical Terminology Basics",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "ma-2-2",
          title: "Body Systems Overview",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "ma-2-3",
          title: "Common Medical Abbreviations",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "ma-2-4",
          title: "Medical Terminology Practice",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "ma-2-5",
          title: "Terminology and Anatomy Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "ma-mod-3",
      title: "Infection Control and Safety",
      description:
        "Master infection control procedures, safety protocols, and OSHA standards.",
      lessons: [
        {
          id: "ma-3-1",
          title: "Infection Control Principles",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ma-3-2",
          title: "Hand Hygiene and PPE",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "ma-3-3",
          title: "Sterilization and Disinfection",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "ma-3-4",
          title: "Bloodborne Pathogens and OSHA Standards",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "ma-3-5",
          title: "Safety and Infection Control Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "ma-mod-4",
      title: "Clinical Skills - Vital Signs and Measurements",
      description:
        "Learn to accurately measure and record vital signs and patient measurements.",
      lessons: [
        {
          id: "ma-4-1",
          title: "Vital Signs Overview",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "ma-4-2",
          title: "Blood Pressure Measurement",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "ma-4-3",
          title: "Temperature, Pulse, and Respiration",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "ma-4-4",
          title: "Height, Weight, and BMI",
          type: "lab",
          durationMinutes: 45,
        },
        {
          id: "ma-4-5",
          title: "Vital Signs Competency Check",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "ma-mod-5",
      title: "Patient Care and Examination Assistance",
      description:
        "Assist with patient examinations and learn proper positioning and draping.",
      lessons: [
        {
          id: "ma-5-1",
          title: "Patient Preparation and Positioning",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ma-5-2",
          title: "Assisting with Physical Examinations",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "ma-5-3",
          title: "Specialty Examinations",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "ma-5-4",
          title: "Patient Care Skills Practice",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "ma-mod-6",
      title: "Medication Administration and Pharmacology",
      description:
        "Learn medication administration routes, dosage calculations, and pharmacology basics.",
      lessons: [
        {
          id: "ma-6-1",
          title: "Pharmacology Basics",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "ma-6-2",
          title: "Medication Administration Routes",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "ma-6-3",
          title: "Dosage Calculations",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ma-6-4",
          title: "Injection Techniques Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "ma-6-5",
          title: "Medication Administration Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "ma-mod-7",
      title: "Diagnostic Procedures",
      description:
        "Perform EKGs, collect specimens, and assist with diagnostic testing.",
      lessons: [
        {
          id: "ma-7-1",
          title: "EKG Basics and Lead Placement",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ma-7-2",
          title: "EKG Performance Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "ma-7-3",
          title: "Specimen Collection Procedures",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "ma-7-4",
          title: "Laboratory Safety and Quality Control",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "ma-7-5",
          title: "Diagnostic Procedures Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "ma-mod-8",
      title: "Medical Office Administration",
      description:
        "Master front office skills including scheduling, billing, and insurance.",
      lessons: [
        {
          id: "ma-8-1",
          title: "Medical Office Management",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ma-8-2",
          title: "Appointment Scheduling Systems",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "ma-8-3",
          title: "Medical Billing and Coding Basics",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "ma-8-4",
          title: "Insurance and Reimbursement",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "ma-8-5",
          title: "Office Administration Practice",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "ma-mod-9",
      title: "Electronic Health Records and Documentation",
      description:
        "Learn EHR systems, medical documentation, and HIPAA compliance.",
      lessons: [
        {
          id: "ma-9-1",
          title: "Electronic Health Records Overview",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "ma-9-2",
          title: "HIPAA and Patient Privacy",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ma-9-3",
          title: "Medical Documentation Standards",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "ma-9-4",
          title: "EHR Practice Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "ma-9-5",
          title: "Documentation and Privacy Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "ma-mod-10",
      title: "Certification Preparation and Clinical Experience",
      description:
        "Prepare for national certification and complete supervised clinical hours.",
      lessons: [
        {
          id: "ma-10-1",
          title: "CMA Certification Exam Overview",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "ma-10-2",
          title: "Practice Exam 1",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "ma-10-3",
          title: "Practice Exam 2",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "ma-10-4",
          title: "Clinical Externship Preparation",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "ma-10-5",
          title: "Clinical Externship Hours",
          type: "lab",
          durationMinutes: 480,
        },
        {
          id: "ma-10-6",
          title: "Final Skills Competency Assessment",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/medical-assistant",
  isPublished: true,
};
