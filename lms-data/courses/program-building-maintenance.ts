// lms-data/courses/program-building-maintenance.ts

import type { Course } from "@/types/course";

export const buildingMaintenanceCourse: Course = {
  id: "bldg-001",
  slug: "building-maintenance",
  title: "Building Maintenance Technician",
  shortTitle: "Building Maintenance",
  credentialPartner: "NCCER",
  externalCredentialName: "NCCER Building Maintenance Technician Certification",
  description:
    "The Building Maintenance Technician program prepares you to support property managers, maintenance teams, and facilities departments. You'll learn basic repairs, safety, and customer service to support apartments, schools, and commercial buildings.",
  hoursTotal: 300,
  deliveryMode: "HYBRID",
  locationLabel: "On-Site Labs + Online Theory",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "APPRENTICESHIP", "SELF_PAY"],
  targetAudience: [
    "Adults interested in hands-on facility work",
    "Individuals transitioning from construction or general labor",
    "Justice-involved learners ready to re-enter the workforce",
  ],
  outcomes: [
    "Perform basic repair and maintenance tasks safely.",
    "Identify common building systems (electrical, plumbing, HVAC).",
    "Communicate professionally with tenants and supervisors.",
    "Use common tools and materials for building upkeep.",
    "Prepare for entry-level building maintenance roles.",
  ],
  modules: [
    {
      id: "bldg-mod-1",
      title: "Safety & Tools for Building Maintenance",
      description: "Learn essential safety practices and how to use the tools of the trade.",
      lessons: [
        {
          id: "bldg-1-1",
          title: "Workplace Safety & PPE",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "bldg-1-2",
          title: "OSHA 10 Construction Safety",
          type: "reading",
          durationMinutes: 90,
        },
        {
          id: "bldg-1-3",
          title: "Hand & Power Tools Basics",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "bldg-1-4",
          title: "Safety Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "bldg-mod-2",
      title: "Electrical Basics",
      description:
        "Understand basic electrical systems, circuits, and common repairs.",
      lessons: [
        {
          id: "bldg-2-1",
          title: "Electrical Safety and Lockout/Tagout",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "bldg-2-2",
          title: "Basic Circuits and Wiring",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "bldg-2-3",
          title: "Outlet and Switch Replacement",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "bldg-2-4",
          title: "Lighting Fixtures and Ballasts",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "bldg-2-5",
          title: "Electrical Basics Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "bldg-mod-3",
      title: "Plumbing Fundamentals",
      description:
        "Learn plumbing systems, fixtures, and common maintenance tasks.",
      lessons: [
        {
          id: "bldg-3-1",
          title: "Plumbing Systems Overview",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "bldg-3-2",
          title: "Pipe Types and Fittings",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "bldg-3-3",
          title: "Faucet and Toilet Repairs",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "bldg-3-4",
          title: "Drain Cleaning and Maintenance",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "bldg-3-5",
          title: "Plumbing Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "bldg-mod-4",
      title: "HVAC Basics",
      description:
        "Understand heating, ventilation, and air conditioning systems.",
      lessons: [
        {
          id: "bldg-4-1",
          title: "HVAC Systems Overview",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "bldg-4-2",
          title: "Filter Replacement and Maintenance",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "bldg-4-3",
          title: "Thermostat Operation and Troubleshooting",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "bldg-4-4",
          title: "Basic HVAC Troubleshooting",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "bldg-mod-5",
      title: "Carpentry and Drywall",
      description:
        "Learn basic carpentry skills and drywall repair techniques.",
      lessons: [
        {
          id: "bldg-5-1",
          title: "Measuring and Cutting Basics",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "bldg-5-2",
          title: "Drywall Repair Techniques",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "bldg-5-3",
          title: "Door and Window Adjustments",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "bldg-5-4",
          title: "Trim and Molding Installation",
          type: "video",
          durationMinutes: 40,
        },
      ],
    },
    {
      id: "bldg-mod-6",
      title: "Painting and Finishing",
      description:
        "Master painting techniques and surface preparation.",
      lessons: [
        {
          id: "bldg-6-1",
          title: "Surface Preparation",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "bldg-6-2",
          title: "Paint Types and Selection",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "bldg-6-3",
          title: "Painting Techniques Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "bldg-6-4",
          title: "Finishing and Touch-ups",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "bldg-mod-7",
      title: "Flooring Maintenance",
      description:
        "Learn to maintain and repair various flooring types.",
      lessons: [
        {
          id: "bldg-7-1",
          title: "Flooring Types and Care",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "bldg-7-2",
          title: "Carpet Repair and Cleaning",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "bldg-7-3",
          title: "Tile and Grout Maintenance",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "bldg-7-4",
          title: "Hardwood Floor Care",
          type: "video",
          durationMinutes: 35,
        },
      ],
    },
    {
      id: "bldg-mod-8",
      title: "Appliance Maintenance",
      description:
        "Basic maintenance and troubleshooting for common appliances.",
      lessons: [
        {
          id: "bldg-8-1",
          title: "Appliance Safety and Basics",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "bldg-8-2",
          title: "Refrigerator and Freezer Maintenance",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "bldg-8-3",
          title: "Washer and Dryer Troubleshooting",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "bldg-8-4",
          title: "Dishwasher and Disposal Maintenance",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "bldg-mod-9",
      title: "Preventive Maintenance",
      description:
        "Develop preventive maintenance schedules and procedures.",
      lessons: [
        {
          id: "bldg-9-1",
          title: "Preventive Maintenance Principles",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "bldg-9-2",
          title: "Inspection Procedures",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "bldg-9-3",
          title: "Maintenance Scheduling",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "bldg-9-4",
          title: "Preventive Maintenance Lab",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "bldg-9-5",
          title: "Preventive Maintenance Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "bldg-mod-10",
      title: "Work Orders and Documentation",
      description:
        "Master work order systems and professional documentation.",
      lessons: [
        {
          id: "bldg-10-1",
          title: "Work Order Systems",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "bldg-10-2",
          title: "Documentation Best Practices",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "bldg-10-3",
          title: "Inventory Management",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "bldg-10-4",
          title: "Documentation Practice",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "bldg-mod-11",
      title: "Customer Service and Professionalism",
      description:
        "Build professional skills for working with tenants and property managers.",
      lessons: [
        {
          id: "bldg-11-1",
          title: "Professional Communication",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "bldg-11-2",
          title: "Customer Service Excellence",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "bldg-11-3",
          title: "Handling Difficult Situations",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "bldg-11-4",
          title: "Job Search and Career Planning",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "bldg-11-5",
          title: "Final Skills Assessment",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "bldg-11-6",
          title: "Certification Exam Prep",
          type: "quiz",
          durationMinutes: 60,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/building-maintenance",
  isPublished: true,
};
