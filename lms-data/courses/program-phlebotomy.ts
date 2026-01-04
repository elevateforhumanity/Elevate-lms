// lms-data/courses/program-phlebotomy.ts

import type { Course } from "@/types/course";

export const phlebotomyCourse: Course = {
  id: "phleb-001",
  slug: "phlebotomy",
  title: "Phlebotomy Technician Program",
  shortTitle: "Phlebotomy",
  credentialPartner: "NHA",
  externalCredentialName: "Certified Phlebotomy Technician (CPT)",
  description:
    "This Phlebotomy Technician program prepares you to collect blood specimens for laboratory testing. You'll learn venipuncture techniques, specimen handling, patient care, and safety protocols for hospitals, clinics, and laboratories.",
  hoursTotal: 120,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Clinical Lab Sites",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults seeking entry-level healthcare careers",
    "CNAs or medical assistants looking to specialize",
    "High school graduates interested in laboratory medicine",
  ],
  outcomes: [
    "Perform venipuncture and capillary puncture procedures safely.",
    "Collect, label, and process blood specimens accurately.",
    "Maintain infection control and safety protocols.",
    "Provide compassionate patient care during blood collection.",
    "Prepare for national Phlebotomy Technician certification exam.",
  ],
  modules: [
    {
      id: "phleb-mod-1",
      title: "Introduction to Phlebotomy",
      description:
        "Understand the phlebotomist role, healthcare settings, and professional responsibilities.",
      lessons: [
        {
          id: "phleb-1-1",
          title: "Phlebotomist Role and Career Opportunities",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "phleb-1-2",
          title: "Healthcare Settings and Laboratory Services",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "phleb-1-3",
          title: "Professional Ethics and Legal Responsibilities",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "phleb-1-4",
          title: "Patient Communication and Care",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "phleb-1-5",
          title: "Introduction to Phlebotomy Quiz",
          type: "quiz",
          durationMinutes: 15,
        },
      ],
    },
    {
      id: "phleb-mod-2",
      title: "Anatomy, Physiology, and Medical Terminology",
      description:
        "Learn circulatory system anatomy, blood composition, and medical terminology.",
      lessons: [
        {
          id: "phleb-2-1",
          title: "Circulatory System Anatomy",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "phleb-2-2",
          title: "Blood Composition and Function",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "phleb-2-3",
          title: "Vein Selection and Anatomy",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "phleb-2-4",
          title: "Medical Terminology for Phlebotomy",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "phleb-2-5",
          title: "Anatomy and Terminology Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "phleb-mod-3",
      title: "Infection Control and Safety",
      description:
        "Master infection control procedures, safety protocols, and OSHA standards.",
      lessons: [
        {
          id: "phleb-3-1",
          title: "Infection Control Principles",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "phleb-3-2",
          title: "Hand Hygiene and PPE",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "phleb-3-3",
          title: "Bloodborne Pathogens and OSHA Standards",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "phleb-3-4",
          title: "Needlestick Prevention and Sharps Safety",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "phleb-3-5",
          title: "Safety and Infection Control Quiz",
          type: "quiz",
          durationMinutes: 15,
        },
      ],
    },
    {
      id: "phleb-mod-4",
      title: "Venipuncture Equipment and Procedures",
      description:
        "Learn venipuncture equipment, techniques, and best practices.",
      lessons: [
        {
          id: "phleb-4-1",
          title: "Venipuncture Equipment Overview",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "phleb-4-2",
          title: "Evacuated Tube System",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "phleb-4-3",
          title: "Syringe and Butterfly Methods",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "phleb-4-4",
          title: "Venipuncture Procedure Steps",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "phleb-4-5",
          title: "Venipuncture Practice on Training Arms",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "phleb-4-6",
          title: "Venipuncture Competency Check",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "phleb-mod-5",
      title: "Capillary Puncture and Special Collections",
      description:
        "Master capillary puncture techniques and special collection procedures.",
      lessons: [
        {
          id: "phleb-5-1",
          title: "Capillary Puncture Principles",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "phleb-5-2",
          title: "Capillary Puncture Techniques",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "phleb-5-3",
          title: "Pediatric and Geriatric Collections",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "phleb-5-4",
          title: "Special Collection Procedures",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "phleb-5-5",
          title: "Capillary Puncture Competency Check",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "phleb-mod-6",
      title: "Specimen Handling and Processing",
      description:
        "Learn proper specimen handling, labeling, processing, and transportation.",
      lessons: [
        {
          id: "phleb-6-1",
          title: "Specimen Labeling and Identification",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "phleb-6-2",
          title: "Order of Draw and Tube Additives",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "phleb-6-3",
          title: "Specimen Processing and Centrifugation",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "phleb-6-4",
          title: "Specimen Transportation and Storage",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "phleb-6-5",
          title: "Quality Control and Error Prevention",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "phleb-6-6",
          title: "Specimen Handling Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/phlebotomy",
  isPublished: true,
};
