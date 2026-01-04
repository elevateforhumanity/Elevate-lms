// lms-data/courses/program-esthetics-apprenticeship.ts

import type { Course } from "@/types/course";

export const estheticsApprenticeshipCourse: Course = {
  id: "esth-001",
  slug: "esthetics-apprenticeship",
  title: "Esthetics Apprenticeship Program",
  shortTitle: "Esthetics",
  credentialPartner: "MILADY",
  externalCredentialName: "State Esthetician License",
  description:
    "This Esthetics Apprenticeship program prepares you for state board licensure in skincare and facial treatments. You'll learn facial techniques, makeup application, hair removal, and skincare business through hands-on training in a spa environment.",
  hoursTotal: 600,
  deliveryMode: "HYBRID",
  locationLabel: "Partner Spas & Elevate For Humanity Training Labs",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "APPRENTICESHIP", "SELF_PAY"],
  targetAudience: [
    "Adults seeking skincare careers",
    "Beauty professionals wanting to specialize",
    "Entrepreneurs wanting to own spas",
  ],
  outcomes: [
    "Perform professional facial treatments and skincare services.",
    "Apply makeup for various occasions and skin types.",
    "Provide hair removal services safely and effectively.",
    "Analyze skin conditions and recommend treatments.",
    "Pass state board esthetician licensing exam.",
  ],
  modules: [
    {
      id: "esth-mod-1",
      title: "Esthetics Foundations",
      description:
        "Introduction to esthetics, professionalism, and spa operations.",
      lessons: [
        {
          id: "esth-1-1",
          title: "Esthetics Career and Opportunities",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "esth-1-2",
          title: "Professional Ethics and Conduct",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "esth-1-3",
          title: "Spa Safety and Sanitation",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "esth-1-4",
          title: "State Board Laws and Regulations",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "esth-1-5",
          title: "Foundations Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "esth-mod-2",
      title: "Skin Science and Analysis",
      description:
        "Learn skin structure, functions, and analysis techniques.",
      lessons: [
        {
          id: "esth-2-1",
          title: "Skin Structure and Layers",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "esth-2-2",
          title: "Skin Types and Conditions",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "esth-2-3",
          title: "Skin Analysis Techniques",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "esth-2-4",
          title: "Aging and Environmental Effects",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "esth-2-5",
          title: "Skin Science Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "esth-mod-3",
      title: "Facial Treatments",
      description:
        "Master basic and advanced facial treatment techniques.",
      lessons: [
        {
          id: "esth-3-1",
          title: "Facial Treatment Theory",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "esth-3-2",
          title: "Basic Facial Procedure",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "esth-3-3",
          title: "Advanced Facial Techniques",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "esth-3-4",
          title: "Specialty Facials",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "esth-3-5",
          title: "Facial Massage Techniques",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "esth-mod-4",
      title: "Skincare Products and Chemistry",
      description:
        "Understand skincare ingredients, products, and formulations.",
      lessons: [
        {
          id: "esth-4-1",
          title: "Cosmetic Chemistry Basics",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "esth-4-2",
          title: "Active Ingredients and Benefits",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "esth-4-3",
          title: "Product Selection and Recommendations",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "esth-4-4",
          title: "Home Care Regimens",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "esth-4-5",
          title: "Product Knowledge Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "esth-mod-5",
      title: "Hair Removal Services",
      description:
        "Learn waxing, threading, and other hair removal techniques.",
      lessons: [
        {
          id: "esth-5-1",
          title: "Hair Growth and Removal Methods",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "esth-5-2",
          title: "Waxing Techniques and Safety",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "esth-5-3",
          title: "Facial Waxing Services",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "esth-5-4",
          title: "Body Waxing Services",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "esth-5-5",
          title: "Threading and Tweezing",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "esth-mod-6",
      title: "Makeup Application",
      description:
        "Master makeup techniques for various occasions and skin types.",
      lessons: [
        {
          id: "esth-6-1",
          title: "Makeup Theory and Color",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "esth-6-2",
          title: "Makeup Tools and Products",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "esth-6-3",
          title: "Day Makeup Application",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "esth-6-4",
          title: "Evening and Special Occasion Makeup",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "esth-6-5",
          title: "Corrective Makeup Techniques",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "esth-mod-7",
      title: "Advanced Treatments and Modalities",
      description:
        "Learn advanced skincare treatments and equipment.",
      lessons: [
        {
          id: "esth-7-1",
          title: "Chemical Exfoliation and Peels",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "esth-7-2",
          title: "Microdermabrasion Techniques",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "esth-7-3",
          title: "LED Light Therapy",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "esth-7-4",
          title: "Microcurrent and Ultrasonic Treatments",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "esth-7-5",
          title: "Advanced Treatments Practice",
          type: "lab",
          durationMinutes: 150,
        },
      ],
    },
    {
      id: "esth-mod-8",
      title: "Client Consultation and Business",
      description:
        "Develop consultation skills and spa business knowledge.",
      lessons: [
        {
          id: "esth-8-1",
          title: "Client Consultation Techniques",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "esth-8-2",
          title: "Treatment Planning and Documentation",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "esth-8-3",
          title: "Spa Business Management",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "esth-8-4",
          title: "Retail Sales and Marketing",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "esth-8-5",
          title: "Building Your Clientele",
          type: "video",
          durationMinutes: 40,
        },
      ],
    },
    {
      id: "esth-mod-9",
      title: "Spa Floor Experience",
      description:
        "Gain hands-on experience serving real clients in spa setting.",
      lessons: [
        {
          id: "esth-9-1",
          title: "Spa Floor Orientation",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "esth-9-2",
          title: "Client Services Practice",
          type: "lab",
          durationMinutes: 600,
        },
        {
          id: "esth-9-3",
          title: "Professional Development",
          type: "reading",
          durationMinutes: 45,
        },
      ],
    },
    {
      id: "esth-mod-10",
      title: "State Board Exam Preparation",
      description:
        "Prepare for state board written and practical exams.",
      lessons: [
        {
          id: "esth-10-1",
          title: "State Board Exam Overview",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "esth-10-2",
          title: "Written Exam Review",
          type: "reading",
          durationMinutes: 90,
        },
        {
          id: "esth-10-3",
          title: "Practice Written Exam",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "esth-10-4",
          title: "Practical Exam Preparation",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "esth-10-5",
          title: "Mock State Board Exam",
          type: "lab",
          durationMinutes: 240,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/esthetics-apprenticeship",
  isPublished: true,
};
