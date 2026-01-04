// lms-data/courses/program-entrepreneurship.ts

import type { Course } from "@/types/course";

export const entrepreneurshipCourse: Course = {
  id: "biz-001",
  slug: "entrepreneurship-foundations",
  title: "Entrepreneurship Foundations",
  shortTitle: "Entrepreneurship",
  credentialPartner: "NONE",
  externalCredentialName: "Small Business & Side Hustle Foundations",
  description:
    "This program helps you turn ideas into structured, realistic business plans. You'll explore branding, budgeting, marketing, and legal basics so you can build a small business or side hustle the right way.",
  hoursTotal: 100,
  deliveryMode: "ONLINE",
  locationLabel: "Online with Coaching Support",
  fundingEligible: ["WIOA_ADULT", "WIOA_YOUTH", "SELF_PAY"],
  targetAudience: [
    "Aspiring business owners and side hustlers",
    "Barbers, beauty professionals, and creatives who want to formalize their business",
    "Justice-involved entrepreneurs ready to build something new",
  ],
  outcomes: [
    "Clarify a realistic business or side hustle idea.",
    "Create a simple one-page business plan and budget.",
    "Understand basic legal and licensing concepts.",
    "Explore branding and marketing strategies.",
    "Know your next best steps to launch or grow.",
  ],
  modules: [
    {
      id: "biz-mod-1",
      title: "Finding & Defining Your Business Idea",
      description: "Get clear on what you're offering, who it's for, and why it matters.",
      lessons: [
        {
          id: "biz-1-1",
          title: "Idea Brainstorm & Validation",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "biz-1-2",
          title: "Who Is Your Customer?",
          type: "video",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "biz-mod-2",
      title: "Money, Budgeting & Pricing",
      description:
        "Learn how to think about revenue, costs, and pricing in a simple, human way.",
      lessons: [
        {
          id: "biz-2-1",
          title: "Simple Budget & Break-Even Basics",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "biz-2-2",
          title: "Pricing Your Services or Products",
          type: "video",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "biz-mod-3",
      title: "Branding, Marketing & Next Steps",
      description: "Pull everything together into a small, workable plan.",
      lessons: [
        {
          id: "biz-3-1",
          title: "Branding & Telling Your Story",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "biz-3-2",
          title: "Your One-Page Business Plan",
          type: "assignment",
          durationMinutes: 60,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/entrepreneurship-foundations",
  isPublished: true,
};
