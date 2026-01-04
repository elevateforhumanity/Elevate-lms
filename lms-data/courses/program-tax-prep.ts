// lms-data/courses/program-tax-prep.ts

import type { Course } from "@/types/course";

export const taxPrepCourse: Course = {
  id: "tax-001",
  slug: "tax-prep",
  title: "Tax Preparation Program",
  shortTitle: "Tax Prep",
  credentialPartner: "IRS",
  externalCredentialName: "IRS Annual Filing Season Program Certificate",
  description:
    "This Tax Preparation program prepares you to prepare individual tax returns and start your own tax business. You'll learn tax law, IRS regulations, tax software, and client service to prepare for the IRS Annual Filing Season Program.",
  hoursTotal: 120,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center + Online",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults seeking seasonal or year-round tax careers",
    "Entrepreneurs wanting to start tax businesses",
    "Bookkeepers expanding their services",
  ],
  outcomes: [
    "Prepare individual federal and state tax returns.",
    "Understand IRS tax law and regulations.",
    "Use professional tax preparation software.",
    "Provide quality client service and consultation.",
    "Complete IRS Annual Filing Season Program requirements.",
  ],
  modules: [
    {
      id: "tax-mod-1",
      title: "Introduction to Tax Preparation",
      description:
        "Understand the tax preparation profession and IRS requirements.",
      lessons: [
        {
          id: "tax-1-1",
          title: "Tax Preparer Role and Opportunities",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "tax-1-2",
          title: "IRS Regulations and Ethics",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "tax-1-3",
          title: "PTIN and Preparer Requirements",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "tax-1-4",
          title: "Tax Season Overview",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "tax-1-5",
          title: "Introduction Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "tax-mod-2",
      title: "Individual Income Tax Fundamentals",
      description:
        "Learn Form 1040 and individual income tax basics.",
      lessons: [
        {
          id: "tax-2-1",
          title: "Form 1040 Overview",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "tax-2-2",
          title: "Filing Status and Dependents",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "tax-2-3",
          title: "Income Types and Reporting",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "tax-2-4",
          title: "Standard vs. Itemized Deductions",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "tax-2-5",
          title: "Tax Fundamentals Practice",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "tax-2-6",
          title: "Income Tax Quiz",
          type: "quiz",
          durationMinutes: 25,
        },
      ],
    },
    {
      id: "tax-mod-3",
      title: "Tax Credits and Deductions",
      description:
        "Master common tax credits and deductions for individuals.",
      lessons: [
        {
          id: "tax-3-1",
          title: "Earned Income Tax Credit",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "tax-3-2",
          title: "Child Tax Credit and Dependent Care",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "tax-3-3",
          title: "Education Credits and Deductions",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "tax-3-4",
          title: "Retirement Contributions",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "tax-3-5",
          title: "Credits and Deductions Practice",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "tax-mod-4",
      title: "Business Income and Self-Employment",
      description:
        "Learn Schedule C and self-employment tax preparation.",
      lessons: [
        {
          id: "tax-4-1",
          title: "Schedule C Business Income",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "tax-4-2",
          title: "Business Expenses and Deductions",
          type: "video",
          durationMinutes: 45,
        },
        {
          id: "tax-4-3",
          title: "Self-Employment Tax",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "tax-4-4",
          title: "Home Office Deduction",
          type: "video",
          durationMinutes: 35,
        },
        {
          id: "tax-4-5",
          title: "Business Tax Practice",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "tax-4-6",
          title: "Business Income Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "tax-mod-5",
      title: "Tax Software and E-Filing",
      description:
        "Master professional tax preparation software and e-filing.",
      lessons: [
        {
          id: "tax-5-1",
          title: "Tax Software Overview",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "tax-5-2",
          title: "Data Entry and Navigation",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "tax-5-3",
          title: "E-Filing Requirements and Procedures",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "tax-5-4",
          title: "Software Practice Returns",
          type: "lab",
          durationMinutes: 180,
        },
      ],
    },
    {
      id: "tax-mod-6",
      title: "Client Service and Interview",
      description:
        "Develop client interview and service skills for tax preparation.",
      lessons: [
        {
          id: "tax-6-1",
          title: "Client Interview Techniques",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "tax-6-2",
          title: "Document Collection and Organization",
          type: "reading",
          durationMinutes: 35,
        },
        {
          id: "tax-6-3",
          title: "Quality Review and Accuracy",
          type: "reading",
          durationMinutes: 40,
        },
        {
          id: "tax-6-4",
          title: "Client Service Practice",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "tax-6-5",
          title: "Professional Communication",
          type: "video",
          durationMinutes: 35,
        },
      ],
    },
    {
      id: "tax-mod-7",
      title: "State Tax Returns",
      description:
        "Learn state income tax preparation for Indiana.",
      lessons: [
        {
          id: "tax-7-1",
          title: "Indiana State Tax Overview",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "tax-7-2",
          title: "State Tax Credits and Deductions",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "tax-7-3",
          title: "State Tax Return Practice",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "tax-mod-8",
      title: "Tax Business Setup and Certification",
      description:
        "Start your tax business and complete IRS certification requirements.",
      lessons: [
        {
          id: "tax-8-1",
          title: "Starting a Tax Preparation Business",
          type: "reading",
          durationMinutes: 50,
        },
        {
          id: "tax-8-2",
          title: "Marketing Your Tax Services",
          type: "video",
          durationMinutes: 40,
        },
        {
          id: "tax-8-3",
          title: "IRS Annual Filing Season Program",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "tax-8-4",
          title: "Practice Exam 1",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "tax-8-5",
          title: "Practice Exam 2",
          type: "quiz",
          durationMinutes: 90,
        },
        {
          id: "tax-8-6",
          title: "Final Tax Return Practice",
          type: "lab",
          durationMinutes: 180,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/tax-prep",
  isPublished: true,
};
