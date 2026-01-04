// lms-data/courses/program-behavioral-health.ts

import type { Course } from "@/types/course";

export const behavioralHealthCourse: Course = {
  id: "bh-001",
  slug: "behavioral-health",
  title: "Behavioral Health Technician Program",
  shortTitle: "Behavioral Health Tech",
  credentialPartner: "OTHER",
  externalCredentialName: "Behavioral Health Technician Certificate",
  description:
    "This Behavioral Health Technician program prepares you to support individuals with mental health and substance use disorders. You'll learn crisis intervention, therapeutic communication, documentation, and trauma-informed care principles.",
  hoursTotal: 180,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Behavioral Health Facilities",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults interested in mental health careers",
    "CNAs or healthcare workers wanting to specialize",
    "Individuals with lived experience in recovery",
  ],
  outcomes: [
    "Provide direct support to individuals with mental health conditions.",
    "Apply crisis intervention and de-escalation techniques.",
    "Use trauma-informed care principles in daily practice.",
    "Document observations and maintain accurate records.",
    "Support treatment plans and therapeutic activities.",
  ],
  modules: [
    {
      id: "bh-mod-1",
      title: "Introduction to Behavioral Health",
      description:
        "Understand mental health, behavioral health systems, and the technician role.",
      lessons: [
        {
          id: "bh-1-1",
          title: "Behavioral Health Technician Role",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "bh-1-2",
          title: "Mental Health and Behavioral Health Systems",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "bh-1-3",
          title: "Ethics and Professional Boundaries",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "bh-1-4",
          title: "Self-Care for Behavioral Health Workers",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "bh-1-5",
          title: "Introduction Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "bh-mod-2",
      title: "Mental Health Conditions",
      description:
        "Learn about common mental health disorders and their symptoms.",
      lessons: [
        {
          id: "bh-2-1",
          title: "Mood Disorders",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "bh-2-2",
          title: "Anxiety Disorders",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "bh-2-3",
          title: "Psychotic Disorders",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "bh-2-4",
          title: "Personality and Trauma-Related Disorders",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "bh-2-5",
          title: "Mental Health Conditions Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "bh-mod-3",
      title: "Substance Use Disorders",
      description:
        "Understand addiction, substance use disorders, and recovery principles.",
      lessons: [
        {
          id: "bh-3-1",
          title: "Addiction and Substance Use Disorders",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "bh-3-2",
          title: "Co-Occurring Disorders",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "bh-3-3",
          title: "Recovery Principles and Stages of Change",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "bh-3-4",
          title: "Harm Reduction Approaches",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "bh-3-5",
          title: "Substance Use Disorders Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "bh-mod-4",
      title: "Therapeutic Communication",
      description:
        "Master therapeutic communication techniques and active listening skills.",
      lessons: [
        {
          id: "bh-4-1",
          title: "Therapeutic Communication Principles",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "bh-4-2",
          title: "Active Listening and Empathy",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "bh-4-3",
          title: "Motivational Interviewing Basics",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "bh-4-4",
          title: "Communication Practice Scenarios",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "bh-4-5",
          title: "Communication Skills Assessment",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "bh-mod-5",
      title: "Crisis Intervention and De-Escalation",
      description:
        "Learn crisis intervention techniques and de-escalation strategies.",
      lessons: [
        {
          id: "bh-5-1",
          title: "Crisis Assessment and Intervention",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "bh-5-2",
          title: "De-Escalation Techniques",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "bh-5-3",
          title: "Suicide Risk Assessment and Response",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "bh-5-4",
          title: "Crisis Intervention Practice",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "bh-5-5",
          title: "Crisis Intervention Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "bh-mod-6",
      title: "Trauma-Informed Care",
      description:
        "Apply trauma-informed care principles in behavioral health settings.",
      lessons: [
        {
          id: "bh-6-1",
          title: "Understanding Trauma and Its Effects",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "bh-6-2",
          title: "Trauma-Informed Care Principles",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "bh-6-3",
          title: "Creating Safe and Supportive Environments",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "bh-6-4",
          title: "Trauma-Informed Practice Scenarios",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "bh-6-5",
          title: "Trauma-Informed Care Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "bh-mod-7",
      title: "Documentation and Treatment Planning",
      description:
        "Learn behavioral health documentation and treatment plan support.",
      lessons: [
        {
          id: "bh-7-1",
          title: "Behavioral Health Documentation Standards",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "bh-7-2",
          title: "Observation and Progress Notes",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "bh-7-3",
          title: "Treatment Plans and Goal Setting",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "bh-7-4",
          title: "HIPAA and Confidentiality in Behavioral Health",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "bh-7-5",
          title: "Documentation Practice",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "bh-mod-8",
      title: "Therapeutic Activities and Milieu Management",
      description:
        "Facilitate therapeutic activities and maintain a therapeutic environment.",
      lessons: [
        {
          id: "bh-8-1",
          title: "Therapeutic Milieu Principles",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "bh-8-2",
          title: "Group Activities and Facilitation",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "bh-8-3",
          title: "Recreation and Life Skills Activities",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "bh-8-4",
          title: "Behavior Management Strategies",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "bh-8-5",
          title: "Activity Facilitation Practice",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "bh-mod-9",
      title: "Clinical Experience and Professional Development",
      description:
        "Complete supervised clinical hours and prepare for behavioral health career.",
      lessons: [
        {
          id: "bh-9-1",
          title: "Professional Development in Behavioral Health",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "bh-9-2",
          title: "Clinical Practicum Preparation",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "bh-9-3",
          title: "Clinical Practicum Hours",
          type: "lab",
          durationMinutes: 480,
        },
        {
          id: "bh-9-4",
          title: "Career Planning and Job Search",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "bh-9-5",
          title: "Final Competency Assessment",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/behavioral-health",
  isPublished: true,
};
