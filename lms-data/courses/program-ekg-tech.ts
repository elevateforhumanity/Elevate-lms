// lms-data/courses/program-ekg-tech.ts

import type { Course } from "@/types/course";

export const ekgTechCourse: Course = {
  id: "ekg-001",
  slug: "ekg-tech",
  title: "EKG Technician Program",
  shortTitle: "EKG Tech",
  credentialPartner: "NHA",
  externalCredentialName: "Certified EKG Technician (CET)",
  description:
    "This EKG Technician program prepares you to perform electrocardiograms and cardiac monitoring in hospitals, clinics, and cardiac care centers. You'll learn EKG equipment operation, lead placement, rhythm interpretation basics, and patient care.",
  hoursTotal: 100,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Clinical Sites",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "CNAs or medical assistants looking to specialize",
    "Adults seeking entry-level cardiac care careers",
    "Healthcare workers wanting to expand their skills",
  ],
  outcomes: [
    "Perform 12-lead EKGs accurately and efficiently.",
    "Apply cardiac monitoring equipment and interpret basic rhythms.",
    "Recognize cardiac emergencies and respond appropriately.",
    "Provide compassionate patient care during cardiac procedures.",
    "Prepare for national EKG Technician certification exam.",
  ],
  modules: [
    {
      id: "ekg-mod-1",
      title: "Introduction to EKG Technology",
      description:
        "Understand the EKG technician role, cardiac care settings, and professional responsibilities.",
      lessons: [
        {
          id: "ekg-1-1",
          title: "EKG Technician Role and Career Opportunities",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "ekg-1-2",
          title: "Cardiac Care Settings and Team Dynamics",
          type: "video",
          durationMinutes: 25,
        },
        {
          id: "ekg-1-3",
          title: "Professional Ethics and Patient Rights",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "ekg-1-4",
          title: "Patient Communication and Preparation",
          type: "video",
          durationMinutes: 25,
        },
        {
          id: "ekg-1-5",
          title: "Introduction Quiz",
          type: "quiz",
          durationMinutes: 15,
        },
      ],
    },
    {
      id: "ekg-mod-2",
      title: "Cardiac Anatomy and Physiology",
      description:
        "Learn heart anatomy, cardiac cycle, and electrical conduction system.",
      lessons: [
        {
          id: "ekg-2-1",
          title: "Heart Anatomy and Structure",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ekg-2-2",
          title: "Cardiac Cycle and Blood Flow",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "ekg-2-3",
          title: "Electrical Conduction System",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "ekg-2-4",
          title: "Cardiac Anatomy Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "ekg-mod-3",
      title: "EKG Equipment and Lead Placement",
      description:
        "Master EKG equipment operation and proper electrode placement.",
      lessons: [
        {
          id: "ekg-3-1",
          title: "EKG Equipment Overview",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "ekg-3-2",
          title: "12-Lead EKG Lead Placement",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "ekg-3-3",
          title: "Lead Placement Practice Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "ekg-3-4",
          title: "Troubleshooting Artifacts and Interference",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "ekg-3-5",
          title: "Lead Placement Competency Check",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "ekg-mod-4",
      title: "EKG Interpretation Basics",
      description:
        "Learn to identify normal and abnormal EKG waveforms and rhythms.",
      lessons: [
        {
          id: "ekg-4-1",
          title: "EKG Waveforms and Intervals",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ekg-4-2",
          title: "Normal Sinus Rhythm",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "ekg-4-3",
          title: "Common Cardiac Arrhythmias",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "ekg-4-4",
          title: "Rhythm Strip Interpretation Practice",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "ekg-4-5",
          title: "EKG Interpretation Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "ekg-mod-5",
      title: "Cardiac Monitoring and Emergency Response",
      description:
        "Learn continuous cardiac monitoring and emergency cardiac care basics.",
      lessons: [
        {
          id: "ekg-5-1",
          title: "Continuous Cardiac Monitoring",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "ekg-5-2",
          title: "Telemetry Monitoring Systems",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "ekg-5-3",
          title: "Recognizing Cardiac Emergencies",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "ekg-5-4",
          title: "Emergency Response Procedures",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "ekg-5-5",
          title: "Monitoring Practice Lab",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "ekg-mod-6",
      title: "Certification Preparation and Clinical Practice",
      description:
        "Prepare for certification exam and complete supervised clinical hours.",
      lessons: [
        {
          id: "ekg-6-1",
          title: "CET Exam Overview and Study Strategies",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "ekg-6-2",
          title: "Practice Exam 1",
          type: "quiz",
          durationMinutes: 60,
        },
        {
          id: "ekg-6-3",
          title: "Practice Exam 2",
          type: "quiz",
          durationMinutes: 60,
        },
        {
          id: "ekg-6-4",
          title: "Clinical Practice Hours",
          type: "lab",
          durationMinutes: 240,
        },
        {
          id: "ekg-6-5",
          title: "Final Competency Assessment",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/ekg-tech",
  isPublished: true,
};
