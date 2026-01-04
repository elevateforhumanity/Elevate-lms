// lms-data/courses/program-cdl-hazmat.ts

import type { Course } from "@/types/course";

export const cdlHazmatCourse: Course = {
  id: "hazmat-001",
  slug: "cdl-hazmat",
  title: "CDL Hazmat Endorsement Program",
  shortTitle: "CDL Hazmat",
  credentialPartner: "TSA",
  externalCredentialName: "CDL Hazmat Endorsement",
  description:
    "This CDL Hazmat Endorsement program prepares commercial drivers to transport hazardous materials safely and legally. You'll learn hazmat regulations, placarding, emergency response, and security requirements for the CDL hazmat endorsement exam.",
  hoursTotal: 80,
  deliveryMode: "ONLINE",
  locationLabel: "Online Theory + TSA Background Check",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "CDL holders seeking hazmat endorsement",
    "Truck drivers expanding their qualifications",
    "Commercial drivers in chemical/fuel transport",
  ],
  outcomes: [
    "Understand hazmat regulations and classifications.",
    "Properly placard and label hazmat shipments.",
    "Follow hazmat loading and unloading procedures.",
    "Respond appropriately to hazmat emergencies.",
    "Pass the CDL hazmat endorsement written exam.",
  ],
  modules: [
    {
      id: "hazmat-mod-1",
      title: "Hazmat Regulations and Requirements",
      description:
        "Learn federal hazmat regulations and CDL requirements.",
      lessons: [
        {
          id: "hazmat-1-1",
          title: "Federal Hazmat Regulations Overview",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "hazmat-1-2",
          title: "CDL Hazmat Endorsement Requirements",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hazmat-1-3",
          title: "TSA Security Threat Assessment",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "hazmat-1-4",
          title: "Regulations Quiz",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "hazmat-mod-2",
      title: "Hazmat Classification and Identification",
      description:
        "Identify and classify hazardous materials properly.",
      lessons: [
        {
          id: "hazmat-2-1",
          title: "Hazard Classes and Divisions",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "hazmat-2-2",
          title: "Hazmat Identification Numbers",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hazmat-2-3",
          title: "Shipping Papers and Documentation",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "hazmat-2-4",
          title: "Classification Practice",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "hazmat-mod-3",
      title: "Placarding and Marking",
      description:
        "Learn proper placarding, labeling, and marking requirements.",
      lessons: [
        {
          id: "hazmat-3-1",
          title: "Placard Requirements and Tables",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "hazmat-3-2",
          title: "Label and Marking Requirements",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hazmat-3-3",
          title: "Placard Identification Practice",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "hazmat-mod-4",
      title: "Loading and Unloading Hazmat",
      description:
        "Follow safe procedures for loading and unloading hazardous materials.",
      lessons: [
        {
          id: "hazmat-4-1",
          title: "Loading and Segregation Rules",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "hazmat-4-2",
          title: "Cargo Securement for Hazmat",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hazmat-4-3",
          title: "Unloading Procedures and Safety",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "hazmat-4-4",
          title: "Loading Procedures Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "hazmat-mod-5",
      title: "Hazmat Transportation and Driving",
      description:
        "Learn safe driving practices for hazmat transportation.",
      lessons: [
        {
          id: "hazmat-5-1",
          title: "Hazmat Driving Rules and Restrictions",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "hazmat-5-2",
          title: "Parking and Attendance Requirements",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "hazmat-5-3",
          title: "Route Planning and Restrictions",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "hazmat-5-4",
          title: "Transportation Rules Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "hazmat-mod-6",
      title: "Emergency Response and Exam Preparation",
      description:
        "Prepare for hazmat emergencies and the endorsement exam.",
      lessons: [
        {
          id: "hazmat-6-1",
          title: "Emergency Response Procedures",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "hazmat-6-2",
          title: "Emergency Response Guidebook",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "hazmat-6-3",
          title: "Incident Reporting Requirements",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "hazmat-6-4",
          title: "Practice Exam 1",
          type: "quiz",
          durationMinutes: 60,
        },
        {
          id: "hazmat-6-5",
          title: "Practice Exam 2",
          type: "quiz",
          durationMinutes: 60,
        },
        {
          id: "hazmat-6-6",
          title: "Final Review",
          type: "reading",
          durationMinutes: 40,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/cdl-hazmat",
  isPublished: true,
};
