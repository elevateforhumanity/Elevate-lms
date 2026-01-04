// lms-data/courses/program-early-childhood.ts

import type { Course } from "@/types/course";

export const earlyChildhoodCourse: Course = {
  id: "ecd-001",
  slug: "early-childhood",
  title: "Early Childhood Education Program",
  shortTitle: "Early Childhood",
  credentialPartner: "CDA",
  externalCredentialName: "Child Development Associate (CDA) Credential",
  description:
    "This Early Childhood Education program prepares you to work with young children in childcare centers, preschools, and Head Start programs. You'll learn child development, curriculum planning, classroom management, and prepare for CDA certification.",
  hoursTotal: 240,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Childcare Practicum Sites",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults seeking early childhood careers",
    "Parents wanting to work in childcare",
    "Youth interested in education careers",
  ],
  outcomes: [
    "Understand child development from birth to age 5.",
    "Plan and implement age-appropriate curriculum.",
    "Create safe and nurturing learning environments.",
    "Build positive relationships with children and families.",
    "Obtain Child Development Associate (CDA) credential.",
  ],
  modules: [
    {
      id: "ecd-mod-1",
      title: "Introduction to Early Childhood Education",
      description:
        "Understand the early childhood profession and CDA requirements.",
      lessons: [
        {
          id: "ecd-1-1",
          title: "Early Childhood Career Pathways",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ecd-1-2",
          title: "CDA Credential Overview",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "ecd-1-3",
          title: "Professional Ethics and Standards",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ecd-1-4",
          title: "Professionalism in Early Childhood",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "ecd-1-5",
          title: "Introduction Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "ecd-mod-2",
      title: "Child Development and Learning",
      description:
        "Learn child development theories and milestones.",
      lessons: [
        {
          id: "ecd-2-1",
          title: "Child Development Theories",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "ecd-2-2",
          title: "Physical Development",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "ecd-2-3",
          title: "Cognitive Development",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "ecd-2-4",
          title: "Social-Emotional Development",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "ecd-2-5",
          title: "Language Development",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ecd-2-6",
          title: "Child Development Quiz",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "ecd-mod-3",
      title: "Health, Safety, and Nutrition",
      description:
        "Ensure children's health, safety, and nutritional needs.",
      lessons: [
        {
          id: "ecd-3-1",
          title: "Health and Safety Standards",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "ecd-3-2",
          title: "Nutrition and Meal Planning",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "ecd-3-3",
          title: "First Aid and Emergency Response",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "ecd-3-4",
          title: "Illness Prevention and Management",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "ecd-3-5",
          title: "Health and Safety Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "ecd-mod-4",
      title: "Learning Environment and Curriculum",
      description:
        "Design learning environments and plan curriculum.",
      lessons: [
        {
          id: "ecd-4-1",
          title: "Learning Environment Design",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "ecd-4-2",
          title: "Curriculum Planning Basics",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "ecd-4-3",
          title: "Lesson Planning Practice",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "ecd-4-4",
          title: "Learning Centers and Materials",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ecd-4-5",
          title: "Curriculum Planning Practice",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "ecd-mod-5",
      title: "Positive Guidance and Classroom Management",
      description:
        "Use positive guidance strategies and manage classroom behavior.",
      lessons: [
        {
          id: "ecd-5-1",
          title: "Positive Guidance Principles",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "ecd-5-2",
          title: "Behavior Management Strategies",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "ecd-5-3",
          title: "Challenging Behaviors",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ecd-5-4",
          title: "Guidance Practice Scenarios",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "ecd-5-5",
          title: "Guidance Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "ecd-mod-6",
      title: "Family and Community Partnerships",
      description:
        "Build partnerships with families and communities.",
      lessons: [
        {
          id: "ecd-6-1",
          title: "Family Engagement Strategies",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ecd-6-2",
          title: "Parent Communication",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "ecd-6-3",
          title: "Cultural Competence",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ecd-6-4",
          title: "Community Resources",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "ecd-6-5",
          title: "Family Partnership Practice",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "ecd-mod-7",
      title: "Observation and Assessment",
      description:
        "Observe and assess children's development and learning.",
      lessons: [
        {
          id: "ecd-7-1",
          title: "Observation Methods",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "ecd-7-2",
          title: "Developmental Screening",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "ecd-7-3",
          title: "Documentation and Portfolios",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "ecd-7-4",
          title: "Assessment Practice",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "ecd-7-5",
          title: "Assessment Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "ecd-mod-8",
      title: "Special Needs and Inclusion",
      description:
        "Support children with special needs in inclusive settings.",
      lessons: [
        {
          id: "ecd-8-1",
          title: "Introduction to Special Needs",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "ecd-8-2",
          title: "Inclusive Practices",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "ecd-8-3",
          title: "Individualized Support Strategies",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ecd-8-4",
          title: "Inclusion Practice",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "ecd-mod-9",
      title: "Practicum Experience",
      description:
        "Complete supervised practicum hours in childcare settings.",
      lessons: [
        {
          id: "ecd-9-1",
          title: "Practicum Preparation",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ecd-9-2",
          title: "Practicum Hours",
          type: "lab",
          durationMinutes: 480,
        },
        {
          id: "ecd-9-3",
          title: "Reflective Practice",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "ecd-mod-10",
      title: "CDA Credential Preparation",
      description:
        "Prepare for CDA credential application and verification visit.",
      lessons: [
        {
          id: "ecd-10-1",
          title: "CDA Application Process",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ecd-10-2",
          title: "Professional Portfolio Development",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "ecd-10-3",
          title: "Verification Visit Preparation",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "ecd-10-4",
          title: "Practice Verification Visit",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "ecd-10-5",
          title: "Final Competency Assessment",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/early-childhood",
  isPublished: true,
};
