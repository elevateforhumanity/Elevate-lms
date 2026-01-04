// lms-data/courses/program-hospitality.ts

import type { Course } from "@/types/course";

export const hospitalityCourse: Course = {
  id: "hosp-001",
  slug: "hospitality",
  title: "Hospitality and Food Service Program",
  shortTitle: "Hospitality",
  credentialPartner: "SERVSAFE",
  externalCredentialName: "ServSafe Food Handler Certification",
  description:
    "This Hospitality and Food Service program prepares you for careers in restaurants, hotels, and food service operations. You'll learn customer service, food safety, kitchen operations, and hospitality management basics.",
  hoursTotal: 160,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Restaurant Practicum",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults seeking hospitality careers",
    "Youth entering the workforce",
    "Career changers interested in food service",
  ],
  outcomes: [
    "Provide excellent customer service in hospitality settings.",
    "Follow food safety and sanitation procedures.",
    "Perform front-of-house and back-of-house operations.",
    "Understand hospitality business operations.",
    "Obtain ServSafe Food Handler certification.",
  ],
  modules: [
    {
      id: "hosp-mod-1",
      title: "Introduction to Hospitality",
      description:
        "Understand the hospitality industry and career opportunities.",
      lessons: [
        {
          id: "hosp-1-1",
          title: "Hospitality Industry Overview",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "hosp-1-2",
          title: "Career Paths in Hospitality",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "hosp-1-3",
          title: "Professional Standards and Ethics",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "hosp-1-4",
          title: "Workplace Safety",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "hosp-1-5",
          title: "Introduction Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "hosp-mod-2",
      title: "Customer Service Excellence",
      description:
        "Master customer service skills for hospitality settings.",
      lessons: [
        {
          id: "hosp-2-1",
          title: "Customer Service Fundamentals",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "hosp-2-2",
          title: "Communication and Active Listening",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hosp-2-3",
          title: "Handling Difficult Customers",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hosp-2-4",
          title: "Customer Service Practice",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "hosp-2-5",
          title: "Customer Service Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "hosp-mod-3",
      title: "Food Safety and Sanitation",
      description:
        "Learn food safety principles and ServSafe requirements.",
      lessons: [
        {
          id: "hosp-3-1",
          title: "Foodborne Illness Prevention",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "hosp-3-2",
          title: "Personal Hygiene and Handwashing",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "hosp-3-3",
          title: "Safe Food Handling",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "hosp-3-4",
          title: "Temperature Control and Storage",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hosp-3-5",
          title: "Cleaning and Sanitizing",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "hosp-3-6",
          title: "Food Safety Quiz",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "hosp-mod-4",
      title: "Front-of-House Operations",
      description:
        "Learn dining room service and front-of-house procedures.",
      lessons: [
        {
          id: "hosp-4-1",
          title: "Table Service Basics",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "hosp-4-2",
          title: "Menu Knowledge and Upselling",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hosp-4-3",
          title: "POS Systems and Order Taking",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "hosp-4-4",
          title: "Service Practice",
          type: "lab",
          durationMinutes: 150,
        },
      ],
    },
    {
      id: "hosp-mod-5",
      title: "Back-of-House Operations",
      description:
        "Understand kitchen operations and food preparation basics.",
      lessons: [
        {
          id: "hosp-5-1",
          title: "Kitchen Organization and Workflow",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "hosp-5-2",
          title: "Basic Food Preparation",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "hosp-5-3",
          title: "Kitchen Equipment and Tools",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "hosp-5-4",
          title: "Food Preparation Practice",
          type: "lab",
          durationMinutes: 150,
        },
      ],
    },
    {
      id: "hosp-mod-6",
      title: "Beverage Service",
      description:
        "Learn beverage preparation and service techniques.",
      lessons: [
        {
          id: "hosp-6-1",
          title: "Beverage Types and Service",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "hosp-6-2",
          title: "Coffee and Tea Service",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "hosp-6-3",
          title: "Bar Basics and Responsible Service",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "hosp-6-4",
          title: "Beverage Service Practice",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "hosp-mod-7",
      title: "Hospitality Business Operations",
      description:
        "Understand hospitality business management basics.",
      lessons: [
        {
          id: "hosp-7-1",
          title: "Restaurant Operations Overview",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "hosp-7-2",
          title: "Inventory and Cost Control",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hosp-7-3",
          title: "Scheduling and Labor Management",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "hosp-7-4",
          title: "Marketing and Guest Relations",
          type: "video",
          durationMinutes: 35,
        },
      ],
    },
    {
      id: "hosp-mod-8",
      title: "Practicum and Certification",
      description:
        "Complete restaurant practicum and ServSafe certification.",
      lessons: [
        {
          id: "hosp-8-1",
          title: "Practicum Preparation",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "hosp-8-2",
          title: "Restaurant Practicum Hours",
          type: "lab",
          durationMinutes: 480,
        },
        {
          id: "hosp-8-3",
          title: "ServSafe Exam Preparation",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "hosp-8-4",
          title: "ServSafe Practice Exam",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "hosp-8-5",
          title: "Final Skills Assessment",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/hospitality",
  isPublished: true,
};
