// lms-data/courses/program-cdl.ts

import type { Course } from "@/types/course";

export const cdlCourse: Course = {
  id: "cdl-001",
  slug: "cdl-class-a",
  title: "CDL Class A Driver Prep Program",
  shortTitle: "CDL Class A",
  credentialPartner: "OTHER",
  externalCredentialName: "CDL Class A License Prep",
  description:
    "This CDL Class A prep program helps you build the knowledge and confidence to pass your written and skills exams. You'll learn regulations, safety, vehicle inspection, and basic driving practices so you can pursue high-demand trucking careers.",
  hoursTotal: 200,
  deliveryMode: "HYBRID",
  locationLabel: "Online Theory + Partner Driving Yard",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "JRI", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults looking for high-paying driving careers",
    "Justice-involved individuals ready for a second chance opportunity",
    "People comfortable with travel and physical work",
  ],
  outcomes: [
    "Understand CDL regulations, hours-of-service, and safety rules.",
    "Perform a basic pre-trip inspection.",
    "Recognize and manage common driving hazards.",
    "Prepare for the CDL written exam.",
    "Prepare for the skills test with a partner driving provider.",
  ],
  modules: [
    {
      id: "cdl-mod-1",
      title: "CDL Basics & Regulations",
      description: "Learn what CDL Class A is and what it takes to get licensed.",
      lessons: [
        {
          id: "cdl-1-1",
          title: "CDL Overview & License Types",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cdl-1-2",
          title: "Federal Motor Carrier Safety Regulations",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "cdl-1-3",
          title: "Hours-of-Service Rules",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "cdl-1-4",
          title: "CDL Regulations Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "cdl-mod-2",
      title: "Vehicle Systems and Components",
      description:
        "Understand truck systems, components, and how they work together.",
      lessons: [
        {
          id: "cdl-2-1",
          title: "Engine and Drivetrain Basics",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cdl-2-2",
          title: "Brake Systems and Air Brakes",
          type: "video",
          durationMinutes: 50,
        },
        {
          id: "cdl-2-3",
          title: "Coupling and Uncoupling",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "cdl-2-4",
          title: "Vehicle Systems Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "cdl-mod-3",
      title: "Pre-Trip Inspection",
      description:
        "Master the pre-trip inspection required for CDL skills test.",
      lessons: [
        {
          id: "cdl-3-1",
          title: "Pre-Trip Inspection Overview",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "cdl-3-2",
          title: "Engine Compartment Inspection",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "cdl-3-3",
          title: "Cab and Controls Inspection",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "cdl-3-4",
          title: "Exterior Inspection Walkthrough",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "cdl-3-5",
          title: "Pre-Trip Inspection Practice",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "cdl-mod-4",
      title: "Safe Driving Practices",
      description:
        "Learn defensive driving, hazard recognition, and safe driving techniques.",
      lessons: [
        {
          id: "cdl-4-1",
          title: "Defensive Driving Fundamentals",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cdl-4-2",
          title: "Space Management and Following Distance",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "cdl-4-3",
          title: "Hazard Perception and Response",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "cdl-4-4",
          title: "Night and Weather Driving",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "cdl-4-5",
          title: "Safe Driving Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "cdl-mod-5",
      title: "Basic Vehicle Control",
      description:
        "Practice basic maneuvers including backing, turning, and parking.",
      lessons: [
        {
          id: "cdl-5-1",
          title: "Straight Line Backing",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "cdl-5-2",
          title: "Offset Backing",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "cdl-5-3",
          title: "Parallel Parking",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "cdl-5-4",
          title: "Alley Dock Backing",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "cdl-5-5",
          title: "Vehicle Control Practice",
          type: "lab",
          durationMinutes: 180,
        },
      ],
    },
    {
      id: "cdl-mod-6",
      title: "On-Road Driving Skills",
      description:
        "Develop skills for safe on-road driving in various traffic conditions.",
      lessons: [
        {
          id: "cdl-6-1",
          title: "Starting and Stopping Smoothly",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "cdl-6-2",
          title: "Turning and Lane Changes",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "cdl-6-3",
          title: "Highway Driving and Merging",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "cdl-6-4",
          title: "Urban and Rural Driving",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "cdl-6-5",
          title: "On-Road Driving Practice",
          type: "lab",
          durationMinutes: 240,
        },
      ],
    },
    {
      id: "cdl-mod-7",
      title: "Cargo Handling and Weight Distribution",
      description:
        "Learn proper cargo securement and weight distribution principles.",
      lessons: [
        {
          id: "cdl-7-1",
          title: "Cargo Securement Regulations",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cdl-7-2",
          title: "Weight Distribution and Balance",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "cdl-7-3",
          title: "Loading and Unloading Procedures",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "cdl-7-4",
          title: "Cargo Handling Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "cdl-mod-8",
      title: "Special Situations and Emergencies",
      description:
        "Prepare for emergency situations and special driving conditions.",
      lessons: [
        {
          id: "cdl-8-1",
          title: "Emergency Procedures",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cdl-8-2",
          title: "Accident Procedures and Reporting",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "cdl-8-3",
          title: "Extreme Weather Driving",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "cdl-8-4",
          title: "Mountain and Steep Grade Driving",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "cdl-8-5",
          title: "Emergency Situations Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "cdl-mod-9",
      title: "CDL Exam Preparation",
      description:
        "Final preparation for CDL written and skills exams.",
      lessons: [
        {
          id: "cdl-9-1",
          title: "Written Exam Study Guide",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "cdl-9-2",
          title: "Practice Written Exam 1",
          type: "quiz",
          durationMinutes: 60,
        },
        {
          id: "cdl-9-3",
          title: "Practice Written Exam 2",
          type: "quiz",
          durationMinutes: 60,
        },
        {
          id: "cdl-9-4",
          title: "Skills Test Preparation",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "cdl-9-5",
          title: "Mock Skills Test",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "cdl-9-6",
          title: "Final Behind-the-Wheel Practice",
          type: "lab",
          durationMinutes: 360,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/cdl-class-a",
  isPublished: true,
};
