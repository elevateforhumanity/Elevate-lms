// lms-data/courses/program-pharmacy-tech.ts

import type { Course } from "@/types/course";

export const pharmacyTechCourse: Course = {
  id: "pt-001",
  slug: "pharmacy-tech",
  title: "Pharmacy Technician Program",
  shortTitle: "Pharmacy Tech",
  credentialPartner: "PTCB",
  externalCredentialName: "Certified Pharmacy Technician (CPhT)",
  description:
    "This Pharmacy Technician program prepares you to assist pharmacists in dispensing medications, managing inventory, and providing patient care. You'll learn medication safety, pharmacy calculations, insurance processing, and prepare for national certification.",
  hoursTotal: 200,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Pharmacy Externship Sites",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults seeking healthcare careers in pharmacy",
    "High school graduates interested in pharmaceutical field",
    "Career changers looking for stable healthcare roles",
  ],
  outcomes: [
    "Assist pharmacists with medication dispensing and patient counseling.",
    "Perform accurate pharmacy calculations and measurements.",
    "Process prescriptions and insurance claims efficiently.",
    "Maintain medication inventory and ensure proper storage.",
    "Prepare for national Pharmacy Technician certification exam.",
  ],
  modules: [
    {
      id: "pt-mod-1",
      title: "Introduction to Pharmacy Practice",
      description:
        "Understand the pharmacy technician role, pharmacy settings, and professional responsibilities.",
      lessons: [
        {
          id: "pt-1-1",
          title: "Pharmacy Technician Role and Scope of Practice",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "pt-1-2",
          title: "Pharmacy Settings and Career Opportunities",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "pt-1-3",
          title: "Pharmacy Law and Ethics",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "pt-1-4",
          title: "Professional Communication and Patient Care",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "pt-1-5",
          title: "Introduction to Pharmacy Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "pt-mod-2",
      title: "Pharmaceutical Terminology and Abbreviations",
      description:
        "Learn medical and pharmaceutical terminology, abbreviations, and drug nomenclature.",
      lessons: [
        {
          id: "pt-2-1",
          title: "Medical Terminology for Pharmacy",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "pt-2-2",
          title: "Pharmaceutical Abbreviations and Symbols",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pt-2-3",
          title: "Drug Names: Generic, Brand, and Chemical",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "pt-2-4",
          title: "Terminology Practice Exercises",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "pt-2-5",
          title: "Terminology Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "pt-mod-3",
      title: "Pharmacy Calculations and Measurements",
      description:
        "Master pharmaceutical calculations, conversions, and dosage determinations.",
      lessons: [
        {
          id: "pt-3-1",
          title: "Measurement Systems and Conversions",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "pt-3-2",
          title: "Dosage Calculations",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "pt-3-3",
          title: "Percentage Strength and Dilutions",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "pt-3-4",
          title: "IV Flow Rate Calculations",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pt-3-5",
          title: "Calculations Practice Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "pt-3-6",
          title: "Pharmacy Calculations Quiz",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "pt-mod-4",
      title: "Pharmacology and Drug Classifications",
      description:
        "Learn drug classifications, mechanisms of action, and common medications.",
      lessons: [
        {
          id: "pt-4-1",
          title: "Introduction to Pharmacology",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "pt-4-2",
          title: "Drug Classifications and Therapeutic Uses",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "pt-4-3",
          title: "Common Medications by Body System",
          type: "video",
          durationMinutes: 50,
        },
        {
          id: "pt-4-4",
          title: "Drug Interactions and Side Effects",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "pt-4-5",
          title: "Controlled Substances and Regulations",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pt-4-6",
          title: "Pharmacology Practice",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "pt-4-7",
          title: "Pharmacology Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "pt-mod-5",
      title: "Prescription Processing",
      description:
        "Learn to receive, interpret, and process prescriptions accurately and efficiently.",
      lessons: [
        {
          id: "pt-5-1",
          title: "Prescription Components and Interpretation",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "pt-5-2",
          title: "Prescription Entry and Data Management",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "pt-5-3",
          title: "Prescription Verification and Error Prevention",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "pt-5-4",
          title: "Refill Processing and Authorization",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "pt-5-5",
          title: "Prescription Processing Practice",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "pt-5-6",
          title: "Prescription Processing Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "pt-mod-6",
      title: "Medication Dispensing and Compounding",
      description:
        "Master medication counting, measuring, and basic compounding techniques.",
      lessons: [
        {
          id: "pt-6-1",
          title: "Medication Dispensing Procedures",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pt-6-2",
          title: "Counting and Measuring Techniques",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "pt-6-3",
          title: "Packaging and Labeling Requirements",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "pt-6-4",
          title: "Non-Sterile Compounding Basics",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "pt-6-5",
          title: "Sterile Compounding Introduction",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "pt-6-6",
          title: "Dispensing Competency Check",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "pt-mod-7",
      title: "Pharmacy Billing and Insurance",
      description:
        "Process insurance claims, manage billing, and handle payment transactions.",
      lessons: [
        {
          id: "pt-7-1",
          title: "Insurance Types and Coverage",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "pt-7-2",
          title: "Insurance Claim Processing",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "pt-7-3",
          title: "Prior Authorization and Appeals",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "pt-7-4",
          title: "Medicare and Medicaid Programs",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pt-7-5",
          title: "Billing Practice Scenarios",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "pt-7-6",
          title: "Insurance and Billing Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "pt-mod-8",
      title: "Inventory Management and Medication Safety",
      description:
        "Manage pharmacy inventory, ensure medication safety, and prevent errors.",
      lessons: [
        {
          id: "pt-8-1",
          title: "Inventory Management Systems",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pt-8-2",
          title: "Ordering and Receiving Medications",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "pt-8-3",
          title: "Medication Storage and Handling",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "pt-8-4",
          title: "Medication Error Prevention",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "pt-8-5",
          title: "Controlled Substance Inventory",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "pt-8-6",
          title: "Inventory and Safety Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "pt-mod-9",
      title: "Certification Preparation and Externship",
      description:
        "Prepare for PTCB certification exam and complete supervised pharmacy externship.",
      lessons: [
        {
          id: "pt-9-1",
          title: "PTCB Exam Overview and Study Strategies",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pt-9-2",
          title: "Practice Exam 1",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "pt-9-3",
          title: "Practice Exam 2",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "pt-9-4",
          title: "Externship Preparation and Expectations",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "pt-9-5",
          title: "Pharmacy Externship Hours",
          type: "lab",
          durationMinutes: 480,
        },
        {
          id: "pt-9-6",
          title: "Final Competency Assessment",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/pharmacy-tech",
  isPublished: true,
};
