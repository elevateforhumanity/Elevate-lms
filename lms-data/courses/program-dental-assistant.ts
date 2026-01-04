// lms-data/courses/program-dental-assistant.ts

import type { Course } from "@/types/course";

export const dentalAssistantCourse: Course = {
  id: "da-001",
  slug: "dental-assistant",
  title: "Dental Assistant Program",
  shortTitle: "Dental Assistant",
  credentialPartner: "DANB",
  externalCredentialName: "Certified Dental Assistant (CDA)",
  description:
    "This Dental Assistant program prepares you to work chairside with dentists, manage dental office operations, and provide quality patient care. You'll learn dental procedures, radiography, infection control, and office management.",
  hoursTotal: 180,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Dental Clinic Sites",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults seeking healthcare careers in dentistry",
    "High school graduates interested in dental field",
    "Career changers looking for stable healthcare roles",
  ],
  outcomes: [
    "Assist dentists with dental procedures and patient care.",
    "Take and process dental radiographs safely and accurately.",
    "Maintain infection control and sterilization protocols.",
    "Manage dental office administrative tasks and patient records.",
    "Prepare for national Dental Assistant certification exam.",
  ],
  modules: [
    {
      id: "da-mod-1",
      title: "Introduction to Dental Assisting",
      description:
        "Understand the dental assistant role, dental team dynamics, and professional responsibilities.",
      lessons: [
        {
          id: "da-1-1",
          title: "Dental Assistant Role and Career Opportunities",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "da-1-2",
          title: "Dental Office Team and Communication",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "da-1-3",
          title: "Professional Ethics and Legal Responsibilities",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "da-1-4",
          title: "Patient Relations and Customer Service",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "da-1-5",
          title: "Introduction to Dental Assisting Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "da-mod-2",
      title: "Dental Anatomy and Terminology",
      description:
        "Learn tooth anatomy, dental terminology, and oral cavity structures.",
      lessons: [
        {
          id: "da-2-1",
          title: "Oral Cavity Anatomy",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "da-2-2",
          title: "Tooth Anatomy and Numbering Systems",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "da-2-3",
          title: "Dental Terminology and Abbreviations",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "da-2-4",
          title: "Tooth Identification Practice",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "da-2-5",
          title: "Anatomy and Terminology Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "da-mod-3",
      title: "Infection Control and Sterilization",
      description:
        "Master infection control protocols, sterilization techniques, and OSHA standards for dental settings.",
      lessons: [
        {
          id: "da-3-1",
          title: "Infection Control Principles in Dentistry",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "da-3-2",
          title: "Personal Protective Equipment and Barriers",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "da-3-3",
          title: "Instrument Processing and Sterilization",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "da-3-4",
          title: "Operatory Disinfection Procedures",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "da-3-5",
          title: "OSHA and CDC Guidelines",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "da-3-6",
          title: "Infection Control Competency Check",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "da-3-7",
          title: "Infection Control Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "da-mod-4",
      title: "Dental Instruments and Equipment",
      description:
        "Identify and properly use dental instruments, equipment, and materials.",
      lessons: [
        {
          id: "da-4-1",
          title: "Basic Hand Instruments",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "da-4-2",
          title: "Rotary Instruments and Handpieces",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "da-4-3",
          title: "Dental Materials Overview",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "da-4-4",
          title: "Instrument Identification Lab",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "da-4-5",
          title: "Tray Setup Practice",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "da-4-6",
          title: "Instruments and Equipment Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "da-mod-5",
      title: "Chairside Assisting Procedures",
      description:
        "Learn four-handed dentistry techniques and chairside assisting skills.",
      lessons: [
        {
          id: "da-5-1",
          title: "Four-Handed Dentistry Principles",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "da-5-2",
          title: "Patient Positioning and Operator Positioning",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "da-5-3",
          title: "Moisture Control Techniques",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "da-5-4",
          title: "Instrument Transfer Techniques",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "da-5-5",
          title: "Assisting with Restorative Procedures",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "da-5-6",
          title: "Chairside Assisting Competency Check",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "da-mod-6",
      title: "Dental Radiography",
      description:
        "Master dental x-ray techniques, radiation safety, and image processing.",
      lessons: [
        {
          id: "da-6-1",
          title: "Radiation Physics and Biology",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "da-6-2",
          title: "Radiation Safety and Protection",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "da-6-3",
          title: "Intraoral Radiographic Techniques",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "da-6-4",
          title: "Bitewing Radiography Lab",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "da-6-5",
          title: "Periapical Radiography Lab",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "da-6-6",
          title: "Panoramic Radiography",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "da-6-7",
          title: "Digital Radiography and Image Processing",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "da-6-8",
          title: "Radiography Competency Assessment",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "da-6-9",
          title: "Radiography Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "da-mod-7",
      title: "Dental Specialties",
      description:
        "Learn procedures and assisting techniques for dental specialties.",
      lessons: [
        {
          id: "da-7-1",
          title: "Oral Surgery Assisting",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "da-7-2",
          title: "Endodontic Procedures",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "da-7-3",
          title: "Periodontal Procedures",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "da-7-4",
          title: "Orthodontic Assisting",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "da-7-5",
          title: "Pediatric Dentistry",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "da-7-6",
          title: "Specialty Procedures Practice",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "da-7-7",
          title: "Dental Specialties Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "da-mod-8",
      title: "Dental Office Management",
      description:
        "Master front office operations, scheduling, billing, and patient records.",
      lessons: [
        {
          id: "da-8-1",
          title: "Dental Office Administration",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "da-8-2",
          title: "Appointment Scheduling and Management",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "da-8-3",
          title: "Dental Insurance and Billing",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "da-8-4",
          title: "Patient Records and Documentation",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "da-8-5",
          title: "Dental Practice Management Software",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "da-8-6",
          title: "Office Management Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/dental-assistant",
  isPublished: true,
};
