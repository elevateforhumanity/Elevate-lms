// lms-data/courses/program-cosmetology.ts

import type { Course } from "@/types/course";

export const cosmetologyCourse: Course = {
  id: "cosm-001",
  slug: "cosmetology",
  title: "Cosmetology Program",
  shortTitle: "Cosmetology",
  credentialPartner: "MILADY",
  externalCredentialName: "State Board Cosmetology License",
  description:
    "This Cosmetology program prepares you for state board licensure in hair, skin, and nail care. You'll learn cutting, coloring, styling, chemical services, skincare, and salon business management through hands-on training.",
  hoursTotal: 1500,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Beauty Academy + Salon Floor",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults seeking beauty industry careers",
    "High school graduates interested in cosmetology",
    "Entrepreneurs wanting to own salons",
  ],
  outcomes: [
    "Perform hair cutting, coloring, and styling services.",
    "Provide chemical services including perms and relaxers.",
    "Deliver professional skincare and makeup services.",
    "Perform manicures, pedicures, and nail enhancements.",
    "Pass state board cosmetology licensing exam.",
  ],
  modules: [
    {
      id: "cosm-mod-1",
      title: "Cosmetology Foundations",
      description:
        "Introduction to cosmetology, professionalism, and salon operations.",
      lessons: [
        {
          id: "cosm-1-1",
          title: "Cosmetology Career and Opportunities",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "cosm-1-2",
          title: "Professional Image and Ethics",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "cosm-1-3",
          title: "Salon Safety and Sanitation",
          type: "reading",
          durationMinutes: 90,
        },
        {
          id: "cosm-1-4",
          title: "State Board Laws and Regulations",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "cosm-1-5",
          title: "Foundations Quiz",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "cosm-mod-2",
      title: "Hair and Scalp Science",
      description:
        "Learn hair structure, growth cycles, and scalp conditions.",
      lessons: [
        {
          id: "cosm-2-1",
          title: "Hair Structure and Composition",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "cosm-2-2",
          title: "Hair Growth and Loss",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "cosm-2-3",
          title: "Scalp Analysis and Treatments",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "cosm-2-4",
          title: "Hair Science Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "cosm-mod-3",
      title: "Shampooing and Conditioning",
      description:
        "Master shampooing techniques and conditioning treatments.",
      lessons: [
        {
          id: "cosm-3-1",
          title: "Shampoo Chemistry and Selection",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cosm-3-2",
          title: "Shampooing Techniques",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "cosm-3-3",
          title: "Conditioning Treatments",
          type: "lab",
          durationMinutes: 150,
        },
      ],
    },
    {
      id: "cosm-mod-4",
      title: "Haircutting Fundamentals",
      description:
        "Learn basic to advanced haircutting techniques.",
      lessons: [
        {
          id: "cosm-4-1",
          title: "Haircutting Tools and Implements",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cosm-4-2",
          title: "Basic Cutting Techniques",
          type: "lab",
          durationMinutes: 240,
        },
        {
          id: "cosm-4-3",
          title: "Layering and Graduation",
          type: "lab",
          durationMinutes: 240,
        },
        {
          id: "cosm-4-4",
          title: "Men's Haircutting",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "cosm-4-5",
          title: "Advanced Cutting Techniques",
          type: "lab",
          durationMinutes: 240,
        },
      ],
    },
    {
      id: "cosm-mod-5",
      title: "Hair Coloring",
      description:
        "Master hair coloring theory and application techniques.",
      lessons: [
        {
          id: "cosm-5-1",
          title: "Color Theory and Formulation",
          type: "reading",
          durationMinutes: 90,
        },
        {
          id: "cosm-5-2",
          title: "Permanent Hair Color Application",
          type: "lab",
          durationMinutes: 240,
        },
        {
          id: "cosm-5-3",
          title: "Highlighting and Lowlighting",
          type: "lab",
          durationMinutes: 240,
        },
        {
          id: "cosm-5-4",
          title: "Color Correction",
          type: "lab",
          durationMinutes: 180,
        },
      ],
    },
    {
      id: "cosm-mod-6",
      title: "Chemical Texture Services",
      description:
        "Learn permanent waving, relaxing, and smoothing treatments.",
      lessons: [
        {
          id: "cosm-6-1",
          title: "Chemical Texture Theory",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "cosm-6-2",
          title: "Permanent Waving Techniques",
          type: "lab",
          durationMinutes: 240,
        },
        {
          id: "cosm-6-3",
          title: "Chemical Relaxing Services",
          type: "lab",
          durationMinutes: 240,
        },
        {
          id: "cosm-6-4",
          title: "Keratin and Smoothing Treatments",
          type: "lab",
          durationMinutes: 180,
        },
      ],
    },
    {
      id: "cosm-mod-7",
      title: "Hairstyling and Finishing",
      description:
        "Master blow-drying, thermal styling, and formal styling.",
      lessons: [
        {
          id: "cosm-7-1",
          title: "Blow-Drying Techniques",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "cosm-7-2",
          title: "Thermal Styling (Flat Iron and Curling Iron)",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "cosm-7-3",
          title: "Formal Styling and Updos",
          type: "lab",
          durationMinutes: 240,
        },
        {
          id: "cosm-7-4",
          title: "Braiding and Extensions",
          type: "lab",
          durationMinutes: 180,
        },
      ],
    },
    {
      id: "cosm-mod-8",
      title: "Skincare and Facials",
      description:
        "Learn facial treatments, skin analysis, and makeup application.",
      lessons: [
        {
          id: "cosm-8-1",
          title: "Skin Structure and Analysis",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "cosm-8-2",
          title: "Facial Treatments",
          type: "lab",
          durationMinutes: 240,
        },
        {
          id: "cosm-8-3",
          title: "Makeup Application Techniques",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "cosm-8-4",
          title: "Hair Removal Services",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "cosm-mod-9",
      title: "Nail Care Services",
      description:
        "Perform manicures, pedicures, and nail enhancements.",
      lessons: [
        {
          id: "cosm-9-1",
          title: "Nail Structure and Disorders",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cosm-9-2",
          title: "Manicure Techniques",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "cosm-9-3",
          title: "Pedicure Services",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "cosm-9-4",
          title: "Artificial Nail Enhancements",
          type: "lab",
          durationMinutes: 240,
        },
        {
          id: "cosm-9-5",
          title: "Nail Art and Design",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "cosm-mod-10",
      title: "Salon Business and Client Relations",
      description:
        "Learn salon management, client consultation, and business skills.",
      lessons: [
        {
          id: "cosm-10-1",
          title: "Client Consultation Techniques",
          type: "video",
          durationMinutes: 60,
        },
        {
          id: "cosm-10-2",
          title: "Salon Business Management",
          type: "reading",
          durationMinutes: 90,
        },
        {
          id: "cosm-10-3",
          title: "Retail Sales and Product Knowledge",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "cosm-10-4",
          title: "Building Your Clientele",
          type: "video",
          durationMinutes: 45,
        },
      ],
    },
    {
      id: "cosm-mod-11",
      title: "Salon Floor Experience",
      description:
        "Gain hands-on experience serving real clients on the salon floor.",
      lessons: [
        {
          id: "cosm-11-1",
          title: "Salon Floor Orientation",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "cosm-11-2",
          title: "Client Services Practice",
          type: "lab",
          durationMinutes: 1200,
        },
      ],
    },
    {
      id: "cosm-mod-12",
      title: "State Board Exam Preparation",
      description:
        "Prepare for state board written and practical exams.",
      lessons: [
        {
          id: "cosm-12-1",
          title: "State Board Exam Overview",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "cosm-12-2",
          title: "Written Exam Review",
          type: "reading",
          durationMinutes: 120,
        },
        {
          id: "cosm-12-3",
          title: "Practice Written Exam",
          type: "quiz",
          durationMinutes: 120,
        },
        {
          id: "cosm-12-4",
          title: "Practical Exam Preparation",
          type: "lab",
          durationMinutes: 240,
        },
        {
          id: "cosm-12-5",
          title: "Mock State Board Exam",
          type: "lab",
          durationMinutes: 300,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/cosmetology",
  isPublished: true,
};
