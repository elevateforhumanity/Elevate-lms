// lms-data/courses/program-it-support.ts

import type { Course } from "@/types/course";

export const itSupportCourse: Course = {
  id: "it-001",
  slug: "it-support-specialist",
  title: "IT Support & Help Desk",
  shortTitle: "IT Support",
  credentialPartner: "CERTIPORT",
  externalCredentialName: "IT Support / CompTIA-style Prep",
  description:
    "This program introduces core IT support skills for help desk and entry-level tech roles. You'll learn hardware, software, basic networking, troubleshooting, and customer support for users.",
  hoursTotal: 180,
  deliveryMode: "ONLINE",
  locationLabel: "Online with Virtual Labs",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults who like technology and problem-solving",
    "Youth exploring IT careers",
    "Career changers moving into tech support",
  ],
  outcomes: [
    "Identify basic computer hardware and software components.",
    "Use a structured troubleshooting approach to support end users.",
    "Understand basic networking and internet concepts.",
    "Document tickets and communicate clearly with non-technical users.",
    "Prepare for entry-level IT support roles and certification pathways.",
  ],
  modules: [
    {
      id: "it-mod-1",
      title: "Hardware & Operating Systems",
      description: "Get familiar with the parts of a computer and how operating systems work.",
      lessons: [
        {
          id: "it-1-1",
          title: "Computer Hardware Basics",
          type: "video",
          durationMinutes: 30,
          partnerRefCode: "CERTIPORT-IT-1",
        },
        {
          id: "it-1-2",
          title: "Operating Systems Overview",
          type: "reading",
          durationMinutes: 45,
        },
      ],
    },
    {
      id: "it-mod-2",
      title: "Networking & Internet",
      description: "Understand how devices connect and communicate on a network.",
      lessons: [
        {
          id: "it-2-1",
          title: "Networking Fundamentals",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "it-2-2",
          title: "Internet, DNS & Common Issues",
          type: "video",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "it-mod-3",
      title: "Troubleshooting & Help Desk Skills",
      description:
        "Practice how to support users and document issues like a professional.",
      lessons: [
        {
          id: "it-3-1",
          title: "Troubleshooting Process & Mindset",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "it-3-2",
          title: "Help Desk Communication & Ticketing",
          type: "video",
          durationMinutes: 30,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/it-support-specialist",
  isPublished: true,
};
