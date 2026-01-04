// lms-data/courses/program-peer-recovery.ts

import type { Course } from "@/types/course";

export const peerRecoveryCourse: Course = {
  id: "peer-001",
  slug: "peer-recovery",
  title: "Peer Recovery Specialist Program",
  shortTitle: "Peer Recovery",
  credentialPartner: "STATE",
  externalCredentialName: "Certified Peer Recovery Specialist",
  description:
    "This Peer Recovery Specialist program prepares individuals with lived recovery experience to support others in their recovery journey. You'll learn peer support principles, ethics, advocacy, and recovery-oriented practices.",
  hoursTotal: 160,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Field Practicum",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "JRI", "WEX", "SELF_PAY"],
  targetAudience: [
    "Individuals in recovery seeking to help others",
    "Social service workers wanting to specialize",
    "Community health workers expanding their skills",
  ],
  outcomes: [
    "Provide peer support using recovery-oriented principles.",
    "Apply ethical standards in peer support relationships.",
    "Advocate for individuals in recovery.",
    "Connect people to recovery resources and services.",
    "Obtain state peer recovery specialist certification.",
  ],
  modules: [
    {
      id: "peer-mod-1",
      title: "Introduction to Peer Recovery",
      description:
        "Understand the peer recovery specialist role and principles.",
      lessons: [
        {
          id: "peer-1-1",
          title: "Peer Recovery Specialist Role",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "peer-1-2",
          title: "Recovery-Oriented Principles",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "peer-1-3",
          title: "History of Peer Support Movement",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "peer-1-4",
          title: "Professional Boundaries",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "peer-1-5",
          title: "Introduction Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "peer-mod-2",
      title: "Ethics and Professional Conduct",
      description:
        "Learn ethical standards and professional conduct for peer specialists.",
      lessons: [
        {
          id: "peer-2-1",
          title: "Code of Ethics for Peer Specialists",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "peer-2-2",
          title: "Confidentiality and HIPAA",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "peer-2-3",
          title: "Dual Relationships and Boundaries",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "peer-2-4",
          title: "Ethical Dilemmas Practice",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "peer-2-5",
          title: "Ethics Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "peer-mod-3",
      title: "Recovery and Wellness",
      description:
        "Understand recovery models and wellness principles.",
      lessons: [
        {
          id: "peer-3-1",
          title: "Models of Recovery",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "peer-3-2",
          title: "Stages of Change",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "peer-3-3",
          title: "Wellness and Self-Care",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "peer-3-4",
          title: "Relapse Prevention",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "peer-3-5",
          title: "Recovery Models Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "peer-mod-4",
      title: "Peer Support Skills",
      description:
        "Develop core peer support and communication skills.",
      lessons: [
        {
          id: "peer-4-1",
          title: "Active Listening and Empathy",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "peer-4-2",
          title: "Motivational Interviewing Basics",
          type: "video",
          durationMinutes: 50,
        },
        {
          id: "peer-4-3",
          title: "Sharing Your Story Effectively",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "peer-4-4",
          title: "Building Rapport and Trust",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "peer-4-5",
          title: "Peer Support Practice",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "peer-mod-5",
      title: "Advocacy and Empowerment",
      description:
        "Learn advocacy skills and empowerment strategies.",
      lessons: [
        {
          id: "peer-5-1",
          title: "Self-Advocacy and Empowerment",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "peer-5-2",
          title: "Systems Advocacy",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "peer-5-3",
          title: "Rights and Responsibilities",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "peer-5-4",
          title: "Advocacy Practice Scenarios",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "peer-5-5",
          title: "Advocacy Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "peer-mod-6",
      title: "Resource Navigation and Linkage",
      description:
        "Connect individuals to community resources and services.",
      lessons: [
        {
          id: "peer-6-1",
          title: "Community Resources Overview",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "peer-6-2",
          title: "Resource Navigation Strategies",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "peer-6-3",
          title: "Benefits and Entitlements",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "peer-6-4",
          title: "Resource Mapping Practice",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "peer-mod-7",
      title: "Crisis Support and Safety",
      description:
        "Respond to crisis situations and ensure safety.",
      lessons: [
        {
          id: "peer-7-1",
          title: "Crisis Recognition and Response",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "peer-7-2",
          title: "Suicide Risk Assessment",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "peer-7-3",
          title: "De-Escalation Techniques",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "peer-7-4",
          title: "Safety Planning",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "peer-7-5",
          title: "Crisis Response Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "peer-mod-8",
      title: "Field Practicum and Certification Prep",
      description:
        "Complete supervised field experience and prepare for certification.",
      lessons: [
        {
          id: "peer-8-1",
          title: "Practicum Preparation",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "peer-8-2",
          title: "Field Practicum Hours",
          type: "lab",
          durationMinutes: 480,
        },
        {
          id: "peer-8-3",
          title: "Certification Exam Overview",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "peer-8-4",
          title: "Practice Exam",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "peer-8-5",
          title: "Final Competency Assessment",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/peer-recovery",
  isPublished: true,
};
