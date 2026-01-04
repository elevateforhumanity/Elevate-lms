// lms-data/courses/program-cna.ts

import type { Course } from "@/types/course";

export const cnaCourse: Course = {
  id: "cna-001",
  slug: "certified-nursing-assistant",
  title: "Certified Nursing Assistant (CNA)",
  shortTitle: "CNA",
  credentialPartner: "CHOICE_MEDICAL",
  externalCredentialName: "State-Approved CNA Certification",
  description:
    "This hands-on CNA program prepares you to work in long-term care, home health, hospitals, and other healthcare settings. You will build the skills to safely care for patients, support nurses, and qualify for state certification testing.",
  hoursTotal: 105, // adjust to your exact breakdown
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults seeking a healthcare career",
    "Youth 18–24 starting in medical careers",
    "Justice-involved individuals ready to re-enter the workforce",
  ],
  outcomes: [
    "Provide safe, respectful bedside care to patients and residents.",
    "Assist with daily living activities including bathing, dressing, and feeding.",
    "Measure and record vital signs accurately.",
    "Communicate effectively with nurses, patients, and families.",
    "Prepare to sit for the state-approved CNA certification exam.",
  ],
  modules: [
    {
      id: "cna-mod-1",
      title: "Introduction to Healthcare & CNA Role",
      description:
        "Understand the healthcare system, the CNA scope of practice, and professional expectations.",
      lessons: [
        {
          id: "cna-1-1",
          title: "Healthcare Settings and the CNA Role",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "CMI-Ch1",
        },
        {
          id: "cna-1-2",
          title: "Legal and Ethical Responsibilities",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "CMI-Ch2",
        },
        {
          id: "cna-1-3",
          title: "Professionalism and Communication",
          type: "video",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "cna-mod-2",
      title: "Infection Control & Safety",
      description:
        "Learn infection prevention, handwashing, PPE, and keeping yourself and residents safe.",
      lessons: [
        {
          id: "cna-2-1",
          title: "Infection Control Basics",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "CMI-Ch3",
        },
        {
          id: "cna-2-2",
          title: "Hand Hygiene & PPE Skills Lab",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "cna-2-3",
          title: "Safety, Falls, and Emergency Procedures",
          type: "video",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "cna-mod-3",
      title: "Basic Nursing Skills & Vital Signs",
      description:
        "Practice measuring and recording vital signs and assisting with daily patient care.",
      lessons: [
        {
          id: "cna-3-1",
          title: "Measuring Vital Signs",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "CMI-Ch4",
        },
        {
          id: "cna-3-2",
          title: "Vital Signs Skills Check",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "cna-3-3",
          title: "CNA Skills Practice Quiz",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "cna-mod-4",
      title: "Personal Care and Activities of Daily Living",
      description:
        "Master essential personal care skills including bathing, grooming, dressing, and toileting assistance.",
      lessons: [
        {
          id: "cna-4-1",
          title: "Bathing and Skin Care",
          type: "reading",
          durationMinutes: 60,
          partnerRefCode: "CMI-Ch5",
        },
        {
          id: "cna-4-2",
          title: "Grooming and Dressing Skills",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "cna-4-3",
          title: "Toileting and Elimination Care",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cna-4-4",
          title: "Personal Care Skills Check",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "cna-mod-5",
      title: "Nutrition and Hydration",
      description:
        "Learn proper feeding techniques, dietary needs, and hydration monitoring for patient care.",
      lessons: [
        {
          id: "cna-5-1",
          title: "Nutrition Basics and Special Diets",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "CMI-Ch6",
        },
        {
          id: "cna-5-2",
          title: "Feeding Assistance Techniques",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "cna-5-3",
          title: "Hydration and Fluid Balance",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "cna-5-4",
          title: "Nutrition Care Quiz",
          type: "quiz",
          durationMinutes: 15,
        },
      ],
    },
    {
      id: "cna-mod-6",
      title: "Mobility and Transfers",
      description:
        "Practice safe patient movement, transfers, and use of mobility equipment.",
      lessons: [
        {
          id: "cna-6-1",
          title: "Body Mechanics and Safe Lifting",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "CMI-Ch7",
        },
        {
          id: "cna-6-2",
          title: "Transfer Techniques Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "cna-6-3",
          title: "Mobility Equipment and Assistive Devices",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "cna-6-4",
          title: "Transfer Skills Competency Check",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "cna-mod-7",
      title: "Restorative Care and Rehabilitation",
      description:
        "Support patient independence through restorative care techniques and rehabilitation assistance.",
      lessons: [
        {
          id: "cna-7-1",
          title: "Restorative Care Principles",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cna-7-2",
          title: "Range of Motion Exercises",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "cna-7-3",
          title: "Rehabilitation Support Techniques",
          type: "video",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "cna-mod-8",
      title: "Mental Health and Dementia Care",
      description:
        "Understand mental health conditions, dementia care, and behavioral management strategies.",
      lessons: [
        {
          id: "cna-8-1",
          title: "Mental Health Basics",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "CMI-Ch8",
        },
        {
          id: "cna-8-2",
          title: "Dementia and Alzheimer's Care",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "cna-8-3",
          title: "Behavioral Management Strategies",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "cna-8-4",
          title: "Mental Health Care Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "cna-mod-9",
      title: "End-of-Life Care",
      description:
        "Provide compassionate end-of-life care and support for patients and families.",
      lessons: [
        {
          id: "cna-9-1",
          title: "End-of-Life Care Principles",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cna-9-2",
          title: "Hospice and Palliative Care",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cna-9-3",
          title: "Supporting Families Through Grief",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "cna-9-4",
          title: "Post-Mortem Care",
          type: "reading",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "cna-mod-10",
      title: "Special Populations",
      description:
        "Learn specialized care for pediatric, geriatric, and special needs patients.",
      lessons: [
        {
          id: "cna-10-1",
          title: "Pediatric Patient Care",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cna-10-2",
          title: "Geriatric Care Considerations",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cna-10-3",
          title: "Special Needs and Disabilities",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "cna-10-4",
          title: "Special Populations Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "cna-mod-11",
      title: "Documentation and Communication",
      description:
        "Master accurate documentation, reporting, and professional communication in healthcare.",
      lessons: [
        {
          id: "cna-11-1",
          title: "Medical Documentation Standards",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cna-11-2",
          title: "Charting and Record Keeping",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "cna-11-3",
          title: "Professional Communication Skills",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "cna-11-4",
          title: "Documentation Practice",
          type: "lab",
          durationMinutes: 45,
        },
      ],
    },
    {
      id: "cna-mod-12",
      title: "CNA Exam Preparation",
      description:
        "Prepare for the state CNA certification exam with practice tests and review.",
      lessons: [
        {
          id: "cna-12-1",
          title: "Written Exam Review",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "cna-12-2",
          title: "Skills Exam Preparation",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "cna-12-3",
          title: "Practice Written Exam",
          type: "quiz",
          durationMinutes: 60,
        },
        {
          id: "cna-12-4",
          title: "Practice Skills Exam",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "cna-mod-13",
      title: "Clinical Experience",
      description:
        "Supervised clinical hours in a healthcare facility to practice CNA skills with real patients.",
      lessons: [
        {
          id: "cna-13-1",
          title: "Clinical Orientation",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "cna-13-2",
          title: "Clinical Rotation Week 1",
          type: "lab",
          durationMinutes: 480,
        },
        {
          id: "cna-13-3",
          title: "Clinical Rotation Week 2",
          type: "lab",
          durationMinutes: 480,
        },
        {
          id: "cna-13-4",
          title: "Clinical Rotation Week 3",
          type: "lab",
          durationMinutes: 480,
        },
        {
          id: "cna-13-5",
          title: "Clinical Rotation Week 4",
          type: "lab",
          durationMinutes: 480,
        },
        {
          id: "cna-13-6",
          title: "Clinical Competency Evaluation",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/certified-nursing-assistant",
  isPublished: true,
};
