// lms-data/courses/program-customer-service.ts

import type { Course } from "@/types/course";

export const customerServiceCourse: Course = {
  id: "cs-001",
  slug: "customer-service-specialist",
  title: "Customer Service & Admin Support",
  shortTitle: "Customer Service",
  credentialPartner: "CERTIPORT",
  externalCredentialName: "Customer Service / Office Productivity Credential Prep",
  description:
    "This program builds frontline customer service and basic office skills. You'll practice communication, problem-solving, computer skills, and professionalism so you can succeed in call centers, front desk roles, and admin positions.",
  hoursTotal: 120,
  deliveryMode: "ONLINE",
  locationLabel: "Online with Live Support",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults re-entering the workforce",
    "Youth 18–24 starting in office or service roles",
    "Justice-involved learners who want a professional, people-focused job",
  ],
  outcomes: [
    "Handle customer interactions calmly and professionally.",
    "Use basic computer skills for email, documents, and forms.",
    "Communicate clearly in person, on the phone, and online.",
    "Manage time, tasks, and priorities in a service environment.",
    "Prepare for entry-level customer service and admin roles.",
  ],
  modules: [
    {
      id: "cs-mod-1",
      title: "Customer Service Foundations",
      description: "Learn what great service looks like and how to manage difficult situations.",
      lessons: [
        {
          id: "cs-1-1",
          title: "What Is Customer Service?",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "cs-1-2",
          title: "Handling Difficult Customers",
          type: "reading",
          durationMinutes: 45,
        },
      ],
    },
    {
      id: "cs-mod-2",
      title: "Communication & Professionalism",
      description:
        "Practice tone, body language, email etiquette, and phone skills.",
      lessons: [
        {
          id: "cs-2-1",
          title: "Professional Communication Basics",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cs-2-2",
          title: "Phone & Online Communication",
          type: "video",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "cs-mod-3",
      title: "Digital Skills & Systems",
      description:
        "Get comfortable using digital tools common in customer service and admin roles.",
      lessons: [
        {
          id: "cs-3-1",
          title: "Intro to Email & Calendars",
          type: "video",
          durationMinutes: 30,
          partnerRefCode: "CERTIPORT-Office-1",
        },
        {
          id: "cs-3-2",
          title: "Using Customer or Case Management Systems",
          type: "reading",
          durationMinutes: 30,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/customer-service-specialist",
  isPublished: true,
};
