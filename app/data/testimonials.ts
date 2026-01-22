/**
 * Student Testimonials
 * Success stories from program graduates
 */

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  programSlug: string;
  programName: string;
  quote: string;
  outcome: string;
  graduationYear: number;
  currentRole?: string;
  currentEmployer?: string;
}

export const testimonials: Testimonial[] = [
  // HVAC Testimonials
  {
    id: 'hvac-1',
    name: 'Marcus Johnson',
    photo: '/images/testimonials/marcus-j.jpg',
    programSlug: 'hvac-technician',
    programName: 'HVAC Technician',
    quote: 'I went from working retail making $12/hour to earning $52,000 my first year as an HVAC tech. The hands-on training prepared me for real-world situations from day one.',
    outcome: 'Hired at ServiceMaster within 2 weeks of graduation',
    graduationYear: 2025,
    currentRole: 'HVAC Service Technician',
    currentEmployer: 'ServiceMaster',
  },
  {
    id: 'hvac-2',
    name: 'David Williams',
    photo: '/images/testimonials/david-w.jpg',
    programSlug: 'hvac-technician',
    programName: 'HVAC Technician',
    quote: 'The EPA 608 certification prep was excellent. I passed on my first try and had three job offers before I even finished the program.',
    outcome: 'Started own HVAC business after 2 years',
    graduationYear: 2024,
    currentRole: 'Owner',
    currentEmployer: 'Williams Heating & Cooling',
  },

  // Barber Testimonials
  {
    id: 'barber-1',
    name: 'Terrence Mitchell',
    photo: '/images/testimonials/terrence-m.jpg',
    programSlug: 'barber-apprenticeship',
    programName: 'Barber Apprenticeship',
    quote: 'Getting paid while learning was a game-changer. I built my clientele during training and now I rent my own chair making more than I ever thought possible.',
    outcome: 'Renting chair earning $55,000+/year',
    graduationYear: 2025,
    currentRole: 'Licensed Barber',
    currentEmployer: 'Elite Cuts Barbershop',
  },
  {
    id: 'barber-2',
    name: 'Anthony Davis',
    photo: '/images/testimonials/anthony-d.jpg',
    programSlug: 'barber-apprenticeship',
    programName: 'Barber Apprenticeship',
    quote: 'I was skeptical about the apprenticeship route, but it was the best decision I made. Zero debt, real experience, and I graduated with a full book of clients.',
    outcome: 'Opened own barbershop within 18 months',
    graduationYear: 2024,
    currentRole: 'Owner/Barber',
    currentEmployer: 'Davis Grooming Lounge',
  },

  // CNA Testimonials
  {
    id: 'cna-1',
    name: 'Keisha Brown',
    photo: '/images/testimonials/keisha-b.jpg',
    programSlug: 'cna-certification',
    programName: 'CNA Certification',
    quote: 'In just 6 weeks, I went from unemployed to working at a hospital. The clinical experience gave me confidence to handle any situation.',
    outcome: 'Hired at Community Hospital East',
    graduationYear: 2025,
    currentRole: 'Certified Nursing Assistant',
    currentEmployer: 'Community Health Network',
  },
  {
    id: 'cna-2',
    name: 'Maria Santos',
    photo: '/images/testimonials/maria-s.jpg',
    programSlug: 'cna-certification',
    programName: 'CNA Certification',
    quote: 'This program opened doors I never knew existed. I started as a CNA and now I am in nursing school working toward my RN.',
    outcome: 'Currently pursuing RN degree',
    graduationYear: 2024,
    currentRole: 'CNA / Nursing Student',
    currentEmployer: 'Ascension St. Vincent',
  },

  // CDL Testimonials
  {
    id: 'cdl-1',
    name: 'Robert Thompson',
    photo: '/images/testimonials/robert-t.jpg',
    programSlug: 'cdl-training',
    programName: 'CDL Training',
    quote: 'I got my CDL and was on the road within a month. First year I made $68,000 with full benefits. Best career move I ever made.',
    outcome: 'Regional driver earning $68,000+',
    graduationYear: 2025,
    currentRole: 'Regional CDL Driver',
    currentEmployer: 'Schneider National',
  },
  {
    id: 'cdl-2',
    name: 'James Wilson',
    photo: '/images/testimonials/james-w.jpg',
    programSlug: 'cdl-training',
    programName: 'CDL Training',
    quote: 'The instructors were patient and thorough. I had never driven anything bigger than a pickup, and now I am hauling freight across the country.',
    outcome: 'OTR driver with $10,000 sign-on bonus',
    graduationYear: 2024,
    currentRole: 'OTR Driver',
    currentEmployer: 'Werner Enterprises',
  },

  // Phlebotomy Testimonials
  {
    id: 'phleb-1',
    name: 'Ashley Martinez',
    photo: '/images/testimonials/ashley-m.jpg',
    programSlug: 'phlebotomy-technician',
    programName: 'Phlebotomy Technician',
    quote: 'I was nervous about drawing blood, but the practice sessions built my confidence. Now I do 30+ draws a day without breaking a sweat.',
    outcome: 'Hired at Quest Diagnostics',
    graduationYear: 2025,
    currentRole: 'Phlebotomy Technician',
    currentEmployer: 'Quest Diagnostics',
  },

  // Medical Assistant Testimonials
  {
    id: 'ma-1',
    name: 'Jennifer Lee',
    photo: '/images/testimonials/jennifer-l.jpg',
    programSlug: 'medical-assistant',
    programName: 'Medical Assistant',
    quote: 'The externship placed me at a family practice where I was hired full-time before graduation. I love the variety of my work every day.',
    outcome: 'Full-time MA at family practice',
    graduationYear: 2025,
    currentRole: 'Certified Medical Assistant',
    currentEmployer: 'IU Health Physicians',
  },

  // Tax Preparation Testimonials
  {
    id: 'tax-1',
    name: 'Patricia Green',
    photo: '/images/testimonials/patricia-g.jpg',
    programSlug: 'tax-prep-financial-services',
    programName: 'Tax Preparation',
    quote: 'I started doing taxes part-time during tax season and made an extra $8,000. Now I run my own tax office year-round.',
    outcome: 'Opened own tax preparation business',
    graduationYear: 2024,
    currentRole: 'Owner/Tax Preparer',
    currentEmployer: 'Green Tax Services',
  },
  {
    id: 'tax-2',
    name: 'Michael Carter',
    photo: '/images/testimonials/michael-c.jpg',
    programSlug: 'tax-prep-financial-services',
    programName: 'Tax Preparation',
    quote: 'The software training was invaluable. I prepared over 200 returns my first season and earned more than my previous full-time job.',
    outcome: 'Seasonal tax preparer earning $15,000+ in 3 months',
    graduationYear: 2025,
    currentRole: 'Tax Preparer',
    currentEmployer: 'Supersonic Fast Cash',
  },
];

export function getTestimonialsByProgram(programSlug: string): Testimonial[] {
  return testimonials.filter(t => t.programSlug === programSlug);
}

export function getFeaturedTestimonials(count: number = 6): Testimonial[] {
  return testimonials.slice(0, count);
}
