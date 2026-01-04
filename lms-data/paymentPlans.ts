// Central place to define tuition + Stripe payment links for each program.
// Replace the example stripePaymentLink values with your REAL Stripe links.

export type PaymentMode = "full" | "installments";

export interface PaymentOption {
  id: string;
  label: string;
  description?: string;
  mode: PaymentMode;
  amountUsd: number;
  installments?: {
    count: number;
    amountUsd: number;
    frequency: "weekly" | "biweekly" | "monthly";
  };
  stripePaymentLink?: string; // Paste your Stripe Payment Link URL here
}

export interface ProgramPaymentConfig {
  programId: string;
  headline: string;
  isStateFunded: boolean;
  notes?: string;
  baseTuitionUsd?: number;
  paymentOptions: PaymentOption[];
}

export const programPaymentConfigs: ProgramPaymentConfig[] = [
  {
    programId: "prog-cna",
    headline: "CNA Training – Workforce-Aligned",
    isStateFunded: false,
    baseTuitionUsd: 2200,
    notes:
      "CNA is not state-funded in your setup, but can be supported by WRG, JRI onramp, employer sponsorship or philanthropy.",
    paymentOptions: [
      {
        id: "cna-full",
        label: "Pay in Full",
        mode: "full",
        amountUsd: 2200,
        description:
          "Best for learners who are paying out-of-pocket or have employer sponsorship.",
        stripePaymentLink: "https://buy.stripe.com/your-cna-full-link-here",
      },
      {
        id: "cna-plan",
        label: "Payment Plan (Monthly)",
        mode: "installments",
        amountUsd: 0,
        installments: {
          count: 6,
          amountUsd: 400,
          frequency: "monthly",
        },
        description:
          "Spread tuition over 6 monthly payments. Ideal when combined with part-time work.",
        stripePaymentLink: "https://buy.stripe.com/your-cna-plan-link-here",
      },
    ],
  },
  {
    programId: "prog-barber",
    headline: "Barber Apprenticeship – Earn While You Learn",
    isStateFunded: true,
    baseTuitionUsd: 0,
    notes:
      "This program is structured as a registered apprenticeship with Milady content and on-the-job training.",
    paymentOptions: [
      {
        id: "barber-employer",
        label: "Employer / Sponsoring Shop",
        mode: "full",
        amountUsd: 0,
        description:
          "Typically covered by employer/apprenticeship sponsor. No direct tuition to learner.",
      },
    ],
  },
  {
    programId: "prog-tax-vita",
    headline: "Tax & VITA – Community Tax Prep Track",
    isStateFunded: true,
    baseTuitionUsd: 0,
    notes:
      "Course content is powered by IRS Link & Learn, VITA, and Intuit Academy. Focus on community impact, IRS certification, and stipend pathways.",
    paymentOptions: [
      {
        id: "tax-sponsored",
        label: "Sponsored (VITA / Grant-Funded)",
        mode: "full",
        amountUsd: 0,
        description:
          "Funded via VITA partnerships, philanthropy, or workforce grants. Learners typically do not pay tuition out-of-pocket.",
      },
    ],
  },
  {
    programId: "prog-hvac",
    headline: "HVAC Technician – Workforce Ready Pathway",
    isStateFunded: true,
    baseTuitionUsd: 4800,
    notes:
      "Designed to align with WRG / WIOA funding, employer sponsorship, and earn-while-you-learn OJT placements.",
    paymentOptions: [
      {
        id: "hvac-full",
        label: "Employer / Sponsor Pays",
        mode: "full",
        amountUsd: 4800,
        description:
          "Ideal when a contractor, employer, or partner pays tuition on behalf of the learner.",
        stripePaymentLink: "https://buy.stripe.com/your-hvac-full-link-here",
      },
      {
        id: "hvac-plan",
        label: "Learner Payment Plan (Monthly)",
        mode: "installments",
        amountUsd: 0,
        installments: {
          count: 8,
          amountUsd: 650,
          frequency: "monthly",
        },
        description:
          "Payment plan that can be layered with WEX/OJT wages to keep out-of-pocket affordable.",
        stripePaymentLink: "https://buy.stripe.com/your-hvac-plan-link-here",
      },
    ],
  },
  {
    programId: "prog-cdl",
    headline: "CDL Training – Entry-Level Driver Pathway",
    isStateFunded: true,
    baseTuitionUsd: 5200,
    notes:
      "Built to pair with WRG/WIOA funding, employer sponsorship, and FMCSA entry-level driver training (ELDT) requirements through partner schools.",
    paymentOptions: [
      {
        id: "cdl-employer",
        label: "Employer / Sponsor Pays",
        mode: "full",
        amountUsd: 5200,
        description:
          "Preferred when a carrier or employer sponsor covers tuition as part of a hire-on pathway.",
        stripePaymentLink: "https://buy.stripe.com/your-cdl-full-link-here",
      },
      {
        id: "cdl-plan",
        label: "Learner Payment Plan (Monthly)",
        mode: "installments",
        amountUsd: 0,
        installments: {
          count: 8,
          amountUsd: 750,
          frequency: "monthly",
        },
        description:
          "Payment plan structure that can be paired with WEX/OJT stipends so learners can earn while they train.",
        stripePaymentLink: "https://buy.stripe.com/your-cdl-plan-link-here",
      },
    ],
  },
  {
    programId: "prog-business-apprentice",
    headline: "Business Support & Office Professional Apprenticeship",
    isStateFunded: true,
    baseTuitionUsd: 3500,
    notes:
      "Structured as an earn-while-you-learn apprenticeship focused on admin, customer service, and office technology roles. Ideal for WEX/OJT layering.",
    paymentOptions: [
      {
        id: "biz-employer",
        label: "Employer / Sponsor Pays",
        mode: "full",
        amountUsd: 3500,
        description:
          "Designed for employers who want to upskill new or current staff into business support roles.",
        stripePaymentLink: "https://buy.stripe.com/your-biz-full-link-here",
      },
      {
        id: "biz-plan",
        label: "Learner Payment Plan (Monthly)",
        mode: "installments",
        amountUsd: 0,
        installments: {
          count: 6,
          amountUsd: 600,
          frequency: "monthly",
        },
        description:
          "Can be combined with part-time WEX placements so learners earn while they study.",
        stripePaymentLink: "https://buy.stripe.com/your-biz-plan-link-here",
      },
    ],
  },
  {
    programId: "prog-esthetics-apprentice",
    headline: "Esthetics Apprenticeship – Skin, Spa & Wellness",
    isStateFunded: true,
    baseTuitionUsd: 4200,
    notes:
      "Apprenticeship-style program for esthetics, spa, and wellness roles, aligned with partner salons/spas and beauty boards.",
    paymentOptions: [
      {
        id: "esthetics-employer",
        label: "Salon/Spa Sponsored Seat",
        mode: "full",
        amountUsd: 4200,
        description:
          "Ideal when a salon, spa, or wellness center sponsors an apprentice and recoups costs through service hours.",
        stripePaymentLink: "https://buy.stripe.com/your-esthetics-full-link-here",
      },
      {
        id: "esthetics-plan",
        label: "Learner Payment Plan (Monthly)",
        mode: "installments",
        amountUsd: 0,
        installments: {
          count: 8,
          amountUsd: 575,
          frequency: "monthly",
        },
        description:
          "Can be layered with apprenticeship wages so out-of-pocket costs stay manageable.",
        stripePaymentLink: "https://buy.stripe.com/your-esthetics-plan-link-here",
      },
    ],
  },
];

export function getPaymentConfigForProgram(
  programId: string
): ProgramPaymentConfig | undefined {
  return programPaymentConfigs.find((cfg) => cfg.programId === programId);
}
