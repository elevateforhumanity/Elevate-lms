// lms-data/courses/program-security-officer.ts

import type { Course } from "@/types/course";

export const securityOfficerCourse: Course = {
  id: "sec-001",
  slug: "security-officer",
  title: "Security Officer Training Program",
  shortTitle: "Security Officer",
  credentialPartner: "STATE",
  externalCredentialName: "Indiana Security Officer License",
  description:
    "This Security Officer program prepares you for licensed security positions in commercial, residential, and institutional settings. You'll learn security procedures, emergency response, report writing, and legal responsibilities.",
  hoursTotal: 120,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Field Training",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "JRI", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults seeking security careers",
    "Justice-involved individuals in reentry",
    "Military veterans transitioning to civilian careers",
  ],
  outcomes: [
    "Perform security patrols and access control.",
    "Respond to emergencies and incidents appropriately.",
    "Write clear and accurate security reports.",
    "Understand legal authority and liability.",
    "Obtain state security officer license.",
  ],
  modules: [
    {
      id: "sec-mod-1",
      title: "Introduction to Security Operations",
      description:
        "Understand the security officer role and professional responsibilities.",
      lessons: [
        {
          id: "sec-1-1",
          title: "Security Officer Role and Duties",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "sec-1-2",
          title: "Professional Ethics and Conduct",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "sec-1-3",
          title: "Security Industry Overview",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "sec-1-4",
          title: "Introduction Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "sec-mod-2",
      title: "Legal Authority and Liability",
      description:
        "Learn legal powers, limitations, and liability issues for security officers.",
      lessons: [
        {
          id: "sec-2-1",
          title: "Legal Authority of Security Officers",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "sec-2-2",
          title: "Use of Force and Detention",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "sec-2-3",
          title: "Liability and Risk Management",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "sec-2-4",
          title: "Constitutional Rights and Privacy",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "sec-2-5",
          title: "Legal Issues Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "sec-mod-3",
      title: "Security Procedures and Patrol",
      description:
        "Master security patrol techniques and access control procedures.",
      lessons: [
        {
          id: "sec-3-1",
          title: "Patrol Techniques and Methods",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "sec-3-2",
          title: "Access Control and Visitor Management",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "sec-3-3",
          title: "Key Control and Lock Systems",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "sec-3-4",
          title: "Patrol Practice Scenarios",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "sec-3-5",
          title: "Security Procedures Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "sec-mod-4",
      title: "Emergency Response and Crisis Management",
      description:
        "Learn to respond to emergencies, fires, and crisis situations.",
      lessons: [
        {
          id: "sec-4-1",
          title: "Emergency Response Procedures",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "sec-4-2",
          title: "Fire Safety and Evacuation",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "sec-4-3",
          title: "Medical Emergencies and First Aid",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "sec-4-4",
          title: "Active Shooter Response",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "sec-4-5",
          title: "Emergency Response Practice",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "sec-mod-5",
      title: "Communication and Report Writing",
      description:
        "Develop effective communication and report writing skills.",
      lessons: [
        {
          id: "sec-5-1",
          title: "Professional Communication Skills",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "sec-5-2",
          title: "Radio Communication Procedures",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "sec-5-3",
          title: "Security Report Writing",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "sec-5-4",
          title: "Report Writing Practice",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "sec-5-5",
          title: "Communication Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "sec-mod-6",
      title: "Observation and Incident Response",
      description:
        "Develop observation skills and incident response techniques.",
      lessons: [
        {
          id: "sec-6-1",
          title: "Observation and Surveillance Techniques",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "sec-6-2",
          title: "Suspicious Activity Recognition",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "sec-6-3",
          title: "Incident Response Procedures",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "sec-6-4",
          title: "Incident Response Scenarios",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "sec-mod-7",
      title: "Certification Preparation and Field Training",
      description:
        "Prepare for state licensing exam and complete field training.",
      lessons: [
        {
          id: "sec-7-1",
          title: "State Licensing Requirements",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "sec-7-2",
          title: "Practice Exam 1",
          type: "quiz",
          durationMinutes: 60,
        },
        {
          id: "sec-7-3",
          title: "Practice Exam 2",
          type: "quiz",
          durationMinutes: 60,
        },
        {
          id: "sec-7-4",
          title: "Field Training Hours",
          type: "lab",
          durationMinutes: 240,
        },
        {
          id: "sec-7-5",
          title: "Final Competency Assessment",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/security-officer",
  isPublished: true,
};
