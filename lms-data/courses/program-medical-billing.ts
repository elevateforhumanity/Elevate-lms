// lms-data/courses/program-medical-billing.ts

import type { Course } from "@/types/course";

export const medicalBillingCourse: Course = {
  id: "medbill-001",
  slug: "medical-billing",
  title: "Medical Billing and Coding Program",
  shortTitle: "Medical Billing",
  credentialPartner: "AAPC",
  externalCredentialName: "Certified Professional Coder (CPC)",
  description:
    "This Medical Billing and Coding program prepares you for careers in healthcare revenue cycle management. You'll learn ICD-10, CPT coding, medical terminology, insurance billing, and prepare for national certification.",
  hoursTotal: 240,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Online",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults seeking healthcare administrative careers",
    "Medical office workers wanting to specialize",
    "Work-from-home career seekers",
  ],
  outcomes: [
    "Assign accurate ICD-10 and CPT codes to medical procedures.",
    "Process insurance claims and handle billing procedures.",
    "Understand medical terminology and anatomy.",
    "Navigate healthcare reimbursement systems.",
    "Prepare for CPC certification exam.",
  ],
  modules: [
    {
      id: "medbill-mod-1",
      title: "Introduction to Medical Billing and Coding",
      description:
        "Understand the medical billing and coding profession.",
      lessons: [
        {
          id: "medbill-1-1",
          title: "Medical Billing and Coding Career Overview",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "medbill-1-2",
          title: "Healthcare Revenue Cycle",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "medbill-1-3",
          title: "Professional Ethics and HIPAA",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "medbill-1-4",
          title: "Certification Pathways",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "medbill-1-5",
          title: "Introduction Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "medbill-mod-2",
      title: "Medical Terminology and Anatomy",
      description:
        "Master medical terminology and body systems.",
      lessons: [
        {
          id: "medbill-2-1",
          title: "Medical Terminology Fundamentals",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "medbill-2-2",
          title: "Body Systems Overview",
          type: "video",
          durationMinutes: 50,
        },
        {
          id: "medbill-2-3",
          title: "Medical Abbreviations",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "medbill-2-4",
          title: "Terminology Practice",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "medbill-2-5",
          title: "Medical Terminology Quiz",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "medbill-mod-3",
      title: "ICD-10-CM Diagnosis Coding",
      description:
        "Learn ICD-10-CM coding system and guidelines.",
      lessons: [
        {
          id: "medbill-3-1",
          title: "ICD-10-CM Structure and Organization",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "medbill-3-2",
          title: "ICD-10-CM Coding Guidelines",
          type: "video",
          durationMinutes: 50,
        },
        {
          id: "medbill-3-3",
          title: "Diagnosis Coding Practice",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "medbill-3-4",
          title: "Complex Diagnosis Coding",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "medbill-3-5",
          title: "ICD-10 Quiz",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "medbill-mod-4",
      title: "CPT and HCPCS Procedure Coding",
      description:
        "Master CPT and HCPCS coding for procedures and services.",
      lessons: [
        {
          id: "medbill-4-1",
          title: "CPT Coding System Overview",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "medbill-4-2",
          title: "Evaluation and Management Coding",
          type: "video",
          durationMinutes: 50,
        },
        {
          id: "medbill-4-3",
          title: "Surgery and Procedure Coding",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "medbill-4-4",
          title: "HCPCS Level II Coding",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "medbill-4-5",
          title: "CPT Coding Practice",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "medbill-4-6",
          title: "CPT Quiz",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "medbill-mod-5",
      title: "Medical Insurance and Reimbursement",
      description:
        "Understand insurance types and reimbursement methodologies.",
      lessons: [
        {
          id: "medbill-5-1",
          title: "Health Insurance Types",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "medbill-5-2",
          title: "Medicare and Medicaid",
          type: "video",
          durationMinutes: 50,
        },
        {
          id: "medbill-5-3",
          title: "Commercial Insurance Plans",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "medbill-5-4",
          title: "Reimbursement Methodologies",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "medbill-5-5",
          title: "Insurance Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "medbill-mod-6",
      title: "Claims Processing and Billing",
      description:
        "Learn to process insurance claims and handle billing.",
      lessons: [
        {
          id: "medbill-6-1",
          title: "CMS-1500 Claim Form",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "medbill-6-2",
          title: "Electronic Claims Submission",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "medbill-6-3",
          title: "Claims Processing Practice",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "medbill-6-4",
          title: "Claim Denials and Appeals",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "medbill-6-5",
          title: "Billing Practice Scenarios",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "medbill-mod-7",
      title: "Medical Office Software",
      description:
        "Use practice management and billing software systems.",
      lessons: [
        {
          id: "medbill-7-1",
          title: "Practice Management Software Overview",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "medbill-7-2",
          title: "Patient Registration and Scheduling",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "medbill-7-3",
          title: "Charge Entry and Coding",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "medbill-7-4",
          title: "Payment Posting and Reconciliation",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "medbill-7-5",
          title: "Reporting and Analytics",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "medbill-mod-8",
      title: "Compliance and Auditing",
      description:
        "Understand compliance requirements and coding audits.",
      lessons: [
        {
          id: "medbill-8-1",
          title: "Healthcare Compliance Overview",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "medbill-8-2",
          title: "Fraud and Abuse Prevention",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "medbill-8-3",
          title: "Coding Audits and Quality Review",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "medbill-8-4",
          title: "Compliance Practice",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "medbill-8-5",
          title: "Compliance Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "medbill-mod-9",
      title: "Specialty Coding",
      description:
        "Learn coding for medical specialties.",
      lessons: [
        {
          id: "medbill-9-1",
          title: "Surgical Coding",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "medbill-9-2",
          title: "Radiology and Laboratory Coding",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "medbill-9-3",
          title: "Anesthesia Coding",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "medbill-9-4",
          title: "Specialty Coding Practice",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "medbill-mod-10",
      title: "CPC Certification Preparation",
      description:
        "Prepare for the Certified Professional Coder exam.",
      lessons: [
        {
          id: "medbill-10-1",
          title: "CPC Exam Overview and Strategy",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "medbill-10-2",
          title: "Practice Exam 1",
          type: "quiz",
          durationMinutes: 180,
        },
        {
          id: "medbill-10-3",
          title: "Practice Exam 2",
          type: "quiz",
          durationMinutes: 180,
        },
        {
          id: "medbill-10-4",
          title: "Exam Review and Tips",
          type: "video",
          durationMinutes: 60,
        },
        {
          id: "medbill-10-5",
          title: "Final Coding Assessment",
          type: "lab",
          durationMinutes: 150,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/medical-billing",
  isPublished: true,
};
