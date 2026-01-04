// lms-data/courses/program-construction-trades.ts

import type { Course } from "@/types/course";

export const constructionTradesCourse: Course = {
  id: "const-001",
  slug: "construction-trades",
  title: "Construction Trades Program",
  shortTitle: "Construction Trades",
  credentialPartner: "NCCER",
  externalCredentialName: "NCCER Core Curriculum Certification",
  description:
    "This Construction Trades program provides foundational skills for careers in construction. You'll learn carpentry, framing, drywall, blueprint reading, and construction safety to prepare for entry-level construction positions.",
  hoursTotal: 280,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Construction Sites",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "APPRENTICESHIP", "SELF_PAY"],
  targetAudience: [
    "Adults seeking construction careers",
    "Individuals interested in skilled trades",
    "Workers wanting construction apprenticeships",
  ],
  outcomes: [
    "Perform basic carpentry and framing tasks safely.",
    "Install drywall and complete finishing work.",
    "Read and interpret construction blueprints.",
    "Use construction tools and equipment properly.",
    "Follow OSHA safety standards on job sites.",
  ],
  modules: [
    {
      id: "const-mod-1",
      title: "Construction Safety and OSHA",
      description:
        "Master construction safety practices and OSHA 10 requirements.",
      lessons: [
        {
          id: "const-1-1",
          title: "Construction Safety Fundamentals",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "const-1-2",
          title: "OSHA 10 Construction Safety Training",
          type: "reading",
          durationMinutes: 120,
        },
        {
          id: "const-1-3",
          title: "Fall Protection and Scaffolding",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "const-1-4",
          title: "PPE and Hazard Recognition",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "const-1-5",
          title: "Safety Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "const-mod-2",
      title: "Construction Tools and Equipment",
      description:
        "Learn to use hand tools, power tools, and construction equipment.",
      lessons: [
        {
          id: "const-2-1",
          title: "Hand Tools for Construction",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "const-2-2",
          title: "Power Tools and Safety",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "const-2-3",
          title: "Tool Use Practice Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "const-2-4",
          title: "Tool Maintenance and Care",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "const-2-5",
          title: "Tools Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "const-mod-3",
      title: "Blueprint Reading and Math",
      description:
        "Read construction blueprints and perform construction math.",
      lessons: [
        {
          id: "const-3-1",
          title: "Blueprint Reading Basics",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "const-3-2",
          title: "Construction Math and Measurements",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "const-3-3",
          title: "Reading Floor Plans and Elevations",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "const-3-4",
          title: "Blueprint Reading Practice",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "const-3-5",
          title: "Blueprint Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "const-mod-4",
      title: "Carpentry Fundamentals",
      description:
        "Learn basic carpentry skills and wood construction.",
      lessons: [
        {
          id: "const-4-1",
          title: "Wood Materials and Lumber",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "const-4-2",
          title: "Measuring and Cutting Techniques",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "const-4-3",
          title: "Fasteners and Joinery",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "const-4-4",
          title: "Carpentry Practice Projects",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "const-4-5",
          title: "Carpentry Competency Check",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "const-mod-5",
      title: "Framing and Structural Work",
      description:
        "Learn wall framing, floor systems, and roof framing basics.",
      lessons: [
        {
          id: "const-5-1",
          title: "Floor Systems and Framing",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "const-5-2",
          title: "Wall Framing Techniques",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "const-5-3",
          title: "Wall Framing Practice",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "const-5-4",
          title: "Roof Framing Basics",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "const-5-5",
          title: "Framing Practice Project",
          type: "lab",
          durationMinutes: 180,
        },
      ],
    },
    {
      id: "const-mod-6",
      title: "Drywall Installation and Finishing",
      description:
        "Install and finish drywall for interior construction.",
      lessons: [
        {
          id: "const-6-1",
          title: "Drywall Materials and Tools",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "const-6-2",
          title: "Drywall Hanging Techniques",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "const-6-3",
          title: "Taping and Mudding",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "const-6-4",
          title: "Sanding and Finishing",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "const-6-5",
          title: "Drywall Competency Check",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "const-mod-7",
      title: "Exterior Finishing",
      description:
        "Learn siding, roofing, and exterior finishing techniques.",
      lessons: [
        {
          id: "const-7-1",
          title: "Siding Materials and Installation",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "const-7-2",
          title: "Siding Installation Practice",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "const-7-3",
          title: "Roofing Basics and Safety",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "const-7-4",
          title: "Trim and Molding Installation",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "const-mod-8",
      title: "Concrete and Masonry Basics",
      description:
        "Introduction to concrete work and basic masonry.",
      lessons: [
        {
          id: "const-8-1",
          title: "Concrete Materials and Mixing",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "const-8-2",
          title: "Formwork and Pouring",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "const-8-3",
          title: "Concrete Practice Project",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "const-8-4",
          title: "Basic Masonry Techniques",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "const-mod-9",
      title: "Site Work and Demolition",
      description:
        "Learn site preparation, excavation basics, and demolition safety.",
      lessons: [
        {
          id: "const-9-1",
          title: "Site Preparation and Layout",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "const-9-2",
          title: "Excavation Safety and Basics",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "const-9-3",
          title: "Demolition Safety and Techniques",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "const-9-4",
          title: "Site Work Practice",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "const-mod-10",
      title: "Certification Preparation and Job Readiness",
      description:
        "Prepare for NCCER certification and construction career.",
      lessons: [
        {
          id: "const-10-1",
          title: "NCCER Certification Overview",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "const-10-2",
          title: "Practice Exam 1",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "const-10-3",
          title: "Practice Exam 2",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "const-10-4",
          title: "Job Site Readiness",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "const-10-5",
          title: "Final Skills Assessment",
          type: "lab",
          durationMinutes: 150,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/construction-trades",
  isPublished: true,
};
