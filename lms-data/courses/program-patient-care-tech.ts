// lms-data/courses/program-patient-care-tech.ts

import type { Course } from "@/types/course";

export const patientCareTechCourse: Course = {
  id: "pct-001",
  slug: "patient-care-tech",
  title: "Patient Care Technician Program",
  shortTitle: "Patient Care Tech",
  credentialPartner: "NHA",
  externalCredentialName: "Certified Patient Care Technician (CPCT)",
  description:
    "This Patient Care Technician program builds on CNA skills to prepare you for advanced patient care roles in hospitals and medical centers. You'll learn EKG, phlebotomy, vital signs monitoring, and specialized patient care techniques.",
  hoursTotal: 160,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Hospital Clinical Sites",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "CNAs looking to advance their careers",
    "Adults seeking hospital-based patient care roles",
    "Healthcare workers wanting to expand their skill set",
  ],
  outcomes: [
    "Provide advanced patient care in hospital settings.",
    "Perform EKGs, phlebotomy, and vital signs monitoring.",
    "Assist with patient mobility and rehabilitation.",
    "Maintain infection control and safety protocols.",
    "Prepare for national Patient Care Technician certification.",
  ],
  modules: [
    {
      id: "pct-mod-1",
      title: "Advanced Patient Care Fundamentals",
      description:
        "Build on CNA skills with advanced patient care techniques and hospital protocols.",
      lessons: [
        {
          id: "pct-1-1",
          title: "Patient Care Technician Role in Hospitals",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pct-1-2",
          title: "Hospital Systems and Departments",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "pct-1-3",
          title: "Advanced Patient Assessment",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "pct-1-4",
          title: "Documentation and Charting",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "pct-1-5",
          title: "Fundamentals Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "pct-mod-2",
      title: "Advanced Vital Signs and Monitoring",
      description:
        "Master advanced vital signs monitoring and patient assessment techniques.",
      lessons: [
        {
          id: "pct-2-1",
          title: "Advanced Vital Signs Monitoring",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pct-2-2",
          title: "Cardiac Monitoring Basics",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "pct-2-3",
          title: "Oxygen Saturation and Pulse Oximetry",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "pct-2-4",
          title: "Intake and Output Monitoring",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "pct-2-5",
          title: "Monitoring Competency Check",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "pct-mod-3",
      title: "EKG for Patient Care Technicians",
      description:
        "Learn to perform 12-lead EKGs and basic rhythm recognition.",
      lessons: [
        {
          id: "pct-3-1",
          title: "EKG Basics and Equipment",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pct-3-2",
          title: "12-Lead EKG Placement",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "pct-3-3",
          title: "EKG Performance Practice",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "pct-3-4",
          title: "Basic Rhythm Recognition",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "pct-3-5",
          title: "EKG Competency Assessment",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "pct-mod-4",
      title: "Phlebotomy for Patient Care Technicians",
      description:
        "Master blood collection techniques and specimen handling.",
      lessons: [
        {
          id: "pct-4-1",
          title: "Phlebotomy Basics and Safety",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pct-4-2",
          title: "Venipuncture Techniques",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "pct-4-3",
          title: "Venipuncture Practice Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "pct-4-4",
          title: "Capillary Puncture and Specimen Handling",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "pct-4-5",
          title: "Phlebotomy Competency Check",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "pct-mod-5",
      title: "Specialized Patient Care Procedures",
      description:
        "Learn specialized procedures including catheter care, wound care, and specimen collection.",
      lessons: [
        {
          id: "pct-5-1",
          title: "Urinary Catheter Care",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pct-5-2",
          title: "Basic Wound Care and Dressing Changes",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "pct-5-3",
          title: "Specimen Collection Procedures",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "pct-5-4",
          title: "Ostomy Care Basics",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "pct-5-5",
          title: "Specialized Procedures Practice",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "pct-mod-6",
      title: "Patient Mobility and Rehabilitation Support",
      description:
        "Assist with patient mobility, transfers, and rehabilitation exercises.",
      lessons: [
        {
          id: "pct-6-1",
          title: "Advanced Transfer Techniques",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pct-6-2",
          title: "Ambulation Assistance",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "pct-6-3",
          title: "Range of Motion Exercises",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "pct-6-4",
          title: "Assistive Devices and Equipment",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "pct-6-5",
          title: "Mobility Competency Check",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "pct-mod-7",
      title: "Medical Equipment and Technology",
      description:
        "Learn to operate and maintain common medical equipment in patient care.",
      lessons: [
        {
          id: "pct-7-1",
          title: "Medical Equipment Overview",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "pct-7-2",
          title: "IV Pump and Feeding Pump Monitoring",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "pct-7-3",
          title: "Sequential Compression Devices",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "pct-7-4",
          title: "Patient Monitoring Systems",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "pct-7-5",
          title: "Equipment Safety and Troubleshooting",
          type: "reading",
          durationMinutes: 35,
        },
      ],
    },
    {
      id: "pct-mod-8",
      title: "Certification Preparation and Clinical Experience",
      description:
        "Prepare for CPCT certification and complete supervised hospital clinical hours.",
      lessons: [
        {
          id: "pct-8-1",
          title: "CPCT Exam Overview",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "pct-8-2",
          title: "Practice Exam 1",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "pct-8-3",
          title: "Practice Exam 2",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "pct-8-4",
          title: "Hospital Clinical Experience",
          type: "lab",
          durationMinutes: 480,
        },
        {
          id: "pct-8-5",
          title: "Final Skills Competency Assessment",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/patient-care-tech",
  isPublished: true,
};
