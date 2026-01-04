// lms-data/courses/program-cybersecurity.ts

import type { Course } from "@/types/course";

export const cybersecurityCourse: Course = {
  id: "cyber-001",
  slug: "cybersecurity",
  title: "Cybersecurity Fundamentals Program",
  shortTitle: "Cybersecurity",
  credentialPartner: "COMPTIA",
  externalCredentialName: "CompTIA Security+ Certification Prep",
  description:
    "This Cybersecurity Fundamentals program prepares you for entry-level cybersecurity positions. You'll learn network security, threat detection, risk management, and security best practices to prepare for CompTIA Security+ certification.",
  hoursTotal: 180,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Online Labs",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "IT professionals wanting to specialize in security",
    "Adults seeking cybersecurity careers",
    "Network administrators expanding their skills",
  ],
  outcomes: [
    "Understand cybersecurity threats and vulnerabilities.",
    "Implement security controls and best practices.",
    "Monitor networks for security incidents.",
    "Respond to security breaches and incidents.",
    "Prepare for CompTIA Security+ certification exam.",
  ],
  modules: [
    {
      id: "cyber-mod-1",
      title: "Cybersecurity Fundamentals",
      description:
        "Introduction to cybersecurity concepts and principles.",
      lessons: [
        {
          id: "cyber-1-1",
          title: "Cybersecurity Overview and Career Paths",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cyber-1-2",
          title: "CIA Triad and Security Principles",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "cyber-1-3",
          title: "Threat Landscape and Attack Vectors",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "cyber-1-4",
          title: "Security Frameworks and Standards",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "cyber-1-5",
          title: "Fundamentals Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "cyber-mod-2",
      title: "Network Security",
      description:
        "Learn network security concepts and technologies.",
      lessons: [
        {
          id: "cyber-2-1",
          title: "Network Security Fundamentals",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "cyber-2-2",
          title: "Firewalls and Network Segmentation",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "cyber-2-3",
          title: "VPNs and Secure Remote Access",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cyber-2-4",
          title: "Network Security Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "cyber-2-5",
          title: "Network Security Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "cyber-mod-3",
      title: "Threats, Attacks, and Vulnerabilities",
      description:
        "Identify and understand various cyber threats and attacks.",
      lessons: [
        {
          id: "cyber-3-1",
          title: "Malware Types and Prevention",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "cyber-3-2",
          title: "Social Engineering Attacks",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "cyber-3-3",
          title: "Application and Web Attacks",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "cyber-3-4",
          title: "Wireless and Mobile Attacks",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "cyber-3-5",
          title: "Threat Analysis Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "cyber-3-6",
          title: "Threats Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "cyber-mod-4",
      title: "Identity and Access Management",
      description:
        "Implement authentication and access control systems.",
      lessons: [
        {
          id: "cyber-4-1",
          title: "Authentication Methods",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cyber-4-2",
          title: "Multi-Factor Authentication",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "cyber-4-3",
          title: "Access Control Models",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cyber-4-4",
          title: "Identity Management Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "cyber-4-5",
          title: "IAM Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "cyber-mod-5",
      title: "Cryptography and PKI",
      description:
        "Understand encryption and public key infrastructure.",
      lessons: [
        {
          id: "cyber-5-1",
          title: "Cryptography Fundamentals",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "cyber-5-2",
          title: "Symmetric and Asymmetric Encryption",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "cyber-5-3",
          title: "Public Key Infrastructure",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cyber-5-4",
          title: "Cryptography Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "cyber-5-5",
          title: "Cryptography Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "cyber-mod-6",
      title: "Security Operations and Monitoring",
      description:
        "Monitor systems and respond to security incidents.",
      lessons: [
        {
          id: "cyber-6-1",
          title: "Security Information and Event Management",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "cyber-6-2",
          title: "Log Analysis and Monitoring",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "cyber-6-3",
          title: "Intrusion Detection Systems",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cyber-6-4",
          title: "Security Monitoring Lab",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "cyber-6-5",
          title: "Security Operations Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "cyber-mod-7",
      title: "Incident Response and Recovery",
      description:
        "Respond to and recover from security incidents.",
      lessons: [
        {
          id: "cyber-7-1",
          title: "Incident Response Process",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "cyber-7-2",
          title: "Digital Forensics Basics",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "cyber-7-3",
          title: "Business Continuity and Disaster Recovery",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cyber-7-4",
          title: "Incident Response Scenarios",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "cyber-7-5",
          title: "Incident Response Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "cyber-mod-8",
      title: "Risk Management and Compliance",
      description:
        "Assess risks and ensure regulatory compliance.",
      lessons: [
        {
          id: "cyber-8-1",
          title: "Risk Assessment and Management",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "cyber-8-2",
          title: "Security Policies and Procedures",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "cyber-8-3",
          title: "Compliance and Regulations",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "cyber-8-4",
          title: "Risk Management Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "cyber-8-5",
          title: "Risk Management Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "cyber-mod-9",
      title: "Security+ Certification Preparation",
      description:
        "Prepare for CompTIA Security+ certification exam.",
      lessons: [
        {
          id: "cyber-9-1",
          title: "Security+ Exam Overview",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cyber-9-2",
          title: "Exam Objectives Review",
          type: "reading",
          durationMinutes: 90,
        },
        {
          id: "cyber-9-3",
          title: "Practice Exam 1",
          type: "quiz",
          durationMinutes: 120,
        },
        {
          id: "cyber-9-4",
          title: "Practice Exam 2",
          type: "quiz",
          durationMinutes: 120,
        },
        {
          id: "cyber-9-5",
          title: "Final Review and Tips",
          type: "video",
          durationMinutes: 60,
        },
        {
          id: "cyber-9-6",
          title: "Hands-On Skills Assessment",
          type: "lab",
          durationMinutes: 150,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/cybersecurity",
  isPublished: true,
};
