export type PathwayFunding = "WIOA" | "State Grant" | "Employer Reimbursement" | "Justice Impacted" | "Self Pay";
export type PathwayFormat = "Hybrid" | "In-Person" | "Online";
export type PathwayIndustry = "Healthcare" | "Skilled Trades" | "Technology" | "Business";

export type Pathway = {
  slug: string;
  title: string;
  industry: PathwayIndustry;
  format: PathwayFormat;
  funding: PathwayFunding[];
  duration: string;
  location: string;
  outcomes: string[];
  credential: string;
  ctaHref: string;
};

export const PATHWAYS: Pathway[] = [
  {
    slug: "cna",
    title: "Certified Nursing Assistant (CNA)",
    industry: "Healthcare",
    format: "Hybrid",
    funding: ["WIOA", "State Grant"],
    duration: "4–8 weeks",
    location: "Indianapolis, IN",
    outcomes: ["CNA", "Patient Care Tech"],
    credential: "CNA credential pathway",
    ctaHref: "/apply",
  },
  {
    slug: "barber-apprenticeship",
    title: "Barber Apprenticeship",
    industry: "Business",
    format: "In-Person",
    funding: ["State Grant", "Employer Reimbursement"],
    duration: "Apprenticeship track",
    location: "Indianapolis, IN",
    outcomes: ["Registered Barber Apprentice", "Licensed Barber"],
    credential: "Apprenticeship-aligned pathway",
    ctaHref: "/apply",
  },
  {
    slug: "hvac",
    title: "HVAC Technician",
    industry: "Skilled Trades",
    format: "Hybrid",
    funding: ["WIOA", "Employer Reimbursement"],
    duration: "8–12 weeks",
    location: "Indianapolis, IN",
    outcomes: ["HVAC Installer", "Maintenance Technician"],
    credential: "Industry-recognized credential track",
    ctaHref: "/apply",
  },
  {
    slug: "it-support",
    title: "IT Support (AI-Enabled)",
    industry: "Technology",
    format: "Online",
    funding: ["WIOA", "Justice Impacted", "Self Pay"],
    duration: "6–10 weeks",
    location: "Statewide / Remote",
    outcomes: ["IT Support Specialist", "Help Desk Technician"],
    credential: "IT support certification track",
    ctaHref: "/apply",
  },
];
