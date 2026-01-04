// lms-data/courses/program-barber-apprenticeship.ts

import type { Course } from "@/types/course";

export const barberApprenticeshipCourse: Course = {
  id: "barber-001",
  slug: "barber-apprenticeship",
  title: "Barber Apprenticeship Program",
  shortTitle: "Barber Apprenticeship",
  credentialPartner: "MILADY",
  externalCredentialName: "State Barber License (Apprenticeship Pathway)",
  description:
    "This barber apprenticeship combines on-the-job training and related classroom instruction to prepare you for your state barber licensing exam. You will build strong technical skills, client service, and business knowledge in a real barbershop environment.",
  hoursTotal: 1500,
  deliveryMode: "HYBRID",
  locationLabel: "Partner Barbershops & Elevate For Humanity Training Labs",
  fundingEligible: ["APPRENTICESHIP", "JRI", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults interested in the barbering trade",
    "Justice-involved individuals seeking a skilled career",
    "Entrepreneurs who want to own a barbershop",
  ],
  outcomes: [
    "Perform professional haircuts, shaves, and grooming services.",
    "Apply sanitation and safety standards to protect clients and yourself.",
    "Develop strong customer service and client retention skills.",
    "Understand barbering laws and rules for your state.",
    "Prepare to sit for your state barber licensing exam.",
  ],
  modules: [
    {
      id: "barber-mod-1",
      title: "Barbering Foundations",
      description:
        "Get grounded in the history of barbering, basic tools, and professional expectations.",
      lessons: [
        {
          id: "barber-1-1",
          title: "History & Evolution of Barbering",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "MILADY-Barber-Ch1",
        },
        {
          id: "barber-1-2",
          title: "Tools, Equipment, and Safety",
          type: "video",
          durationMinutes: 30,
          partnerRefCode: "MILADY-Barber-Ch2",
        },
        {
          id: "barber-1-3",
          title: "Professional Image and Ethics",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "barber-1-4",
          title: "Barbering Foundations Quiz",
          type: "quiz",
          durationMinutes: 15,
        },
      ],
    },
    {
      id: "barber-mod-2",
      title: "Sanitation, Safety & Laws",
      description:
        "Learn bloodborne pathogens, disinfection, and state rules to keep your license safe.",
      lessons: [
        {
          id: "barber-2-1",
          title: "Infection Control & Disinfection",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "MILADY-Barber-Ch3",
        },
        {
          id: "barber-2-2",
          title: "State Board Rules & Regulations",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "barber-2-3",
          title: "Sanitation Skills Lab",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "barber-2-4",
          title: "Safety and Sanitation Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "barber-mod-3",
      title: "Hair and Scalp Science",
      description:
        "Understand hair structure, growth cycles, and scalp conditions for proper treatment.",
      lessons: [
        {
          id: "barber-3-1",
          title: "Hair Structure and Composition",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "MILADY-Barber-Ch4",
        },
        {
          id: "barber-3-2",
          title: "Hair Growth and Loss",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "barber-3-3",
          title: "Scalp Conditions and Treatments",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "barber-3-4",
          title: "Hair Science Quiz",
          type: "quiz",
          durationMinutes: 15,
        },
      ],
    },
    {
      id: "barber-mod-4",
      title: "Basic Clipper Techniques",
      description:
        "Master fundamental clipper work including guards, fades, and basic cuts.",
      lessons: [
        {
          id: "barber-4-1",
          title: "Clipper Basics and Maintenance",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "barber-4-2",
          title: "Guard Work and Basic Cuts",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "barber-4-3",
          title: "Introduction to Fades",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "barber-4-4",
          title: "Clipper Techniques Practice",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "barber-mod-5",
      title: "Advanced Clipper and Fade Techniques",
      description:
        "Perfect advanced fades, tapers, and modern clipper techniques.",
      lessons: [
        {
          id: "barber-5-1",
          title: "Low, Mid, and High Fades",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "barber-5-2",
          title: "Taper Techniques",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "barber-5-3",
          title: "Bald Fades and Skin Fades",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "barber-5-4",
          title: "Advanced Fade Competency Check",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "barber-mod-6",
      title: "Shear Work and Scissor Techniques",
      description:
        "Develop precision scissor skills for cutting, texturizing, and blending.",
      lessons: [
        {
          id: "barber-6-1",
          title: "Scissor Types and Handling",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "barber-6-2",
          title: "Basic Scissor Cutting Techniques",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "barber-6-3",
          title: "Texturizing and Point Cutting",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "barber-6-4",
          title: "Scissor Over Comb Technique",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "barber-6-5",
          title: "Shear Work Competency Check",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "barber-mod-7",
      title: "Shaving and Facial Hair Design",
      description:
        "Master straight razor shaving, beard trimming, and facial hair styling.",
      lessons: [
        {
          id: "barber-7-1",
          title: "Straight Razor Safety and Maintenance",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "barber-7-2",
          title: "Hot Towel Preparation and Lathering",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "barber-7-3",
          title: "Straight Razor Shaving Techniques",
          type: "lab",
          durationMinutes: 150,
        },
        {
          id: "barber-7-4",
          title: "Beard Trimming and Design",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "barber-7-5",
          title: "Mustache and Goatee Styling",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "barber-7-6",
          title: "Shaving Competency Check",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "barber-mod-8",
      title: "Hair Coloring and Chemical Services",
      description:
        "Learn hair coloring theory, application techniques, and chemical safety.",
      lessons: [
        {
          id: "barber-8-1",
          title: "Color Theory and Hair Color Levels",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "MILADY-Barber-Ch8",
        },
        {
          id: "barber-8-2",
          title: "Permanent and Semi-Permanent Color",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "barber-8-3",
          title: "Color Application Techniques",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "barber-8-4",
          title: "Gray Coverage and Highlights",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "barber-8-5",
          title: "Chemical Safety and Patch Testing",
          type: "reading",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "barber-mod-9",
      title: "Client Consultation and Customer Service",
      description:
        "Build strong client relationships through effective consultation and service.",
      lessons: [
        {
          id: "barber-9-1",
          title: "Client Consultation Techniques",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "barber-9-2",
          title: "Communication and Active Listening",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "barber-9-3",
          title: "Managing Difficult Clients",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "barber-9-4",
          title: "Building Client Loyalty",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "barber-9-5",
          title: "Consultation Role Play Practice",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "barber-mod-10",
      title: "Business Skills and Exam Preparation",
      description:
        "Develop barbershop business skills and prepare for state licensing exam.",
      lessons: [
        {
          id: "barber-10-1",
          title: "Barbershop Business Basics",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "barber-10-2",
          title: "Booth Rental vs. Commission",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "barber-10-3",
          title: "Marketing Your Barber Services",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "barber-10-4",
          title: "State Board Exam Review",
          type: "reading",
          durationMinutes: 90,
        },
        {
          id: "barber-10-5",
          title: "Practice Written Exam",
          type: "quiz",
          durationMinutes: 60,
        },
        {
          id: "barber-10-6",
          title: "Practice Practical Exam",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "barber-10-7",
          title: "Apprenticeship On-the-Job Hours",
          type: "lab",
          durationMinutes: 1200,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/barber-apprenticeship",
  isPublished: true,
};
